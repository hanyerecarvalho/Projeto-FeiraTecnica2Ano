import { capitais } from './capitais.js';

const campoPesquisa = document.getElementById('inputPesquisa');
const listaSugestoes = document.getElementById('sugestoesPesquisa');
const painelCidade = document.getElementById('informacoesCidade');
const fecharInformacoes = document.getElementById('fecharInformacoes');

let controladorSugestoes;
let sugestoesAtuais = [];

campoPesquisa.addEventListener('input', () => {
    const termo = campoPesquisa.value.trim();

    if (controladorSugestoes) {
        controladorSugestoes.abort();
    }

    if (termo.length < 2) {
        limparSugestoes();
        return;
    }

    controladorSugestoes = new AbortController();
    window.setTimeout(() => carregarSugestoes(termo, controladorSugestoes.signal), 600);
});

campoPesquisa.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        evento.preventDefault();
        const termo = campoPesquisa.value.trim();

        if (termo !== '') {
            carregarCidade(termo);
        }
    }
});

fecharInformacoes.addEventListener('click', () => {
    painelCidade.hidden = true;
});

async function carregarSugestoes(termo, signal) {
    try {
        const resposta = await fetch(`/api/cidades/sugestoes/${encodeURIComponent(termo)}`, { signal });

        if (!resposta.ok) {
            throw new Error('Não foi possível carregar as sugestões.');
        }

        sugestoesAtuais = await resposta.json();
        renderizarSugestoes();
    } catch (erro) {
        if (erro.name !== 'AbortError') {
            console.error(erro);
            limparSugestoes();
        }
    }
}

function renderizarSugestoes() {
    listaSugestoes.replaceChildren();

    sugestoesAtuais.forEach((sugestao) => {
        const botao = document.createElement('button');
        botao.type = 'button';
        botao.className = 'sugestao-cidade';
        botao.setAttribute('role', 'option');
        botao.innerHTML = `<strong>${escaparHtml(sugestao.nome)}</strong><span>${escaparHtml(sugestao.pais)}</span>`;
        botao.addEventListener('click', () => {
            campoPesquisa.value = sugestao.nome;
            limparSugestoes();
            carregarCidade(sugestao.nome);
        });
        listaSugestoes.appendChild(botao);
    });

    listaSugestoes.hidden = sugestoesAtuais.length === 0;
}

export async function carregarCidade(nome) {
    limparSugestoes();
    campoPesquisa.disabled = true;
    mostrarMensagem('Consultando informações da cidade...');

    try {
        const resposta = await fetch(`/api/cidade/${encodeURIComponent(nome)}`);
        const cidadeApi = await resposta.json();
        console.log(cidadeApi);

        if (!resposta.ok) {
            throw new Error(cidadeApi.erro || 'Cidade não encontrada.');
        }

        // Se a cidade é uma das nossas capitais cadastradas localmente,
        // usa a coordenada confiável do capitais.js.
        // Caso contrário (cidade só existe via API), usa a coordenada da API.
        const cidadeLocal = capitais.find(
            c => c.nome.toLowerCase() === cidadeApi.nome.toLowerCase()
        );

        const latitude  = cidadeLocal?.latitude  ?? cidadeApi.latitude;
        const longitude = cidadeLocal?.longitude ?? cidadeApi.longitude;

        document.getElementById('cidadeNome').textContent = cidadeApi.nome;
        document.getElementById('cidadePais').textContent = cidadeApi.pais;
        document.getElementById('cidadeCoordenadas').textContent =
            `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;
        document.getElementById('cidadeClima').textContent = 'Consultando...';
        painelCidade.hidden = false;
        document.getElementById('mensagemCidade').textContent = '';
        document.getElementById('cidadeHabitantes').textContent =
        document.getElementById('cidadeHabitantes').textContent =
        cidadeApi.habitantes != null
            ? cidadeApi.habitantes.toLocaleString('pt-BR')
            : 'Não encontrado.';

        await carregarClima(cidadeApi.nome);
    } catch (erro) {
        mostrarMensagem(erro.message);
    } finally {
        campoPesquisa.disabled = false;
    }
}

async function carregarClima(nomeCidade) {
    try {
        const resposta = await fetch(`/api/clima/${encodeURIComponent(nomeCidade)}`);
        const dados = await resposta.json();

        if (!resposta.ok) {
            throw new Error(dados.erro || 'Clima indisponível.');
        }

        document.getElementById('cidadeClima').textContent =
            `${dados.clima.temperatura}°C, ${dados.clima.descricao}, umidade de ${dados.clima.umidade}%`;

        document.getElementById('cidadeSensacao').textContent =
            dados.clima.sensacaoTermica != null
                ? `${dados.clima.sensacaoTermica}°C`
                : '--';

        document.getElementById('cidadeHorario').textContent =
            dados.clima.fusoHorario != null
                ? formatarFusoHorario(dados.clima.fusoHorario)
                : '--';
    } catch (erro) {
        document.getElementById('cidadeClima').textContent = erro.message;
    }
}

function formatarFusoHorario(offsetSegundos) {
    const horas = offsetSegundos / 3600;
    const sinal = horas >= 0 ? '+' : '';
    return `UTC${sinal}${horas}`;
}

function mostrarMensagem(mensagem) {
    painelCidade.hidden = false;
    document.getElementById('cidadeNome').textContent = 'Não foi possível consultar';
    document.getElementById('cidadePais').textContent = '';
    document.getElementById('cidadeCoordenadas').textContent = '--';
    document.getElementById('cidadeClima').textContent = '--';
    document.getElementById('cidadeHabitantes').textContent = '--';
    document.getElementById('cidadeHorario').textContent = '--';
    document.getElementById('cidadeSensacao').textContent = '--';
    document.getElementById('mensagemCidade').textContent = mensagem;
  
}

function limparSugestoes() {
    sugestoesAtuais = [];
    listaSugestoes.replaceChildren();
    listaSugestoes.hidden = true;
}

function escaparHtml(valor) {
    const elemento = document.createElement('span');
    elemento.textContent = valor;
    return elemento.innerHTML;
}