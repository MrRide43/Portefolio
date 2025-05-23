document.addEventListener("DOMContentLoaded", () => {
  const roomsContainer = document.querySelector(".rooms");
  const prevButton = document.querySelector(".rooms_navigation.prev");
  const nextButton = document.querySelector(".rooms_navigation.next");

  if (roomsContainer && prevButton && nextButton) {
    const scrollAmount =
      roomsContainer.querySelector(".room").offsetWidth +
      parseFloat(getComputedStyle(roomsContainer).gap || "0");

    const smoothScroll = (target, duration) => {
      const start = roomsContainer.scrollLeft;
      const distance = target - start;
      let startTime = null;

      const ease = (t) => t * t * (3 - 2 * t); // Easing quadratique pour un mouvement naturel

      const step = (timestamp) => {
        if (startTime === null) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1); // Limite à 1 pour éviter dépassement
        const easedProgress = ease(progress);

        roomsContainer.scrollLeft = start + distance * easedProgress;

        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };

      requestAnimationFrame(step);
    };

    prevButton.addEventListener("click", () => {
      const target = Math.max(0, roomsContainer.scrollLeft - scrollAmount); // Évite de dépasser à gauche
      smoothScroll(target, 500); // Animation de 500ms (0,5 seconde)
    });

    nextButton.addEventListener("click", () => {
      const maxScroll = roomsContainer.scrollWidth - roomsContainer.clientWidth;
      const target = Math.min(
        maxScroll,
        roomsContainer.scrollLeft + scrollAmount
      ); // Évite de dépasser à droite
      smoothScroll(target, 500); // Animation de 500ms (0,5 seconde)
    });
  }

  //code pour animation de scroll sur les sections
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { thresold: 0.6 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

  //code pour animation FAQ

document.addEventListener("DOMContentLoaded", function() {
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
    // Basculer la classe active sur le conteneur de l'item FAQ
    item.classList.toggle('active');
    });
});
});

  //code pour Menu burger 

document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById('burger-menu');
  const navLinks = document.getElementById('nav-links');

  burger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
  });
});
  