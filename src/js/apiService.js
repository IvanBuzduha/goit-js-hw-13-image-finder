const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '21124678-0d24ae1c4ddebba156f36dfb4';

export default class ImageApiService {
  constructor() {
    this.searchQuery = ''; 
    this.page = 1;
  }

  async fetchImage() {
      // console.log(this);
    const responseUrl = await fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    );

    const { hits: images } = await responseUrl.json();
    this.incrementPage();

    return images;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}