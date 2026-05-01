(function () {
    var mq = window.matchMedia("(min-width: 768px)");
    var toggle = document.getElementById("menu-toggle");
    var drawer = document.getElementById("main-drawer");
    var backdrop = document.getElementById("drawer-backdrop");
    var closeBtn = document.getElementById("drawer-close");
    var navLinks = drawer.querySelectorAll("nav a");

    function isDesktop() {
        return mq.matches;
    }

    function setOpen(open) {
        if (isDesktop()) {
            drawer.classList.remove("is-open");
            backdrop.classList.remove("is-visible");
            backdrop.setAttribute("aria-hidden", "true");
            document.body.classList.remove("menu-open");
            toggle.setAttribute("aria-expanded", "false");
            return;
        }
        drawer.classList.toggle("is-open", open);
        backdrop.classList.toggle("is-visible", open);
        backdrop.setAttribute("aria-hidden", open ? "false" : "true");
        document.body.classList.toggle("menu-open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) {
            closeBtn.focus();
        } else {
            toggle.focus();
        }
    }

    function closeMenu() {
        setOpen(false);
    }

    toggle.addEventListener("click", function () {
        if (isDesktop()) return;
        var willOpen = !drawer.classList.contains("is-open");
        setOpen(willOpen);
    });

    closeBtn.addEventListener("click", closeMenu);
    backdrop.addEventListener("click", closeMenu);

    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (!isDesktop() && drawer.classList.contains("is-open")) {
                closeMenu();
            }
        });
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && drawer.classList.contains("is-open") && !isDesktop()) {
            closeMenu();
        }
    });

    mq.addEventListener("change", function () {
        drawer.classList.remove("is-open");
        backdrop.classList.remove("is-visible");
        backdrop.setAttribute("aria-hidden", "true");
        document.body.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
    });
})();

(function () {
    if (typeof Swiper === "undefined") {
        return;
    }
    var root = document.querySelector(".main-visual-swiper");
    if (!root) {
        return;
    }
    var paginationEl = root.querySelector(".main-visual-swiper__pagination");
    if (!paginationEl) {
        return;
    }
    var prevEl = root.querySelector(".main-visual-swiper__nav--prev");
    var nextEl = root.querySelector(".main-visual-swiper__nav--next");
    if (!prevEl || !nextEl) {
        return;
    }

    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function playTextAnimation(swiper) {
        root.querySelectorAll(".main-visual-swiper__text").forEach(function (el) {
            el.classList.remove("main-visual-swiper__text--play");
        });
        var activeSlide = swiper.slides[swiper.activeIndex];
        var textEl = activeSlide && activeSlide.querySelector(".main-visual-swiper__text");
        if (!textEl) {
            return;
        }
        void textEl.offsetWidth;
        requestAnimationFrame(function () {
            textEl.classList.add("main-visual-swiper__text--play");
        });
    }

    new Swiper(root, {
        direction: "horizontal",
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 780,
        loop: false,
        rewind: true,
        effect: "fade",
        fadeEffect: {
            crossFade: true,
        },
        autoplay: prefersReducedMotion
            ? false
            : {
                  delay: 3000,
                  disableOnInteraction: false,
              },
        navigation: {
            prevEl: prevEl,
            nextEl: nextEl,
        },
        pagination: {
            el: paginationEl,
            clickable: true,
        },
        on: {
            init: function (swiper) {
                playTextAnimation(swiper);
            },
            slideChangeTransitionEnd: function (swiper) {
                playTextAnimation(swiper);
            },
        },
    });
})();
