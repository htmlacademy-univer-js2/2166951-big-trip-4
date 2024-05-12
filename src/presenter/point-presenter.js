import { Mode, UpdateType, UserAction } from '../const';
import { remove, render, replace } from '../framework/render';
import { isEscapeKey } from '../utils/common';
import { isBigDifference } from '../utils/point';
import { EditPointView, PointView } from '../view';

export default class PointPresenter {
  #container = null;

  #destinationsModel = null;
  #offersModel = null;

  #handleDataChange = null;
  #handleModeChange = null;

  #pointComponent = null;
  #editPointComponent = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor({
    container,
    destinationsModel,
    offersModel,
    handleDataChange,
    handleModeChange
  }) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = handleDataChange;
    this.#handleModeChange = handleModeChange;
  }

  init(point) {
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#editPointComponent;

    this.#pointComponent = new PointView({
      point: this.#point,
      destination: this.#destinationsModel.getById(point.destination),
      offers: this.#offersModel.getByType(point.type),
      onEditClick: this.#onEditPointClick,
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#editPointComponent = new EditPointView({
      point: this.#point,
      destinations: this.#destinationsModel.getAll(),
      offers: this.#offersModel.getAll(),
      onEditReset: this.#onEditPointReset,
      onEditSubmit: this.#onEditPointSubmit,
      onEditDelete: this.#onEditDelete,
    });

    if (!prevPointComponent || !prevEditPointComponent) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#editPointComponent, prevEditPointComponent);
    }

    remove(prevEditPointComponent);
    remove(prevPointComponent);
  }

  resetView() {
    if (this.#mode === Mode.EDITING) {
      this.#editPointComponent.reset(this.#point);
      this.#switchToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#editPointComponent);
    document.removeEventListener('keydown', this.#onDocumentEscKeydown);
  }

  #switchToEditForm = () => {
    replace(this.#editPointComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onDocumentEscKeydown);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  };

  #switchToPoint = () => {
    replace(this.#pointComponent, this.#editPointComponent);
    document.removeEventListener('keydown', this.#onDocumentEscKeydown);
    this.#mode = Mode.DEFAULT;
  };

  #onDocumentEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#editPointComponent.reset(this.#point);
      this.#switchToPoint();
    }
  };

  #onFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      UpdateType.PATCH,
      {
        ...this.#point,
        isFavorite: !this.#point.isFavorite,
      }
    );
  };

  #onEditPointClick = () => {
    this.#switchToEditForm();
  };

  #onEditPointReset = () => {
    this.#editPointComponent.reset(this.#point);
    this.#switchToPoint();
  };

  #onEditPointSubmit = (point) => {
    const isMinor = isBigDifference(point, this.#point);
    this.#handleDataChange(
      UserAction.UPDATE_POINT,
      isMinor ? UpdateType.MINOR : UpdateType.PATCH,
      point
    );

    this.#switchToPoint();
  };

  #onEditDelete = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };
}
