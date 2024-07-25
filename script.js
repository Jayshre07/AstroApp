// var apiPaths ={
//     channelsSunTatasky,
//     latestrecentEpisodesSmartNewUI

// }

// var res = {};
var apiUrl =
  `https://api.sunnxt.com/content/v2/carousel/channelsSunTatasky?fields=contents,images,globalServiceId,generalInfo,publishingHouse,packages,subtitles,previews,relatedCast,relatedMedia&startIndex=1&count=10&language=tamil,telugu,malayalam,kannada,bengali,marathi&pretty=1&sss-man=1721882977971`;

var headers = {
  accept: "*/*",
  clientkey: "5c61ffb3dddd1109338710d066410440d993fd161910e3b5438a58a12b6207aa",
  contentlanguage: "tamil,telugu,malayalam,kannada,bengali,marathi",
  origin: "https://ottapps.revlet.net/",
  "user-agent":
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  "x-myplex-platform": "SamsungTV",
};

function createImageElement(src) {
  var imgElement = document.createElement("img");
  imgElement.src = src;
  imgElement.classList.add("thumbnail");
  return imgElement;
}

function updateSelection(currentIndex, carouselItems) {
  if (carouselItems.length === 0) {
    console.error("No carousel items to update selection.");
    return;
  }
  for (var i = 0; i < carouselItems.length; i++) {
    carouselItems[i].classList.remove("selected");
  }
  if (currentIndex >= 0 && currentIndex < carouselItems.length) {
    carouselItems[currentIndex].classList.add("selected");
  } else {
    console.error("Current index is out of bounds.");
  }
}

function setupCarousel(data) {
  var carousel = document.getElementById("carousel");
  if (!carousel) {
    console.error("Carousel element not found.");
    return;
  }
  carousel.innerHTML = "";

  for (var i = 0; i < data.length; i++) {
    if (data[i] && data[i].link) {
      var imgElement = createImageElement(data[i].link);
      carousel.appendChild(imgElement);
    }
  }

  var carouselItems = carousel.children;
  if (carouselItems.length > 0) {
    var currentIndex = 0;
    updateSelection(currentIndex, carouselItems);

    document.onkeydown = function (e) {
      switch (e.key) {
        case "ArrowLeft":
          if (currentIndex > 0) {
            currentIndex--;
          }
          break;
        case "ArrowRight":
          if (currentIndex < carouselItems.length - 1) {
            currentIndex++;
          }
          break;
      }
      updateSelection(currentIndex, carouselItems);
    };
  } else {
    console.error("No images to display in the carousel.");
  }
}

var xhr = new XMLHttpRequest();
xhr.open("GET", apiUrl, true);
for (var key in headers) {
  xhr.setRequestHeader(key, headers[key]);
}
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    var response = JSON.parse(xhr.responseText);
    var n1 = response.results.map(function (item) {
      var matchingImage = null;

      // Iterate over the values in the images object
      for (var key in item.images.values) {
        var img = item.images.values[key];
        if (img.profile === "xhdpi" && img.type === "squareimage") {
          matchingImage = img;
          break; // Exit loop once the first matching image is found
        }
      }

      // Return the matching image URL or null if not found
      return matchingImage ? { link: matchingImage.link } : null;
    });

    // Filter out null entries before passing to setupCarousel
    n1 = n1.filter(function (image) {
      return image !== null;
    });

    setupCarousel(n1);
  } else if (xhr.readyState === 4) {
    console.error("Failed to fetch data from the API");
  }
};

xhr.send();
