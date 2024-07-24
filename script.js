var carouselIndex = 0;
var episodesIndex = 0;

function updateSelection() {
    var carouselItems = document.getElementById('carousel').children;
    var episodesItems = document.getElementById('latest-episodes').children;

    for (var i = 0; i < carouselItems.length; i++) {
        carouselItems[i].classList.remove('selected');
    }
    for (var j = 0; j < episodesItems.length; j++) {
        episodesItems[j].classList.remove('selected');
    }

    carouselItems[carouselIndex].classList.add('selected');
    episodesItems[episodesIndex].classList.add('selected');
}

document.onkeydown = function(e) {
    var carouselItems = document.getElementById('carousel').children;
    var episodesItems = document.getElementById('latest-episodes').children;

    switch (e.key) {
        case 'ArrowLeft':
            if (carouselIndex > 0) {
                carouselIndex--;
            }
            break;
        case 'ArrowRight':
            if (carouselIndex < carouselItems.length - 1) {
                carouselIndex++;
            }
            break;
        case 'ArrowUp':
            if (episodesIndex > 0) {
                episodesIndex--;
            }
            break;
        case 'ArrowDown':
            if (episodesIndex < episodesItems.length - 1) {
                episodesIndex++;
            }
            break;
    }
    updateSelection();
};

updateSelection(); // Initial selection
