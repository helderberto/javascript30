(function() {
  function calculateDegree(
    time,
    divisor = 60,
    degrees = 360,
    currentDegree = 90
  ) {
    return (
      (Number(time) / Number(divisor)) * Number(degrees) + Number(currentDegree)
    );
  }

  function calculateSecondsDegree(seconds) {
    return calculateDegree(seconds);
  }

  function calculateMinutesDegree(mins) {
    return calculateDegree(mins);
  }

  function calculateHoursDegree(mins, hourDivisor = 12) {
    return calculateDegree(mins, hourDivisor);
  }

  function setPointersStyles({ hoursDegrees, minsDegrees, secondsDegrees }) {
    const hourHandEl = document.querySelector(".hour-hand");
    const minHandEl = document.querySelector(".min-hand");
    const secondHandEl = document.querySelector(".second-hand");

    hourHandEl.style.transform = `rotate(${hoursDegrees}deg)`;
    minHandEl.style.transform = `rotate(${minsDegrees}deg)`;
    secondHandEl.style.transform = `rotate(${secondsDegrees}deg)`;
    return;
  }

  function getTime() {
    const now = new Date();
    const seconds = now.getSeconds();
    const mins = now.getMinutes();

    return { seconds, mins };
  }

  function renderClock() {
    const { seconds, mins } = getTime();

    const hoursDegrees = calculateHoursDegree(mins);
    const minsDegrees = calculateMinutesDegree(mins);
    const secondsDegrees = calculateSecondsDegree(seconds);

    return setPointersStyles({
      hoursDegrees,
      minsDegrees,
      secondsDegrees
    });
  }

  setInterval(renderClock, 1000);
})();
