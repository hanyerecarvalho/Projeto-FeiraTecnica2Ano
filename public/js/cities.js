import { focarCidade } from  './main.js';

const campoBusca = Document.getElementById('inputPesquisa');
const iconeBusca = Document.querySelector('.pesquisaIcone');

async function buscarCidade(nomeCidade) {
    const nome = nomeCidade.trim();
    if (nome.length < 2)
        return;

    const url =
        `/api/cidades/sugestoes/${encodeURIComponent(nome)}`;
        
    try{
        const resposta = await fetch(url);

        if (!resposta.ok){
            console.error('Erro resposta da API:', resposta.status);
            return;
        }

        const sugestoes = await resposta.json();

        if (!Array.isArray(sugestoes) || sugestoes.length === 0) {
            console.warn('Nenhuma cidade encontrada para:', nome);
            return;
        }

        const primeira = sugestoes[0];
        console.log('Cidade encontrada:', primeira.descricao ?? primeira.nome);

        focarCidade(primeira.latitude, primeira.longitude);

    } catch (erro) {
        console.error('Erro ao buscar cidade:', erro);
    }
}

campoBusca.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter') {
        buscarCidade(campoBusca.value);
    }
});

iconeBusca.addEventListener('click', () => {
    buscarCidade(campoBusca.value);
});
    
    