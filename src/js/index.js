import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchPhotos, createCards } from './functions';

const search = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const buttonContainer = document.querySelector('.button-container');

search.addEventListener('submit', ev => {
  ev.preventDefault();
  gallery.innerHTML = ``;
  buttonContainer.innerHTML = ``;
  const page = 1;
  const perPage = 40;
  const searchTerm = ev.currentTarget.elements.searchQuery.value;

  searchPhotos(searchTerm)
    .then(data => {
      if (searchTerm === lastSearchTerm) {
        const elements = data.hits;
        console.log(data.totalHits);
        if (elements.length === 0) {
          Notify.info(
            `Sorry, there are no images matching your search query. Please try again.`
          );
        } else {
          createCards(elements);
          if (data.totalHits > perPage) {
            const loadButton = document.createElement(`button`);
            loadButton.classList.add(`load-more`);
            loadButton.innerText = `Load more`;
            loadButton.type = 'button';
            buttonContainer.appendChild(loadButton);
          } else if (perPage > data.totalHits) {
            Notify.info(
              `We're sorry, but you've reached the end of search results.`
            );
          }
        }
      }
    })
    .catch(error => {
      console.error('Wystąpił błąd:', error);
    });
  lastSearchTerm = searchTerm;
});

loadButton.addEventListener(`click`, () => {
  page = +1;
  createCards(elements);
});
