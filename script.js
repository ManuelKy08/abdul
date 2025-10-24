// Matrix Rain Effect - WHITE VERSION
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Characters - mix of Katakana, numbers, and symbols
const characters = 'アァイィウヴエォカキクケコサシスセソタチツテトナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロワヲンヴヵヶ01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()_+-=[]{}|;:,.<>?';
const charArray = characters.split('');

const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

// WHITE color variations for dynamic effect
const colors = [
    'rgba(255, 255, 255, 1)',      // Pure white
    'rgba(255, 255, 255, 0.9)',    // Slightly transparent white
    'rgba(230, 230, 230, 1)',      // Light gray
];

function draw() {
    // Semi-transparent black to create trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Random white color for variety
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = color;

        // Draw character
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(char, x, y);

        // Add brighter white glow to leading character
        if (drops[i] * fontSize > fontSize) {
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.fillText(char, x, y);
        }

        // Reset drop randomly
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

// Animation loop (~30 FPS)
setInterval(draw, 33);

// Optimize for mobile performance
if (window.innerWidth < 768) {
    // Reduce canvas resolution on mobile for better performance
    const scale = 0.8;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    canvas.width = window.innerWidth * scale;
    canvas.height = window.innerHeight * scale;
}