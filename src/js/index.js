import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchPhotos, createCards, loadMore } from './functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const search = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const buttonContainer = document.querySelector('.button-container');
let loadButton;
let lastSearchTerm;

search.addEventListener('submit', async ev => {
  ev.preventDefault();
  gallery.innerHTML = ``;
  buttonContainer.innerHTML = ``;
  let page = 1;
  let perPage = 40;
  const searchTerm = ev.currentTarget.elements.searchQuery.value;
  lastSearchTerm = searchTerm;

  try {
    const data = await searchPhotos(lastSearchTerm, page);
    if (searchTerm === lastSearchTerm) {
      const elements = data.hits;
      const totalHits = data.totalHits;
      if (elements.length === 0) {
        Notify.info(
          `Sorry, there are no images matching your search query. Please try again.`
        );
      } else {
        Notify.success(`Hooray! We found ${totalHits} images.`);
        createCards(elements);
      }

      if (totalHits > perPage) {
        loadButton = document.createElement(`button`);
        loadButton.classList.add(`load-more`);
        loadButton.innerText = `Load more`;
        loadButton.type = 'button';
        buttonContainer.appendChild(loadButton);
        loadButton.addEventListener(`click`, () => {
          loadMore(lastSearchTerm, page);
          page++;
        });
      }
    }
  } catch (error) {
    console.error('Wystąpił błąd:', error);
  }
});

gallery.addEventListener('click', function (event) {
  event.preventDefault();

  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionSelector: 'img',
    captionPosition: 'bottom',
  });
  lightbox.refresh();
});
