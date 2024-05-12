import { DestinationsModel, FilterModel, OffersModel, PointsModel } from './model';
import { TripInfoView } from './view';
import { render, RenderPosition } from './framework/render.js';
import { FilterPresenter, TripPresenter } from './presenter';
import MockService from './service/mock-service.js';

const tripMainElement = document.querySelector('.trip-main');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripControlsElement = tripMainElement.querySelector('.trip-controls__filters');

const service = new MockService();
const destinationsModel = new DestinationsModel({ service });
const offersModel = new OffersModel({ service });
const pointsModel = new PointsModel({ service });
const filterModel = new FilterModel();

const filterPresenter = new FilterPresenter({
  container: tripControlsElement,
  pointsModel,
  filterModel,
});

const tripPresenter = new TripPresenter({
  container: tripEventsElement,
  destinationsModel,
  offersModel,
  pointsModel,
  filterModel,
});


render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
filterPresenter.init();
tripPresenter.init();
