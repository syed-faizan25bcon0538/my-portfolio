import "./style.css";

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", closeMenu)
);

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    card.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  });
});

const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  status.className = "form-status";
  status.textContent = "";

  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();

  if (!name || !email || !message) {
    status.classList.add("err");
    status.textContent = "Please fill in all fields.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    status.classList.add("err");
    status.textContent = "Please enter a valid email address.";
    return;
  }

  status.classList.add("ok");
  status.textContent = `Thanks, ${name}! Your message has been recorded.`;
  form.reset();
});
