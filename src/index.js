import './css/styles.css';
import refs from './js/refs.js';
import { onSubmit } from './js/buttons';
// import { onLoadMoreClick } from './js/buttons';

// refs.loadMoreBtn.style.display = 'none';
refs.searchForm.addEventListener('submit', onSubmit);
// refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);
