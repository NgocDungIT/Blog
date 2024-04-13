window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function () {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if (currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (
                currentTop > headerHeight &&
                !mainNav.classList.contains('is-fixed')
            ) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const allBtns = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchClose = document.getElementById('searchClose');

    for (var i = 0; i < allBtns.length; i++) {
        allBtns[i].addEventListener('click', () => {
            searchBar.style.visibility = 'visible';
            searchBar.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
        });
    }

    searchClose.addEventListener('click', () => {
        searchBar.style.visibility = 'hidden';
        searchBar.classList.remove('open');
        this.setAttribute('aria-expanded', 'false');
    });
});
