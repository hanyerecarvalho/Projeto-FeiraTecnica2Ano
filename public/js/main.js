import * as THREE from "https://cdn.skypack.dev/three@0.129.0";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { criarTerra, criarNuvens, criarAtmosfera, criarFundoEstrelado } from './planet.js';

let cena, camera, renderizador, controles, terra, nuvens;

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

    cena.add(criarFundoEstrelado());

    terra = criarTerra();
    cena.add(terra);

    nuvens = criarNuvens();
    cena.add(nuvens);

    cena.add(criarAtmosfera());

    const luzSol = new THREE.DirectionalLight(0xffffff, 1.5);
    luzSol.position.set(8, 2, 10);
    cena.add(luzSol);

    const luzAmbiente = new THREE.AmbientLight(0xffffff, 0.5);
    cena.add(luzAmbiente);

    renderizador = new THREE.WebGLRenderer({ antialias: true });
    renderizador.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderizador.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderizador.domElement);

    controles = new OrbitControls(camera, renderizador.domElement);
    controles.enableDamping = true;
    controles.dampingFactor = 0.05;
    controles.minDistance = 6;
    controles.maxDistance = 100;
}

function animar() {
    requestAnimationFrame(animar);

    if (terra)  terra.rotation.y  += 0.0015;
    if (nuvens) nuvens.rotation.y += 0.002;

    if (controles) controles.update();
    if (renderizador) renderizador.render(cena, camera);
}

window.addEventListener('resize', () => {
    if (!camera || !renderizador) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderizador.setSize(window.innerWidth, window.innerHeight);
});

init();
animar();