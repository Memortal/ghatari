const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

// Initialize Simplex noise
const simplex = new SimplexNoise();

// Set canvas size to match window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Initial resize
resizeCanvas();

// Handle window resize
window.addEventListener('resize', resizeCanvas);

// Lyrics array
const lyrics = [
    "اولیو میرسونم ایستگاه یک",
    "تنهایی میرم تا ایستگاه دو",
    "چی میخواد بشه به ایستگاهِ سه",
    "دوتا دیگه میان ایستگاهِ چهار",
    "میره بیرون اگه نیست پایه باهام",
    "فراهمه اگه بیستا بخوام",
    "نمیتونم بمونم یه جا",
    "نمیشه برم هم یه جا که نیست جایِ پا",
    "زندگیم آروم نی تنده یهو",
    "مث راه آهن کش میاد پشت و جلو",
    "اَ کابینِ ما به کابین اون",
    "سرپایی یا که خوابیده بوم",
    "آخر خط اولِ راه",
    "پاها رو گاز طرفِ ماه",
    "منظره خوب طرف ما",
    "زحمتِ کم ثمره ناب",
    "قطاری هممون نواری میریم ما",
    "پُرِ پُر پشتِ هم سواریم آه",
    "یکیمون میمونه سر واگن یکی",
    "دیگمون همون هم فراری اه",
    "یکی به گوش یکی به حرف",
    "یکی درست و یکی به نفع",
    "یه دونه خوب یه دونه بد",
    "میمونه تو یا بیرون در",
    "تکونِ زیاد و تکونِ نرم",
    "نمیخوام برسم به خونه من",
    "گیر می کنیم فیتیله پیچ",
    "میپیچه پیچیده پیچیده تر",
    "خوابی یا بیدار به خودت یه",
    "نگاه کنی همه جوره که دورته",
    "اگه دوست داری بمون بامون راه بیا",
    "اگه به جیبت نیست حتما به رُخته اه",
    "تصویرا میره به سرعت برق و باد",
    "این تصویرا گذشتنو یادم داد",
    "لوکوموتیو (یغر و دیو)",
    "لوکوموتیو (یغر و دیو)",
    "لوکوموتیو (یغر و دیو)",
    "لوکوموتیو، لوکوموتیو",
    "لوکوموتیو، لوکوموتیو",
    "لوکوموتیو، لوکوموتیو",
    "لوکومولوکومولوکوموتیو",
    "لوکوموتیو، لوکوموتیو",
    "لوکومولوکومولوکوموتیو",
    "سوارِ قطار زندگی شدم",
    "بدونِ بلیط برگشت",
    "دارم تو حرکت زندگی میکنم",
    "میسازم تصویر ازش",
    "هر ایستگاهش یه داستانه",
    "هر داستانش یه خاطره",
    "یه دفعه قطارِ وحشته",
    "یه دفعه قطارِ فانفاره",
    "گاهی تند میشه گاهی کند",
    "گاهی بلا تکلیف گاهی رم",
    "میره بالا میاد پایین",
    "گاهی پیدا میشه گاهی گم",
    "دوست دارم بعضی أ منظره هاشو",
    "مدل آدم و منطق باهاشو",
    "زیاده هیجان نمیخوابم",
    "که بتونم ببینم اکثر راهشو",
    "بافت های متفاوت",
    "دیدگاه های جور واجور",
    "رفتارهای مختلف",
    "رصد میشن دورادور",
    "میرن و منم میرم باهاشون",
    "معنیِ زندگیم شده راهش",
    "حال میکنم با همه جاش",
    "با همه چیش، تونل",
    "تصویرا میره به سرعت برق و باد",
    "این تصویرا گذشتنو یادم داد",
    "لوکوموتیو (یغر و دیو)",
    "لوکوموتیو (یغر و دیو)",
    "لوکوموتیو (یغر و دیو)",
    "لوکوموتیو، لوکوموتیو",
    "لوکوموتیو، لوکوموتیو",
    "لوکوموتیو، لوکوموتیو",
    "لوکومولوکومولوکوموتیو",
    "لوکوموتیو، لوکوموتیو",
    "لوکومولوکومولوکوموتیو",
    "تصویرا میره به سرعت برق و باد",
    "گذشتنو یادم داد",
    "گذشتنو یادم داد",
    "گذشتنو یادم داد"
];

// Animation variables
let startTime = null;
const TOTAL_DURATION = 229; // 3 minutes and 49 seconds
const TRAIN_SCALE = 2.5;
let trainSpeed = -200; // Default speed (negative for leftward movement)
const wagonWidth = 180 * TRAIN_SCALE;
const wagonGap = 20 * TRAIN_SCALE;
const locomotiveWidth = 250 * TRAIN_SCALE;
let trainPosition = window.innerWidth;
const totalTrainLength = (lyrics.length * (wagonWidth + wagonGap)) + locomotiveWidth;

// Speed control setup
const speedButtons = document.querySelectorAll('.speed-btn');
speedButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        speedButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Update train speed (negative for leftward movement)
        trainSpeed = -parseInt(button.dataset.speed);
    });
});

// Sci-fi color palettes
const colorPalettes = [
    {   // Cyberpunk Neon
        primary: '#00ff9f',
        secondary: '#00b8ff',
        accent1: '#ff00ff',
        accent2: '#ff3366',
        background: '#001b2e',
        lineWidthMultiplier: 1.2
    },
    {   // Holographic Dream
        primary: '#7bffd0',
        secondary: '#c800ff',
        accent1: '#00eeff',
        accent2: '#ff00aa',
        background: '#120338',
        lineWidthMultiplier: 0.8
    },
    {   // Quantum Flux
        primary: '#00ffcc',
        secondary: '#4d0099',
        accent1: '#ff3300',
        accent2: '#ffff00',
        background: '#000066',
        lineWidthMultiplier: 1.5
    },
    {   // Digital Aurora
        primary: '#39ff14',
        secondary: '#ff1493',
        accent1: '#00ffff',
        accent2: '#ff4500',
        background: '#000033',
        lineWidthMultiplier: 0.9
    },
    {   // Plasma Storm
        primary: '#ff00ff',
        secondary: '#00ffff',
        accent1: '#ffff00',
        accent2: '#ff3366',
        background: '#1a0033',
        lineWidthMultiplier: 1.3
    },
    {   // Neural Network
        primary: '#00ff87',
        secondary: '#00a2ff',
        accent1: '#ff0066',
        accent2: '#9933ff',
        background: '#001a1a',
        lineWidthMultiplier: 1.1
    },
    {   // Time Warp
        primary: '#ff1177',
        secondary: '#00ffcc',
        accent1: '#aa00ff',
        accent2: '#ffaa00',
        background: '#000022',
        lineWidthMultiplier: 1.4
    },
    {   // Binary Sunset
        primary: '#ff3366',
        secondary: '#ffcc00',
        accent1: '#00ffff',
        accent2: '#ff00cc',
        background: '#1a0044',
        lineWidthMultiplier: 0.7
    },
    {   // Matrix Code
        primary: '#00ff00',
        secondary: '#33ff33',
        accent1: '#66ff66',
        accent2: '#99ff99',
        background: '#001100',
        lineWidthMultiplier: 1.0
    },
    {   // Cosmic Radiation
        primary: '#ff00aa',
        secondary: '#00ffee',
        accent1: '#ffff00',
        accent2: '#ff3366',
        background: '#000055',
        lineWidthMultiplier: 1.6
    }
];

// Function to get current palette based on time
function getCurrentPalette(time) {
    const paletteIndex = Math.floor(time * 0.1) % colorPalettes.length;
    const nextPaletteIndex = (paletteIndex + 1) % colorPalettes.length;
    const transition = (time * 0.1) % 1;
    
    return {
        current: colorPalettes[paletteIndex],
        next: colorPalettes[nextPaletteIndex],
        transition: transition
    };
}

// Function to interpolate between colors
function lerpColor(color1, color2, factor) {
    const r1 = parseInt(color1.substr(1, 2), 16);
    const g1 = parseInt(color1.substr(3, 2), 16);
    const b1 = parseInt(color1.substr(5, 2), 16);
    
    const r2 = parseInt(color2.substr(1, 2), 16);
    const g2 = parseInt(color2.substr(3, 2), 16);
    const b2 = parseInt(color2.substr(5, 2), 16);
    
    const r = Math.round(r1 + (r2 - r1) * factor);
    const g = Math.round(g1 + (g2 - g1) * factor);
    const b = Math.round(b1 + (b2 - b1) * factor);
    
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Update pattern types with dynamic colors
function updatePatternColors(time) {
    const { current, next, transition } = getCurrentPalette(time);
    
    // Flowing Rivers - thin, flowing lines
    patternTypes[0].color = lerpColor(current.primary, next.primary, transition);
    patternTypes[0].lineWidth = (0.5 + Math.sin(time) * 0.3) * 
        (current.lineWidthMultiplier + (next.lineWidthMultiplier - current.lineWidthMultiplier) * transition);
    
    // Lightning - varied thickness for electric effect
    patternTypes[1].color = lerpColor(current.secondary, next.secondary, transition);
    patternTypes[1].lineWidth = (2.5 + Math.random() * 2) * 
        (current.lineWidthMultiplier + (next.lineWidthMultiplier - current.lineWidthMultiplier) * transition);
    
    // Spiral Galaxy - thin at edges, thick in center
    patternTypes[2].color = lerpColor(current.accent1, next.accent1, transition);
    patternTypes[2].lineWidth = (1.0 + Math.cos(time * 0.5) * 0.5) * 
        (current.lineWidthMultiplier + (next.lineWidthMultiplier - current.lineWidthMultiplier) * transition);
    
    // Mountain Range - thick base, thin peaks
    patternTypes[3].color = lerpColor(current.accent2, next.accent2, transition);
    patternTypes[3].lineWidth = (3.0 + Math.sin(time * 0.3) * 1.5) * 
        (current.lineWidthMultiplier + (next.lineWidthMultiplier - current.lineWidthMultiplier) * transition);
    
    // Wave Interference - dynamic thickness based on interference
    patternTypes[4].color = lerpColor(current.primary, next.secondary, transition);
    patternTypes[4].lineWidth = (1.5 + Math.sin(time) * Math.cos(time * 0.5)) * 
        (current.lineWidthMultiplier + (next.lineWidthMultiplier - current.lineWidthMultiplier) * transition);
    
    // Update background color
    document.body.style.backgroundColor = lerpColor(current.background, next.background, transition);
}

// Function to draw perspective lines
function drawPerspectiveLines(time) {
    const lineConfig = {
        count: 30,
        minSpacing: 20 * TRAIN_SCALE,
        maxSpacing: 120 * TRAIN_SCALE,
        opacity: 0.15,
        speedMultiplier: 0.2
    };

    const centerY = canvas.height / 2;
    const maxDistance = canvas.height / 2;

    ctx.strokeStyle = '#ffffff';
    
    for (let i = 0; i < lineConfig.count; i++) {
        // Calculate distance from center with noise
        const baseDistance = (i / lineConfig.count) * maxDistance;
        const noiseOffset = simplex.noise2D(i * 0.2, time * lineConfig.speedMultiplier) * 10;
        const distance = baseDistance + noiseOffset;
        
        // Calculate line spacing that decreases towards center
        const progress = distance / maxDistance;
        const spacing = lineConfig.minSpacing + 
                       (lineConfig.maxSpacing - lineConfig.minSpacing) * progress;
        
        // Calculate opacity that fades towards edges
        const fadeEdge = 1 - Math.abs(progress - 0.5) * 2;
        const opacity = lineConfig.opacity * fadeEdge;
        
        // Draw upper line
        ctx.beginPath();
        ctx.globalAlpha = opacity;
        ctx.lineWidth = 1 * TRAIN_SCALE;
        ctx.moveTo(0, centerY - distance);
        ctx.lineTo(canvas.width, centerY - distance);
        ctx.stroke();
        
        // Draw lower line
        ctx.beginPath();
        ctx.moveTo(0, centerY + distance);
        ctx.lineTo(canvas.width, centerY + distance);
        ctx.stroke();
    }
    
    ctx.globalAlpha = 1;
}

function drawBackgroundLines(time) {
    // Update demon states
    updateDemons(time);
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;
    
    const numLines = 15;
    const spacing = canvas.height / numLines;
    
    for (let i = 0; i < numLines; i++) {
        const y = i * spacing;
        const lineOffset = Math.sin(time + i * 0.1) * 50;
        
        // Draw the line
        ctx.beginPath();
        ctx.moveTo(0, y + lineOffset);
        ctx.lineTo(canvas.width, y + lineOffset);
        ctx.stroke();
    }
    
    // Draw all active demons
    activeDemons.forEach((demon, index) => {
        const y = (demon.lineIndex * spacing) + Math.sin(time + demon.lineIndex * 0.1) * 50;
        drawDemonFace(demon.x, y, time, demon.pattern);
    });
}

// Track active demons
let activeDemons = [];

function updateDemons(time) {
    // Chance to spawn new demon
    if (activeDemons.length < 2 && Math.random() < 0.01) {
        activeDemons.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            startTime: time,
            duration: 10 + Math.random() * 15, // Stay visible for 10-25 seconds
            pattern: Math.floor(Math.random() * 5),
            lineIndex: Math.floor(Math.random() * 15)
        });
    }
    
    // Update and remove expired demons
    activeDemons = activeDemons.filter(demon => {
        return (time - demon.startTime) < demon.duration;
    });
}

function drawDemonFace(x, y, time, demonIndex) {
    // Each demon gets its own unique movement pattern
    const patterns = [
        (t) => Math.sin(t * 0.5) * 20,  // Slow sine wave
        (t) => Math.cos(t * 2) * 15,    // Fast cosine
        (t) => Math.tan(t * 0.3) * 10,  // Tangent wave
        (t) => Math.sin(t * 0.7) * Math.cos(t * 0.3) * 25, // Lissajous
        (t) => Math.sin(t * 1.5) * (Math.cos(t * 0.2) * 30) // Complex wave
    ];

    // Use the demon's index to select its unique pattern
    const pattern = patterns[demonIndex % patterns.length];
    const offset = pattern(time);

    // Make eyes glow brighter
    const glowSize = 20 + Math.sin(time * 2) * 5;
    
    // Draw glowing eyes
    ctx.save();
    ctx.shadowBlur = glowSize;
    ctx.shadowColor = '#ff0000';
    ctx.fillStyle = '#ff0000';
    
    // Left eye
    ctx.beginPath();
    ctx.arc(x - 20 + offset, y - 10, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Right eye
    ctx.beginPath();
    ctx.arc(x + 20 + offset, y - 10, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Add extra glow for intensity
    ctx.shadowBlur = glowSize * 2;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.arc(x - 20 + offset, y - 10, 3, 0, Math.PI * 2);
    ctx.arc(x + 20 + offset, y - 10, 3, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function drawDemonicFace(x, y, time, seed, type) {
    const faceAlgorithms = [
        {   // Cyber Demon
            name: 'cyber',
            baseSize: 30,
            sizeVariation: 15,
            color: '#FF1744',
            opacity: 0.6,
            pattern: (ctx, centerX, centerY, size, t) => {
                const safeSize = Math.max(size, 1);
                
                // Base face shape
                ctx.beginPath();
                ctx.arc(centerX, centerY, safeSize * 0.8, 0, Math.PI * 2);
                ctx.stroke();
                
                // Bright white eyes
                const eyeSize = safeSize * 0.2;
                const eyeSpacing = safeSize * 0.3;
                
                // Left eye glow
                ctx.beginPath();
                ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                ctx.arc(centerX - eyeSpacing, centerY - safeSize * 0.1, eyeSize * 1.5, 0, Math.PI * 2);
                ctx.fill();
                
                // Right eye glow
                ctx.beginPath();
                ctx.arc(centerX + eyeSpacing, centerY - safeSize * 0.1, eyeSize * 1.5, 0, Math.PI * 2);
                ctx.fill();
                
                // Left eye core
                ctx.beginPath();
                ctx.fillStyle = '#ffffff';
                ctx.arc(centerX - eyeSpacing, centerY - safeSize * 0.1, eyeSize, 0, Math.PI * 2);
                ctx.fill();
                
                // Right eye core
                ctx.beginPath();
                ctx.arc(centerX + eyeSpacing, centerY - safeSize * 0.1, eyeSize, 0, Math.PI * 2);
                ctx.fill();
                
                // Digital circuit patterns
                ctx.strokeStyle = algorithm.color;
                for (let i = 0; i < 4; i++) {
                    const angle = (i / 4) * Math.PI * 2 + t;
                    ctx.beginPath();
                    ctx.moveTo(centerX + Math.cos(angle) * safeSize, centerY + Math.sin(angle) * safeSize);
                    ctx.lineTo(centerX + Math.cos(angle + 0.2) * (safeSize * 1.2), centerY + Math.sin(angle + 0.2) * (safeSize * 1.2));
                    ctx.stroke();
                }
            }
        },
        // ... [keep other face types but update them with similar white eyes]
    ];

    const algorithm = faceAlgorithms[0];  // Always use the cyber demon face for now
    const noiseValue = (simplex.noise2D(seed * 1000, time) + 1) * 0.5;
    const size = Math.max(algorithm.baseSize * TRAIN_SCALE + noiseValue * algorithm.sizeVariation * TRAIN_SCALE, 1);
    
    ctx.strokeStyle = algorithm.color;
    ctx.fillStyle = algorithm.color;
    ctx.lineWidth = 2 * TRAIN_SCALE;
    ctx.globalAlpha = algorithm.opacity;
    
    algorithm.pattern(ctx, x, y, size, time);
    
    ctx.globalAlpha = 1;
}

// Pattern configurations for different wagons
const patternTypes = [
    {   // Flowing Rivers Pattern
        name: 'cyberpunk_flow',
        noiseScale: 0.004,
        speedMultiplier: 1.2,
        colorMultiplier: 1.5,
        lineWidth: 2,
        opacity: 0.8,
        color: '#ffffff',
        pattern: (x, y, time, seed) => {
            const scale = 0.003;
            return Math.abs(simplex.noise3D(x * scale, y * scale, time + seed));
        }
    },
    {   // Digital Matrix Pattern
        name: 'matrix_rain',
        noiseScale: 0.006,
        speedMultiplier: 0.8,
        colorMultiplier: 1.2,
        lineWidth: 1.5,
        opacity: 0.7,
        color: '#ffffff',
        pattern: (x, y, time, seed) => {
            return Math.abs(Math.sin(y * 0.1 + time) * simplex.noise3D(x * 0.01, y * 0.01, time + seed));
        }
    },
    {   // Quantum Wave Pattern
        name: 'quantum_wave',
        noiseScale: 0.005,
        speedMultiplier: 1.5,
        colorMultiplier: 1.3,
        lineWidth: 2,
        opacity: 0.9,
        color: '#ffffff',
        pattern: (x, y, time, seed) => {
            return Math.abs(Math.cos(x * 0.05 + time) * simplex.noise3D(x * 0.02, y * 0.02, time + seed));
        }
    }
];

// Wagon configurations
const wagonConfigs = [
    {
        length: 160,
        wheelPositions: [20, 140]
    },
    {
        length: 180,
        wheelPositions: [30, 150]
    },
    {
        length: 200,
        wheelPositions: [40, 160]
    }
];

function drawNoisePattern(x, y, width, height, time, config, seed) {
    ctx.strokeStyle = '#ffffff';
    
    const spacing = height / 20;
    
    for (let i = 0; i < 20; i++) {
        // Calculate dynamic line width based on pattern type
        let dynamicWidth = config.lineWidth;
        
        if (config.name === 'cyberpunk_flow') {
            // Thinner at edges, thicker in center
            const distanceFromCenter = Math.abs(i - 10) / 10;
            dynamicWidth *= (1 - distanceFromCenter * 0.7);
        } else if (config.name === 'matrix_rain') {
            // Random variations for lightning effect
            dynamicWidth *= (0.8 + Math.random() * 0.4);
        } else if (config.name === 'quantum_wave') {
            // Thicker at base, thinner at peaks
            const heightFactor = i / 20;
            dynamicWidth *= (1.5 - heightFactor);
        }
        
        ctx.lineWidth = dynamicWidth * TRAIN_SCALE;
        ctx.beginPath();
        
        for (let j = 0; j <= width; j += 5) {
            let px = x + j;
            let py = y + i * spacing;
            let noiseValue = 0;
            
            if (config.name === 'cyberpunk_flow') {
                const scale = 0.003;
                noiseValue = Math.abs(simplex.noise3D(px * scale, py * scale, time + seed));
            } else if (config.name === 'matrix_rain') {
                noiseValue = Math.abs(Math.sin(py * 0.1 + time) * simplex.noise3D(px * 0.01, py * 0.01, time + seed));
            } else if (config.name === 'quantum_wave') {
                noiseValue = Math.abs(Math.cos(px * 0.05 + time) * simplex.noise3D(px * 0.02, py * 0.02, time + seed));
            }
            
            if (j === 0) {
                ctx.moveTo(px, py + noiseValue * 10 * TRAIN_SCALE);
            } else {
                ctx.lineTo(px, py + noiseValue * 10 * TRAIN_SCALE);
            }
        }
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
}

function drawLocomotive(x, y, time) {
    const width = 250 * TRAIN_SCALE;
    const height = 120 * TRAIN_SCALE;
    const wheelRadius = 20 * TRAIN_SCALE;
    
    // Main body
    ctx.fillStyle = '#333';
    ctx.fillRect(x, y, width, height);
    
    // Front detail (now on the right since we're moving left)
    ctx.fillStyle = '#222';
    ctx.fillRect(x + width - (40 * TRAIN_SCALE), y - (30 * TRAIN_SCALE), 40 * TRAIN_SCALE, height);
    
    // Chimney (now on the right)
    ctx.fillStyle = '#222';
    ctx.fillRect(x + width - (80 * TRAIN_SCALE), y - (50 * TRAIN_SCALE), 20 * TRAIN_SCALE, 50 * TRAIN_SCALE);
    
    // Windows
    ctx.fillStyle = '#666';
    const windowWidth = 30 * TRAIN_SCALE;
    const windowSpacing = 50 * TRAIN_SCALE;
    for (let i = 0; i < 3; i++) {
        ctx.fillRect(x + (20 * TRAIN_SCALE) + (i * windowSpacing), y + (20 * TRAIN_SCALE), windowWidth, windowWidth);
    }
    
    // Wheels
    const wheelPositions = [
        40 * TRAIN_SCALE,    // First wheel
        120 * TRAIN_SCALE,   // Second wheel
        200 * TRAIN_SCALE    // Third wheel
    ];
    
    wheelPositions.forEach(position => {
        drawWheel(x + position, y + height, wheelRadius, time);
    });
    
    // Return connection point for chain
    return {
        x: x + width,
        y: y + (height / 2)
    };
}

function drawWheel(x, y, radius, time) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(time * 2); // Rotate based on time
    
    // Outer circle
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 3;
    ctx.stroke();
    
    // Inner details - spokes
    for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
        ctx.strokeStyle = '#444';
        ctx.lineWidth = 3;
        ctx.stroke();
    }
    
    // Center hub
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = '#666';
    ctx.fill();
    
    ctx.restore();
}

function drawConnectionNoise(x, y, width, time, seed) {
    const noiseConfig = {
        amplitude: 15 * TRAIN_SCALE,
        frequency: 0.01,
        speed: 2
    };

    ctx.strokeStyle = '#4FC3F7';
    ctx.lineWidth = 2 * TRAIN_SCALE;
    ctx.globalAlpha = 0.5;

    ctx.beginPath();
    for (let i = 0; i <= width; i += 5) {
        const noiseX = (x + i) * noiseConfig.frequency;
        const noiseValue = simplex.noise3D(noiseX, time * noiseConfig.speed, seed) * noiseConfig.amplitude;
        const px = x + i;
        const py = y + noiseValue;

        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
}

function drawChain(startX, startY, endX, endY, time, seed) {
    const gap = endX - startX;
    if (gap <= 0 || gap > 50 * TRAIN_SCALE) return;

    // Draw the chain
    const chainConfig = {
        linkLength: 10 * TRAIN_SCALE,
        amplitude: 5 * TRAIN_SCALE,
        frequency: 0.5,
        speed: 2
    };

    ctx.strokeStyle = '#4FC3F7';
    ctx.lineWidth = 2 * TRAIN_SCALE;
    ctx.globalAlpha = 0.8;

    ctx.beginPath();
    const points = Math.ceil(gap / chainConfig.linkLength);
    
    for (let i = 0; i <= points; i++) {
        const progress = i / points;
        const x = startX + (endX - startX) * progress;
        const waveOffset = Math.sin(progress * Math.PI * chainConfig.frequency + time * chainConfig.speed) 
                          * chainConfig.amplitude;
        const y = startY + waveOffset;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.stroke();
    ctx.globalAlpha = 1;

    // Draw noise effect between wagons
    drawConnectionNoise(startX, startY, gap, time, seed);
}

function drawWagonWithLyrics(x, y, wagonType, time, lyricIndex) {
    // Draw the base wagon first
    const connection = drawWagon(x, y, wagonType, time);
    
    // Draw text directly on wagon
    const wagonWidth = 180 * TRAIN_SCALE;
    const wagonHeight = 120 * TRAIN_SCALE;
    
    ctx.save();
    
    // Get text from lyrics array
    const lyricText = lyrics[lyricIndex];
    
    // Set up text properties to measure text width
    ctx.font = `bold ${14 * TRAIN_SCALE}px Arial`;
    const textMetrics = ctx.measureText(lyricText);
    const textWidth = textMetrics.width;
    
    // Center coordinates for text
    const textX = x + (wagonWidth / 2);
    const textY = y + (wagonHeight / 4);
    
    // Draw black background rectangle with higher opacity
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    const rectHeight = 25 * TRAIN_SCALE;
    ctx.fillRect(
        textX - (textWidth / 2) - (10 * TRAIN_SCALE),
        textY - (rectHeight / 2),
        textWidth + (20 * TRAIN_SCALE),
        rectHeight
    );
    
    // Set up text properties
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Create white neon glow effect
    const glowColor = 'rgba(255, 255, 255, 0.8)';
    
    // Outer glow
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(lyricText, textX, textY);
    
    // Middle glow
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(lyricText, textX, textY);
    
    // Inner bright core
    ctx.shadowBlur = 5;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(lyricText, textX, textY);
    
    // Final sharp text
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(lyricText, textX, textY);
    
    ctx.restore();
    
    return connection;
}

function drawWagon(x, y, type, time) {
    const configIndex = type % patternTypes.length;
    const config = patternTypes[configIndex];
    const width = 180 * TRAIN_SCALE;
    const height = 100 * TRAIN_SCALE;
    
    // Draw wagon base with thin line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1 * TRAIN_SCALE;
    ctx.strokeRect(x, y, width, height);
    
    // Draw pattern
    drawNoisePattern(x, y, width, height, time, config, type);
    
    // Draw wheels with parametric noise effects
    const wheelRadius = 25 * TRAIN_SCALE;
    const wheelPositions = [0.2, 0.8];
    wheelPositions.forEach((pos, index) => {
        const wheelX = x + pos * width;
        const wheelY = y + height + wheelRadius;  
        drawParametricWheel(wheelX, wheelY, wheelRadius, time, type, index);
    });

    ctx.globalAlpha = 1;
    
    // Return connection point for next wagon
    return {
        x: x + width + 20 * TRAIN_SCALE,
        y: y + height * 0.5
    };
}

function drawParametricWheel(x, y, radius, time, wagonType, wheelIndex) {
    const wheelAlgorithms = [
        {   // Locomotive Wheel Effect
            name: 'locomotive',
            segments: 48,  
            noiseScale: 0.03,
            amplitude: 0.12,  
            speedMultiplier: 1.8,
            opacity: 0.35,  
            rotationSpeed: 2.5,
            radiusOffset: (angle, t, seed) => {
                // Base wheel shape
                const baseShape = Math.sin(angle * 12) * 0.05;  
                
                // Add fine details
                const detail1 = Math.sin(angle * 24) * 0.02;  
                const detail2 = Math.cos(angle * 8) * 0.03;   
                
                // Add subtle noise variation
                const noise = simplex.noise3D(
                    Math.cos(angle) * 0.6,
                    Math.sin(angle) * 0.6,
                    t * 0.8 + seed
                ) * 0.04;
                
                return baseShape + detail1 + detail2 + noise;
            }
        },
        {   // Ripple Effect
            name: 'ripple',
            segments: 32,
            noiseScale: 0.03,
            amplitude: 0.2,
            speedMultiplier: 1,
            opacity: 0.4,
            rotationSpeed: 2.0,
            radiusOffset: (angle, t, seed) => {
                return Math.sin(angle * 4 + t) * 
                       simplex.noise2D(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5 + t * 0.2 + seed);
            }
        },
        {   // Gear Effect
            name: 'gear',
            segments: 16,
            noiseScale: 0.05,
            amplitude: 0.15,
            speedMultiplier: 0.7,
            opacity: 0.35,
            rotationSpeed: 1.5,
            radiusOffset: (angle, t, seed) => {
                return Math.abs(Math.cos(angle * 8)) * 
                       simplex.noise2D(Math.cos(angle) * 0.8 + t, Math.sin(angle) * 0.8 + seed);
            }
        },
        {   // Plasma Effect
            name: 'plasma',
            segments: 48,
            noiseScale: 0.02,
            amplitude: 0.25,
            speedMultiplier: 1.3,
            opacity: 0.45,
            rotationSpeed: 1.8,
            radiusOffset: (angle, t, seed) => {
                return simplex.noise3D(
                    Math.cos(angle) * 0.4,
                    Math.sin(angle) * 0.4,
                    t * 0.5 + seed
                );
            }
        },
        {   // Crystal Effect
            name: 'crystal',
            segments: 24,
            noiseScale: 0.04,
            amplitude: 0.18,
            speedMultiplier: 0.5,
            opacity: 0.3,
            rotationSpeed: 1.2,
            radiusOffset: (angle, t, seed) => {
                return Math.pow(Math.abs(Math.sin(angle * 6)), 0.5) * 
                       simplex.noise2D(angle * 0.5 + t, seed);
            }
        },
        {   // Quantum Effect
            name: 'quantum',
            segments: 40,
            noiseScale: 0.06,
            amplitude: 0.22,
            speedMultiplier: 1.5,
            opacity: 0.4,
            rotationSpeed: 2.2,
            radiusOffset: (angle, t, seed) => {
                return (Math.sin(angle * 3) * Math.cos(angle * 2)) * 
                       simplex.noise3D(Math.cos(angle), Math.sin(angle), t + seed);
            }
        }
    ];

    // For locomotive wheels, use index 0 (locomotive effect)
    const algorithmIndex = wagonType === -1 ? 0 : (wagonType % (wheelAlgorithms.length - 1)) + 1;
    const algorithm = wheelAlgorithms[algorithmIndex];
    const segments = algorithm.segments;
    const seed = wagonType * 100 + wheelIndex;
    
    // Calculate rotation based on time and speed
    const baseRotation = time * algorithm.rotationSpeed * Math.PI * 2;  
    const rotationOffset = simplex.noise2D(time * 0.5, seed) * 0.2;
    const totalRotation = baseRotation + rotationOffset;
    
    // Set wheel opacity and style
    ctx.globalAlpha = algorithm.opacity;
    ctx.strokeStyle = wagonType === -1 ? '#4FC3F7' : '#ffffff';  
    ctx.lineWidth = wagonType === -1 ? 1.0 * TRAIN_SCALE : 1.5 * TRAIN_SCALE;  
    
    // Draw the parametric wheel
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
        const baseAngle = (i / segments) * Math.PI * 2;
        const angle = baseAngle + totalRotation;
        const offset = algorithm.radiusOffset(angle, time * algorithm.speedMultiplier, seed);
        const r = radius * (1 + offset * algorithm.amplitude);
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;
        
        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }
    ctx.closePath();
    ctx.stroke();
    
    // Inner details with rotation
    const innerRadius = radius * (wagonType === -1 ? 0.6 : 0.5);  
    ctx.beginPath();
    for (let i = 0; i <= segments; i++) {
        const baseAngle = (i / segments) * Math.PI * 2;
        const angle = baseAngle + totalRotation * 0.7;
        const offset = algorithm.radiusOffset(angle + time, time * algorithm.speedMultiplier * 0.5, seed + 1);
        const r = innerRadius * (1 + offset * algorithm.amplitude * 0.5);
        const px = x + Math.cos(angle) * r;
        const py = y + Math.sin(angle) * r;
        
        if (i === 0) {
            ctx.moveTo(px, py);
        } else {
            ctx.lineTo(px, py);
        }
    }
    ctx.closePath();
    ctx.stroke();
    
    // Additional inner circles for locomotive wheels
    if (wagonType === -1) {
        const innerCircles = [0.5, 0.3];  
        innerCircles.forEach(ratio => {
            ctx.beginPath();
            for (let i = 0; i <= segments; i++) {
                const baseAngle = (i / segments) * Math.PI * 2;
                const angle = baseAngle + totalRotation * 0.5;
                const r = radius * ratio;
                const px = x + Math.cos(angle) * r;
                const py = y + Math.sin(angle) * r;
                
                if (i === 0) {
                    ctx.moveTo(px, py);
                } else {
                    ctx.lineTo(px, py);
                }
            }
            ctx.closePath();
            ctx.stroke();
        });
        
        // Add spokes
        const spokeCount = 12;  
        for (let i = 0; i < spokeCount; i++) {
            const angle = (i / spokeCount) * Math.PI * 2 + totalRotation;
            ctx.beginPath();
            ctx.moveTo(x + Math.cos(angle) * (radius * 0.3), y + Math.sin(angle) * (radius * 0.3));
            ctx.lineTo(x + Math.cos(angle) * (radius * 0.9), y + Math.sin(angle) * (radius * 0.9));
            ctx.stroke();
        }
    }
    
    ctx.globalAlpha = 1;
}

function drawBackgroundPattern(time) {
    // Draw dynamic background pattern
    const numLines = 20;
    const spacing = canvas.height / numLines;
    
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    
    for (let i = 0; i < numLines; i++) {
        const y = i * spacing;
        const offset = Math.sin(time + i * 0.1) * 50;
        
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(canvas.width, y - offset);
        ctx.stroke();
    }
}

function drawPinkSurfaces(time) {
    ctx.fillStyle = '#ff00ff';
    ctx.globalAlpha = 0.3;
    
    const numShapes = 5;
    for (let i = 0; i < numShapes; i++) {
        const x = (canvas.width / numShapes) * i + Math.sin(time + i) * 50;
        const y = canvas.height / 2 + Math.cos(time * 0.5 + i) * 100;
        
        ctx.beginPath();
        ctx.arc(x, y, 50 + Math.sin(time + i) * 20, 0, Math.PI * 2);
        ctx.fill();
    }
    
    ctx.globalAlpha = 1;
}

function drawYellowFeatures(time) {
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 3;
    
    const numFeatures = 3;
    for (let i = 0; i < numFeatures; i++) {
        const x = canvas.width * (i + 1) / (numFeatures + 1);
        const y = canvas.height / 2;
        const size = 30 + Math.sin(time * 2 + i) * 10;
        
        ctx.beginPath();
        ctx.moveTo(x - size, y - size);
        ctx.lineTo(x + size, y + size);
        ctx.moveTo(x + size, y - size);
        ctx.lineTo(x - size, y + size);
        ctx.stroke();
    }
}

let currentLyricIndex = 0;
let lyricStartTime = 0;
const LYRIC_DURATION = 3; // seconds per lyric
let lyricOpacity = 1;

function animate(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeInSeconds = currentTime / 1000;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background first
    drawBackgroundLines(timeInSeconds);
    
    const baseY = canvas.height / 2 - 100;
    
    // Update train position (moving left)
    trainPosition += (trainSpeed / 60);
    
    // Reset train position when the last wagon has moved off screen to the left
    if (trainPosition < -(totalTrainLength + 100)) {
        trainPosition = window.innerWidth;
    }
    
    // Draw locomotive
    const locomotiveConnection = drawLocomotive(trainPosition, baseY, timeInSeconds);
    
    // Draw chain of wagons
    for (let i = 0; i < lyrics.length; i++) {
        const wagonX = trainPosition + locomotiveWidth + (i * (wagonWidth + wagonGap));
        
        // Draw wagon if it's in or near the visible area
        if (wagonX > -wagonWidth && wagonX < canvas.width + wagonWidth) {
            // Draw chain connecting to previous
            if (i === 0) {
                // Connect to locomotive
                drawChain(
                    trainPosition + locomotiveWidth,
                    baseY + 50 * TRAIN_SCALE,
                    wagonX,
                    baseY + 50 * TRAIN_SCALE,
                    timeInSeconds,
                    i
                );
            } else {
                // Connect to previous wagon
                const prevWagonX = wagonX - (wagonWidth + wagonGap);
                drawChain(
                    prevWagonX + wagonWidth,
                    baseY + 50 * TRAIN_SCALE,
                    wagonX,
                    baseY + 50 * TRAIN_SCALE,
                    timeInSeconds,
                    i
                );
            }
            
            // Draw wagon with lyrics
            const wagonType = i % patternTypes.length;
            drawWagonWithLyrics(wagonX, baseY, wagonType, timeInSeconds, i);
        }
    }
    
    requestAnimationFrame(animate);
}

// Screen recording variables
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;

// Setup record button
const recordButton = document.getElementById('recordButton');
recordButton.addEventListener('click', toggleRecording);

async function toggleRecording() {
    if (!isRecording) {
        // Start recording
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always",
                    displaySurface: "window",
                    logicalSurface: true,
                    frameRate: { ideal: 60 }
                },
                audio: false,
                preferCurrentTab: true
            });
            
            recordedChunks = [];
            mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=vp8,opus',
                videoBitsPerSecond: 8000000 // 8 Mbps for better quality
            });
            
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunks.push(event.data);
                }
            };
            
            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, {
                    type: 'video/webm'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'train-animation.webm';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
                
                // Reset UI
                recordButton.textContent = 'Start Recording';
                recordButton.classList.remove('recording');
                isRecording = false;
            };
            
            mediaRecorder.start();
            recordButton.textContent = 'Stop Recording';
            recordButton.classList.add('recording');
            isRecording = true;
            
        } catch (err) {
            console.error("Error: " + err);
            alert('Please select the browser window or tab containing the animation when the screen share dialog appears.');
            isRecording = false;
            recordButton.textContent = 'Start Recording';
            recordButton.classList.remove('recording');
        }
    } else {
        // Stop recording
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
            isRecording = false;
        }
    }
}

requestAnimationFrame(animate);
