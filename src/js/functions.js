import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const page = 1;
const perPage = 40;

export async function searchPhotos(searchTerm) {
  const url = `https://pixabay.com/api/?key=43633313-2d57b2d2b488e671d86985190&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Wystąpił błąd podczas wyszukiwania:', error);
    throw error;
  }
}

export function createCards(elements) {
  const gallery = document.querySelector('.gallery');
  elements.forEach(element => {
    const webformatURL = element.webformatURL;
    const largeImageURL = element.largeImageURL;
    const tags = element.tags;
    const likes = element.likes;
    const views = element.views;
    const comments = element.comments;
    const downloads = element.downloads;

    const card = document.createElement(`div`);
    card.classList.add('card');
    card.innerHTML = `<div class="photo-container"><img src="${webformatURL}" alt="${tags}" loading="lazy" class="photo"/></div>
      <div class="info">
        <div class="info-item">
          <b>Likes</b>
          ${likes}
        </div>
        <div class="info-item">
          <b>Views</b>
          ${views}
        </div>
        <div class="info-item">
          <b>Comments</b>
          ${comments}
        </div>
        <div class="info-item">
          <b>Downloads</b>
          ${downloads}
        </div>
      </div>`;
    gallery.appendChild(card);
  });
}
