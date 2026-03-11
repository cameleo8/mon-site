// ==============================
// ====== CAROUSEL =========
// ==============================



const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const dotss = document.querySelectorAll(".dotb");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

const nextBtns = document.querySelector(".nexts");
const prevBtns = document.querySelector(".prevs");

let current = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));
    dotss.forEach(dot => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    dotss[index].classList.add("active");
}

nextBtn.addEventListener("click", () => {
    current++;
    if (current >= slides.length) current = 0;
    showSlide(current);
});

prevBtn.addEventListener("click", () => {
    current--;
    if (current < 0) current = slides.length - 1;
    showSlide(current);
});

nextBtns.addEventListener("click", () => {
    current++;
    if (current >= slides.length) current = 0;
    showSlide(current);
});

prevBtns.addEventListener("click", () => {
    current--;
    if (current < 0) current = slides.length - 1;
    showSlide(current);
});

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        current = i;
        showSlide(current);
    });
});

dotss.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        current = i;
        showSlide(current);
    });
});


// ==============================
// ====== HEX BACKGROUND ========
// ==============================

const canvas = document.getElementById("refletsCanvas");
const ctx = canvas.getContext("2d");

let width, height;

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.body.scrollHeight;
    canvas.style.height = height + "px";
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);


// ===== PARAMÈTRES RÉGLABLES =====
const hexSize = 25;         // taille hexagones
const spacingx = 2;         // espace entre hexagones
const spacingY = 15;         // espace vertical entre hexagones
const Offset = 30;         // décalage en Y pour un hexagon sur deux

const waveSpacing = 1000;   // distance entre vagues
const waveWidth = 600;      // largeur réelle de la vague
const animationSpeed = 2;   // vitesse animation

const hexHeight = Math.sqrt(3) * hexSize;

let offset = 20;


// ===== DESSIN HEXAGONE =====
function drawHex(x, y, size, color) {

    ctx.beginPath();

    for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i;
        const px = x + size * Math.cos(angle);
        const py = y + size * Math.sin(angle);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }

    ctx.closePath();

    ctx.strokeStyle = color;
    ctx.lineWidth = 1.5;


    ctx.stroke();
}


// ===== FOND =====
function drawBackground() {

    const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        100,
        width / 2,
        height / 2,
        width
    );

    gradient.addColorStop(0, "#000000");
    gradient.addColorStop(1, "#0a0a0a");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}


// ===== GRILLE HEXAGONALE =====
const baseColor = { r: 0, g: 200, b: 120 }; // change la couleur ici

function drawHexGrid() {
    for (let row = 0; row < Math.ceil(height / hexHeight) + 2; row++) {
        for (let col = 0; col < Math.ceil(width / (hexSize * 1.5)) + 2; col++) {

            const xOffset = 0;
            const yRowOffset = (col % 2) ? Offset : 0;

            const drawX = col * hexSize * spacingx + xOffset;
            const drawY = row * (hexHeight + spacingY) + yRowOffset;

            let pos = (drawX + drawY + offset) % waveSpacing;
            let distance = Math.abs(pos - waveSpacing / 2);
            let intensity = 0;

            if (distance < waveWidth / 2) {
                intensity = Math.pow(1 - distance / (waveWidth / 2), 1.5);
            }

            const r = Math.floor(baseColor.r * intensity);
            const g = Math.floor(baseColor.g * intensity);
            const b = Math.floor(baseColor.b * intensity);

            const color = intensity > 0.02
                ? `rgb(${r}, ${g}, ${b})`
                : "#000000";

            drawHex(drawX, drawY, hexSize, color);
        }
    }
}

// ===== LOOP =====
function animate() {

    ctx.clearRect(0, 0, width, height);

    drawBackground();
    drawHexGrid();

    offset += animationSpeed;

    requestAnimationFrame(animate);
}

animate();

