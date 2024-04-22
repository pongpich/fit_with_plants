import moment from 'moment';

export const calculateWeekInProgram = (startDate, endDate) => {
  let startDateMoment = moment(startDate).startOf('isoWeek');
  let endDateMoment = endDate ? moment(endDate) : moment();
  return endDateMoment.diff(startDateMoment, 'week') + 1
}

export function str_pad_left(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

export function convertSecondsToMinutes(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  var finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(parseInt(seconds), '0', 2);
  return finalTime;
}

export function convertFormatTime(time) {
  const minutes = (time + "").split(".")[0];
  const seconds = ((time + "").split(".")[1]) ?
    ((time + "").split(".")[1].length < 2) ?
      ((time + "").split(".")[1]) + "0"
      :
      ((time + "").split(".")[1])
    : "00"
  return `${minutes}:${seconds}`;
}
