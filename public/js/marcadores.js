import * as THREE from "https://cdn.skypack.dev/three@0.129.0";

const raioTerra = 4;
const raioMarcador = 0.09;

export function criarMarcador(cidade ) {
    const marcador = new THREE.Group();

    // -----------------------------
    // Núcleo da bolinha
    // -----------------------------
    const geometriaNucleo = new THREE.SphereGeometry(
        raioMarcador,
        20,
        20
    );

    const materialNucleo = new THREE.MeshBasicMaterial({
        color: 0x4169e1
    });

    const nucleo = new THREE.Mesh(
        geometriaNucleo,
        materialNucleo
    );

    // -----------------------------
    // Camada ciano ao redor
    // -----------------------------
    const geometriaCiano = new THREE.SphereGeometry(
        raioMarcador * 1.35,
        20,
        20
    );

    const materialCiano = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const camadaCiano = new THREE.Mesh(
        geometriaCiano,
        materialCiano
    );

    // -----------------------------
    // Brilho externo
    // -----------------------------
    const geometriaBrilho = new THREE.SphereGeometry(
        raioMarcador * 2.1,
        20,
        20
    );

    const materialBrilho = new THREE.MeshBasicMaterial({
        color: 0x00bfff,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const brilho = new THREE.Mesh(
        geometriaBrilho,
        materialBrilho
    );

    // Adiciona as camadas ao marcador
    marcador.add(brilho);
    marcador.add(camadaCiano);
    marcador.add(nucleo);

    // -----------------------------------
    // Cálculo da posição pela latitude
    // e longitude
    // -----------------------------------
    const latitude = THREE.MathUtils.degToRad(
        cidade.latitude
    );

    const longitude = THREE.MathUtils.degToRad(
        cidade.longitude
    );

    const distanciaDoCentro =
        raioTerra + raioMarcador * 0.7;

    const x =
        distanciaDoCentro *
        Math.cos(latitude) *
        Math.cos(longitude);

    const y =
        distanciaDoCentro *
        Math.sin(latitude);

    const z =
        -distanciaDoCentro *
        Math.cos(latitude) *
        Math.sin(longitude);

    marcador.position.set(x, y, z);

    // -----------------------------------
    // Dados usados no clique
    // -----------------------------------
    marcador.userData.tipo = "cidade";
    marcador.userData.nome = cidade.nome;
    marcador.userData.pais = cidade.pais;
    marcador.userData.latitude = cidade.latitude;
    marcador.userData.longitude = cidade.longitude;

    return marcador;
}
