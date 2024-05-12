import AbstractView from '../framework/view/abstract-view';
import { createNewPointButtonTemplate } from '../template/new-point-button-template';

export default class NewPointButtonView extends AbstractView {
  #onClick = null;

  constructor({ onClick }) {
    super();
    this.#onClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewPointButtonTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#onClick();
  };
}
