const STORE_CONFIG = {
  iphone: {
    label: "iPhone",
    url: "",
    pendingLabel: "Coming soon",
    pendingAriaLabel: "iPhone release coming soon",
  },
  android: {
    label: "Android",
    url: "",
    pendingLabel: "Coming soon",
    pendingAriaLabel: "Android release coming soon",
  },
  windows: {
    label: "Windows",
    url: "",
    pendingLabel: "Coming soon",
    pendingAriaLabel: "Windows release coming soon",
  },
  mac: {
    label: "Mac",
    url: "",
    pendingLabel: "Coming soon",
    pendingAriaLabel: "Mac release coming soon",
  },
  web: {
    label: "Web",
    url: "https://app.plannerpig.com/",
    liveLabel: "Live now",
    liveAriaLabel: "Open Planner Pig on the web",
  },
};

function setupStoreLinks() {
  const cards = document.querySelectorAll("[data-store]");
  const fallbackUrl = document.body.dataset.comingSoonUrl || "#platforms";

  cards.forEach((card) => {
    const key = card.dataset.store;
    const status = card.querySelector(".platform-status");
    const config = STORE_CONFIG[key];

    if (!config) {
      return;
    }

    const url = (config.url || "").trim();

    if (url) {
      card.href = url;
      card.target = "_blank";
      card.rel = "noreferrer noopener";
      card.classList.add("is-live");
      card.classList.remove("is-pending");
      card.removeAttribute("aria-disabled");
      card.removeAttribute("aria-label");

      if (status) {
        status.textContent = config.liveLabel || "Live now";
      }

      card.setAttribute("aria-label", config.liveAriaLabel || `Open ${config.label}`);

      return;
    }

    card.href = fallbackUrl;
    card.removeAttribute("target");
    card.removeAttribute("rel");
    card.classList.add("is-pending");
    card.classList.remove("is-live");
    card.setAttribute("aria-disabled", "true");
    card.setAttribute("aria-label", config.pendingAriaLabel || `${config.label} coming soon`);

    if (status) {
      status.textContent = config.pendingLabel || "Coming soon";
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
