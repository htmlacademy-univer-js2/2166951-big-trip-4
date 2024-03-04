import { EditPointView, SortView, PointListView, PointView } from '../view';
import { render } from '../render.js';

export default class TripPresenter {
  pointListComponent = new PointListView();

  constructor({ tripContainer, destinationsModel, offersModel, pointsModel }) {
    this.tripContainer = tripContainer;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getAll()];
    const editPoint = this.points[0];

    render(new SortView(), this.tripContainer);
    render(this.pointListComponent, this.tripContainer);
    render(
      new EditPointView({
        point: editPoint,
        destination: this.destinationsModel.getById(editPoint.destination),
        offers: this.offersModel.getByType(editPoint.type),
      }),
      this.pointListComponent.getElement()
    );
    for (let i = 1; i < this.points.length; i++) {
      const point = this.points[i];
      render(
        new PointView({
          point,
          destination: this.destinationsModel.getById(point.destination),
          offers: this.offersModel.getByType(point.type),
        }),
        this.pointListComponent.getElement()
      );
    }
  }
}
