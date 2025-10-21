function setEndShift() {
  const track = document.getElementById("photo-track");
  const section = document.getElementById("photo-pin");
  if (!track || !section) return;

  const endShift = Math.max(0, track.scrollWidth - window.innerWidth);
  section.style.setProperty("--endShift", `${endShift}px`);
}

function afterImages(cb) {
  const imgs = document.querySelectorAll("#photo-track img");
  if (!imgs.length) return cb();
  let loaded = 0;
  imgs.forEach((img) => {
    if (img.complete) {
      if (++loaded === imgs.length) cb();
    } else {
      img.addEventListener("load", () => {
        if (++loaded === imgs.length) cb();
      });
      img.addEventListener("error", () => {
        if (++loaded === imgs.length) cb();
      });
    }
  });
}

afterImages(() => {
  setEndShift();
});
window.addEventListener("resize", setEndShift);

/* ==== PROJECT CARD DETAIL TOGGLE ==== */
document.querySelectorAll(".card .more-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const card = e.currentTarget.closest(".card");
    card.classList.toggle("open");
  });
});

/* ===== Theme Toggle (persist to localStorage) ===== */
(function () {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const root = document.documentElement;
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
  btn.textContent = root.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";

  btn.addEventListener("click", () => {
    const cur = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", cur);
    localStorage.setItem("theme", cur);
    btn.textContent = cur === "dark" ? "☀️" : "🌙";
  });
})();

(function () {
  const ids = ["hero", "projects", "sectionPin", "mosaic", "about", "contact"];
  const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
  const linkMap = new Map(
    ids.map((id) => [
      id,
      document.querySelector(`.scroll-nav .spy[href="#${id}"]`),
    ])
  );

  document.querySelectorAll(".scroll-nav .spy").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = a.getAttribute("href").slice(1);
      const el = document.getElementById(targetId);
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${targetId}`);
    });
  });

  let activeId = null;
  const setActive = (id) => {
    if (activeId === id) return;
    activeId = id;
    document
      .querySelectorAll(".scroll-nav .spy")
      .forEach((n) => n.classList.remove("active"));
    const link = linkMap.get(id);
    if (link) link.classList.add("active");
  };

  // rootMargin:
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    {
      root: null,
      rootMargin: "-45% 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((sec) => io.observe(sec));

  window.addEventListener("load", () => {
    const hash = location.hash?.slice(1);
    if (hash && linkMap.get(hash)) setActive(hash);
  });
})();

// === Lightbox Carousel ===
const dlg = document.getElementById("lightbox");
const entries = document.getElementById("carouselEntries");
const markers = document.getElementById("carouselMarkers");
const carouselRoot = dlg.querySelector('[data-component="carousel"]');

// Get all photos in sectionPin
const photoImgs = Array.from(
  document.querySelectorAll("#sectionPin .slide img")
);

// Open dialog when click photo
photoImgs.forEach((img, idx) => {
  img.style.cursor = "zoom-in";
  img.addEventListener("click", () => openCarousel(idx));
});

function openCarousel(startIndex = 0) {
  const sources = photoImgs.map((el) => el.currentSrc || el.src);

  // build content
  entries.innerHTML = "";
  markers.innerHTML = "";
  const n = sources.length;
  carouselRoot.style.setProperty("--n", n);
  carouselRoot.style.setProperty("--step", `calc(100% / ${n})`);

  sources.forEach((src, i) => {
    const id = `c_${i}`;
    const li = document.createElement("li");
    li.id = id;
    li.innerHTML = `<img src="${src}" alt="Photo ${i + 1}" draggable="false">`;
    entries.appendChild(li);

    const mi = document.createElement("li");
    mi.innerHTML = `<a href="#${id}" aria-label="Photo ${i + 1}"></a>`;
    mi.querySelector("a").style.setProperty("--i", i + 1);
    markers.appendChild(mi);
  });

  dlg.showModal();

  // scroll to image
  document.getElementById(`c_${startIndex}`).scrollIntoView({
    behavior: "instant",
    inline: "center",
    block: "nearest",
  });

  // accessibility: ESC to close
  dlg.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Escape") dlg.close();
    },
    { once: true }
  );
}

// close button
dlg.querySelector(".close").addEventListener("click", () => dlg.close());
