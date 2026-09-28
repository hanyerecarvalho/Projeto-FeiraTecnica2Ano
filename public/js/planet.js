import * as THREE from "https://cdn.skypack.dev/three@0.129.0";

export function criarTerra() {
    const geometria = new THREE.SphereGeometry(4, 64, 64);

    const carregador = new THREE.TextureLoader();
    const mapaCor   = carregador.load('../assets/2k_earth_daymap.png');
    const mapaNoite = carregador.load('../assets/2k_earth_nightmap.png');

    const material = new THREE.MeshStandardMaterial({
        map: mapaCor,
        roughness: 0.7,
        emissiveMap: mapaNoite,
        emissive: new THREE.Color(0xffffff),
        emissiveIntensity: 1.1
    });

    const terra = new THREE.Mesh(geometria, material);
    terra.rotation.z = 23.4 * Math.PI / 180;

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

//-----------------------------------------------------------------------------//

export function criarLua({ posicao = { x: 0, y: 0, z: 0 } } = {}) {
    const geometria = new THREE.SphereGeometry(1, 32, 32);

    const carregador = new THREE.TextureLoader();
    const textura = carregador.load('../assets/2k_moon.png');

    const material = new THREE.MeshBasicMaterial({
        map: textura
    });

    const lua = new THREE.Mesh(geometria, material);

    lua.position.set(
        posicao.x,
        posicao.y,
        posicao.z
    );

    return lua;
}

//-----------------------------------------------------------------------------//

export function criarSol({ posicao = { x: 10, y: 0, z: 0 } } = {}) {
    const geometria = new THREE.SphereGeometry(15, 100, 100);

    const carregador = new THREE.TextureLoader();
    const mapaCor = carregador.load('../assets/2k_sun.png');

    const material = new THREE.MeshBasicMaterial({
        map: mapaCor,
        blending: THREE.AdditiveBlending
    });

    const sol = new THREE.Mesh(geometria, material);

    sol.position.set(
        posicao.x,
        posicao.y,
        posicao.z
    );

    return sol;
}

export function criarBrilhoSol({ posicao = { x: 10, y: 0, z: 0 } } = {}) {

    const brilho = new THREE.Group();

    // Brilho mais próximo do Sol
    const geometria1 = new THREE.SphereGeometry(16, 64, 64);

    const material1 = new THREE.MeshBasicMaterial({
        color: 0xffaa33,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.BackSide
    });

    const camada1 = new THREE.Mesh(geometria1, material1);

    // Brilho intermediário
    const geometria2 = new THREE.SphereGeometry(17, 64, 64);

    const material2 = new THREE.MeshBasicMaterial({
        color: 0xff7700,
        transparent: true,
        opacity: 0.10,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.BackSide
    });

    const camada2 = new THREE.Mesh(geometria2, material2);

    // Brilho externo
    const geometria3 = new THREE.SphereGeometry(18, 64, 64);

    const material3 = new THREE.MeshBasicMaterial({
        color: 0xff4400,
        transparent: true,
        opacity: 0.06,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.BackSide
    });

    const camada3 = new THREE.Mesh(geometria3, material3);

    brilho.add(camada1);
    brilho.add(camada2);
    brilho.add(camada3);

    brilho.position.set(
        posicao.x,
        posicao.y,
        posicao.z
    );

    return brilho;
}

//-----------------------------------------------------------------------------//

export function criarMercurio({ posicao = { x: 0, y: 0, z: 0 } } = {}) {
const geometria = new THREE.SphereGeometry(1.5, 32, 32);

    const carregador = new THREE.TextureLoader();
    const textura = carregador.load('../assets/2k_mercury.png');

    const material = new THREE.MeshStandardMaterial({
        map: textura,
        roughness: 0.7
    });

    const mercurio = new THREE.Mesh(geometria, material);

    mercurio.position.set(
        posicao.x,
        posicao.y,
        posicao.z
    );

    return mercurio;
}

//-----------------------------------------------------------------------------//

export function criarVenus({ posicao = { x: 0, y: 0, z: 0 } } = {}) {
const geometria = new THREE.SphereGeometry(3.8, 64, 64);
    const carregador = new THREE.TextureLoader();
    const textura = carregador.load('../assets/2k_venus_surface.png');

    const material = new THREE.MeshStandardMaterial({
        map: textura,
        roughness: 0.7
    });

    const venus = new THREE.Mesh(geometria, material);

    venus.position.set(
        posicao.x,
        posicao.y,
        posicao.z
    );

    return venus;
}

//--------------------------------------------------//

export function criarSaturno({ posicao = { x: 0, y: 0, z: 0 } } = {}) {
const geometria = new THREE.SphereGeometry(7, 64, 64);

    const carregador = new THREE.TextureLoader();
    const textura = carregador.load('../assets/2k_saturn.png');

    const material = new THREE.MeshStandardMaterial({
        map: textura,
        roughness: 0.7
    });

    const saturno = new THREE.Mesh(geometria, material);

    saturno.position.set(
        posicao.x,
        posicao.y,
        posicao.z
    );
    
    return saturno;
}



export function criarAnelSaturno({ posicao = { x: 0, y: 0, z: 0 } } = {}) {
    const raioInterno = 4;
    const raioExterno = 12;

    const geometria = new THREE.RingGeometry(raioInterno, raioExterno, 64);

    // Corrige o UV mapping para ser radial (do centro pra borda), 
    // em vez do mapeamento padrão linear/quadrado do RingGeometry
    const posicoesVertices = geometria.attributes.position;
    const uv = geometria.attributes.uv;
    const vertice = new THREE.Vector3();

    for (let i = 0; i < posicoesVertices.count; i++) {
        vertice.fromBufferAttribute(posicoesVertices, i);
        const distanciaDoCentro = vertice.length();
        const uvX = (distanciaDoCentro - raioInterno) / (raioExterno - raioInterno);
        uv.setXY(i, uvX, 1);
    }

    const carregador = new THREE.TextureLoader();
    const transparencia = carregador.load('../assets/2k_saturn_ring_alpha.png');

    const material = new THREE.MeshStandardMaterial({
        alphaMap: transparencia,
        transparent: true,
        side: THREE.DoubleSide,
        roughness: 0.7
    });

    const aneis = new THREE.Mesh(geometria, material);

    aneis.position.set(posicao.x, posicao.y, posicao.z);
    aneis.rotation.x = Math.PI / 2;

    return aneis;
}

//--------------------------------------------------//

export function criarUrano({ posicao = { x: 0, y: 0, z: 0 } } = {}) {
    const geometria = new THREE.SphereGeometry(9, 120, 120);
    const carregador = new THREE.TextureLoader();
    const textura = carregador.load('../assets/2k_uranus.png');

    const material = new THREE.MeshStandardMaterial({
        map: textura,
        roughness: 0.7
    });

    const urano = new THREE.Mesh(geometria, material);

    urano.position.set(
        posicao.x,
        posicao.y,
        posicao.z
    );

    return urano;
}

//--------------------------------------------------//

export function criarMarte({ posicao = { x: 0, y: 0, z: 0 } } = {}) {
    const geometria = new THREE.SphereGeometry(3, 64, 64);
    const carregador = new THREE.TextureLoader();
    const textura   = carregador.load('../assets/2k_mars.png');

    const material = new THREE.MeshStandardMaterial({
        map: textura,
        roughness: 0.7
    });

    const marte = new THREE.Mesh(geometria, material);
    marte.position.set(
        posicao.x,
        posicao.y,
        posicao.z
    );

    return marte;
}

//--------------------------------------------------//

export function criarJupiter({ posicao = { x: 0, y: 0, z: 0 } } = {}) {

    const geometria = new THREE.SphereGeometry(5, 64, 64);

    const carregador = new THREE.TextureLoader();

    const textura = carregador.load(
        '../assets/2k_jupiter.png'
    );

    const material = new THREE.MeshStandardMaterial({
        map: textura,
        roughness: 0.7
    });

    const jupiter = new THREE.Mesh(
        geometria,
        material
    );

    jupiter.position.set(
        posicao.x,
        posicao.y,
        posicao.z
    );

    return jupiter;
}

//--------------------------------------------------//

export function criarNetuno({ posicao = { x: 0, y: 0, z: 0 } } = {}) {

    const geometria = new THREE.SphereGeometry(8, 115, 115);

    const carregador = new THREE.TextureLoader();

    const textura = carregador.load(
        '../assets/2k_neptune.png'
    );

    const material = new THREE.MeshStandardMaterial({
        map: textura,
        roughness: 0.7
    });

    const netuno = new THREE.Mesh(
        geometria,
        material
    );

    netuno.position.set(
        posicao.x,
        posicao.y,
        posicao.z
    );

    return netuno;
}