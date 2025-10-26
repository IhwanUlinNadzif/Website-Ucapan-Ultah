// Ucapan random tanpa emot dan tanpa animasi
const ucapanList = [
    "Selamat ulang tahun! Semoga semua harapanmu tercapai.",
    "Hari spesial, semangat baru, semoga sukses selalu.",
    "Semoga setiap langkahmu semakin dekat dengan impian.",
    "Ulang tahun adalah awal petualangan baru, nikmati setiap momennya.",
    "Semoga hari-harimu selalu cerah dan penuh inspirasi."
];

document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan ucapan random
    const ucapanElement = document.getElementById('ucapanRandom');
    if (ucapanElement) {
        ucapanElement.textContent = ucapanList[Math.floor(Math.random() * ucapanList.length)];
    }
    
    // Handle notification dari URL parameters
    const params = new URLSearchParams(window.location.search);
    const notif = params.get('notif');
    const notificationElement = document.getElementById('notification');
    
    if (notif && notificationElement) {
        notificationElement.textContent = decodeURIComponent(notif);
        notificationElement.style.color = '#4CAF50';
        notificationElement.style.padding = '10px';
        notificationElement.style.backgroundColor = '#e8f5e9';
        notificationElement.style.borderRadius = '5px';
        notificationElement.style.marginTop = '10px';
        
        setTimeout(() => {
            notificationElement.style.display = 'none';
        }, 5000);
    }
    
    // Smooth scroll untuk skip link
    document.querySelector('.skip-link')?.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            target.focus();
        }
    });

    // Enhanced login button dengan loading state
    const loginLink = document.getElementById('loginLink');
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            const btnText = this.querySelector('.btn-text');
            if (btnText) {
                btnText.textContent = 'Loading...';
                
                setTimeout(() => {
                    btnText.textContent = 'Login';
                }, 2000);
            }
        });
    }
});