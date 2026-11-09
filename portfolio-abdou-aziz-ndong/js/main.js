document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Fermer" : "Menu";
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menu";
    }));
  }
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
  const revealItems = document.querySelectorAll(".reveal, .expertise-card, .skill-card, .service-card, .gallery-card, .info-card");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(el => { el.classList.add("reveal"); observer.observe(el); });
  } else {
    revealItems.forEach(el => el.classList.add("is-visible"));
  }
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const subject = encodeURIComponent(`Demande de contact — ${data.get("subject")}`);
      const body = encodeURIComponent(
        `Bonjour Abdou Aziz,\n\n${data.get("message")}\n\nNom : ${data.get("name")}\nE-mail : ${data.get("email")}\nObjet : ${data.get("subject")}`
      );
      window.location.href = `mailto:dabakhndong@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});