window.addEventListener("DOMContentLoaded", () => {

  /* ===== Intro Screen ===== */
  const introScreen = document.getElementById("intro-screen");
  const enterBtn = document.getElementById("enter-btn");
  const bgMusic = document.getElementById("bg-music");

  if (enterBtn && introScreen) {
    enterBtn.addEventListener("click", () => {
      introScreen.classList.add("hide");

      // play music setelah klik
      bgMusic.volume = 0.3;
      bgMusic.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
    });
  }

  /* ===== Fade-in ===== */
  const faders = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });
  faders.forEach((el) => observer.observe(el));

  /* ===== Gallery Auto ===== */
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
        overlay.addEventListener("click", () => overlay.remove());
      });
    }
  }

  /* ===== Countdown ===== */
  const countDownDate = new Date("Feb 16, 2027 00:00:00").getTime();
  const countdownEl = document.getElementById("countdown");

  if (countdownEl) {
    setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        countdownEl.innerText = "Happy Anniversary 💖";
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownEl.innerText =
        `${days}d ${hours}h ${minutes}m ${seconds}s until our next anniversary`;
    }, 1000);
  }

  /* ===== Floating Hearts ===== */
  const heartsContainer = document.querySelector(".hearts-container");

  if (heartsContainer) {
    function createHeart() {
      const heart = document.createElement("div");
      heart.classList.add("heart");
      heart.innerHTML = "❤";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 6 + Math.random() * 4 + "s";
      heart.style.fontSize = 15 + Math.random() * 20 + "px";
      heartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 9000);
    }

    setInterval(createHeart, 1500);
  }

  /* ===== Confetti (only on click) ===== */
  const canvas = document.getElementById("confetti-canvas");
  const celebrateBtn = document.getElementById("celebrate-btn");

  if (canvas && celebrateBtn) {
    const ctx = canvas.getContext("2d");
    let confetti = [];
    let animationId;

    function startConfetti() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      confetti = [];

      for (let i = 0; i < 120; i++) {
        confetti.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 6 + 2,
          d: Math.random() * 120,
          color: `hsl(${Math.random() * 360},100%,60%)`,
          tilt: Math.random() * 10 - 10,
        });
      }

      animateConfetti();
      setTimeout(stopConfetti, 3000);
    }

    function animateConfetti() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((c, i) => {
        ctx.beginPath();
        ctx.lineWidth = c.r;
        ctx.strokeStyle = c.color;
        ctx.moveTo(c.x + c.tilt + c.r / 2, c.y);
        ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 2);
        ctx.stroke();

        c.y += Math.cos(c.d) + 1 + c.r / 2;
        c.x += Math.sin(c.d);
        c.tilt = Math.sin(c.d);

        if (c.y > canvas.height) {
          confetti[i].y = -10;
          confetti[i].x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animateConfetti);
    }

    function stopConfetti() {
      cancelAnimationFrame(animationId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    celebrateBtn.addEventListener("click", () => {
      startConfetti();
    });
  }

});
