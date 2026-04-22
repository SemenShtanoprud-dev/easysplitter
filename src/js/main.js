document.addEventListener("DOMContentLoaded", () => {
  // Swiper
  new Swiper(".testimonials__slider", {
    loop: true,
    navigation: {
      prevEl: ".testimonials__btn--prev",
      nextEl: ".testimonials__btn--next",
    },
    pagination: {
      el: ".testimonials__pagination",
      clickable: true,
    },
  });

  // Burger menu
  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav");

  if (burger && nav) {
    const openMenu = () => {
      nav.classList.add("is-open");
      burger.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      nav.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    burger.addEventListener("click", () => {
      const isOpen = nav.classList.contains("is-open");
      isOpen ? closeMenu() : openMenu();
    });

    nav.querySelectorAll(".header__link").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }
});

