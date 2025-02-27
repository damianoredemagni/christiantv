document.addEventListener("DOMContentLoaded", () => {
  let videos = [];

  async function addVideo() {
    const urlInput = document.getElementById("youtube-url");
    const url = urlInput.value.trim();
    if (!url) return;

    const videoId = url.match(/(?:v=)([^&]+)/)?.[1];
    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }

    try {
      const res = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      );
      if (!res.ok) throw new Error("Failed to fetch video data");
      const data = await res.json();

      data.video_id = videoId;
      videos.push(data);
      urlInput.value = "";
      renderVideoList();
      document.getElementById("copy-json").disabled = false;
    } catch (e) {
      console.error(`Error fetching video ${videoId}: ${e}`);
      alert("Failed to add video");
    }
  }

  function removeVideo(index) {
    videos.splice(index, 1);
    renderVideoList();
    document.getElementById("copy-json").disabled = videos.length === 0;
  }

  function renderVideoList() {
    const list = document.getElementById("video-list");
    list.innerHTML = videos
      .map(
        (v, index) => `
      <div class="video-row">
        <img src="${v.thumbnail_url}" alt="${v.title}">
        <div class="details">
          <h3>${v.title}</h3>
          <p>${v.author_name}</p>
        </div>
        <span class="remove" onclick="removeVideo(${index})">Remove</span>
      </div>
    `,
      )
      .join("");
  }

  function copyJSON() {
    const jsonString = JSON.stringify(videos, null, 2);
    navigator.clipboard.writeText(jsonString).then(() => {
      alert("JSON copied to clipboard!");
    });
  }

  window.addVideo = addVideo;
  window.removeVideo = removeVideo;
  window.copyJSON = copyJSON;
});
