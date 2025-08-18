const lightbox = document.getElementById("lightbox");
const image = document.querySelector(".lightbox-img");
const close = document.querySelector(".lightbox .close");

document.querySelectorAll(".image").forEach(item => {
    item.addEventListener("click", () => {
        const img = item.querySelector("img");
        lightbox.style.display = "flex";
        image.src = img.src;
        image.alt = img.alt;
    });
});

close.addEventListener("click", () => {
    lightbox.style.display = "none";
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
    }
})