document.addEventListener('DOMContentLoaded', () => {
    const roomsContainer = document.querySelector('.rooms');
    const prevButton = document.querySelector('.rooms_navigation.prev');
    const nextButton = document.querySelector('.rooms_navigation.next');

    if (roomsContainer && prevButton && nextButton) {
        const scrollAmount = roomsContainer.querySelector('.room').offsetWidth + parseFloat(getComputedStyle(roomsContainer).gap || '0');

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

                roomsContainer.scrollLeft = start + (distance * easedProgress);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } 
            };

            requestAnimationFrame(step);
        };

        prevButton.addEventListener('click', () => {
            const target = Math.max(0, roomsContainer.scrollLeft - scrollAmount); // Évite de dépasser à gauche
            smoothScroll(target, 500); // Animation de 500ms (0,5 seconde)
        });

        nextButton.addEventListener('click', () => {
            const maxScroll = roomsContainer.scrollWidth - roomsContainer.clientWidth;
            const target = Math.min(maxScroll, roomsContainer.scrollLeft + scrollAmount); // Évite de dépasser à droite
            smoothScroll(target, 500); // Animation de 500ms (0,5 seconde)
        });
    }
});