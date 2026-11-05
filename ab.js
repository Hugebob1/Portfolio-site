const slider = document.querySelector('.slider');
const items = document.querySelectorAll('.slider .item');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const dotsBox = document.querySelector('.dots');
const num = items.length;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let active = 0;

// one dot per card
const dots = Array.from(items, (_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Card ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsBox.appendChild(dot);
    return dot;
});

function loadShow(){
    // smaller offset on phones so neighbours still peek in
    const step = window.innerWidth < 800 ? 70 : 250;

    items.forEach((item, i) => {
        // shortest distance around the loop, e.g. -2..2 for 5 cards
        let d = i - active;
        if (d > num / 2) d -= num;
        if (d < -num / 2) d += num;
        const dist = Math.abs(d);

        item.classList.toggle('active', d === 0);
        item.style.transform = d === 0
            ? 'none'
            : `translateX(${step * d}px) scale(${1 - 0.12 * dist})`;
        item.style.zIndex = 10 - dist;
        item.style.filter = d === 0 ? 'none' : `blur(${dist * 1.5}px) brightness(0.7)`;
        item.style.opacity = dist > 2 ? 0 : 1 - 0.3 * dist;
        item.setAttribute('aria-hidden', d !== 0);
    });

    dots.forEach((dot, i) => dot.classList.toggle('active', i === active));

    // page glow follows the colour of the active card
    document.body.style.setProperty('--tint', items[active].dataset.tint);
}

function goTo(i){
    active = (i + num) % num;
    loadShow();
    restartAutoplay();
}

next.onclick = () => goTo(active + 1);
prev.onclick = () => goTo(active - 1);

// clicking a side card brings it to the front
items.forEach((item, i) => item.addEventListener('click', () => {
    if (i !== active) goTo(i);
}));

// keyboard arrows
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') goTo(active + 1);
    if (e.key === 'ArrowLeft') goTo(active - 1);
});

// swipe on touch screens
let touchX = null;
slider.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
slider.addEventListener('touchend', e => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 40) goTo(active + (dx < 0 ? 1 : -1));
    touchX = null;
});

// autoplay, paused while the mouse is over the carousel
let timer = null;
let hovering = false;
function restartAutoplay(){
    clearInterval(timer);
    if (!reduceMotion && !hovering) timer = setInterval(() => goTo(active + 1), 7000);
}
slider.addEventListener('mouseenter', () => { hovering = true; clearInterval(timer); });
slider.addEventListener('mouseleave', () => { hovering = false; restartAutoplay(); });

window.addEventListener('resize', loadShow);

loadShow();
restartAutoplay();

document.querySelector("footer p").textContent = "© " + new Date().getFullYear() + " Aleksander Zbyrasz";
