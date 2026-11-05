const timeline = document.querySelector('.timeline');
const jobs = Array.from(document.querySelectorAll('.job'));

// enables the dimmed / focused styles only when this script runs
timeline.classList.add('is-interactive');

let ticking = false;

function update(){
    const vh = window.innerHeight;
    const focusLine = vh * 0.5;

    // how far the middle of the screen has travelled through the timeline (0..1)
    const rect = timeline.getBoundingClientRect();
    const progress = Math.min(Math.max((focusLine - rect.top) / rect.height, 0), 1);
    timeline.style.setProperty('--progress', progress);

    // the card closest to the middle of the screen is the active one
    let closest = jobs[0];
    let best = Infinity;
    jobs.forEach(job => {
        const r = job.getBoundingClientRect();
        const dist = Math.abs(r.top + r.height / 2 - focusLine);
        if (dist < best){ best = dist; closest = job; }
        job.classList.toggle('is-passed', r.top < focusLine);
    });
    jobs.forEach(job => job.classList.toggle('is-active', job === closest));

    ticking = false;
}

function onScroll(){
    if (!ticking){
        ticking = true;
        requestAnimationFrame(update);
    }
}

window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);
update();

document.querySelector("footer p").textContent = "© " + new Date().getFullYear() + " Aleksander Zbyrasz";
