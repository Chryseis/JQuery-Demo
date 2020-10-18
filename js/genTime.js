const parseTime = function(time) {
  const values = (time || "").split(":");
  if (values.length >= 2) {
    const hours = parseInt(values[0], 10);
    const minutes = parseInt(values[1], 10);

    return {
      hours,
      minutes
    };
  }
  return null;
};

const compareTime = function(time1, time2) {
  const value1 = parseTime(time1);
  const value2 = parseTime(time2);

  const minutes1 = value1.minutes + value1.hours * 60;
  const minutes2 = value2.minutes + value2.hours * 60;

  if (minutes1 === minutes2) {
    return 0;
  }

  return minutes1 > minutes2 ? 1 : -1;
};

const formatTime = function(time) {
  return (
    (time.hours < 10 ? "0" + time.hours : time.hours) +
    ":" +
    (time.minutes < 10 ? "0" + time.minutes : time.minutes)
  );
};

const nextTime = function(time, step) {
  const timeValue = parseTime(time);
  const stepValue = parseTime(step);

  const next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  };

  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;

  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;

  return formatTime(next);
};

const genTimeArr = (range = "00:00-24:00", step = "00:30") => {
  let [start, end] = range.split("-");

  const result = [];

  const minutes = new Date().getMinutes();

  const currentTime = {
    hours: minutes < 30 ? new Date().getHours() : new Date().getHours() + 1,
    minutes: minutes < 30 ? 30 : 0
  };

  if (start && end && step) {
    let current;

    if (
      compareTime(start, formatTime(currentTime)) <= 0 &&
      compareTime(end, formatTime(currentTime)) > 0
    ) {
      current = formatTime(currentTime);
    } else if (compareTime(start, formatTime(currentTime)) > 0) {
      current = start;
    } else {
      return result;
    }

    while (compareTime(current, end) <= 0 && current < end) {
      result.push(`${current}-${nextTime(current, step)}`);
      current = nextTime(current, step);
    }
  }

  return result;
};

console.log(genTimeArr("02:30-06:00"));
