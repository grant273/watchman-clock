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
const CYCLE_THEMES_TIME_MINUTES = 5; // If set, randomly cycle through themes every X minutes
const CURRENT_THEME = THEMES.THEME_ATARI_VIDEO_MUSIC;


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

setInterval(function() {
  if (CYCLE_THEMES_TIME_MINUTES) {
    location.reload();
  }
}, CYCLE_THEMES_TIME_MINUTES * 60 * 1000);


document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByTagName("head")[0].innerHTML += `<style>${CURRENT_THEME.css}</style>`;
  const theme = CYCLE_THEMES_TIME_MINUTES ? getRandomTheme() : CURRENT_THEME;
  let bg;
  if (theme.video) {
    bg = `<video class="bg" src="/img/${theme.video}" loop muted autoplay></video>`
  } else {
    bg = `<img class="bg" src="/img/${theme.img}"  alt="background"/>`;
  }
  document.getElementsByClassName("border")[0].innerHTML += bg;
});

function getRandomTheme() {
  const keys = Object.keys(THEMES);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return THEMES[randomKey];
}

