const STORE_LINKS = {
  appStore: "",
  googlePlay: "",
  microsoftStore: "",
};

const STORE_LABELS = {
  appStore: "App Store",
  googlePlay: "Google Play",
  microsoftStore: "Microsoft Store",
};

function setupStoreLinks() {
  const cards = document.querySelectorAll("[data-store]");
  const fallbackUrl = document.body.dataset.comingSoonUrl || "#launch-status";

  cards.forEach((card) => {
    const key = card.dataset.store;
    const status = card.querySelector(".store-status");
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
    card.classList.remove("is-live");
    card.classList.add("is-pending");
    card.setAttribute("aria-disabled", "true");
    card.setAttribute("aria-label", `${STORE_LABELS[key]} coming soon`);

    if (status) {
      status.textContent = "Coming soon";
    }
  });
}

function setYear() {
  const yearEl = document.getElementById("year");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

setupStoreLinks();
setYear();
