import * as THREE from "https://cdn.skypack.dev/three@0.129.0";

export function criarTerra() {
    const geometria = new THREE.SphereGeometry(4, 64, 64);

    const carregador = new THREE.TextureLoader();
    const mapaCor   = carregador.load('../assets/2k_earth_daymap_feira.png');
    const mapaNoite = carregador.load('../assets/2k_earth_nightmap.png');

    const material = new THREE.MeshStandardMaterial({
        map: mapaCor,
        roughness: 0.7,
        emissiveMap: mapaNoite,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 1.1
    });

    const terra = new THREE.Mesh(geometria, material);
    terra.rotation.z = 23.4 * Math.PI / 180; // inclinação do eixo da Terra
    return terra;
}

export function criarNuvens() {
    const geometria = new THREE.SphereGeometry(4.05, 64, 64);
    const carregador = new THREE.TextureLoader();
    const mapaNuvens = carregador.load('../assets/2k_earth_clouds.png');

    const material = new THREE.MeshStandardMaterial({
        map: mapaNuvens,
        transparent: true,
        opacity: 0.4,
        depthWrite: false
    });

    return new THREE.Mesh(geometria, material);
}

export function criarAtmosfera() {
    const geometria = new THREE.SphereGeometry(4.2, 64, 64);
    const material = new THREE.MeshBasicMaterial({
        color: 0x4d9fe0,
        transparent: true,
        opacity: 0.12,
        side: THREE.BackSide
    });
    return new THREE.Mesh(geometria, material);
}

export function criarFundoEstrelado() {
    const geometria = new THREE.SphereGeometry(500, 60, 40);
    const carregador = new THREE.TextureLoader();
    const textura = carregador.load('../assets/2k_stars_milky_way.png');

    const material = new THREE.MeshBasicMaterial({
        map: textura,
        side: THREE.BackSide
    });

    return new THREE.Mesh(geometria, material);
}