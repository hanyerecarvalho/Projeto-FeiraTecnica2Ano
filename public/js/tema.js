const botaoTema = document.getElementById('btn-tema');
const htmlElement = document.documentElement;

const temaSalvo = localStorage.getItem('tema') || 'dark';
aplicarTema(temaSalvo);

botaoTema.addEventListener('click', () => {
    const temaAtual = htmlElement.getAttribute('data-theme');
    const novoTema = temaAtual === 'dark' ? 'light' : 'dark';
    aplicarTema(novoTema);
});

function aplicarTema(tema) {
    htmlElement.setAttribute('data-theme', tema);
    htmlElement.setAttribute('data-bs-theme', tema);
    localStorage.setItem('tema', tema);
    botaoTema.textContent = tema === 'dark' ? '🌙' : '☀️';
}