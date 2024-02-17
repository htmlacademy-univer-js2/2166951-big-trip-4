import { createElement } from '../render.js';
import { createAddNewPointTemplate } from '../template/add-new-point-template.js';

export default class AddNewPointView {
  getTemplate() {
    return createAddNewPointTemplate();
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
