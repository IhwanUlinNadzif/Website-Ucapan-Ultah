// Enhanced effects untuk website ulang tahun
document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced effects loaded!');
    
    let floatingHeartsStarted = false;
    let sparkleEffectStarted = false;
    
    // Floating hearts effect - HANYA SEKALI
    function createFloatingHearts() {
        if (floatingHeartsStarted) return;
        floatingHeartsStarted = true;
        
        const hearts = ['💖', '🎀', '🎉', '✨', '🌟', '💫', '🎊', '🥳', '🎂', '🎁'];
        const colors = ['#ff6b6b', '#81c784', '#ffd54f', '#4fc3f7', '#ba68c8', '#4db6ac', '#ff8a65', '#9575cd', '#4dd0e1'];
        
        let heartCount = 0;
        const maxHearts = 15; // Jumlah maksimal heart
        
        const heartInterval = setInterval(() => {
            if (heartCount >= maxHearts) {
                clearInterval(heartInterval);
                return;
            }
            
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.color = colors[Math.floor(Math.random() * colors.length)];
            heart.style.fontSize = (Math.random() * 25 + 25) + 'px';
            heart.style.animationDuration = (Math.random() * 4 + 4) + 's';
            heart.style.zIndex = '999';
            
            document.body.appendChild(heart);
            heartCount++;
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.parentNode.removeChild(heart);
                }
            }, 8000);
            
        }, 300); // Interval cepat untuk efek sekaligus
    }

    // Sparkle effect pada elemen tertentu - HANYA SEKALI
    function addSparkleEffect() {
        if (sparkleEffectStarted) return;
        sparkleEffectStarted = true;
        
        const elements = document.querySelectorAll('.greeting-container, .login-container, .card-ucapan');
        
        elements.forEach(element => {
            // Buat sparkle dalam jumlah terbatas
            const sparkleCount = 8;
            
            for (let i = 0; i < sparkleCount; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.className = 'sparkle';
                    
                    const rect = element.getBoundingClientRect();
                    sparkle.style.left = (Math.random() * rect.width) + 'px';
                    sparkle.style.top = (Math.random() * rect.height) + 'px';
                    sparkle.style.animationDelay = (Math.random() * 1) + 's';
                    
                    element.style.position = 'relative';
                    element.appendChild(sparkle);
                    
                    setTimeout(() => {
                        if (sparkle.parentNode) {
                            sparkle.parentNode.removeChild(sparkle);
                        }
                    }, 1500);
                }, i * 200); // Staggered appearance
            }
        });
    }

    // Check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Typewriter effect untuk teks spesial - DISABLED
    function typewriterEffect() {
        console.log('Typewriter effect disabled - text displayed normally');
    }

    // Celebration particles effect - HANYA SEKALI saat dipanggil
    function createParticles(count = 30) {
        const particles = ['🎉', '✨', '🌟', '💫', '🎊', '💖', '🎀', '🥳', '🎂', '🎁'];
        const colors = ['#ff6b6b', '#81c784', '#ffd54f', '#4fc3f7', '#ba68c8', '#4db6ac', '#ff8a65'];
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.textContent = particles[Math.floor(Math.random() * particles.length)];
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.fontSize = (Math.random() * 25 + 20) + 'px';
                particle.style.color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
                particle.style.zIndex = '999';
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 6000);
            }, i * 80);
        }
    }

    // Interactive photo gallery dengan zoom
    function enhancePhotoGallery() {
        const photos = document.querySelectorAll('.birthday-photo, .gallery-photo');
        
        photos.forEach(photo => {
            // Add click to zoom effect
            photo.style.cursor = 'zoom-in';
            photo.style.transition = 'transform 0.3s ease';
            
            photo.addEventListener('click', function() {
                if (this.classList.contains('zoomed')) {
                    this.classList.remove('zoomed');
                    this.style.cursor = 'zoom-in';
                } else {
                    this.classList.add('zoomed');
                    this.style.cursor = 'zoom-out';
                }
            });
        });
    }

    // Parallax effect untuk background
    function addParallaxEffect() {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.parallax');
            
            parallaxElements.forEach(el => {
                const speed = el.dataset.speed || 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Gallery carousel
    function createGalleryCarousel() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems.length === 0) return;
        
        let currentIndex = 0;
        
        function showSlide(index) {
            galleryItems.forEach((item, i) => {
                item.style.display = i === index ? 'block' : 'none';
            });
            
            // Update indicator dots
            const dots = document.querySelectorAll('.gallery-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        // Auto-advance carousel
        setInterval(() => {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            showSlide(currentIndex);
        }, 5000);
        
        // Manual navigation dengan dots
        document.querySelectorAll('.gallery-dot').forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                showSlide(currentIndex);
            });
        });
        
        // Show first slide
        showSlide(0);
    }

    // Photo filters effect
    function addPhotoFilters() {
        const photos = document.querySelectorAll('.gallery-photo');
        
        photos.forEach(photo => {
            photo.addEventListener('mouseenter', function() {
                this.style.filter = 'sepia(0.5) brightness(1.1)';
                this.style.transform = 'scale(1.05)';
            });
            
            photo.addEventListener('mouseleave', function() {
                this.style.filter = 'none';
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Initialize semua effects - HANYA SEKALI
    createFloatingHearts();
    addSparkleEffect();
    typewriterEffect();
    enhancePhotoGallery();
    addParallaxEffect();
    
    // Initialize gallery carousel jika ada
    if (document.querySelector('.gallery-item')) {
        createGalleryCarousel();
        addPhotoFilters();
    }

    // Celebration effect untuk event spesial - HANYA SEKALI saat dipanggil
    let celebrationTriggered = false;
    window.celebrate = function() {
        if (celebrationTriggered) return;
        celebrationTriggered = true;
        
        createParticles(50);
        
        // Heartbeat effect pada container utama
        const mainContainer = document.querySelector('.greeting-container, .login-container');
        if (mainContainer) {
            mainContainer.style.animation = 'heartbeat 0.5s ease-in-out 3';
            setTimeout(() => {
                mainContainer.style.animation = '';
            }, 1500);
        }
        
        // Play celebration sound jika ada
        try {
            const audio = new Audio('../assets/celebration-sound.mp3');
            audio.volume = 0.3;
            audio.play().catch(e => console.log('Sound play prevented'));
        } catch (e) {
            console.log('Celebration sound not available');
        }
    };

    // Trigger celebration saat interaksi penting - HANYA SEKALI
    let buttonCelebrationTriggered = false;
    document.addEventListener('click', function(e) {
        if (buttonCelebrationTriggered) return;
        
        if (e.target.classList.contains('login-btn') || 
            e.target.classList.contains('gallery-btn') ||
            e.target.classList.contains('surprise-btn')) {
            buttonCelebrationTriggered = true;
            
            setTimeout(() => {
                createParticles(15);
            }, 500);
        }
    });

    // Celebration saat page load (untuk GreetingPage) - HANYA SEKALI
    if (window.location.pathname.includes('GreetingPage')) {
        setTimeout(() => {
            if (window.celebrate && !celebrationTriggered) {
                window.celebrate();
            }
        }, 1000);
    }
});

// Utility function untuk efek tambahan - HANYA SEKALI saat dipanggil
let globalCelebrationTriggered = false;
window.createCelebration = function(intensity = 20) {
    if (globalCelebrationTriggered) return;
    globalCelebrationTriggered = true;
    
    const particles = ['🎉', '✨', '🌟', '💫', '🎊', '💖', '🎀', '🥳'];
    
    for (let i = 0; i < intensity; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                font-size: ${Math.random() * 30 + 20}px;
                animation: particle-float ${Math.random() * 3 + 3}s ease-in forwards;
                left: ${Math.random() * 100}vw;
                pointer-events: none;
                z-index: 1001;
            `;
            particle.textContent = particles[Math.floor(Math.random() * particles.length)];
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 6000);
        }, i * 60);
    }
};