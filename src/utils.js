import { MSEC_IN_DAY, MSEC_IN_HOUR } from './const';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export const getLastWord = (str) => str.split(' ').pop().toLowerCase();
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
export const formatStringToDateTime = (date) => dayjs(date).format('DD/MM/YY HH:mm');
export const formatStringToShortDate = (date) => dayjs(date).format('MMM DD');
export const formatStringToTime = (date) => dayjs(date).format('HH:mm');

export const getPointDuration = (dateFrom, dateTo) => {
  const timeDiff = dayjs(dateTo).diff(dayjs(dateFrom));

  if (timeDiff >= MSEC_IN_DAY) {
    return dayjs.duration(timeDiff).format('DD[D] HH[H] mm[M]');
  } else if (timeDiff >= MSEC_IN_HOUR) {
    return dayjs.duration(timeDiff).format('HH[H] mm[M]');
  }
  return dayjs.duration(timeDiff).format('mm[M]');
};
