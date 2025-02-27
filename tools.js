document.addEventListener("DOMContentLoaded", () => {
  async function generateVideoJSON() {
    const textarea = document.getElementById("youtube-urls");
    if (!textarea) {
      console.error('Textarea with ID "youtube-urls" not found');
      return;
    }
    const urls = textarea.value.split("\n").filter((url) => url.trim());
    const videoData = [];

    for (const url of urls) {
      const videoId = url.match(/(?:v=)([^&]+)/)?.[1];
      if (!videoId) {
        console.warn(`Invalid URL skipped: ${url}`);
        continue;
      }

      try {
        const res = await fetch(
          `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
        );
        const data = await res.json();
        data.video_id = videoId;
        data.thumbnail_url = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`; // Override with higher res
        videoData.push(data);
      } catch (e) {
        console.error(`Failed to fetch oEmbed for ${videoId}: ${e}`);
      }
    }

    const jsonString = JSON.stringify(videoData, null, 2);
    document.getElementById("json-output").textContent = jsonString;
    document.getElementById("copy-json").disabled = !jsonString;
  }

  function copyJSON() {
    const jsonString = document.getElementById("json-output").textContent;
    if (jsonString) {
      navigator.clipboard.writeText(jsonString);
      alert("JSON copied to clipboard!");
    }
  }

  window.generateVideoJSON = generateVideoJSON;
  window.copyJSON = copyJSON;
});
