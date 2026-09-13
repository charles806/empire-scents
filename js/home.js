// AkuSparkle - Homepage behaviors
// FAQ accordion + auto logo swap when images/akusparkle-logo.png is added

document.addEventListener('DOMContentLoaded', function() {
    Homepage.init();
});

const Homepage = {
    init() {
        this.initFaq();
        this.initLogo();
    },

    initFaq() {
        document.querySelectorAll('.faq-question').forEach(button => {
            button.addEventListener('click', () => {
                const item = button.closest('.faq-item');
                const answer = item.querySelector('.faq-answer');
                const isOpen = item.classList.contains('open');

                document.querySelectorAll('.faq-item.open').forEach(other => {
                    other.classList.remove('open');
                    other.querySelector('.faq-answer').style.maxHeight = null;
                    other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                });

                if (!isOpen) {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    button.setAttribute('aria-expanded', 'true');
                }
            });
        });
    },

    initLogo() {
        const logo = document.getElementById('siteLogo');
        if (!logo) return;

        const img = new Image();
        img.onload = () => { logo.textContent = ''; logo.appendChild(img); };
        img.src = 'images/akusparkle-logo.png';
    }
};