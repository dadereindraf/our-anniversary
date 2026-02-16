window.addEventListener("DOMContentLoaded", () => {
  /* =========================
     INTRO SCREEN
  ========================== */
  const introScreen = document.getElementById("intro-screen");
  const enterBtn = document.getElementById("enter-btn");
  const bgMusic = document.getElementById("bg-music");

  if (enterBtn && introScreen) {
    enterBtn.addEventListener("click", () => {
      document.body.classList.remove("blur");
      introScreen.style.opacity = "0";
      introScreen.style.pointerEvents = "none";

      setTimeout(() => {
        introScreen.style.display = "none";
      }, 800);

      if (bgMusic) {
        bgMusic.volume = 0.3;
        bgMusic.play().catch(() => {});
      }
    });
  }

  /* =========================
     FADE IN ON SCROLL
  ========================== */
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 },
  );

  document.querySelectorAll(".fade-in").forEach((el) => {
    observer.observe(el);
  });

  /* =========================
     TYPING EFFECT (clean)
  ========================== */
  const typingText = document.getElementById("typing-text");

  if (typingText) {
    const message =
      "Three years with you feels like a beautiful dream I never want to wake up from. 💖 Thank you for being my happiness, my safe place, and my forever.";

    let index = 0;
    typingText.innerHTML = "";

    function type() {
      if (index < message.length) {
        typingText.innerHTML += message.charAt(index);
        index++;
        setTimeout(type, 35);
      }
    }

    setTimeout(type, 1200);
  }

  /* =========================
     AUTO GALLERY
  ========================== */
  const totalPhotos = 23;
  const galleryContainer = document.getElementById("gallery-container");

  if (galleryContainer) {
    for (let i = 1; i <= totalPhotos; i++) {
      const img = document.createElement("img");
      img.src = `assets/img/${i}.jpg`;
      img.className = "gallery-img fade-in";
      galleryContainer.appendChild(img);
      observer.observe(img);

      img.addEventListener("click", () => {
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.innerHTML = `<img src="${img.src}" class="full-img">`;
        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {
          overlay.remove();
        });
      });
    }
  }

  /* =========================
   COUNTDOWN (modern style)
========================== */
  const countDownDate = new Date("Feb 19, 2026 00:00:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      document.querySelector(".countdown").innerHTML =
        "<h2>Happy Anniversary 💖</h2>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* =========================
     FLOATING HEARTS (soft & elegant)
  ========================== */
  const heartsContainer = document.querySelector(".hearts-container");

  if (heartsContainer) {
    function createHeart() {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = "❤";

      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 8 + Math.random() * 4 + "s";
      heart.style.fontSize = 14 + Math.random() * 14 + "px";
      heart.style.opacity = 0.4;

      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 10000);
    }

    setInterval(createHeart, 2500);
  }

  /* =========================
     CONFETTI (modern & clean)
  ========================== */
  const canvas = document.getElementById("confetti-canvas");
  const celebrateBtn = document.getElementById("celebrate-btn");

  if (canvas && celebrateBtn) {
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animationId;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function startConfetti() {
      particles = [];

      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -20,
          size: Math.random() * 8 + 4,
          speedY: Math.random() * 3 + 2,
          speedX: Math.random() * 2 - 1,
          rotation: Math.random() * 360,
          color: `hsl(${Math.random() * 360}, 100%, 60%)`,
        });
      }

      animate();
      setTimeout(stopConfetti, 2500);
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });

      animationId = requestAnimationFrame(animate);
    }

    function stopConfetti() {
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    celebrateBtn.addEventListener("click", startConfetti);
  }
  /* =========================
   SURPRISE POPUP
========================== */
  const popup = document.getElementById("surprise-popup");
  const closePopup = document.getElementById("close-popup");
  const openSurprise = document.getElementById("open-surprise");

  // otomatis muncul 5 detik setelah masuk
  setTimeout(() => {
    if (popup) popup.classList.add("active");
  }, 5000);

  if (closePopup) {
    closePopup.addEventListener("click", () => {
      popup.classList.remove("active");
    });
  }

  if (openSurprise) {
    openSurprise.addEventListener("click", () => {
      popup.classList.add("active");
    });
  }
});
