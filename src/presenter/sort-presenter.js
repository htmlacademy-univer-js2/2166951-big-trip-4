import { EnabledSortType, SortType } from '../const';
import { render, replace, remove } from '../framework/render';
import { SortView } from '../view';

export default class SortPresenter {
  #container = null;
  #sortComponent = null;
  #handleSortChange = null;
  #currentSortType = null;

  constructor({ container, currentSortType, handleSortChange }) {
    this.#container = container;
    this.#currentSortType = currentSortType;
    this.#handleSortChange = handleSortChange;
  }

  get sortItems() {
    return Object.values(SortType).map((type) => ({
      type,
      isChecked: type === this.#currentSortType,
      isDisabled: !EnabledSortType[type],
    }));
  }

  init() {
    const prevSortComponent = this.#sortComponent;

    this.#sortComponent = new SortView({
      items: this.sortItems,
      onItemChange: this.#onSortChange,
    });

    if (!prevSortComponent) {
      render(this.#sortComponent, this.#container);
      return;
    }

    replace(this.#sortComponent, prevSortComponent);
    remove(prevSortComponent);
  }

  destroy() {
    remove(this.#sortComponent);
  }

  #onSortChange = (sortType) => {
    if (this.#currentSortType !== sortType) {
      this.#currentSortType = sortType;
      this.#handleSortChange(sortType);
    }
  };
}
