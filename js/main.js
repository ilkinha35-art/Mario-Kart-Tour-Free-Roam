let scene, camera, renderer, freeRoamControls;

function init() {
    const container = document.getElementById('canvas-container');

    // Cenário Three.js
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a2e);
    scene.fog = new THREE.FogExp2(0x1a1a2e, 0.002);

    // Câmera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 20);

    // Renderizador
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Iluminação
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(20, 40, 20);
    scene.add(dirLight);

    // Controles livres
    freeRoamControls = new FreeRoamCamera(camera, renderer.domElement);

    // Redimensionamento
    window.addEventListener('resize', onWindowResize);

    // Carregar Modelo de New York Min
    loadMapAssets();

    animate();
}

async function loadMapAssets() {
    const loadingEl = document.getElementById('loading');
    
    // Criar chão temporário/grid para referência
    const gridHelper = new THREE.GridHelper(200, 50, 0xff0000, 0x444444);
    scene.add(gridHelper);

    try {
        // Exemplo visual: Carregando iluminação Bake extraída do modelo
        const textureLoader = new THREE.TextureLoader();
        
        // Simulação da malha usando as propriedades da pista
        const geometry = new THREE.BoxGeometry(10, 0.2, 10);
        const material = new THREE.MeshStandardMaterial({ color: 0x333333 });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        loadingEl.style.display = 'none';
    } catch (err) {
        console.error("Erro ao carregar o mapa:", err);
        loadingEl.innerText = "Erro ao carregar recursos do modelo.";
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    if (freeRoamControls) freeRoamControls.update();
    renderer.render(scene, camera);
}

window.onload = init;
