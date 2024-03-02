import { POINT_EMPTY } from '../const.js';
import { createElement } from '../render.js';
import { createEditPointTemplate } from '../template/edit-point-template.js';

export default class EditPointView {
  constructor({ point = POINT_EMPTY, destination, offers }) {
    this.point = point;
    this.destination = destination;
    this.offers = offers;
  }

  getTemplate() {
    return createEditPointTemplate({
      point: this.point,
      destination: this.destination,
      offers: this.offers,
    });
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

