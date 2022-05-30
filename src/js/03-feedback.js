import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};

const FORM_STORAGE_KEY = 'feedback-form-state';

let formData ;


refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(addFormFields, 500));

function onFormSubmit(event) {
  event.preventDefault();

  // validation
 if (!formData['email'] || !formData['message']) {

    return alert('Please, fill all form fields');
  }
 
  clearFormData(formData);

  localStorage.removeItem(FORM_STORAGE_KEY);
  event.currentTarget.reset();
  console.log(formData);

}

function clearFormData (obj){
    for (const key in obj) {
    delete obj[key];
  }
}

function addFormFields(event) {

  formData[event.target.name] = event.target.value;
  localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(formData));
}

function getStorageData() {
  formData = JSON.parse(localStorage.getItem(FORM_STORAGE_KEY));
  if (formData) {
    setFormFields(formData);
  } else {
    formData = {};
  }
  
}

function setFormFields(obj) {
  for (const key in obj) {
    refs.form[key].value = obj[key];
  }
}


window.addEventListener('load', getStorageData);
