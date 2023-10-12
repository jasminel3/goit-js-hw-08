// IMPORT LIBRARIE LODASH.THROTTLE
import throttle from "lodash.throttle";

// SELECTĂM FORMULARUL
const feedbackForm = document.querySelector("form.feedback-form");

// VERIFICĂ SELECTAREA FORMULARULUI
console.log(feedbackForm);

// DEFINIREA UNEI CHEI PENTRU STOCAREA LOCALĂ
const FEEDBACK_FORM_STATE_KEY = "feedback-form-state";

// FUNCTIE PENTRU INCARCAREA DATELOR EXISTENTE IN LOCAL STORAGE
function loadDataFromStorage() {
  try {
    const loadedData = localStorage.getItem(FEEDBACK_FORM_STATE_KEY);

    // PARSEAZĂ DATELE DIN STOCAREA LOCALĂ
    const inputData = loadedData === null ? undefined : JSON.parse(loadedData);

    // SETEAZĂ VALORILE DIN STOCAREA LOCALĂ ÎN CÂMPURILE FORMULARULUI
    document.querySelector("textarea").value = inputData?.message || "";
    document.querySelector("input").value = inputData?.email || "";
  } catch (error) {
    // ÎN CAZ DE EROARE, RESETEAZĂ FORMULARUL
    feedbackForm.reset();
  }
}

// FUNCȚIA PENTRU SALVAREA DATELOR ÎN LOCAL STORAGE
const storeFormFieldsInLocalStorage = (event) => {
  const feedbackStorage = event.currentTarget.elements;
  const email = feedbackStorage.email.value;
  const message = feedbackStorage.message.value;

  const feedbackStorageData = {
    email,
    message,
  };

  if (email !== "" || message !== "") {
    const serializedFeedbackStorageData = JSON.stringify(feedbackStorageData);

    // SALVEAZĂ DATELE ÎN STOCAREA LOCALĂ
    localStorage.setItem(
      FEEDBACK_FORM_STATE_KEY,
      serializedFeedbackStorageData
    );
  }
};

// FUNCȚIA PENTRU GESTIONAREA TRIMITERII FORMULARULUI
const submitfeedbackForm = (event) => {
  event.preventDefault();
  const feedbackElements = event.currentTarget.elements;
  const email = feedbackElements.email.value;
  const message = feedbackElements.message.value;

  if (email === "" || message === "") {
    alert("TOATE CÂMPURILE TREBUIE COMPLETATE.");
    feedbackForm.reset();
  }

  const feedbackFormData = {
    email,
    message,
  };

  console.log(feedbackFormData);
  feedbackForm.reset();
  localStorage.removeItem(FEEDBACK_FORM_STATE_KEY);
};

// INCARCĂ DATELE DIN STOCAREA LOCALĂ
loadDataFromStorage();
throttle(storeFormFieldsInLocalStorage, 500);

// FUNCTION CALL
feedbackForm.addEventListener("input", storeFormFieldsInLocalStorage);
feedbackForm.addEventListener("submit", submitfeedbackForm);
//test
