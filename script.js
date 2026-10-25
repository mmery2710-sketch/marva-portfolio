
// =====================================
// MARVA — JAVASCRIPT INTERACTIONS
// =====================================

// 1. MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".nav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    menuToggle.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    mainNav.classList.toggle("open", !isOpen);
  });

  // Close the menu after clicking a link
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


// 2. REVEAL ANIMATIONS ON SCROLL

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });
} else {
  // Fallback for older browsers
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
}


// 3. ACTIVE NAVIGATION LINK

const pageSections = document.querySelectorAll(
  "main section[id], main section.hero"
);

const navLinks = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const sectionId = entry.target.id || "home";

        navLinks.forEach((link) => {
          const isActive =
            link.getAttribute("href") === `#${sectionId}`;

          link.classList.toggle("active", isActive);
        });
      });
    },
    {
      rootMargin: "-35% 0px -55% 0px"
    }
  );

  pageSections.forEach((section) => {
    sectionObserver.observe(section);
  });
}


// 4. DEMO CONTACT FORM

const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameInput = document.querySelector("#name");
    const visitorName = nameInput.value.trim();

    formMessage.textContent =
      `Thank you, ${visitorName}! This is a demo form. ` +
      "Connect a form service to receive real messages.";

    contactForm.reset();
  });
}
