
document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.reveal-item'));
  items.forEach((el, i) => {
    setTimeout(() => el.classList.add('is-visible'), i * 150); 
  });
});

document.querySelector("footer p").textContent = "Copyright © Alex " + new Date().getFullYear();

$("h1").fadeOut(1).fadeIn(2000);

document.addEventListener('DOMContentLoaded', () => {
  const urlMap = {
    "Exam Grader": "https://github.com/Hugebob1/Exam_Checker/tree/llm_phase1",
    "Graph Splitter": "https://github.com/Hugebob1/GrafMasterJava",
    "OLX Scanner": "https://github.com/Hugebob1/Olx_Scanner",
    "MyChat": "https://github.com/Hugebob1/MyChat",
    "ML": "https://github.com/Hugebob1/ML-project"
  };

  document.querySelectorAll('.container .card').forEach(card => {
    const h1 = card.querySelector('h1');
    const url = h1 && urlMap[h1.textContent.trim()];
    if (!url) return;

    card.style.cursor = 'pointer';
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');

    const go = () => { window.location.href = url; };

    card.addEventListener('click', e => {
      if (e.target.closest('a')) return; 
      go();
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });
});

