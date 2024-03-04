import { POINT_SORTS } from '../const.js';
import { createElement } from '../render.js';
import { createSortTemplate } from '../template/sort-template.js';

export default class SortView {
  getTemplate() {
    return createSortTemplate({ sorts: POINT_SORTS });
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
