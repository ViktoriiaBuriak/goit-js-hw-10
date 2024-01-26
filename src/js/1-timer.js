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
const currentDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

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
  onChange(selectedDates) {
    const selectedDate = new Date(selectedDates[0]);

    if (selectedDate < currentDate) {
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

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer(endTime) {
  const currentTime = Date.now();
  const timeDifference = endTime - currentTime;

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    updateTimerElements({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  } else {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    daysElement.textContent = addLeadingZero(days);
    hoursElement.textContent = addLeadingZero(hours);
    minutesElement.textContent = addLeadingZero(minutes);
    secondsElement.textContent = addLeadingZero(seconds);
  }
}

function startTimer(endTime) {
  updateTimer(endTime);
  timerInterval = setInterval(() => {
    updateTimer(endTime);
  }, 1000);
  button.disabled = true;
}

button.addEventListener('click', function () {
  if (userSelectedDate) {
    startTimer(userSelectedDate);
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
