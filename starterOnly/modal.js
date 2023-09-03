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

  // Variable pour suivre l'état de validation
  let isValid = true;

  // Vérifier chaque condition
  // removeAllErrorMessages();

  resetErrorStatus('first');
  if (firstName.length < 2 || firstName.trim() === '') {
    addErrorMessage('first', 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
    isValid = false;
  }
  if (lastName.length < 2 || lastName.trim() === '') {
    addErrorMessage('last', 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
    isValid = false;
  }

  if (!validateEmail(email)) {
    addErrorMessage('email', 'Veuillez entrer une adresse e-mail valide.');
    isValid = false;
  }

  // Vérifier si la date de naissance est au format jj/mm/aaaa
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


  if (isNaN(quantity)) {
    addErrorMessage('quantity', 'Veuillez entrer une valeur pour le nombre de concours.');
    isValid = false;
  }

  if (!location) {
    addErrorMessage('whereParticipate', 'Veuillez sélectionner une localisation.');
    isValid = false;
  }

  if (!checkbox1) {
    addErrorMessage('checkbox1', 'Veuillez accepter les conditions d\'utilisation.');
    isValid = false;
  }

  // Si toutes les conditions sont remplies, formulaire soumis
  return isValid;
}

// Fonction pour valider l'adresse e-mail
function validateEmail(email) {
  let regex = /\S+@\S+\.\S+/;
  return regex.test(email);
}