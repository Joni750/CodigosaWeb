// Configuración de la escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(document.getElementById('cajaRobot').clientWidth, document.getElementById('cajaRobot').clientHeight);
renderer.setClearColor(0x000000, 0); // Fondo transparente
document.getElementById('cajaRobot').appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    const cajaRobot = document.getElementById('cajaRobot');
    camera.aspect = cajaRobot.clientWidth / cajaRobot.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(cajaRobot.clientWidth, cajaRobot.clientHeight);
});

// Colores
const grayColor = 0x808080;

// Iluminación
const pinkLight = new THREE.PointLight(0xFFDC84, 1, 10000);
pinkLight.position.set(500, 500, 500);
scene.add(pinkLight);

const purpleLight = new THREE.PointLight(0xFFDC84, 1, 10000);
purpleLight.position.set(-500, 500, 500);
scene.add(purpleLight);

const purple2Light = new THREE.PointLight(0xFFDC84, 1, 10000);
purple2Light.position.set(0, -200, 500);
scene.add(purple2Light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const ambientLight2 = new THREE.AmbientLight(0xffff);
scene.add(ambientLight2);

// Crear partes del robot
const material = new THREE.MeshStandardMaterial({
    color: grayColor,
    metalness: 0.8,
    roughness: 0.4,
    map: new THREE.TextureLoader().load('https://thumbs.dreamstime.com/b/textura-de-acero-desgastado-o-fondo-met%C3%A1lico-metal-placa-patr%C3%B3n-para-el-dise%C3%B1o-cromada-%C3%A1spero-negra-moderno-la-tecnolog%C3%ADa-190108108.jpg')
});

// Función para crear una caja redondeada
function createRoundedBox(width, height, depth, radius, smoothness) {
    const shape = new THREE.Shape();
    const eps = 0.00001;
    const radius0 = radius - eps;
    shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
    shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
    shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
    shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
    const geometry = new THREE.ExtrudeBufferGeometry(shape, {
        amount: depth - radius * 2,
        bevelEnabled: true,
        bevelSegments: smoothness * 2,
        steps: 1,
        bevelSize: radius0,
        bevelThickness: radius,
        curveSegments: smoothness
    });

    geometry.center();
    return geometry;
}

// Cabeza del robot
const headGeometry = createRoundedBox(1.9, 1.2, 1, 0.1, 10);
const head = new THREE.Mesh(headGeometry, material);

// Ojos del robot
const eyeGeometry = new THREE.SphereGeometry(0.15, 32, 32);
const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const eye1 = new THREE.Mesh(eyeGeometry, eyeMaterial);
const eye2 = new THREE.Mesh(eyeGeometry, eyeMaterial);
eye1.position.set(0.4, 0.2, 0.45);
eye2.position.set(-0.4, 0.20, 0.45);
head.add(eye1);
head.add(eye2);

// Orejas del robot
const earGeometry = new THREE.RingGeometry(0.05, 0.1, 32);
const earMaterial = new THREE.MeshStandardMaterial({ color: grayColor });
const ear1 = new THREE.Mesh(earGeometry, earMaterial);
const ear2 = new THREE.Mesh(earGeometry, earMaterial);
ear1.rotation.y = Math.PI / 2;
ear2.rotation.y = Math.PI / 2;
ear1.position.set(0.8, 0, 0);
ear2.position.set(-0.8, 0, 0);
head.add(ear1);
head.add(ear2);

// Cuerpo del robot
const bodyGeometry = createRoundedBox(1.5, 1.6, 1.5, 0.1, 10);
const body = new THREE.Mesh(bodyGeometry, material);
body.rotation.y = Math.PI / 4;
body.position.y = -2;

// Cuello del robot
const neckGeometry1 = new THREE.CylinderGeometry(0.2, 0.4, 1, 32);
const neck = new THREE.Mesh(neckGeometry1, material);
neck.position.y = -0.7;

head.position.y = 0;
neck.position.y = -1;

const robot = new THREE.Group();
robot.add(head);
robot.add(neck);
robot.add(body);
scene.add(robot);

camera.position.z = 5;

// Animar la escena
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Hacer que la cabeza del robot siga el cursor
document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = - (event.clientY / window.innerHeight) * 2 + 1;

    const maxRotationX = Math.PI / 6; // 30 grados
    const maxRotationY = Math.PI / 6; // 30 grados

    head.rotation.y = THREE.MathUtils.clamp(mouseX * maxRotationY, -maxRotationY, maxRotationY);
    head.rotation.x = THREE.MathUtils.clamp(-mouseY * maxRotationX, -maxRotationX, maxRotationX);
});

// Manejar el cambio de tamaño de la ventana
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(document.getElementById('cajaRobot').clientWidth, document.getElementById('cajaRobot').clientHeight);
});