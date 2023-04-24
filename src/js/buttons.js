import refs from './refs.js';
import { getImages } from './getImages.js';
import { renderImageContainer } from './renderImageContainer.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { slowScrolling } from './slowScrolling.js';

let page = 1;
let lightBox = new SimpleLightbox('.photo-card-link', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

export async function onSubmit(evt) {
  evt.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';

  try {
    const resp = await getImages();
    if (resp.data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success(`Hooray! We found ${resp.data.totalHits} images.`);
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        renderImageContainer(resp.data.hits)
      );

      refs.loadMoreBtn.style.display = 'block';
      lightBox.refresh();
      slowScrolling();
    }
  } catch (error) {
    console.log(error);
  }
}

export async function onLoadMoreClick(evt) {
  evt.preventDefault();
  page += 1;

  try {
    const resp = await getImages(page);
    if (page * 40 >= resp.data.totalHits) {
      refs.loadMoreBtn.style.display = 'none';
      Notify.info("We're sorry, but you've reached the end of search results.");
    }
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      renderImageContainer(resp.data.hits)
    );
    lightBox.refresh();
    slowScrolling();
  } catch (error) {
    console.error(error);
    Notify.failure('Failed to load more images. Please try again later.');
  }
}
