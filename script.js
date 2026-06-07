document.addEventListener('DOMContentLoaded', function () {

    // Birthday card section toggle
    const profBtn = document.getElementById('profBtn');
    const card = document.getElementById('cardSec');

    profBtn.addEventListener('click', function () {

        if (card.style.display === 'none') {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }

    });

    // Portfolio gallery
    fetch("metadata.json")
        .then(response => response.json())
        .then(data => {

            const gallery = document.getElementById("gallery");
            const tabs = document.getElementById("categoryTabs");

            function renderGallery(selectedCategory) {

                gallery.innerHTML = "";

                data.forEach(item => {

                    if (
                        selectedCategory !== "All Work" &&
                        item.category !== selectedCategory
                    ) {
                        return;
                    }

                    const card = document.createElement("div");
                    card.className = "art-card";

                    card.innerHTML = `
                        <img class="art-image"
                             src="gallery/${item.file}"
                             data-full="gallery/${item.file}">

                        <h2>${item.title}</h2>
                        <h3>${item.date}</h3>
                        <p>${item.description}</p>
                    `;

                    gallery.appendChild(card);

                });

                setupLightbox();

            }

            // Build category buttons
            const categories = [
                "All Work",
                ...new Set(data.map(item => item.category))
            ];

            categories.forEach(category => {

                const button = document.createElement("button");

                button.className = "category-button";
                button.textContent = category;

                button.addEventListener("click", () => {

                    renderGallery(category);

                    document
                        .querySelectorAll(".category-button")
                        .forEach(btn =>
                            btn.classList.remove("active-category")
                        );

                    button.classList.add("active-category");

                });

                tabs.appendChild(button);

            });

            tabs.firstChild.classList.add("active-category");
            renderGallery("All Work");

        })
        .catch(error => console.error(error));

    // Lightbox
    function setupLightbox() {

        const images = document.querySelectorAll(".art-image");
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        const closeBtn = document.getElementById("close-lightbox");

        images.forEach(img => {

            img.onclick = () => {

                lightbox.style.display = "flex";
                lightboxImg.src = img.dataset.full;

            };

        });

        closeBtn.onclick = () => {

            lightbox.style.display = "none";

        };

        lightbox.onclick = (e) => {

            if (e.target === lightbox) {
                lightbox.style.display = "none";
            }

        };

    }

});