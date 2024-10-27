
const PAD_ZERO_HOUR = true;


function getFormattedTime() {
  const now = new Date();
  const hours = PAD_ZERO_HOUR ? String(now.getHours()).padStart(2, '0') : String(now.getHours());
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

setInterval(function () {
  document.getElementsByClassName("time")[0].innerText = getFormattedTime();
}, 200);
