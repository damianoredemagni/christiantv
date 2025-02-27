document.addEventListener("DOMContentLoaded", () => {
  async function loadSection(sectionId, jsonPath) {
    try {
      const res = await fetch(jsonPath);
      if (!res.ok)
        throw new Error(`Failed to fetch ${jsonPath}: ${res.status}`);
      const videos = await res.json();
      const container = document.querySelector(`#${sectionId} .container`);
      const isHero = sectionId === "hero";

      container.innerHTML = videos
        .map(
          (v) => `
        <div class="card" style="background-image: url(${v.thumbnail_url})">
          <div class="area" data-video="${v.video_id || v.html.match(/embed\/([^?]+)/)[1]}" data-title="${v.title}"
               ${isHero ? "" : 'onmouseenter="playVideo(this)" onmouseleave="stopVideo(this)"'}
               onclick="goToDetails('${v.video_id || v.html.match(/embed\/([^?]+)/)[1]}')"></div>
          ${
            isHero
              ? `
            <div class="info">
              <h2>${v.title}</h2>
              <p>${v.author_name}</p>
            </div>
            <div class="play-button" onclick="playHeroVideo(this)"></div>
          `
              : ""
          }
        </div>
      `,
        )
        .join("");
    } catch (e) {
      console.error(`Error loading section ${sectionId}: ${e}`);
    }
  }

  function goToDetails(videoId) {
    window.location.href = `details.html?id=${videoId}`;
  }

  loadSection("hero", "videos/hero.json");
  loadSection("movies", "videos/movies.json");
  loadSection("music", "videos/music.json");

  window.goToDetails = goToDetails;
});
