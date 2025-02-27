function playVideo(area) {
  const card = area.parentElement;
  if (!card.querySelector("iframe")) {
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${area.dataset.video}?autoplay=1&mute=1&controls=0`;
    iframe.frameBorder = "0";
    card.insertBefore(iframe, area); // Insert iframe before .area
    card.classList.add("playing"); // Hide .info
  }
}

function stopVideo(area) {
  const card = area.parentElement;
  const iframe = card.querySelector("iframe");
  if (iframe) {
    card.removeChild(iframe); // Remove iframe only
    card.classList.remove("playing"); // Show .info again
  }
}

window.playVideo = playVideo;
window.stopVideo = stopVideo;
