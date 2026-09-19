const elementoLocal = document.getElementById('horario-local');
const elementoUtc = document.getElementById('horario-utc');

function atualizarHorarios() {
    const agora = new Date();

    const horaLocal = agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const horaUtc = agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
    });

    elementoLocal.textContent = horaLocal;
    elementoUtc.textContent = horaUtc;
}

atualizarHorarios();
setInterval(atualizarHorarios, 1000);