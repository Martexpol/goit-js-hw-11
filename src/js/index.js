import axios from 'axios';
// import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { searchImages } from 'pixabay-api';

console.log('check');

//funkcja wyszukiwarki
async function searchImages(searchTerm) {
  const url = `https://pixabay.com/api/?key=43633313-2d57b2d2b488e671d86985190&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`;
  console.log(params.toString());
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Wystąpił błąd podczas wyszukiwania:', error);
    throw error;
  }
}

//wyszukiwanie
const search = document.querySelector('.search-form');

search.addEventListener('submit', ev => {
  ev.preventDefault();
  const searchTerm = ev.currentTarget.elements.searchQuery.value;
  console.log(`searchTerm to: ${searchTerm}`);

  searchImages(searchTerm)
    .then(data => {
      console.log('Wyniki wyszukiwania:', data);
    })
    .catch(error => {
      console.error('Wystąpił błąd:', error);
    });
});

// `https://pixabay.com/api/?key=43633313-2d57b2d2b488e671d86985190&q=${searchTerm}&image_type=photo&orientation=horizontal&safesearch=true`
