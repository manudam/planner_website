const STORE_LINKS = {
  iphone: "",
  android: "",
  windows: "",
  mac: "",
  web: "https://app.plannerpig.com/",
};

const STORE_LABELS = {
  iphone: "iPhone",
  android: "Android",
  windows: "Windows",
  mac: "Mac",
  web: "Web",
};

function setupStoreLinks() {
  const cards = document.querySelectorAll("[data-store]");
  const fallbackUrl = document.body.dataset.comingSoonUrl || "#platforms";

  cards.forEach((card) => {
    const key = card.dataset.store;
    const status = card.querySelector(".platform-status");
    const url = (STORE_LINKS[key] || "").trim();

    if (url) {
      card.href = url;
      card.target = "_blank";
      card.rel = "noreferrer noopener";
      card.classList.add("is-live");
      card.classList.remove("is-pending");
      card.removeAttribute("aria-disabled");
      card.removeAttribute("aria-label");

      if (status) {
        status.textContent = "Live now";
      }

      return;
    }

    card.href = fallbackUrl;
    card.removeAttribute("target");
    card.removeAttribute("rel");
    card.classList.add("is-pending");
    card.classList.remove("is-live");
    card.setAttribute("aria-disabled", "true");
    card.setAttribute("aria-label", `${STORE_LABELS[key]} coming soon`);

    if (status) {
      status.textContent = "Coming soon";
    }
  });
}

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".site-nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    });
  });
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!items.length) {
    return;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  items.forEach((item) => observer.observe(item));
}

function setYear() {
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

setupStoreLinks();
setupNavigation();
setupReveal();
setYear();
