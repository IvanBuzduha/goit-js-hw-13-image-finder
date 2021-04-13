import ImageApiService from './apiService.js';

import 'material-design-icons/iconfont/material-icons.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

import photoCardTemplates from '../templates/photoCardTemplates.hbs';

import { onGalleryElClick } from './modal.js';
import LoadMoreBtn from './loadMore.js';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  loadMore: '[data-action="load-more"]',
  hidden: true,
});

const imageApiService = new ImageApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onGalleryElClick);



function onSearch(e) {
  e.preventDefault();

  clearGalleryContainer();
  imageApiService.query = e.currentTarget.elements.query.value;

  if (imageApiService.query === '') {
    loadMoreBtn.disable();
    return noResults();
  }

  loadMoreBtn.show();
  imageApiService.resetPage();
  fetchCards();
}

function fetchCards() {
  loadMoreBtn.disable();
  return imageApiService.fetchImage().then(cards => {
    renderMarkup(cards);

 scrollPage();
    loadMoreBtn.enable();

    if (cards.length === 0) {
      loadMoreBtn.hide();
      noMatchesFound();
    }
  });
}

function onLoadMore() {
  fetchCards();
}

function renderMarkup(add) {
  refs.gallery.insertAdjacentHTML('beforeend', photoCardTemplates(add));
}

function clearGalleryContainer() {
  refs.gallery.innerHTML = '';
}

function noMatchesFound() {
  error({
    text: 'No matches found. Please enter another query!',
    delay: 2000,
  });
}

function noResults() {
  error({
    text: 'Please enter something!',
    delay: 2000,
  });
}

function scrollPage() {
  try {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 500);
  } catch (error) {
    console.log(error);
  }
}



