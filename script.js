// Setup scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create star field
const starsGeometry = new THREE.BufferGeometry();
const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff });

const starCount = 1000;
const positions = [];
for (let i = 0; i < starCount; i++) {
    positions.push((Math.random() - 0.5) * 2000);
    positions.push((Math.random() - 0.5) * 2000);
    positions.push((Math.random() - 0.5) * 2000);
}
starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

const stars = new THREE.Points(starsGeometry, starsMaterial);
scene.add(stars);

camera.position.z = 1000;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    stars.rotation.x += 0.001;
    stars.rotation.y += 0.001;
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Balls animation inside "Творчество" button
const creativityButton = document.querySelector('.hidden-balls');
const ballCount = 10;

function createBalls() {
    for (let i = 0; i < ballCount; i++) {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        ball.style.backgroundColor = '#523a3a'; // Установлен цвет шариков
        
        creativityButton.appendChild(ball);

        // Randomize position
        ball.style.left = `${Math.random() * 100}%`;
        ball.style.animationDuration = `${1 + Math.random() * 1}s`; // случайная длительность анимации
    }
}

const creativityDiv = document.querySelector('.creativity');
creativityDiv.addEventListener('mouseenter', createBalls);
creativityDiv.addEventListener('mouseleave', () => {
    creativityButton.innerHTML = ''; // Очистить шарики при уходе курсора
});

// Copy Ton address function
function copyTonAddress() {
    const tonAddress = "https://steamcommunity.com/id/verlity"; // Замените на ваш адрес
    navigator.clipboard.writeText(tonAddress).then(() => {
        showNotification(); // Показать уведомление
        shakeButton(); // Применить дрожание кнопки
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
    });
}

// Show notification
function showNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000);
}

// Shake button animation
function shakeButton() {
    const tonSpaceButton = document.getElementById('tonSpaceButton');
    tonSpaceButton.style.animation = 'shake 0.5s';
    setTimeout(() => {
        tonSpaceButton.style.animation = ''; // Убираем анимацию после завершения
    }, 500); // Время, совпадающее с длительностью анимации
}
