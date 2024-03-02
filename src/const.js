const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;

export const MSEC_IN_SEC = 1000;
export const MSEC_IN_HOUR = MIN_IN_HOUR * SEC_IN_MIN * MSEC_IN_SEC;
export const MSEC_IN_DAY = HOUR_IN_DAY * MSEC_IN_HOUR;

export const POINT_TYPES = [
  'taxi',
  'flight',
  'bus',
  'train',
  'ship',
  'drive',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const POINT_FILTERS = [
  'everything',
  'future',
  'present',
  'past',
];

export const POINT_SORTS = [
  'day',
  'event',
  'time',
  'price',
  'offers',
];

export const POINT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: null,
};
