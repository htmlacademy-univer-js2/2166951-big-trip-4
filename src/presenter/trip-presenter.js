import { SortView, PointListView, PointView, EditPointView, EmptyListView } from '../view';
import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../utils/common.js';

export default class TripPresenter {
  #pointListComponent = new PointListView();
  #emptyListComponent = new EmptyListView();
  #sortComponent = new SortView();
  #tripContainer = null;
  #destinationsModel = null;
  #offersModel = null;
  #pointsModel = null;
  #points = [];

  constructor({ tripContainer, destinationsModel, offersModel, pointsModel }) {
    this.#tripContainer = tripContainer;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel = pointsModel;
    this.#points = [...this.#pointsModel.getAll()];
  }

  init() {
    if (!this.#points.length) {
      render(this.#emptyListComponent, this.#tripContainer);
      return;
    }

    this.#renderTrip();
  }

  #renderTrip = () => {
    render(this.#sortComponent, this.#tripContainer);
    render(this.#pointListComponent, this.#tripContainer);
    this.#points.forEach((point) => this.#renderPoint(point));
  };

  #renderPoint = (point) => {
    const pointComponent = new PointView({
      point,
      destination: this.#destinationsModel.getById(point.destination),
      offers: this.#offersModel.getByType(point.type),
      onEditClick: onEditPointClick,
    });

    const editPointComponent = new EditPointView({
      point,
      destination: this.#destinationsModel.getById(point.destination),
      offers: this.#offersModel.getByType(point.type),
      onEditReset: onEditPointReset,
      onEditSubmit: onEditPointSubmit,
    });

    const switchToEditForm = () =>
      replace(editPointComponent, pointComponent);

    const switchToPoint = () =>
      replace(pointComponent, editPointComponent);

    const onDocumentEscKeydown = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        switchToPoint();
        document.removeEventListener('keydown', onDocumentEscKeydown);
      }
    };

    function onEditPointClick() {
      switchToEditForm();
      document.addEventListener('keydown', onDocumentEscKeydown);
    }

    function onEditPointReset() {
      switchToPoint();
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }

    function onEditPointSubmit() {
      switchToPoint();
      document.removeEventListener('keydown', onDocumentEscKeydown);
    }

    render(pointComponent, this.#pointListComponent.element);
  };
}
