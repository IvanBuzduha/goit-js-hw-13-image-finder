export default class LoadMoreBtn {
  constructor({ loadMore, hidden = false }) {
    this.refs = this.getRefs(loadMore);

    hidden && this.hide();
  }

  getRefs(loadMore) {
    const refs = {};
    refs.button = document.querySelector(loadMore);
    refs.label = refs.button.querySelector('.label');
    refs.loader=refs.button.querySelector('.loader')

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Load more';
    this.refs.loader.classList.add('is-hidden');
  }

  disable() {
    this.refs.button.disabled = true;
    this.refs.label.textContent = 'Loading';
    this.refs.loader.classList.remove('is-hidden');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}