export const TimePeriods = {
  MSEC_IN_SEC: 1000,
  MSEC_IN_HOUR: 60 * 60 * 1000,
  MSEC_IN_DAY: 24 * 60 * 60 * 1000
};

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
