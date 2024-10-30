// You can add more interactive features here if needed

const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const confettiColors = ['#ff9a9e', '#fad0c4', '#fbc2eb', '#a18cd1', '#f6d365', '#fda085'];
const confettiCount = 100;
const heartCount = 50;
const confetti = [];
const hearts = [];

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
}

function createConfetti() {
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: randomRange(0, canvas.width),
            y: randomRange(0, canvas.height),
            r: randomRange(2, 6),
            d: randomRange(1, 3),
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            tilt: randomRange(-10, 10),
            tiltAngleIncremental: randomRange(0.05, 0.12),
            tiltAngle: 0
        });
    }
}

function createHearts() {
    for (let i = 0; i < heartCount; i++) {
        hearts.push({
            x: randomRange(0, canvas.width),
            y: randomRange(0, canvas.height),
            size: randomRange(10, 20),
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            speed: randomRange(1, 3)
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((c) => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
        ctx.stroke();
    });
    updateConfetti();
}

function drawHearts() {
    hearts.forEach((h) => {
        ctx.beginPath();
        ctx.fillStyle = h.color;
        ctx.moveTo(h.x, h.y);
        ctx.bezierCurveTo(h.x - h.size / 2, h.y - h.size / 2, h.x - h.size, h.y + h.size / 3, h.x, h.y + h.size);
        ctx.bezierCurveTo(h.x + h.size, h.y + h.size / 3, h.x + h.size / 2, h.y - h.size / 2, h.x, h.y);
        ctx.fill();
    });
    updateHearts();
}

function updateConfetti() {
    confetti.forEach((c) => {
        c.tiltAngle += c.tiltAngleIncremental;
        c.y += (Math.cos(c.d) + 1 + c.r / 2) / 2;
        c.x += Math.sin(c.d);
        c.tilt = Math.sin(c.tiltAngle) * 15;

        if (c.y > canvas.height) {
            c.x = randomRange(0, canvas.width);
            c.y = -10;
        }
    });
}

function updateHearts() {
    hearts.forEach((h) => {
        h.y += h.speed;
        if (h.y > canvas.height) {
            h.x = randomRange(0, canvas.width);
            h.y = -10;
        }
    });
}

function animate() {
    drawConfetti();
    drawHearts();
    requestAnimationFrame(animate);
}

createConfetti();
createHearts();
animate();

document.addEventListener('DOMContentLoaded', () => {
    const poemElement = document.getElementById('poem');
    const paragraphs = [
        "In your eyes, I find my way,\nLike stars that guide me night and day.\nYou light up my world with just one glance,\nIn your arms, I fall into a dance.",
        "Through ups and downs, we never fade,\nIn every heartbeat, love's displayed.\nYou and I, we'll chase the sky,\nTogether, love, we soar and fly.",
        "With every step, you're by my side,\nIn this journey, we'll never hide.\nYou're my song, my melody, my tune,\nForever under the same bright moon."
    ];
    let paraIndex = 0;
    let charIndex = 0;

    function typeParagraph() {
        if (paraIndex < paragraphs.length) {
            if (charIndex < paragraphs[paraIndex].length) {
                poemElement.innerHTML += paragraphs[paraIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeParagraph, 30); // Increased typing speed
            } else {
                charIndex = 0;
                paraIndex++;
                poemElement.innerHTML += '<br><br>'; // Add space between paragraphs
                setTimeout(typeParagraph, 1000); // Wait before starting the next paragraph
            }
        }
    }

    typeParagraph();

    // Slideshow functionality with your images
    const images = [
        './download20240900183514.webp',
        './received_233697196379131.jpeg',
        './received_352522450573636.jpeg',
        './received_596055812591903.jpeg',
        './received_707523071309635.jpeg',
        './received_1712116449306605.jpeg',
        './remix-dc4684f0-b117-4c2c-af75-c53a6292a2ce.webp',
        './rn_image_picker_lib_temp_6ab8dec0-85d2-4db8-aabf-76c0d0dd4843.webp',
        './rn_image_picker_lib_temp_9a441f6f-3ff5-4a52-8abf-dc70f77ce004.jpg',
        './rn_image_picker_lib_temp_43e905e1-293d-4ea4-86de-a0256487d1b7.webp'
    ];
    let currentImageIndex = 0;
    const imageElement = document.getElementById('partner-picture');

    // Preload images
    images.forEach((src) => {
        const img = new Image();
        img.src = src;
    });

    function changeImage() {
        imageElement.style.opacity = 0; // Start fade out
        setTimeout(() => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            imageElement.src = images[currentImageIndex];
            imageElement.style.opacity = 1; // Fade in new image
        }, 1000); // Duration of fade out
    }

    setInterval(changeImage, 5000); // Change image every 5 seconds
});
