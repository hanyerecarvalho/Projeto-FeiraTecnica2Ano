import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import * as Planeta from './planet.js';
import { posicoes } from './posicao.js';

let cena, camera, renderizador, controles;

let terra, nuvens, lua, sol, mercurio, venus, saturno, anelSaturno, marte, urano, jupiter, netuno;

function init() {
    const container = document.getElementById('cena3d-container');

    if (!container) {
        console.error('Elemento #cena3d-container não encontrado no HTML.');
        return;
    }

    cena = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.z = 11;

    cena.add(Planeta.criarFundoEstrelado());

    terra = Planeta.criarTerra();
    cena.add(terra);

    nuvens = Planeta.criarNuvens();
    cena.add(nuvens);

    cena.add(Planeta.criarAtmosfera());

    lua = Planeta.criarLua({
        posicao: posicoes.lua
    });
    cena.add(lua);

    sol = Planeta.criarSol({
        posicao: posicoes.sol
    });
    cena.add(sol);

    const brilhoSol = Planeta.criarBrilhoSol({
        posicao: posicoes.sol
    });
    cena.add(brilhoSol);

    mercurio = Planeta.criarMercurio({
        posicao: posicoes.mercurio
    });
    cena.add(mercurio);

    venus = Planeta.criarVenus({
        posicao: posicoes.venus
    });
    cena.add(venus);

    saturno = Planeta.criarSaturno({
        posicao: posicoes.saturno
    });
    cena.add(saturno);

    anelSaturno = Planeta.criarAnelSaturno({
        posicao: posicoes.saturno
    });
    cena.add(anelSaturno);

    marte = Planeta.criarMarte({
        posicao: posicoes.marte
    });
    cena.add(marte);

    jupiter = Planeta.criarJupiter({
    posicao: posicoes.jupiter
    });

    cena.add(jupiter);

    urano = Planeta.criarUrano({
        posicao: posicoes.urano
    });
    cena.add(urano);

    netuno = Planeta.criarNetuno({
    posicao: posicoes.netuno
});

cena.add(netuno);

    const luzSol = new THREE.DirectionalLight(0xffffff, 1.5);

    luzSol.position.set(8, 2, 10);

    cena.add(luzSol);

    const luzAmbiente = new THREE.AmbientLight(
        0xffffff,
        0.5
    );

    cena.add(luzAmbiente);

    renderizador = new THREE.WebGLRenderer({
        antialias: true
    });

    renderizador.setPixelRatio(
        Math.min(window.devicePixelRatio, 2)
    );

    renderizador.setSize(
        window.innerWidth,
        window.innerHeight
    );

    container.appendChild(
        renderizador.domElement
    );

    controles = new OrbitControls(
        camera,
        renderizador.domElement
    );

    controles.enableDamping = true;
    controles.dampingFactor = 0.05;
    controles.minDistance = 6;
    controles.maxDistance = 200;
}

function animar() {
    requestAnimationFrame(animar);

    if (terra)
        terra.rotation.y += 0.001500;

    if (nuvens)
        nuvens.rotation.y += 0.002;

    if (lua)
        lua.rotation.y += 0.0010;

    if (sol)
        sol.rotation.y += 0.0010;

    if (mercurio)
        mercurio.rotation.y += 0.0008;

    if (venus)
        venus.rotation.y += 0.0010;

    if (saturno)
        saturno.rotation.y += 0.00253;

    if (anelSaturno)
        anelSaturno.rotation.z += 0.00253;

    if (marte)
        marte.rotation.y += 0.0012;

    if (jupiter)
        jupiter.rotation.y += 0.0008;

    if (urano)
        urano.rotation.y -= 0.002083;

    if (netuno)
        netuno.rotation.y -= 0.002229;

    if (controles)
        controles.update();

    if (renderizador)
        renderizador.render(cena, camera);
}

window.addEventListener('resize', () => {

    if (!camera || !renderizador)
        return;

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderizador.setSize(
        window.innerWidth,
        window.innerHeight
    );
});

init();
animar();