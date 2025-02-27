function playVideo(area) {
  if (window.innerWidth <= 768) return; // Skip on mobile
  const card = area.parentElement;
  if (!card.querySelector("iframe")) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${area.dataset.video}?autoplay=1&mute=1&controls=0`;
    iframe.frameBorder = "0";
    card.insertBefore(iframe, area);
    card.classList.add("playing");
  }
}

function stopVideo(area) {
  if (window.innerWidth <= 768) return; // Skip on mobile
  const card = area.parentElement;
  const iframe = card.querySelector("iframe");
  if (iframe) {
    card.removeChild(iframe);
    card.classList.remove("playing");
  }
}

window.playVideo = playVideo;
window.stopVideo = stopVideo;
