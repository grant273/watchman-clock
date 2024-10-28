const THEMES = {

  //Credit to Pauls Vid (https://www.youtube.com/watch?v=qIeOs3WdWvY&t=59s)
  THEME_NOISY: {
    video: "VHS_Noise.mp4",
    css: `
      .time {
        color: white;
      }
    `,
  },

  THEME_COLOR_BARS: {
    img: 'vhs_color_bars.png',
  },

  // Credit to Lillian Schwartz, 1972
  THEME_GOOGOLPLEX: {
    video: 'Lillian Schwartz - Googolplex.mp4',
    css: `
      .time {
        text-shadow: #000000 1px 0 10px;
      }
    `,
  },

  // Credit to Lillian Schwartz, 1971
  THEME_UFOS: {
    video: "Lillian Schwartz - UFOs.mp4",
    css: `
      .time {
        text-shadow: #000000 1px 0 10px;
      }
    `,
  },

  // Credit to Lillian Schwartz, 1973
  THEME_APOTHESIS: {
    video: "Lillian Schwartz - Apothesis.mp4",
    css: `
      .time {
        text-shadow: #000000 1px 0 10px;
      }
    `,
  },

  // Credit to Lillian Schwartz, 1970
  THEME_PIXILLATION: {
    video: "Lillian Schwartz - Pixillation.mp4",
    css: `
      .time {
        text-shadow: #000000 1px 0 10px;
      }
    `,
  },

  // Credit to Jerobeam Fenderson (https://www.youtube.com/watch?v=R9jOWIhZZCE)
  THEME_INTERSECT: {
    video: "Jerobeam Fenderson - Intersect.mp4",
  },

  // Recorded by 316whatupz (https://www.youtube.com/watch?v=D1jZaIPeD5w)go
  THEME_SPACE_INVADERS : {
    video: "space_invaders_gameplay.mp4",
    css: `
      .time {
        opacity: 60%;
        text-shadow: #000000 1px 0 10px;
      }
    `,
  },

  // Recorded by nickelindimer (https://www.youtube.com/watch?v=etZVnILnoSg). Visuals from the Atari Video Music systems
  THEME_ATARI_VIDEO_MUSIC: {
    video: 'atari_video_music.mp4',
  }
}


// Configurable settings
const PAD_ZERO_HOUR = true;
const USE_24HR_FORMAT = false;
const CYCLE_THEMES_TIME_MINUTES = 5;
// Array of themes to enable. If none, all themes are cycled
const ENABLED_THEMES = [
  THEMES.THEME_APOTHESIS,
  THEMES.THEME_UFOS,
  THEMES.THEME_PIXILLATION,
  THEMES.THEME_ATARI_VIDEO_MUSIC,
  THEMES.THEME_GOOGOLPLEX
];

let currentThemeIndex = 0;

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


if (CYCLE_THEMES_TIME_MINUTES) {
  setInterval(function () {
    loadTheme(getNextTheme());
  }, CYCLE_THEMES_TIME_MINUTES * 60 * 1000);
}


function getNextTheme() {
  const themes = ENABLED_THEMES ?? Object.values(THEMES);
  const theme = ENABLED_THEMES[currentThemeIndex];
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  return theme;
}

document.addEventListener("DOMContentLoaded", function () {
  loadTheme(getNextTheme());
});


const getMenuElem = () => document.getElementsByClassName("menu")[0];
document.addEventListener("keydown", (event) => {
  console.log(event.key);
  const menuElem = getMenuElem();
  if (event.key === "Escape") {
    menuElem.hidden = !menuElem.hidden;
  }
});


function loadTheme(theme) {
  const existingBg = document.getElementsByClassName("bg") ? document.getElementsByClassName("bg")[0] : null;
  if (existingBg) {
    existingBg.remove();
  }
  const existingStyles = document.getElementById('theme-css');
  if (existingStyles) {
    existingStyles.remove();
  }

  if (theme.video) {
    bg = `<video class="bg" src="/img/${theme.video}" loop muted autoplay></video>`
  } else {
    bg = `<img class="bg" src="/img/${theme.img}"  alt="background"/>`;
  }
  document.getElementsByClassName("border")[0].innerHTML += bg;

  if (theme.css) {
    document.getElementsByTagName("head")[0].innerHTML += `<style id="theme-css">${theme.css}</style>`;
  }
}
