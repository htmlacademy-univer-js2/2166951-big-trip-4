import { SortType } from '../const';
import { render } from '../framework/render';
import { SortView } from '../view';

export default class SortPresenter {
  #container = null;

  #sortComponent = null;
  #handleSortChange = null;
  #currentSortType = SortType.DAY;

  constructor({ container, handleSortChange }) {
    this.#container = container;
    this.#handleSortChange = handleSortChange;
  }

  init() {
    this.#sortComponent = new SortView({
      sortType: this.#currentSortType,
      onSortChange: this.#onSortChange,
    });

    render(this.#sortComponent, this.#container);
  }

  #onSortChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#handleSortChange(sortType);
  };
}
