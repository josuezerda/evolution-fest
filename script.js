document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const openBtn = document.getElementById('open-btn');
    const introScreen = document.getElementById('intro-screen');
    const mainScreen = document.getElementById('main-screen');
    const videoContainer = document.getElementById('video-container');

    // YouTube Video ID
    const videoId = '4NRXx6U8ABQ'; 

    // Handle Open Invitation
    openBtn.addEventListener('click', () => {
        // 1. Hide Intro Screen
        introScreen.style.opacity = '0';
        introScreen.style.visibility = 'hidden';
        
        // 2. Show Main Screen
        mainScreen.classList.remove('hidden');
        
        // 3. Play Music (Inject Iframe)
        // Note: Autoplay works here because it's triggered by a user gesture (click)
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1`;
        iframe.allow = 'autoplay; encrypted-media';
        iframe.style.display = 'none';
        iframe.title = 'Background Music';
        videoContainer.appendChild(iframe);
        
        // Remove intro screen from DOM after transition
        setTimeout(() => {
            introScreen.style.display = 'none';
        }, 1500);
    });

    // Countdown Logic (06.11.2026 23:45)
    // Month is 0-indexed in JS, so 10 is November
    const targetDate = new Date(2026, 10, 6, 23, 45, 0).getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');
    }

    // Initial call
    updateCountdown();
    // Update every second
    setInterval(updateCountdown, 1000);

    // --- Falling Golden Particles ---
    const canvas = document.getElementById('particles');
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = 80;

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height - height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedY = Math.random() * 1.5 + 0.5;
            this.speedX = (Math.random() - 0.5) * 1;
            // Golden colors with varying opacity
            this.color = `rgba(${183 + Math.random()*50}, ${138 + Math.random()*40}, ${68}, ${Math.random() * 0.8 + 0.2})`;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;

            // Reset particle if it goes out of bounds
            if (this.y > height) {
                this.y = -10;
                this.x = Math.random() * width;
            }
            if (this.x > width || this.x < 0) {
                this.speedX *= -1;
            }
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
});
