// Balloons animation dengan error handling - HANYA SEKALI
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.querySelector('.confetti');
    if (!canvas) return;
    
    let balloons = [];
    let balloonAnimId;
    let running = true;
    let animationDuration = 15000; // 15 detik saja
    
    function resizeCanvas() {
        if (canvas) {
            // Set canvas size ke full viewport
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const ctx = canvas.getContext('2d');
    const colors = ["#81C784", "#ffd54f", "#e0f7fa", "#ffb300", "#fffbe7", "#dcedc8", "#E1BEE7", "#B2DFDB", "#FFCCBC"];
    
    function createBalloon() {
        return {
            x: Math.random() * canvas.width,
            y: canvas.height + 40,
            r: Math.random() * 25 + 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 1.5 + 0.8,
            sway: Math.random() * 3 + 1.5,
            angle: Math.random() * Math.PI * 2
        };
    }
    
    // Initialize balloons - jumlah lebih banyak untuk sekali tampil
    for(let i = 0; i < 25; i++) {
        balloons.push(createBalloon());
    }
    
    function drawBalloons() {
        if (!ctx) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        balloons.forEach(b => {
            ctx.save();
            ctx.globalAlpha = 0.85;
            ctx.beginPath();
            ctx.ellipse(b.x + Math.sin(b.angle) * b.sway, b.y, b.r * 0.8, b.r, 0, 0, 2 * Math.PI);
            ctx.fillStyle = b.color;
            ctx.fill();
            
            // Tambah highlight untuk efek 3D
            ctx.beginPath();
            ctx.ellipse(b.x + Math.sin(b.angle) * b.sway - b.r/4, b.y - b.r/4, b.r/6, b.r/4, 0, 0, 2 * Math.PI);
            ctx.fillStyle = "rgba(255,255,255,0.4)";
            ctx.fill();
            
            // Tali balon
            ctx.beginPath();
            ctx.moveTo(b.x + Math.sin(b.angle) * b.sway, b.y + b.r);
            ctx.lineTo(b.x + Math.sin(b.angle) * b.sway, b.y + b.r + 35);
            ctx.strokeStyle = "#888";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            ctx.restore();
        });
    }
    
    function updateBalloons() {
        let activeBalloons = 0;
        
        balloons.forEach(b => {
            if (b.y > -60) {
                activeBalloons++;
                b.y -= b.speed;
                b.angle += 0.02 + Math.random() * 0.02;
            }
        });
        
        // Stop animation jika semua balon sudah keluar layar
        if (activeBalloons === 0) {
            stopAnimation();
        }
    }
    
    function animate() {
        if (!running || !ctx) return;
        drawBalloons();
        updateBalloons();
        balloonAnimId = requestAnimationFrame(animate);
    }
    
    function stopAnimation() {
        running = false;
        if (balloonAnimId) {
            cancelAnimationFrame(balloonAnimId);
        }
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        console.log('Balloon animation stopped (one-time only)');
    }
    
    // Start animation hanya sekali
    animate();
    
    // Stop otomatis setelah durasi tertentu
    setTimeout(() => {
        stopAnimation();
    }, animationDuration);
    
    // Cleanup function
    window.stopBalloons = function() {
        stopAnimation();
    };
    
    // Cleanup saat page unload
    window.addEventListener('beforeunload', function() {
        window.stopBalloons();
    });
});