// ===== EDUCATIONAL WEB PROJECT - THE IMPLANT =====
// Made by: Enzo Benítez for ESI Class
// Technologies: HTML5, CSS3, Vanilla JavaScript, Counter Animations

// ===== GLOBAL VARIABLES =====
let isVideoLoaded = false;
let currentTheme = localStorage.getItem('theme') || 'light';
let countersAnimated = false;

// ===== DOM CONTENT LOADED =====
document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
});

// ===== MAIN INITIALIZATION =====
function initializeApp() {
    console.log('🎓 Educational Website Initialized - The Implant Guide');
    console.log('📚 Made by Enzo Benítez for ESI Class');

    initThemeToggle();
    initScrollAnimations();
    initInteractiveElements();
    initVideoPlayer();
    initSmoothScrolling();
    initProgressBar();
    initTooltips();
    initCounterAnimations();
    initExpandableCards();
    initAccessibilityFeatures();

    // Add loading complete class
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    setTheme(currentTheme);

    themeToggle.addEventListener('click', function () {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(currentTheme);

        // Add click animation
        this.style.transform = 'scale(0.9) rotate(180deg)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');

    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
        themeToggle.setAttribute('data-tooltip', 'Switch to light theme');
    } else {
        icon.className = 'fas fa-palette';
        themeToggle.setAttribute('data-tooltip', 'Switch to dark theme');
    }
}

// ===== EXPANDABLE CARDS =====
function initExpandableCards() {
    const expandableCards = document.querySelectorAll('.expandable-card');

    expandableCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        const expandedContent = card.querySelector('.card-expanded-content');

        if (expandBtn && expandedContent) {
            expandBtn.addEventListener('click', function (e) {
                e.stopPropagation();

                const isExpanded = expandedContent.classList.contains('expanded');

                if (isExpanded) {
                    expandedContent.classList.remove('expanded');
                    expandBtn.classList.remove('expanded');
                    expandBtn.setAttribute('aria-label', 'Expand for more information');
                } else {
                    expandedContent.classList.add('expanded');
                    expandBtn.classList.add('expanded');
                    expandBtn.setAttribute('aria-label', 'Collapse information');
                }
            });
        }
    });
}

// ===== COUNTER ANIMATIONS =====
function initCounterAnimations() {
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        });
    }, observerOptions);

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }

    const pricingSection = document.querySelector('.pricing');
    if (pricingSection) {
        counterObserver.observe(pricingSection);
    }
}

function animateCounters() {
    const effectivenessNumber = document.querySelector('.stat-number[data-target="99"]');
    if (effectivenessNumber) {
        animateNumber(effectivenessNumber, 0, 99, 2000);
    }

    const yearsNumber = document.querySelector('.stat-number[data-target="3"]');
    if (yearsNumber) {
        animateNumber(yearsNumber, 0, 3, 1500);
    }

    const mainPrice = document.querySelector('.price[data-target]');
    if (mainPrice) {
        const target = parseInt(mainPrice.getAttribute('data-target'));
        animatePrice(mainPrice, target, '$', ' ARS');
    }

    const priceRanges = document.querySelectorAll('.brand-price[data-range]');
    priceRanges.forEach(priceEl => {
        const range = priceEl.getAttribute('data-range');
        const [min, max] = range.split('-').map(n => parseInt(n));
        animatePriceRange(priceEl, min, max);
    });
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();

    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(start + (end - start) * easeOutQuart);

        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = end;
        }
    }

    requestAnimationFrame(updateNumber);
}

function animatePrice(element, target, prefix = '', suffix = '') {
    const startTime = performance.now();
    const duration = 2500;

    function updatePrice(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * easeOutQuart);

        element.textContent = prefix + current.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(updatePrice);
        } else {
            element.textContent = prefix + target.toLocaleString() + suffix;
        }
    }

    requestAnimationFrame(updatePrice);
}

function animatePriceRange(element, min, max) {
    const startTime = performance.now();
    const duration = 2000;

    function updateRange(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentMin = Math.floor(min * easeOutQuart);
        const currentMax = Math.floor(max * easeOutQuart);

        element.textContent = '$' + currentMin.toLocaleString() + ' - $' + currentMax.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(updateRange);
        } else {
            element.textContent = '$' + min.toLocaleString() + ' - $' + max.toLocaleString();
        }
    }

    requestAnimationFrame(updateRange);
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');

                const children = entry.target.querySelectorAll('.feature, .step, .type-card, .price-card');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.section, .interactive-element');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// ===== INTERACTIVE ELEMENTS =====
function initInteractiveElements() {
    const heroIcon = document.querySelector('.hero-icon');
    if (heroIcon) {
        heroIcon.addEventListener('click', function () {
            createPulseEffect(this);
        });
    }

    const logo = document.querySelector('.logo');
    let clickCount = 0;

    logo.addEventListener('click', function (e) {
        e.preventDefault();
        clickCount++;

        if (clickCount === 3) {
            showEducationalFact();
            clickCount = 0;
        }

        setTimeout(() => {
            if (clickCount < 3) clickCount = 0;
        }, 3000);
    });

    const ctaButton = document.getElementById('learnMoreBtn');
    if (ctaButton) {
        ctaButton.addEventListener('click', function () {
            const whatIsSection = document.getElementById('what-is');
            if (whatIsSection) {
                whatIsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    const steps = document.querySelectorAll('.step[data-step]');
    steps.forEach(step => {
        step.addEventListener('click', function () {
            const stepNumber = this.getAttribute('data-step');
            showStepDetails(stepNumber);
        });
    });

    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('click', function () {
            this.classList.toggle('expanded');
            createSparkleEffect(this);
        });
    });

    const typeCards = document.querySelectorAll('.type-card');
    typeCards.forEach(card => {
        card.addEventListener('click', function () {
            highlightCard(this);
        });
    });

    const priceCards = document.querySelectorAll('.price-card');
    priceCards.forEach(card => {
        card.addEventListener('click', function () {
            showPriceDetails(this);
        });
    });
}

// ===== VIDEO PLAYER =====
function initVideoPlayer() {
    const videoWrapper = document.querySelector('.video-wrapper');
    const videoOverlay = document.getElementById('videoOverlay');

    if (!videoWrapper || !videoOverlay) return;

    videoOverlay.addEventListener('click', function () {
        loadVideo();
    });
}

function loadVideo() {
    const videoOverlay = document.getElementById('videoOverlay');
    const iframe = document.getElementById('youtube-video');

    if (isVideoLoaded) return;

    videoOverlay.innerHTML = '<div class="video-loading"><div class="loading-spinner"></div><p>Loading...</p></div>';

    const videoId = 'ioVohgaQSm8';
    iframe.src = iframe.getAttribute('data-src').replace('ioVohgaQSm8', videoId);

    setTimeout(() => {
        videoOverlay.style.opacity = '0';
        setTimeout(() => {
            videoOverlay.style.display = 'none';
        }, 300);
    }, 1000);

    isVideoLoaded = true;
}

// ===== UTILITY FUNCTIONS =====
function initSmoothScrolling() {
    document.addEventListener('click', function (e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
}

function initProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = 'position:fixed;top:0;left:0;width:0%;height:3px;background:linear-gradient(90deg,#2563eb,#f59e0b);z-index:9999;transition:width 0.1s ease;border-radius:0 3px 3px 0;';
    document.body.appendChild(progressBar);

    const updateProgress = debounce(() => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = Math.min(scrolled, 100) + '%';
    }, 10);

    window.addEventListener('scroll', updateProgress);
}

function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function () {
            showTooltip(this);
        });

        element.addEventListener('mouseleave', function () {
            hideTooltip(this);
        });

        element.addEventListener('touchstart', function () {
            showTooltip(this);
            setTimeout(() => hideTooltip(this), 2000);
        });
    });
}

function showTooltip(element) {
    const tooltip = element.getAttribute('data-tooltip');
    if (!tooltip) return;

    const tooltipEl = document.createElement('div');
    tooltipEl.className = 'custom-tooltip';
    tooltipEl.textContent = tooltip;
    tooltipEl.style.cssText = 'position:absolute;bottom:100%;left:50%;transform:translateX(-50%) translateY(-8px);background:rgba(17,24,39,0.95);color:white;padding:8px 12px;border-radius:8px;font-size:12px;font-weight:500;white-space:nowrap;z-index:1060;pointer-events:none;backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);animation:tooltipFadeIn 0.2s ease;max-width:200px;white-space:normal;text-align:center;';

    element.style.position = 'relative';
    element.appendChild(tooltipEl);
}

function hideTooltip(element) {
    const tooltip = element.querySelector('.custom-tooltip');
    if (tooltip) {
        tooltip.style.animation = 'tooltipFadeOut 0.2s ease forwards';
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.parentNode.removeChild(tooltip);
            }
        }, 200);
    }
}

function initAccessibilityFeatures() {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        if (e.key === 'Escape') {
            const popup = document.querySelector('.step-detail-popup');
            if (popup) {
                popup.remove();
            }
        }
    });

    document.addEventListener('mousedown', function () {
        document.body.classList.remove('keyboard-navigation');
    });
}

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

function createPulseEffect(element) {
    element.style.animation = 'pulse 1s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 1000);
}

function createSparkleEffect(element) {
    for (let i = 0; i < 3; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = 'position:absolute;top:' + (Math.random() * 100) + '%;left:' + (Math.random() * 100) + '%;font-size:' + (Math.random() * 10 + 10) + 'px;animation:sparkle 1s ease-out forwards;pointer-events:none;z-index:10;';

        element.style.position = 'relative';
        element.appendChild(sparkle);

        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 1000);
    }
}

function showEducationalFact() {
    const facts = [
        "The implant is one of the most effective forms of birth control available!",
        "It's about the size of a matchstick and goes in your upper arm.",
        "The implant can be removed at any time if you want to get pregnant.",
        "It works by releasing a hormone called etonogestrel.",
        "Over 11 million women worldwide use contraceptive implants!"
    ];

    const randomFact = facts[Math.floor(Math.random() * facts.length)];
    console.log('Educational fact:', randomFact);
}

function showStepDetails(stepNumber) {
    const details = {
        '1': {
            title: 'Hormone Release Process',
            content: 'The implant contains 68mg of etonogestrel, a synthetic hormone similar to progesterone. It releases this hormone slowly and consistently over 3 years.'
        },
        '2': {
            title: 'How Ovulation is Prevented',
            content: 'The hormone prevents your ovaries from releasing eggs each month. Without an egg being released, pregnancy cannot occur.'
        },
        '3': {
            title: 'Additional Protection Methods',
            content: 'The hormone also thickens the mucus in your cervix, making it much harder for sperm to reach an egg.'
        }
    };

    const detail = details[stepNumber];
    if (!detail) return;

    const popup = document.createElement('div');
    popup.className = 'step-detail-popup';
    popup.innerHTML = '<div class="popup-content"><div class="popup-header"><h4>Step ' + stepNumber + ': ' + detail.title + '</h4><button class="close-btn" onclick="this.closest(\'.step-detail-popup\').remove()"><i class="fas fa-times"></i></button></div><p>' + detail.content + '</p><div class="popup-footer"><button class="learn-more-btn" onclick="this.closest(\'.step-detail-popup\').remove()">Got it! <i class="fas fa-check"></i></button></div></div>';

    popup.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:1040;animation:fadeIn 0.3s ease;padding:20px;backdrop-filter:blur(5px);';

    document.body.appendChild(popup);

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.remove();
        }
    });
}

function highlightCard(card) {
    document.querySelectorAll('.type-card').forEach(c => c.classList.remove('highlighted'));
    card.classList.add('highlighted');
}

function showPriceDetails(card) {
    const isPublic = card.querySelector('h3').textContent.includes('Public');
    const message = isPublic ? 'Public hospitals provide the implant for free!' : 'Private clinic prices include consultation and insertion.';
    console.log('Price info:', message);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = '@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}@keyframes sparkle{0%{transform:scale(0) rotate(0deg);opacity:1}100%{transform:scale(1) rotate(180deg);opacity:0}}@keyframes tooltipFadeIn{from{opacity:0;transform:translateX(-50%) translateY(-4px)}to{opacity:1;transform:translateX(-50%) translateY(-8px)}}@keyframes tooltipFadeOut{from{opacity:1;transform:translateX(-50%) translateY(-8px)}to{opacity:0;transform:translateX(-50%) translateY(-4px)}}.animate-in{animation:fadeInUp 0.6s ease-out forwards}.highlighted{transform:scale(1.02);box-shadow:0 12px 30px rgba(37,99,235,0.2);border-color:#2563eb!important}.popup-content{background:white;padding:24px;border-radius:16px;max-width:400px;box-shadow:0 20px 40px rgba(0,0,0,0.2);border:1px solid #e5e7eb}.popup-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}.popup-header h4{color:#2563eb;font-size:1.2rem;margin:0;flex:1;font-weight:700}.close-btn{background:none;border:none;color:#6b7280;cursor:pointer;padding:4px;border-radius:4px;transition:all 0.3s ease}.close-btn:hover{background:#f3f4f6;color:#2563eb}.popup-content p{color:#6b7280;line-height:1.6;margin-bottom:20px}.popup-footer{text-align:center}.learn-more-btn{background:#2563eb;color:white;border:none;padding:10px 20px;border-radius:20px;font-weight:600;cursor:pointer;transition:all 0.3s ease;display:inline-flex;align-items:center;gap:8px}.learn-more-btn:hover{background:#1d4ed8;transform:translateY(-1px)}.keyboard-navigation .interactive-element:focus{outline:2px solid #f59e0b;outline-offset:2px}';
document.head.appendChild(style);

console.log('🚀 Application ready for learning!');