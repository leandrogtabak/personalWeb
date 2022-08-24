const observer = new IntersectionObserver((entries) => {
  // Loop over the entries
  entries.forEach((entry) => {
    // If the element is visible
    if (entry.isIntersecting) {
      // Add the animation class

      document.querySelectorAll('.progress-bar').forEach((barra) => barra.classList.add('progress-bar-animation'));
    }
  });
});

observer.observe(document.querySelector('.progress-bar'));

const form = document.getElementById('contact-form');

const nameForm = document.getElementById('name');
const emailForm = document.getElementById('email');
const messageForm = document.getElementById('message');
const messageSent = document.getElementById('messageSent');

const sendMail = (mail) => {
  //1.
  fetch('/send', {
    method: 'post', //2.
    body: mail, //3.
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // alert(data.message);
      nameForm.value = '';
      emailForm.value = '';
      messageForm.value = '';
      messageSent.innerText = data.message;
    });
};

//1.
const formEvent = form.addEventListener('submit', async (event) => {
  event.preventDefault();

  //2.
  let mail = new FormData(form);

  //3.
  sendMail(mail);
});
