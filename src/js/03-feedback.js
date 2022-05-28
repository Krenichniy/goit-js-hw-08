import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
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
  validation();

  console.log(JSON.parse(obj));
}

function addFormFields(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
}

function getStorageData() {
  const parcedData = JSON.parse(localStorage.getItem(FORM_STORAGE_KEY));
  if (parcedData) {
    console.log(parcedData);
    setFormFields(parcedData);
  }
}

function setFormFields(obj) {
  for (const key in obj) {
    refs.form[key].value = obj[key];
  }
}

function validation() {
  if (!formData['email'] || !formData['message']) {
    return alert('Please, fill all form fields');
  }
  return console.log(formData);
}

window.addEventListener('load', getStorageData);
