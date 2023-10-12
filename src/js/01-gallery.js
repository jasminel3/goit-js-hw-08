// Add imports above this line
// Descris în documentație
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { galleryItems } from "./gallery-items";
// Change code below this line
const ulList = document.querySelector(".gallery");

galleryItems.forEach((item) => {
  const liElement = document.createElement("li");
  liElement.innerHTML = `<a class="gallery__link" href="${item.original}">
    <img
      class="gallery__image"
      src="${item.preview}"
      data-source="${item.original}"
      alt="${item.description}"
    />
  </a>`;
  ulList.append(liElement);
});

ulList.addEventListener("click", nextImg);
function nextImg(event) {
  event.preventDefault();
  if (event.target && event.target.nodeName === "IMG") {
    lightbox.open(lightbox.elements.indexOf(event.target.parentElement));
  }
}
var lightbox = new SimpleLightbox(".gallery a", {
  captionPosition: "bottom",
  captionsData: "alt",
  captionDelay: 250,
});
console.log(galleryItems);
