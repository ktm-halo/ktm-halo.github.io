// =====================================================
// MV Player – JS khớp với HTML hiện tại
// (Có: play/pause, mute, prev/next, timeline, lyrics/credit toggle,
//  lyrics highlight, like, volume slider, fullscreen dblclick, carousel)
// (Không dùng: #video-time, #step-1-btn, #volume-value, #now-playing-title)
// =====================================================

// ---------- PLAYLIST ----------
const videoList = [
  {
    name: "Dame un Kraa",
    link: "https://files.catbox.moe/mi1rkn.webm",
    poster: "poster.jpg",
  },
  {
    name: "Hanoi Street",
    link: "https://ia601001.us.archive.org/19/items/ha-noi-pho-lil-take-x-snaky-x-1lane-prod.by-th-4nhd-4t-offcial-mv-2160p-30/Ha%CC%80%20No%CC%A3%CC%82i%20pho%CC%82%CC%81%20-%20Lil%20Take%20x%20Snaky%20x%201lane%20%5Bprod.by%20th4nhd4t%5D%20%28Offcial%20MV%29-%282160p30%29.webm",
    poster: "poster2.png",
  },
  {
    name: "Clingy",
    link: "https://ia601001.us.archive.org/0/items/clingy-lil-take-x-nguyen-quoc-prod.by-mint-official-mv-2160p-60/Clingy%20-%20Lil%20Take%20x%20Nguye%CC%82n%20Quo%CC%82%CC%81c%20%5Bprod.by%20mint%5D%20%28Official%20MV%29-%282160p60%29.webm",
    poster: "poster3.jpg",
  },
];

let currentIndex = 0;
let likeCount = 0;

// ---------- DOM REFS ----------
const myVideo = document.querySelector("#my-video");
const playPauseButton = document.querySelector("#play-pause-btn");
const playPauseImg = document.querySelector("#play-pause-img");
const muteUnmuteButton = document.querySelector("#mute-unmute-btn");
const muteUnmuteImg = document.querySelector("#mute-unmute-img");
const prevButton = document.querySelector("#previous-btn");
const nextButton = document.querySelector("#next-btn");

const progressBar = document.querySelector(".progress-bar");
const progressBarFill = document.querySelector("#progress-bar-fill");

const videoNameSpan = document.querySelector("#video-name");

const likeButton = document.querySelector("#like-btn");
const likesSpan = document.querySelector("#likes");

const lyricsBtn = document.querySelector("#lyrics-toggle-btn");
const creditBtn = document.querySelector("#credit-toggle-btn");
const lyricsBox = document.querySelector("#lyrics-box");
const creditBox = document.querySelector("#credit-box");

const sidePanel = document.querySelector(".video-list");
const carouselTrack = document.getElementById("carousel-track");

const volumeSlider = document.querySelector("#volume-slider");

// ------------------- INIT -------------------
window.addEventListener("DOMContentLoaded", () => {
  if (!myVideo) return;

  // Nạp video đầu & UI
  myVideo.src = videoList[currentIndex].link;
  myVideo.volume = 0.8;
  if (volumeSlider)
    volumeSlider.value = myVideo.muted ? 0 : myVideo.volume ?? 0.8;

  updateVideoMetaName();
  bindCoreEvents();
  renderCarousel();

  if (likesSpan) likesSpan.textContent = likeCount;
});

// ----------------- EVENT BIND ----------------
function bindCoreEvents() {
  // Controls
  playPauseButton?.addEventListener("click", togglePlay);
  muteUnmuteButton?.addEventListener("click", toggleAudio);
  prevButton?.addEventListener("click", prevTrack);
  nextButton?.addEventListener("click", nextTrack);

  // Video events
  myVideo.addEventListener("timeupdate", onVideoProgress);
  myVideo.addEventListener("seeked", onVideoProgress);
  myVideo.addEventListener("loadedmetadata", () => {
    updateVideoMetaName();
    syncPanelHeight(); // panel phải = chiều cao video
    updateCarouselActive();
  });
  window.addEventListener("resize", syncPanelHeight);

  // Timeline click-to-seek
  progressBar?.addEventListener("click", seekByClick);

  // Like
  likeButton?.addEventListener("click", () => {
    likeCount++;
    if (likesSpan) likesSpan.textContent = likeCount;
  });

  // Toggle Lyrics / Credit
  if (lyricsBtn && creditBtn && lyricsBox && creditBox) {
    lyricsBtn.addEventListener("click", () => {
      lyricsBtn.classList.add("active");
      creditBtn.classList.remove("active");
      lyricsBox.style.display = "block";
      creditBox.style.display = "none";
      // đảm bảo khi quay lại Lyrics sẽ cuộn đúng dòng hiện tại
      highlightCurrentLyric(myVideo.currentTime || 0);
    });
    creditBtn.addEventListener("click", () => {
      creditBtn.classList.add("active");
      lyricsBtn.classList.remove("active");
      creditBox.style.display = "block";
      lyricsBox.style.display = "none";
    });
  }

  // Volume slider
  volumeSlider?.addEventListener("input", () => {
    const v = parseFloat(volumeSlider.value);
    myVideo.volume = v;
    // nếu về 0 thì mute, >0 thì unmute
    if (v === 0 && !myVideo.muted) {
      myVideo.muted = true;
      muteUnmuteImg &&
        (muteUnmuteImg.src =
          "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png");
    } else if (v > 0 && myVideo.muted) {
      myVideo.muted = false;
      muteUnmuteImg &&
        (muteUnmuteImg.src =
          "https://img.icons8.com/ios-glyphs/30/high-volume--v1.png");
    }
  });

  // Sync slider khi thay đổi volume/mute bằng nút
  myVideo.addEventListener("volumechange", () => {
    if (!volumeSlider) return;
    volumeSlider.value = myVideo.muted ? 0 : myVideo.volume ?? 0;
  });

  // Fullscreen dblclick
  myVideo.addEventListener("dblclick", toggleFullscreen);
}

// ----------------- CORE CONTROLS -----------------
function togglePlay() {
  if (myVideo.paused) {
    myVideo.play();
    playPauseImg &&
      (playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/pause--v1.png");
  } else {
    myVideo.pause();
    playPauseImg &&
      (playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png");
  }
}

function toggleAudio() {
  myVideo.muted = !myVideo.muted;
  if (muteUnmuteImg) {
    muteUnmuteImg.src = myVideo.muted
      ? "https://img.icons8.com/ios-glyphs/30/no-audio--v1.png"
      : "https://img.icons8.com/ios-glyphs/30/high-volume--v1.png";
  }
  // đồng bộ slider
  if (volumeSlider)
    volumeSlider.value = myVideo.muted ? 0 : myVideo.volume ?? 0.8;
}

// ----------------- PLAYLIST NEXT/PREV -------------
function prevTrack() {
  currentIndex = (currentIndex - 1 + videoList.length) % videoList.length;
  playVideoAtIndex(currentIndex);
}

function nextTrack() {
  currentIndex = (currentIndex + 1) % videoList.length;
  playVideoAtIndex(currentIndex);
}

function playVideoAtIndex(index) {
  myVideo.pause();
  myVideo.src = videoList[index].link;
  myVideo.load();
  myVideo.play().catch(() => {
    playPauseImg &&
      (playPauseImg.src = "https://img.icons8.com/ios-glyphs/30/play--v1.png");
  });

  updateVideoMetaName();
  progressBarFill && (progressBarFill.style.width = "0%");
  updateCarouselActive();
}

// ----------------- PROGRESS / LYRICS -------------
function onVideoProgress() {
  // Timeline width
  if (myVideo.duration && progressBarFill) {
    const percent = (myVideo.currentTime / myVideo.duration) * 100;
    progressBarFill.style.width = `${percent}%`;
  }
  // Lyrics sync
  highlightCurrentLyric(myVideo.currentTime || 0);
}

function seekByClick(e) {
  const rect = progressBar.getBoundingClientRect();
  const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
  if (myVideo.duration) myVideo.currentTime = ratio * myVideo.duration;
}

// ----------------- META / TITLE -------------------
function updateVideoMetaName() {
  const cur = videoList[currentIndex];
  if (videoNameSpan) videoNameSpan.textContent = cur?.name || "";
}

// ----------------- LYRICS SYNC --------------------
function highlightCurrentLyric(currentTime) {
  if (!lyricsBox) return;
  const lines = lyricsBox.querySelectorAll("p[data-time]");
  if (!lines.length) return;

  let active = null;
  lines.forEach((line) => {
    const t = parseFloat(line.dataset.time);
    line.classList.remove("highlight");
    if (!Number.isNaN(t) && currentTime >= t) active = line;
  });

  if (active) {
    active.classList.add("highlight");
    active.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

// ----------------- FULLSCREEN ---------------------
function toggleFullscreen() {
  if (!document.fullscreenElement) myVideo.requestFullscreen?.();
  else document.exitFullscreen?.();
}

// ----------------- SYNC PANEL HEIGHT --------------
function syncPanelHeight() {
  if (!sidePanel || !myVideo) return;
  sidePanel.style.height = myVideo.clientHeight + "px";
}

// ----------------- CAROUSEL (Netflix-like) --------
function renderCarousel() {
  if (!carouselTrack) return;
  carouselTrack.innerHTML = "";

  videoList.forEach((item, idx) => {
    const btn = document.createElement("button");
    btn.className = "thumb" + (idx === currentIndex ? " active" : "");
    btn.type = "button";
    btn.dataset.index = idx;

    btn.innerHTML = `
      <img src="${item.poster}" alt="${item.name}" loading="lazy" />
      <span class="caption">${item.name}</span>
    `;

    btn.addEventListener("click", () => {
      if (idx === currentIndex) return;
      currentIndex = idx;
      playVideoAtIndex(currentIndex);
    });

    carouselTrack.appendChild(btn);
  });
}

function updateCarouselActive() {
  if (!carouselTrack) return;
  [...carouselTrack.children].forEach((el, i) => {
    el.classList.toggle("active", i === currentIndex);
  });
}
