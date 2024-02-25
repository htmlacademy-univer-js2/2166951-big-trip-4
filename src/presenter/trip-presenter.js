import { EditPointView, SortView, PointListView, PointView } from '../view';
import { render } from '../render.js';

export default class TripPresenter {
  pointListComponent = new PointListView();

  constructor({tripContainer}) {
    this.tripContainer = tripContainer;
  }

  init() {
    render(new SortView(), this.tripContainer);
    render(this.pointListComponent, this.tripContainer);
    render(new EditPointView(), this.pointListComponent.getElement());
    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.pointListComponent.getElement());
    }
  }
}
