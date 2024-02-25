import { render, RenderPosition } from './render.js';
import { FilterView, TripInfoView } from './view';
import { TripPresenter } from './presenter';

const tripMainElement = document.querySelector('.trip-main');
const pageMainElement = document.querySelector('.page-main');
const tripEventsElement = pageMainElement.querySelector('.trip-events');
const tripControlsElement = tripMainElement.querySelector('.trip-controls__filters');

const tripPresenter = new TripPresenter({ tripContainer: tripEventsElement });

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new FilterView(), tripControlsElement);

tripPresenter.init();
