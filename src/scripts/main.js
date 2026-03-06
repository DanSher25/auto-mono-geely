import { Fancybox } from "@fancyapps/ui";
import IMask from "imask";
import FlipDown from "./vendor/flipDown.js";
// import Swiper from "swiper";
// import { Navigation, EffectFade, Pagination, Autoplay } from "swiper/modules";

import "@fancyapps/ui/dist/fancybox.css";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/effect-fade";
// import "swiper/css/pagination";
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

  initPhoneMask();
  initFlipDown();
});
