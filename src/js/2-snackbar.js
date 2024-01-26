import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const button = document.querySelector('button');

button.addEventListener('click', function (event) {
  event.preventDefault();

  const delay = document.getElementById('delay');
  const delayValue = parseFloat(delay.value);

  if (isNaN(delayValue) || delayValue <= 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a valid delay',
      position: 'topCenter',
    });
    return;
  }

  const selectedState = document.querySelector(
    'input[name="state"]:checked'
  ).value;

  const promise = new Promise((resolve, reject) => {
    if (selectedState === 'fulfilled') {
      resolve(selectedState);
    } else if (selectedState === 'rejected') {
      reject(selectedState);
    }
  });

  const intervalId = setInterval(() => {
    promise
      .then(values => {
        iziToast.success({
          title: 'OK',
          message: `Fulfilled promise in ${delayValue}ms`,
          position: 'topCenter',
        });
      })
      .catch(error => {
        iziToast.error({
          title: 'Error',
          message: `Rejected promise in ${delayValue}ms`,
          position: 'topCenter',
        });
      })
      .finally(() => {
        delay.value = '';
        clearInterval(intervalId);
      });
  }, delayValue);
});
