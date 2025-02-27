document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const videoId = urlParams.get("id");
  const container = document.getElementById("video-container");

  if (videoId && container) {
    container.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1" frameborder="0" allowfullscreen></iframe>
    `;
  }
});
