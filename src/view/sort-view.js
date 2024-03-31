import { EnabledSortType, SortType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';
import { createSortTemplate } from '../template/sort-template.js';

export default class SortView extends AbstractView {
  #items = [];
  #onSortChange = null;

  constructor({ sortType, onSortChange }) {
    super();
    this.#items = Object.values(SortType).map((type) => ({
      type,
      isChecked: type === sortType,
      isDisabled: !EnabledSortType[type],
    }));
    this.#onSortChange = onSortChange;
    this.element.addEventListener('change', this.#sortChangeHandler);
  }

  get template() {
    return createSortTemplate({ sorts: this.#items });
  }

  #sortChangeHandler = (evt) => {
    evt.preventDefault();
    this.#onSortChange(evt.target.dataset.sortType);
  };
}
