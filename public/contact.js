const hint = document.getElementById("hint");

function showHint(text) {
  hint.textContent = text;
  clearTimeout(showHint._t);
  showHint._t = setTimeout(() => (hint.textContent = ""), 1600);
}

document.querySelectorAll(".copy").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const value = btn.getAttribute("data-copy");
    try {
      await navigator.clipboard.writeText(value);
      showHint("Copied to clipboard");
    } catch {
      // fallback gdy clipboard jest zablokowany
      const input = document.createElement("input");
      input.value = value;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
      showHint("Copied ✅");
    }
  });
});
