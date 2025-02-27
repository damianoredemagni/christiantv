function playVideo(area) {
  const card = area.parentElement;
  if (!card.querySelector("iframe")) {
    card.hoverTimeout = setTimeout(() => {
      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube.com/embed/${area.dataset.video}?autoplay=1&mute=1&controls=0`;
      iframe.frameBorder = "0";
      card.insertBefore(iframe, area);
      card.classList.add("playing");
    }, 500); // 500ms delay
  }
}

function stopVideo(area) {
  const card = area.parentElement;
  const iframe = card.querySelector("iframe");
  if (iframe) {
    clearTimeout(card.hoverTimeout); // Cancel pending play
    card.removeChild(iframe);
    card.classList.remove("playing");
  }
}

window.playVideo = playVideo;
window.stopVideo = stopVideo;
