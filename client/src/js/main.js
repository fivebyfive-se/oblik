(() => {
    const spinners = document.querySelectorAll('[data-spinner]');
    const spinAnimations = [];
    spinners.forEach((element) => {
        const { spinner } = element.dataset;
        const texts = spinner.split('|');
        element.textContent = texts[0];
        spinAnimations.push({
            element,
            texts,
            currentWord: 0,
            currentChar: texts[0].length,
            direction: 1,
            delay: 0,
        });
    });

    let start = 0;
    const animate = (t) => {
        const diff = Math.min(Math.abs(t - start), 20);
            start = t;
        spinAnimations.forEach(anim => {
            if (anim.delay <= 0) {
                const currentWord = anim.texts[anim.currentWord];

                anim.element.classList.remove('done');
                anim.currentChar += anim.direction;
                anim.element.textContent = currentWord.slice(0, anim.currentChar);
                anim.delay = diff * 10;
    
                if (anim.currentChar === currentWord.length + 1) {
                    anim.direction = -1;
                    anim.delay = diff * 100;
                    anim.element.classList.add('done');
                } else if (anim.currentChar === 0) {
                    anim.currentWord = (anim.currentWord + 1) % anim.texts.length;
                    anim.direction = 1;
                }
            }
            anim.delay = Math.max(0, anim.delay - Math.abs(diff));
        });

        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
})();