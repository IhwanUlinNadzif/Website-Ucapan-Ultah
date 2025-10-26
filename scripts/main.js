// Main JavaScript dengan error handling dan performance optimization
document.addEventListener('DOMContentLoaded', function() {
    console.log('Birthday website loaded successfully!');
    
    // Global utility functions
    window.utils = {
        showLoading: function() {
            const loading = document.getElementById('loading');
            if (loading) loading.style.display = 'block';
        },
        
        hideLoading: function() {
            const loading = document.getElementById('loading');
            if (loading) loading.style.display = 'none';
        },
        
        showError: function(message, elementId = 'notification') {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = message;
                element.className = 'error-message';
                element.style.display = 'block';
                
                setTimeout(() => {
                    element.style.display = 'none';
                }, 5000);
            }
        },
        
        showSuccess: function(message, elementId = 'notification') {
            const element = document.getElementById(elementId);
            if (element) {
                element.textContent = message;
                element.className = 'success-message';
                element.style.display = 'block';
                
                setTimeout(() => {
                    element.style.display = 'none';
                }, 5000);
            }
        },

        // New utility functions for enhanced effects
        createParticles: function(count = 20) {
            const particles = ['🎉', '✨', '🌟', '💫', '🎊'];
            
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const particle = document.createElement('div');
                    particle.style.cssText = `
                        position: fixed;
                        font-size: ${Math.random() * 20 + 15}px;
                        animation: particle-float ${Math.random() * 2 + 2}s ease-in forwards;
                        left: ${Math.random() * 100}vw;
                        pointer-events: none;
                        z-index: 1001;
                    `;
                    particle.textContent = particles[Math.floor(Math.random() * particles.length)];
                    document.body.appendChild(particle);
                    
                    setTimeout(() => particle.remove(), 3000);
                }, i * 50);
            }
        },

        // Celebration effect
        celebrate: function() {
            this.createParticles(30);
            
            const mainContainer = document.querySelector('.greeting-container, .login-container, .greeting-card');
            if (mainContainer) {
                mainContainer.style.animation = 'heartbeat 0.5s ease-in-out 3';
                setTimeout(() => {
                    mainContainer.style.animation = '';
                }, 1500);
            }
        }
    };
    
    // Handle URL notifications
    const params = new URLSearchParams(window.location.search);
    const notif = params.get('notif');
    const type = params.get('type');
    
    if (notif) {
        const message = decodeURIComponent(notif);
        if (type === 'error') {
            window.utils.showError(message);
        } else {
            window.utils.showSuccess(message);
            
            setTimeout(() => {
                window.utils.celebrate();
            }, 500);
        }
        
        const cleanUrl = window.location.pathname;
        window.history.replaceState({}, document.title, cleanUrl);
    }
    
    // Add CSS untuk success message jika belum ada
    if (!document.querySelector('#success-message-style')) {
        const style = document.createElement('style');
        style.id = 'success-message-style';
        style.textContent = `
            .success-message {
                background: #e8f5e9;
                color: #2e7d32;
                padding: 12px;
                border-radius: 6px;
                margin: 10px 0;
                border-left: 4px solid #4caf50;
                animation: fadeIn 0.5s;
            }

            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-10px); }
                75% { transform: translateX(10px); }
            }

            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }

            @keyframes floatMessage {
                0% {
                    right: -200px;
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    right: 100vw;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Enhanced click effects untuk buttons
    document.addEventListener('click', function(e) {
        if (e.target.matches('.login-btn, .gallery-btn, .surprise-btn, .magic-btn')) {
            const ripple = document.createElement('span');
            const rect = e.target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            e.target.style.position = 'relative';
            e.target.style.overflow = 'hidden';
            e.target.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);

            setTimeout(() => {
                window.utils.createParticles(5);
            }, 200);
        }
    });

    // Enhanced hover effects
    document.addEventListener('mouseover', function(e) {
        if (e.target.matches('.magic-btn, .login-btn, .gallery-btn')) {
            e.target.style.transform = 'translateY(-2px)';
        }
    });

    document.addEventListener('mouseout', function(e) {
        if (e.target.matches('.magic-btn, .login-btn, .gallery-btn')) {
            e.target.style.transform = 'translateY(0)';
        }
    });

    // Auto-celebration saat page load untuk halaman tertentu
    if (window.location.pathname.includes('GreetingPage') || 
        window.location.pathname.includes('index.html')) {
        setTimeout(() => {
            window.utils.createParticles(10);
        }, 1000);
    }

    console.log('Enhanced main.js loaded successfully!');
});

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize dengan debounce
window.addEventListener('resize', debounce(function() {
    window.dispatchEvent(new CustomEvent('optimizedResize'));
}, 250));

// Export utility functions untuk global access
window.createCelebration = window.utils?.createParticles || function() {};
window.celebrate = window.utils?.celebrate || function() {};