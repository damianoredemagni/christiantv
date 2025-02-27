function playVideo(area) {
  const card = area.parentElement;
  if (!card.querySelector("iframe")) {
    card.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${area.dataset.video}?autoplay=1&mute=1&controls=0" frameborder="0"></iframe>
      <div class="area" data-video="${area.dataset.video}" data-title="${area.dataset.title}"
           onmouseenter="playVideo(this)" onmouseleave="stopVideo(this)"
           onclick="goToDetails('${area.dataset.video}')"></div>
    `;
  }
}

function stopVideo(area) {
  const card = area.parentElement;
  card.innerHTML = `
    <div class="area" data-video="${area.dataset.video}" data-title="${area.dataset.title}"
         onmouseenter="playVideo(this)" onmouseleave="stopVideo(this)"
         onclick="goToDetails('${area.dataset.video}')"></div>
  `;
  card.style.backgroundImage = `url(https://i.ytimg.com/vi/${area.dataset.video}/hqdefault.jpg)`;
}

function playHeroVideo(button) {
  const card = button.parentElement;
  if (!card.querySelector("iframe")) {
    const videoId = card.querySelector(".area").dataset.video;
    card.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0" frameborder="0"></iframe>
      <div class="area" data-video="${videoId}" data-title="${card.querySelector(".area").dataset.title}"
           onclick="goToDetails('${videoId}')"></div>
      <div class="info">${card.querySelector(".info").innerHTML}</div>
      <div class="play-button" onclick="playHeroVideo(this)"></div>
    `;
  }
}

window.playVideo = playVideo;
window.stopVideo = stopVideo;
window.playHeroVideo = playHeroVideo;
