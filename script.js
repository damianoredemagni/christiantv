document.addEventListener("DOMContentLoaded", () => {
  async function loadSection(sectionId, jsonPath) {
    try {
      // Fetch video IDs from JSON
      const res = await fetch(jsonPath);
      if (!res.ok)
        throw new Error(`Failed to fetch ${jsonPath}: ${res.status}`);
      const videoIds = await res.json();
      const container = document.querySelector(`#${sectionId} .container`);
      const isMobile = window.innerWidth <= 768;
      const isHero = sectionId === "hero";

      // Fetch oEmbed data for each video ID
      const videoPromises = videoIds.map(async (v) => {
        const oEmbedRes = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${v.video_id}&format=json`,
        );
        if (!oEmbedRes.ok)
          throw new Error(`Failed to fetch oEmbed for ${v.video_id}`);
        const data = await oEmbedRes.json();
        data.video_id = v.video_id; // Ensure video_id is preserved
        return data;
      });

      const videos = await Promise.all(videoPromises);

      // Render cards with oEmbed data
      container.innerHTML = videos
        .map(
          (v) => `
        <div class="card" style="background-image: url(${v.thumbnail_url})">
          <div class="area" data-video="${v.video_id}" data-title="${v.title}"
               ${isMobile ? "" : 'onmouseenter="playVideo(this)" onmouseleave="stopVideo(this)"'}
               onclick="goToDetails('${v.video_id}')"></div>
          ${
            isHero
              ? `
            <div class="info">
              <h2>${v.title}</h2>
              <p>${v.author_name}</p>
            </div>
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
