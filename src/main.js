import { DestinationsModel, OffersModel, PointsModel } from './model';
import { FilterView, TripInfoView } from './view';
import { render, RenderPosition } from './render.js';
import { TripPresenter } from './presenter';
import MockService from './service/mock-service.js';

const tripMainElement = document.querySelector('.trip-main');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripControlsElement = tripMainElement.querySelector('.trip-controls__filters');

const service = new MockService();
const destinationsModel = new DestinationsModel({ service });
const offersModel = new OffersModel({ service });
const pointsModel = new PointsModel({ service });

const tripPresenter = new TripPresenter({
  tripContainer: tripEventsElement,
  destinationsModel,
  offersModel,
  pointsModel,
});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripControlsElement);

tripPresenter.init();
