// Enhanced functionality untuk video dan gallery
document.addEventListener('DOMContentLoaded', function() {
    const videoElement = document.getElementById('birthdayVideo');
    const galleryBtn = document.getElementById('galleryBtn');
    
    // Auto play video dengan handling error
    if (videoElement) {
        videoElement.play().catch(function(error) {
            console.log('Video autoplay prevented:', error);
        });
    }
    
    // Handle gallery toggle
    if (galleryBtn) {
        galleryBtn.addEventListener('click', function() {
            const videoContainer = document.getElementById('videoContainer');
            const photoGallery = document.getElementById('photoGallery');
            
            if (photoGallery.style.display === 'none') {
                // Buka gallery
                videoContainer.style.display = 'none';
                photoGallery.style.display = 'block';
                this.textContent = '🎬 Kembali ke Video';
                
                // Hentikan video
                if (videoElement && !videoElement.paused) {
                    videoElement.pause();
                }
                
                // Animasi untuk gallery items
                const galleryItems = document.querySelectorAll('.gallery-item');
                galleryItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = 'slideInUp 0.6s ease-out both';
                    }, index * 200);
                });

                // Trigger celebration effect
                if (window.createCelebration) {
                    window.createCelebration(10);
                }
            } else {
                // Tutup gallery
                videoContainer.style.display = 'block';
                photoGallery.style.display = 'none';
                this.textContent = '📷 Lihat Gallery Foto';
                
                // Putar ulang video
                if (videoElement) {
                    videoElement.currentTime = 0;
                    videoElement.play().catch(e => {
                        console.log('Video play failed:', e);
                    });
                }
            }
        });
    }
    
    // Enhanced confetti effect
    createConfetti();
    
    function createConfetti() {
        const canvas = document.querySelector('.confetti');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const confettiPieces = [];
        const colors = ['#81C784', '#ffd54f', '#e0f7fa', '#ffb300', '#fffbe7', '#E1BEE7'];
        
        // Create confetti pieces
        for (let i = 0; i < 80; i++) {
            confettiPieces.push({
                x: Math.random() * canvas.width,
                y: -10,
                size: Math.random() * 15 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speed: Math.random() * 4 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 12 - 6,
                sway: Math.random() * 3 - 1.5,
                shape: Math.random() > 0.5 ? 'circle' : 'square'
            });
        }
        
        function animateConfetti() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let activePieces = 0;
            
            confettiPieces.forEach(piece => {
                piece.y += piece.speed;
                piece.x += piece.sway;
                piece.rotation += piece.rotationSpeed;
                
                if (piece.y < canvas.height) {
                    activePieces++;
                    ctx.save();
                    ctx.translate(piece.x, piece.y);
                    ctx.rotate(piece.rotation * Math.PI / 180);
                    ctx.fillStyle = piece.color;
                    ctx.globalAlpha = 0.8;
                    
                    if (piece.shape === 'circle') {
                        ctx.beginPath();
                        ctx.arc(0, 0, piece.size/2, 0, 2 * Math.PI);
                        ctx.fill();
                    } else {
                        // Star shape
                        ctx.beginPath();
                        for (let i = 0; i < 5; i++) {
                            const angle = (i * 2 * Math.PI) / 5;
                            const x = Math.cos(angle) * piece.size/2;
                            const y = Math.sin(angle) * piece.size/2;
                            if (i === 0) {
                                ctx.moveTo(x, y);
                            } else {
                                ctx.lineTo(x, y);
                            }
                        }
                        ctx.closePath();
                        ctx.fill();
                    }
                    
                    ctx.restore();
                }
            });
            
            if (activePieces > 0) {
                requestAnimationFrame(animateConfetti);
            } else {
                // Restart animation when all pieces are gone
                setTimeout(() => {
                    confettiPieces.forEach(piece => {
                        piece.y = -10;
                        piece.x = Math.random() * canvas.width;
                    });
                    animateConfetti();
                }, 1000);
            }
        }
        
        animateConfetti();
    }

    // Enhanced photo click effect
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('gallery-photo') || 
            e.target.classList.contains('birthday-photo')) {
            
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,213,79,0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = e.target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size/2;
            const y = e.clientY - rect.top - size/2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            e.target.style.position = 'relative';
            e.target.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        }
    });

    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Auto celebration setelah video selesai
    if (videoElement) {
        videoElement.addEventListener('ended', function() {
            if (window.celebrate) {
                setTimeout(() => {
                    window.celebrate();
                }, 1000);
            }
        });
    }

    // Initialize timeline animations
    function animateTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'slideInUp 0.6s ease-out both';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    animateTimeline();

    console.log('Enhanced greeting effects loaded!');
});