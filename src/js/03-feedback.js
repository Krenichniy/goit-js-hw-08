import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('input'),
  message: document.querySelector('textarea'),
  //   button: document.querySelector
};

const FORM_STORAGE_KEY = 'feedback-form-state';

const formData = {};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(addFormFields, 500));

function onFormSubmit(event) {
  event.preventDefault();

  event.currentTarget.reset();
  const obj = localStorage.getItem(FORM_STORAGE_KEY);
  localStorage.removeItem(FORM_STORAGE_KEY);

  console.log(JSON.parse(obj));
}

function addFormFields(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
}

function getStorageData(event) {
  const parcedData = JSON.parse(localStorage.getItem(FORM_STORAGE_KEY));
  if (parcedData) {
    console.log(parcedData);
    setFormFields(parcedData);
    // refs.email.value = parcedData.email;
    // refs.message.value = parcedData.message;
    // refs.form.event.target.name = parcedData.event.target.value;
    //   event.target
    // formData[event.target.name] = event.target.value;
    // formData = savedData;
  }
}

function setFormFields(obj) {
  for (const key in obj) {
    refs.form[key].value = obj[key];
  }
}

window.addEventListener('load', getStorageData);
