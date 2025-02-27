document.addEventListener("DOMContentLoaded", () => {
  async function loadHero() {
    try {
      const res = await fetch("videos/hero.json");
      if (!res.ok) throw new Error(`Failed to fetch hero.json: ${res.status}`);
      const videoIds = await res.json();
      const container = document.querySelector("#hero .container");
      const isMobile = window.innerWidth <= 768;

      const videoPromises = videoIds.map(async (v) => {
        const oEmbedRes = await fetch(
          `https://www.youtube.com/oembed?url=https://youtube.com/watch?v=${v.video_id}&format=json`,
        );
        if (!oEmbedRes.ok)
          throw new Error(`Failed to fetch oEmbed for ${v.video_id}`);
        const data = await oEmbedRes.json();
        data.video_id = v.video_id;
        return data;
      });

      const videos = await Promise.all(videoPromises);

      container.innerHTML = videos
        .map(
          (v) => `
        <div class="card landscape" style="background-image: url(${v.thumbnail_url})">
          <div class="area" data-video="${v.video_id}"
               ${isMobile ? "" : 'onmouseenter="playVideo(this)" onmouseleave="stopVideo(this)"'}
               onclick="goToDetails('${v.video_id}')"></div>
          <div class="info">
            <h2>${v.title}</h2>
            <p>${v.author_name}</p>
          </div>
        </div>
      `,
        )
        .join("");
    } catch (e) {
      console.error(`Error loading hero: ${e}`);
    }
  }

  loadHero();
});
