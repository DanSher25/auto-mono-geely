import { Fancybox } from "@fancyapps/ui";
import IMask from "imask";
import Swiper from "swiper";
import { EffectFade, Pagination } from "swiper/modules";
import tippy from "tippy.js";

import "@fancyapps/ui/dist/fancybox.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

document.addEventListener("DOMContentLoaded", () => {
  const initPhoneMask = () => {
    const inputs = document.querySelectorAll('input[type="tel"]:not([data-mask-init])');
    if (!inputs.length) return;

    inputs.forEach((input) => {
      let mask = null;

      input.addEventListener("mouseenter", () => {
        if (mask) return;

        mask = IMask(input, {
          mask: "+{7} (000) 000-00-00",
          lazy: false,
        });

        input.dataset.maskInit = "true";
      });

      const form = input.closest("form");

      form.addEventListener("submit", (e) => {
        if (!mask) return;

        if (mask.unmaskedValue.length !== 11) {
          e.preventDefault();
          input.setCustomValidity("Введите полный номер телефона");
          input.reportValidity();
        } else {
          input.setCustomValidity("");
        }
      });
    });
  };
  const initCountdown = () => {
    const el = document.querySelector("#countdown");
    if (!el) return;

    const endDate = new Date(el.dataset.end).getTime();

    const createItem = (value, label) => {
      return `
      <div class="countdown-timer__item">
        <div class="countdown-timer__value">${value}</div>
        <div class="countdown-timer__name">${label}</div>
      </div>
    `;
    };

    const update = () => {
      const now = Date.now();
      const diff = endDate - now;

      if (diff <= 0) {
        el.innerHTML = "";
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      el.innerHTML = `
      <div class="countdown-timer__wrapper">
        ${createItem(days, "дней")}
        ${createItem(hours, "часов")}
        ${createItem(minutes, "минут")}
        ${createItem(seconds, "секунд")}
      </div>
    `;
    };

    update();
    setInterval(update, 1000);
  };

  Fancybox.bind("[data-fancybox]", {
    autoFocus: false,
    on: {
      done: () => {
        initPhoneMask();
      },
    },
  });

  const initModelSlider = () => {
    const sliders = document.querySelectorAll(".model__picture");
    if (sliders.length < 0) return;

    sliders.forEach((el) => {
      const slider = el.querySelector(".model__slider");
      const swiper = new Swiper(slider, {
        modules: [Pagination, EffectFade],

        slidesPerView: 1,
        speed: 350,

        effect: "fade",
        fadeEffect: {
          crossFade: true,
        },

        allowTouchMove: false,
      });

      const colors = el.querySelectorAll(".model__color");

      if (colors.length > 0) {
        colors.forEach((color, index) => {
          color.addEventListener("click", () => {
            swiper.slideTo(index);
            colors.forEach((c) => c.classList.remove("model__color--active"));
            color.classList.add("model__color--active");
          });
        });
      }
    });
  };

  const initGallerySlider = () => {
    const sliders = document.querySelectorAll(".model__picture");
    if (sliders.length < 0) return;

    sliders.forEach((el) => {
      const slider = el.querySelector(".model__gallery-list");
      const swiper = new Swiper(slider, {
        slidesPerView: 4,
        spaceBetween: 10,
        breakpoints: {
          0: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        },
      });
    });
  };

  const initTooltips = () => {
    const elements = document.querySelectorAll(".model__tooltip");

    elements.forEach((el) => {
      const text = el.parentElement.querySelector(".model__tooltip-text")?.textContent;

      tippy(el, {
        content: text,
        placement: "right",
        animation: "shift-away",
        theme: "light",
      });
    });
  };

  initPhoneMask();
  initCountdown();
  initModelSlider();
  initGallerySlider();
  initTooltips();
});
