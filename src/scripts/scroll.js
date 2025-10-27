const navbar = document.querySelector('#header');
const extra = document.querySelectorAll('.extra');

window.addEventListener("scroll", () => {
    if (window.scrollY > 150) {
        extra.forEach(element => element.style.display = 'none')
    }
})
