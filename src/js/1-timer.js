import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

button.disabled = true;

let userSelectedDate;
let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const currentDate = new Date();

    if (userSelectedDate < currentDate) {
      button.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topCenter',
      });
    } else {
      button.disabled = false;
    }
  },
};

flatpickr('#datetime-picker', options);

function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}

function updateTimerElements(timeObj) {
  daysElement.textContent = formatTime(timeObj.days);
  hoursElement.textContent = formatTime(timeObj.hours);
  minutesElement.textContent = formatTime(timeObj.minutes);
  secondsElement.textContent = formatTime(timeObj.seconds);
}

function updateTimer(endTime) {
  const currentTime = new Date();
  const timeDifference = endTime - currentTime;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    button.disabled = false;
  } else {
    const timeObj = convertMs(timeDifference);
    updateTimerElements(timeObj);
  }
}

function startTimer(endTime) {
  updateTimer(endTime);
  timerInterval = setInterval(() => {
    updateTimer(endTime);
  }, 1000);
  button.disabled = true;
}

document
  .querySelector('#datetime-picker')
  .addEventListener('focus', function () {
    button.disabled = false;
  });

button.addEventListener('click', function () {
  if (userSelectedDate) {
    startTimer(userSelectedDate);
    button.disabled = true;
  }
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
