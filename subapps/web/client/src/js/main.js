(() => {
    document.querySelectorAll('[data-toggle]').forEach((btn) => {
        btn.addEventListener('click', function (ev) {
            const { toggle, toggleClass } = this.dataset;
            document.querySelectorAll(toggle).forEach((targ) => targ.classList.toggle(toggleClass));
        });
    });
})();