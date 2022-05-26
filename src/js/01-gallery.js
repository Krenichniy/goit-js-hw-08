// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  gallery: document.querySelector('.gallery'),
};

function createGalleryMarkup() {
  const galleryGrid = galleryItems
    .map(({ preview, original, description }) => {
      return `
           <li class="gallery__item " style="list-style: none;">
        <a  href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            alt="${description}"
            title="${description}"
          />
        </a>
      </li>`;
    })
    .join('');

  refs.gallery.insertAdjacentHTML('afterbegin', galleryGrid);
}

createGalleryMarkup();

new SimpleLightbox('.gallery a', {
  captionDelay: 250,
});

// Change code below this line

console.log(galleryItems);
