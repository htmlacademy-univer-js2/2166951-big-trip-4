import { POINT_FILTERS } from '../const.js';
import { createElement } from '../render.js';
import { createFilterTemplate } from '../template/filter-template.js';

export default class FilterView {
  getTemplate() {
    return createFilterTemplate({ filters: POINT_FILTERS });
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
