// Success Carousel - COMPLETE FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Success Carousel Loading...');
    setTimeout(initSuccessCarousel, 1000);
});

function initSuccessCarousel() {
    console.log('🎯 Initializing Carousel...');
    
    const stories = document.querySelectorAll('.success-story');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    console.log('📊 Elements Found:', {
        stories: stories.length,
        dots: dots.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn
    });

    if (stories.length === 0) {
        console.error('❌ No stories found!');
        return;
    }

    let currentIndex = 0;
    let autoRotateInterval;

    // SIMPLE STORY SHOW FUNCTION
    function showStory(index) {
        console.log(`🔄 Showing Story ${index}`);
        
        // Validate index
        if (index < 0 || index >= stories.length) {
            console.error('❌ Invalid index:', index);
            index = 0;
        }

        // Hide all stories
        stories.forEach(story => {
            story.classList.remove('active', 'prev', 'next');
        });

        // Remove active from dots
        dots.forEach(dot => dot.classList.remove('active'));

        // Show current story
        stories[index].classList.add('active');
        
        // Activate current dot
        if (dots[index]) {
            dots[index].classList.add('active');
        }

        currentIndex = index;
        
        // Initialize animations after a delay
        setTimeout(() => {
            initStoryAnimations(stories[index]);
        }, 300);
    }

    function showNextStory() {
        const nextIndex = (currentIndex + 1) % stories.length;
        console.log('➡️ Next:', nextIndex);
        showStory(nextIndex);
    }

    function showPrevStory() {
        const prevIndex = (currentIndex - 1 + stories.length) % stories.length;
        console.log('⬅️ Prev:', prevIndex);
        showStory(prevIndex);
    }

    function startAutoRotation() {
        console.log('🔄 Auto Rotation Started');
        clearInterval(autoRotateInterval);
        autoRotateInterval = setInterval(showNextStory, 20000); //20 Second badh auto rotation
    }

    function pauseAutoRotation() {
        console.log('⏸️ Auto Rotation Paused');
        clearInterval(autoRotateInterval);
    }

    // EVENT LISTENERS
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('👆 Prev Button Clicked');
            showPrevStory();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('👆 Next Button Clicked');
            showNextStory();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🔘 Dot Clicked:', index);
            showStory(index);
        });
    });

    // Auto rotation controls
    const carousel = document.querySelector('.success-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', pauseAutoRotation);
        carousel.addEventListener('mouseleave', startAutoRotation);
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') showPrevStory();
        if (e.key === 'ArrowRight') showNextStory();
    });

    // INITIALIZE
    showStory(0);
    startAutoRotation();

    console.log('✅ Carousel Ready! Stories:', stories.length);
}

function initStoryAnimations(story) {
    if (!story) return;
    
    const member = story.dataset.member || 'unknown';
    console.log('🎬 Animating:', member);

    // Counter animations
    const counters = story.querySelectorAll('.live-count');
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target')) || 0;
        animateCounter(counter, target);
    });

    const growthCounter = story.querySelector('.growth-counter');
    if (growthCounter) {
        const target = parseFloat(growthCounter.getAttribute('data-target')) || 0;
        animateCounter(growthCounter, target, '%');
    }

    // Canvas animation
    const canvas = story.querySelector('canvas');
    if (canvas) {
        initParticleCanvas(canvas);
    }
}

function animateCounter(element, target, suffix = '') {
    let current = 0;
    const duration = 2000;
    const step = target / (duration / 16);
    const isCurrency = element.textContent.includes('₹');

    function update() {
        current += step;
        if (current < target) {
            if (isCurrency) {
                element.textContent = `₹${Math.floor(current).toLocaleString()}${suffix}`;
            } else {
                element.textContent = `${current.toFixed(2)}${suffix}`;
            }
            requestAnimationFrame(update);
        } else {
            if (isCurrency) {
                element.textContent = `₹${target.toLocaleString()}${suffix}`;
            } else {
                element.textContent = `${target.toFixed(2)}${suffix}`;
            }
        }
    }

    update();
}

function initParticleCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function setCanvasSize() {
        canvas.width = canvas.offsetWidth || 800;
        canvas.height = canvas.offsetHeight || 400;
    }

    setCanvasSize();

    const particles = [];
    const particleCount = 25;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: (Math.random() - 0.5) * 0.2,
            color: Math.random() > 0.5 ? 'rgba(0, 229, 255, 0.6)' : 'rgba(108, 66, 245, 0.6)'
        });
    }

    function animate() {
        ctx.fillStyle = 'rgba(10, 11, 29, 0.03)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Bounce off edges
            if (particle.x <= 0 || particle.x >= canvas.width) particle.speedX *= -1;
            if (particle.y <= 0 || particle.y >= canvas.height) particle.speedY *= -1;

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', setCanvasSize);
}

// Ensure CSS variables
if (!document.querySelector('#carousel-css-vars')) {
    const style = document.createElement('style');
    style.id = 'carousel-css-vars';
    style.textContent = `
        :root {
            --primary: #6c42f5;
            --primary-dark: #5a35d4;
            --secondary: #00e5ff;
            --accent: #ff2d75;
            --background: #0a0b1d;
            --card-bg: rgba(16, 18, 37, 0.8);
            --text: #ffffff;
            --text-secondary: #a0a8c3;
            --positive: #00ff9d;
            --negative: #ff2d75;
            --border: rgba(108, 66, 245, 0.3);
        }
    `;
    document.head.appendChild(style);
}

console.log('🎉 Success Carousel Script Loaded');
