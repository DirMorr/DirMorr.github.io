document.addEventListener('DOMContentLoaded', function () {

    // ==========================
    // Section Buttons
    // ==========================

    const profBtn = document.getElementById('profBtn');

    const linksBtn = document.getElementById('linksBtn');
    const portfolioBtn = document.getElementById('portfolioBtn');
    const cardBtn = document.getElementById('cardBtn');

    const linksSec = document.getElementById('linksSec');
    const portfolioSec = document.getElementById('portfolioSec');
    const cardSec = document.getElementById('cardSec');

    function clearViewButtons() {

        document
            .querySelectorAll(".view-button")
            .forEach(btn => btn.classList.remove("active-view"));

    }

    function showSection(sectionToShow) {

        linksSec.style.display = "none";
        portfolioSec.style.display = "none";
        cardSec.style.display = "none";

        sectionToShow.style.display = "flex";

    }

    // Links
    linksBtn.addEventListener("click", () => {

        showSection(linksSec);

        clearViewButtons();
        linksBtn.classList.add("active-view");

    });

    // Portfolio
    portfolioBtn.addEventListener("click", () => {

        showSection(portfolioSec);

        clearViewButtons();
        portfolioBtn.classList.add("active-view");

    });

    // Birthday Cards
    cardBtn.addEventListener("click", () => {

        showSection(cardSec);

        clearViewButtons();
        cardBtn.classList.add("active-view");

    });

    // Profile picture reveals Birthday Cards button
    profBtn.addEventListener("click", () => {

        cardBtn.style.display = "block";

        showSection(cardSec);

        clearViewButtons();
        cardBtn.classList.add("active-view");

    });

    // ==========================
    // Portfolio
    // ==========================

    fetch("metadata.json")
        .then(response => response.json())
        .then(data => {

            const gallery = document.getElementById("gallery");
            const tabs = document.getElementById("categoryTabs");

            function renderGallery(selectedCategory) {

                gallery.innerHTML = "";

                data.forEach(item => {

                    if (item.category !== selectedCategory) {
                        return;
                    }

                    const card = document.createElement("div");
                    card.className = "art-card";

                    card.innerHTML = `
                        <img
                            class="art-image"
                            src="gallery/${item.file}"
                            data-full="gallery/${item.file}"
                        >

                        <h2>${item.title}</h2>
                        <h3>${item.date}</h3>
                        <p>${item.description}</p>
                    `;

                    gallery.appendChild(card);

                });

                setupLightbox();

            }

            // Create category buttons
            const categories = [...new Set(data.map(item => item.category))];

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

            // Default category
            if (tabs.firstChild) {
                tabs.firstChild.classList.add("active-category");
                renderGallery(categories[0]);
            }

        })
        .catch(error => console.error(error));

    // ==========================
    // Lightbox
    // ==========================

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