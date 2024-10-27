THEME_NOISY = {
  video: "VHS_Noise.mp4",
  css: `
      .time {
        color: white;
      }
    `,
};

THEME_COLOR_BARS = {
  img: 'vhs_color_bars.png',
};

THEME_GOOGOLPLEX = {
  video: 'Lillian Schwartz - Googolplex.mp4',
  css: `
      .time {
        text-shadow: #000000 1px 0 10px;
      }
    `,
};

THEME_INTERSECT = {
  video: "Jerobeam Fenderson - Intersect.mp4",
}


// Configurable settings
const PAD_ZERO_HOUR = true;
const USE_24HR_FORMAT = false;
const CURRENT_THEME = THEME_GOOGOLPLEX;


function getFormattedTime() {
  const now = new Date();
  let hours = now.getHours();
  if (!USE_24HR_FORMAT) {
    hours = hours % 12;
    if (hours === 0) {
      hours = 12;
    }
  }
  const hoursStr = PAD_ZERO_HOUR ? String(hours).padStart(2, '0') : String(hours);
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hoursStr}:${minutes}`;
}

setInterval(function () {
  document.getElementsByClassName("time")[0].innerText = getFormattedTime();
}, 200);


document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByTagName("head")[0].innerHTML += `<style>${CURRENT_THEME.css}</style>`;
  let bg;
  if (CURRENT_THEME.video) {
    bg = `<video class="bg" src="/img/${CURRENT_THEME.video}" loop muted autoplay></video>`
  } else {
    bg = `<img class="bg" src="/img/${CURRENT_THEME.img}"  alt="background"/>`;
  }
  document.getElementsByClassName("border")[0].innerHTML += bg;

});

