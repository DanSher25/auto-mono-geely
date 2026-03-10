import { Fancybox } from "@fancyapps/ui";
import IMask from "imask";
import FlipDown from "./vendor/flipDown.js";
import Swiper from "swiper";
import { EffectFade, Pagination } from "swiper/modules";

import "@fancyapps/ui/dist/fancybox.css";
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "flipdown/dist/flipdown.css";

document.addEventListener("DOMContentLoaded", () => {
  const initPhoneMask = () => {
    const inputs = document.querySelectorAll('input[type="tel"]:not([data-mask-init])');
    if (!inputs.length) return;

    inputs.forEach((input) => {
      IMask(input, {
        mask: "+{7} (000) 000-00-00",
        lazy: false,
      });

      input.dataset.maskInit = "true";
    });
  };
  const initFlipDown = () => {
    const el = document.getElementById("flipdown");

    if (!el) return;

    const endDate = new Date(el.dataset.end).getTime() / 1000;

    const flipdown = new FlipDown(endDate);

    flipdown.start();
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
      });
    });
  };

  initPhoneMask();
  initFlipDown();
  initModelSlider();
  initGallerySlider();
});
