const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flowers = [];
let stars = [];
let starText = [];

// Crear estrellas en la parte superior
function createStars(amount) {
    for (let i = 0; i < amount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height / 2,  // Solo en la mitad superior
            size: Math.random() * 2 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 80%)`
        });
    }
}

// Crear un grupo de estrellas que formen el texto "Para ti"
function createStarText() {
    const text = "PARA TI";
    ctx.font = "100px 'Gowun Batang'";  // Aumenté el tamaño de la fuente
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Convertir el texto en un mapa de puntos
    const textWidth = ctx.measureText(text).width;
    const xPos = canvas.width / 2 - textWidth / 2;
    const yPos = canvas.height * 0.15;

    // Dibujar el texto y obtener su imagen de datos
    ctx.fillText(text, canvas.width / 2, yPos);
    const textData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    starText = [];  // Limpiar el arreglo antes de llenarlo

    for (let y = 0; y < textData.height; y += 5) {  // Aumentar la densidad de puntos
        for (let x = 0; x < textData.width; x += 5) {
            const index = (y * textData.width + x) * 4;
            if (textData.data[index + 3] > 128) {  // Si el píxel es visible
                starText.push({ x, y });
            }
        }
    }
}

// Dibujar una estrella
function drawStar(star) {
    const { x, y, size, color } = star;
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur = 15;
    ctx.fillStyle = color;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
        ctx.lineTo(
            Math.cos((18 + i * 72) / 180 * Math.PI) * size + x,
            -Math.sin((18 + i * 72) / 180 * Math.PI) * size + y
        );
        ctx.lineTo(
            Math.cos((54 + i * 72) / 180 * Math.PI) * (size / 2) + x,
            -Math.sin((54 + i * 72) / 180 * Math.PI) * (size / 2) + y
        );
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

// Dibujar las estrellas normales
function drawStars() {
    for (let star of stars) {
        drawStar(star);
    }
}

// Dibujar las estrellas que forman el texto
function drawStarText() {
    for (let star of starText) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, 1.5, 0, 2 * Math.PI);
        ctx.fillStyle = "white";
        ctx.fill();
    }
}

// Crear flores en la parte baja
function createFlower(x, y, delay) {
    flowers.push({
        x,
        y,
        petalColor: '#FFD700',  // Color de los pétalos
        centerColor: '#8B4513', // Centro marrón
        growth: 0,
        delay
    });
}

// Dibujar pétalos
function drawPetals(flower) {
    const petalCount = 10;
    const petalWidth = 20 * flower.growth;
    const petalHeight = 60 * flower.growth;

    ctx.save();
    ctx.translate(flower.x, flower.y);

    for (let i = 0; i < petalCount; i++) {
        ctx.beginPath();
        ctx.ellipse(0, 0, petalWidth, petalHeight, i * (2 * Math.PI / petalCount), 0, 2 * Math.PI);
        ctx.fillStyle = flower.petalColor;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
        ctx.fill();
    }

    ctx.restore();
}

// Dibujar el centro de la flor
function drawFlowerCenter(flower) {
    const radius = 15 * flower.growth;
    ctx.save();
    ctx.beginPath();
    ctx.arc(flower.x, flower.y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = flower.centerColor;
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
    ctx.fill();
    ctx.restore();
}

// Dibujar el tallo
function drawStem(flower) {
    const stemHeight = 200 * flower.growth;
    const curveAmount = Math.sin(flower.growth * Math.PI);

    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#006400";
    ctx.lineWidth = 8;
    ctx.moveTo(flower.x, flower.y);
    ctx.bezierCurveTo(
        flower.x + 10 * curveAmount, flower.y + stemHeight / 4,
        flower.x - 20 * curveAmount, flower.y + stemHeight / 2,
        flower.x, flower.y + stemHeight
    );
    ctx.stroke();
    ctx.restore();
}

// Dibujar hoja
function drawLeaf(flower) {
    const leafX = flower.x;
    const leafY = flower.y + 100 * flower.growth;

    ctx.save();
    ctx.fillStyle = "yellow";
    ctx.shadowBlur = 5;
    ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
    ctx.beginPath();
    ctx.moveTo(leafX, leafY);
    ctx.quadraticCurveTo(leafX + 50 * flower.growth, leafY - 50 * flower.growth, leafX + 100 * flower.growth, leafY);
    ctx.quadraticCurveTo(leafX + 50 * flower.growth, leafY + 50 * flower.growth, leafX, leafY);
    ctx.fill();
    ctx.restore();
}

// Dibujar una flor completa
function drawFlower(flower) {
    if (flower.growth >= 1) {
        drawStem(flower);
        drawLeaf(flower);
        drawPetals(flower);
        drawFlowerCenter(flower);
    }
}

// Animar flores
function animateFlowers() {
    for (let flower of flowers) {
        if (performance.now() > flower.delay) {
            flower.growth += 0.01;
            flower.growth = Math.min(flower.growth, 1);
        }
        drawFlower(flower);
    }
}

// Animar escena
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    drawStarText();
    animateFlowers();
    requestAnimationFrame(animate);
}

// Crear un campo de flores en la parte baja
function createFlowerField() {
    let startX = canvas.width * 0.1;
    let endX = canvas.width * 0.9;
    let rows = 5;
    let flowersPerRow = 10;
    let spacingX = (endX - startX) / flowersPerRow;
    let spacingY = 120;

    for (let row = 0; row < rows; row++) {
        for (let i = 0; i < flowersPerRow; i++) {
            // Omitir flores de la última fila en las posiciones 4 a 8 (índices 3 a 7)
            if (row === rows - 1 && i >= 3 && i <= 7) {
                continue;
            }
            createFlower(startX + i * spacingX, canvas.height * 0.85 - row * spacingY, 1000 * (row + i) + Math.random() * 1000);
        }
    }
}

// Inicializar animación
createStars(100);
createStarText();
createFlowerField();
animate();
