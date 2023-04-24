export function renderImageContainer(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
      <a href="${largeImageURL}" class="photo-card-link">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">${likes}
          <b>Likes</b>
        </p>
        <p class="info-item">${views}
          <b>Views</b>
        </p>
        <p class="info-item">${comments}
          <b>Comments</b>
        </p>
        <p class="info-item">${downloads}
          <b>Downloads</b>
        </p>
      </div>
      </a>
    </div>`
    )
    .join('');
  return markup;
}
