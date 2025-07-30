document.addEventListener('DOMContentLoaded', function() {
    const profBtn = document.getElementById('profBtn');
    const card = document.getElementById('cardSec');

    profBtn.addEventListener('click', function() {
        if (card.style.display == 'none') {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});