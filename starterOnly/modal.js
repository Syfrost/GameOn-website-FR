function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";

  // Close button select
  const closeBtn = document.querySelector(".close");
  // Ajoutez un écouteur d'événement "click" sur le bouton de fermeture
  closeBtn.addEventListener("click", closeModal);
}
function closeModal() {
  modalbg.style.display = "none";
  document.getElementById('formContainer').style.display = 'block';
  document.getElementById('message').style.display = 'none';
  document.getElementById('closeButton').style.display = 'none';
}

// TODO finir le rajout de / dans le champ date
// function formatBirthdayInput(input) {
//   let value = input.value;
//   let formattedValue = '';
//
//   if (value.length === 2 || value.length === 5) {
//     formattedValue = value + '/';
//   } else {
//     formattedValue = value;
//   }
//
//   input.value = formattedValue;
// }
//
// let birthdayInput = document.getElementById('birthdate');
// birthdayInput.addEventListener('input', function() {
//   formatBirthdayInput(birthdayInput);
// });

function validate() {
  // Récupérer les valeurs des champs
  let firstName = document.getElementById('first').value;
  let lastName = document.getElementById('last').value;
  let email = document.getElementById('email').value;
  let birthdate = document.getElementById('birthdate').value;
  let quantity = document.getElementById('quantity').value;
  let location = document.querySelector('input[name="location"]:checked');
  let checkbox1 = document.getElementById('checkbox1').checked;
  let checkbox2 = document.getElementById('checkbox2').checked;

  // Variable pour suivre l'état de validation
  let isValid = true;

  // Vérifier chaque condition
  // removeAllErrorMessages();

  resetErrorStatus('first');
  if (firstName.length < 2 || firstName.trim() === '') {
    addErrorMessage('first', 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
    isValid = false;
  }

  resetErrorStatus('last');
  if (lastName.length < 2 || lastName.trim() === '') {
    addErrorMessage('last', 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
    isValid = false;
  }
  resetErrorStatus('email');
  if (!validateEmail(email)) {
    addErrorMessage('email', 'Veuillez entrer une adresse e-mail valide.');
    isValid = false;
  }

  // Vérifier si la date de naissance est au format jj/mm/aaaa
  resetErrorStatus('birthdate');
  let regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(birthdate)) {
    addErrorMessage('birthdate', 'Veuillez entrer une date de naissance au format jj/mm/aaaa.');
    isValid = false;
  } else {
    // Vérifier si la date de naissance est une date valide
    let parts = birthdate.split('/');
    let day = parseInt(parts[0], 10);
    let month = parseInt(parts[1], 10);
    let year = parseInt(parts[2], 10);

    let date = new Date(year, month - 1, day);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      addErrorMessage('birthdate', 'Veuillez entrer une date de naissance valide.');
      isValid = false;
    }
  }

  resetErrorStatus('quantity');
  if (isNaN(quantity) || quantity < 0 || quantity > 99) {
    addErrorMessage('quantity', 'Veuillez entrer une valeur entre 1 et 9 pour le nombre de concours.');
    isValid = false;
  }

  resetErrorStatus('location6');
  if (!location) {
    addErrorMessage('location6', 'Veuillez sélectionner une localisation.');
    isValid = false;
  }

  resetErrorStatus('checkbox1', "id");
  if (!checkbox1) {
    addErrorMessage('checkbox1', 'Veuillez accepter les conditions d\'utilisation.', 'id');
    isValid = false;
  }

  if (isValid) {
    document.getElementById('formContainer').style.display = 'none';
    document.getElementById('message').style.display = 'flex';
    document.getElementById('closeButton').style.display = 'flex';

    //afficher les resultats du formulaire dans un console.table avec en index le type de donnée et en valeur la donnée
    let formDataArray = [];
    formData.forEach((element) => {
      let input = element.querySelector("input");
      let name = input.getAttribute("name");
      let value = input.type === "checkbox" ? input.checked : input.value;
      formDataArray.push({ name: name, value: value });
    });

    console.table(formDataArray);

    return false;
  }

  // Si toutes les conditions sont remplies, formulaire soumis
  return isValid;
}

// Fonction pour valider l'adresse e-mail
function validateEmail(email) {
  let regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}

function addErrorMessage(fieldId, message) {
  let field = document.getElementById(fieldId);
  let parentElement = field.parentNode;
    parentElement.setAttribute('data-error', message);
    parentElement.setAttribute('data-error-visible', 'true');
    parentElement.classList.add('error');
    console.log(fieldId);
}

function resetErrorStatus(fieldId) {
  let field = document.getElementById(fieldId);
  let parentElement = field.parentNode;
  parentElement.removeAttribute('data-error');
  parentElement.removeAttribute('data-error-visible');
  parentElement.classList.remove('error');
}


