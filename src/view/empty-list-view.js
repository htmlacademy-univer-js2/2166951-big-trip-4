import AbstractView from '../framework/view/abstract-view.js';
import { createEmptyListTemplate } from '../template/empty-list-template.js';

export default class EmptyListView extends AbstractView {
  get template() {
    return createEmptyListTemplate();
  }
}
