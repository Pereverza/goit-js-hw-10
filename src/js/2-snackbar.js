import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
form.addEventListener('submit', onSubmitForm);

function onSubmitForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const delay = Number(formData.get('delay'));
  const state = formData.get('state');

  createPromise(delay, state)
    .then(({ delay }) => {
      showNotification(`✅ Fulfilled promise in ${delay}ms`, '#b6d7a8');
    })
    .catch(({ delay }) => {
      showNotification(`❌ Rejected promise in ${delay}ms`, '#EA9999');
    });

  event.target.reset();
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve({ delay });
      } else {
        reject({ delay });
      }
    }, delay);
  });
}

function showNotification(message, bgColor) {
  iziToast.show({
    message,
    backgroundColor: bgColor,
    position: 'topRight',
    timeout: 5000,
    close: true,
  });
}
