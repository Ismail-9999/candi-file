document.addEventListener('DOMContentLoaded', function() {
    const cancelButton = document.getElementById('cancelButton');
    const popup = document.getElementById('confirmationPopup');
    const stayButton = document.getElementById('stayButton');
    const leaveButton = document.getElementById('leaveButton');

    // Fonction pour afficher le popup
    function showPopup() {
        popup.classList.remove('hidden');
    }

    // Fonction pour cacher le popup
    function hidePopup() {
        popup.classList.add('hidden');
    }

    // Gestion du clic sur le bouton "Annuler"
    cancelButton.addEventListener('click', function(event) {
        showPopup();
    });

    // Gestion du clic sur le bouton "Rester là"
    stayButton.addEventListener('click', function() {
        hidePopup();
    });

    // Gestion du clic sur le bouton "Quitter la page"
    leaveButton.addEventListener('click', function() {
        hidePopup();
        // Effectuer une action pour quitter la page, par exemple rediriger ou soumettre un formulaire
        window.location.href = 'votre-url-de-redirection.html'; // Exemple de redirection
    });
});



function handleFileSelect(event, fileListId) {
    const input = event.target;
    const fileList = document.getElementById(fileListId);

    if (!fileList) {
        console.error("L'élément avec l'ID " + fileListId + " n'existe pas.");
        return;
    }

    fileList.innerHTML = ''; // Efface le contenu existant

    // Validation : taille de fichier maximale de 2 MB
    const maxFileSize = 2 * 1024 * 1024; // 2 Mo

    if (input.files.length > 0) {
        const file = input.files[0];

        // Vérifier la taille du fichier
        if (file.size > maxFileSize) {
            alert("Le fichier ne doit pas dépasser 2 Mo.");
            input.value = ''; // Efface l'input si le fichier est trop grand
            return;
        }

        // Désactiver le bouton "Parcourir"
        const label = input.nextElementSibling;
        if (label) {
            label.classList.add('disabled');
        }

        input.disabled = true;

        // Afficher le fichier sélectionné avec un bouton pour le retirer
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';

        const fileNameSpan = document.createElement('span');
        fileNameSpan.textContent = file.name;
        fileItem.appendChild(fileNameSpan);

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.className = 'remove-file-button';
        removeButton.onclick = () => {
            // Réinitialiser le champ de fichier et réactiver le bouton "Parcourir"
            input.value = '';
            fileList.innerHTML = '';
            input.disabled = false;
            if (label) {
                label.classList.remove('disabled');
            }
        };
        fileItem.appendChild(removeButton);

        fileList.appendChild(fileItem);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const mobiliteInput = document.getElementById('mobilite');
    const errorSpan = document.getElementById('mobilite-error');

    // Options disponibles pour la mobilité
    const mobiliteOptions = ["Maroc", "France", "Afrique", "Europe", "Moyen Orient"];

    // Initialisation de Tagify sur le champ de mobilité
    const tagifyMobilite = new Tagify(mobiliteInput, {
        whitelist: mobiliteOptions,
        dropdown: {
            maxItems: 5,           // maximum d'éléments à afficher dans la liste déroulante
            classname: "suggestions",
            enabled: 0,            // always show suggestions
            closeOnSelect: false   // ne pas fermer la liste déroulante après la sélection
        }
    });

    // Fonction de validation
    function validateMobilite() {
        const selectedValues = tagifyMobilite.value; // Obtenir les éléments sélectionnés

        if (selectedValues.length === 0) {
            errorSpan.classList.remove('hidden');  // Afficher l'erreur
            mobiliteInput.classList.add('border-red-500');
        } else {
            errorSpan.classList.add('hidden');     // Cacher l'erreur
            mobiliteInput.classList.remove('border-red-500');
        }
    }

    // Validation lors de la modification des éléments sélectionnés
    tagifyMobilite.on('add', validateMobilite);
    tagifyMobilite.on('remove', validateMobilite);

    // Validation initiale au chargement de la page
    //validateMobilite();
});

// Function to validate phone number
function validatePortable(phoneNumber) {
    const cleanedNumber = phoneNumber.replace(/\D/g, '');
    return cleanedNumber.length === 10 && ['06', '07'].includes(cleanedNumber.substring(0, 2));
}

// New function to validate email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateNom(field) {
    const nomTexte = document.getElementById('nom');
    const errorSpan = document.getElementById('nom-error');

    let isValid = true;
    let errorMessage = "Veuillez saisir un nom valide (sans chiffres, tirets ou caractères spéciaux).";

      if (nomTexte.value.trim() === "") {
            isValid = false;
            errorMessage = "Veuillez entrer votre nom.";
        } else if (!/^[a-zA-Z]+$/.test(nomTexte.value)) {
            isValid = false;
        
    }

    if (!isValid) {
        errorSpan.textContent = errorMessage;
        errorSpan.classList.remove('hidden');
    } else {
        errorSpan.classList.add('hidden');
    }

    // Toggle visibility of text input

    return isValid;
}


// New function to handle prenom validation
function validatePrenom() {
    const prenomSelect = document.getElementById('prenom');
    const prenomTexte = document.getElementById('prenomTexte');
    const errorSpan = document.getElementById('prenom-error');

    let isValid = true;
    let errorMessage = "Veuillez saisir un prénom valide (sans chiffres, tirets ou caractères spéciaux).";

    if (prenomSelect.value === "-Aucun-") {
        isValid = false;
        errorMessage = "Ce champ est requis.";
    } else if (["M.", "Mme", "Mlle"].includes(prenomSelect.value)) {
        if (prenomTexte.value.trim() === "") {
            isValid = false;
            errorMessage = "Veuillez entrer votre prénom.";
        } else if (!/^[a-zA-Z]+$/.test(prenomTexte.value)) {
            isValid = false;
        }
    }

    if (!isValid) {
        errorSpan.textContent = errorMessage;
        errorSpan.classList.remove('hidden');
    } else {
        errorSpan.classList.add('hidden');
    }

    // Toggle visibility of text input
    prenomTexte.style.display = (prenomSelect.value !== "-Aucun-") ? "block" : "none";
}



// Updated general validation function
function validateField(field, errorSpanId) {
    
    const errorSpan = document.getElementById(errorSpanId);
    if (!errorSpan) {
        console.error(`Error span with id ${errorSpanId} not found`);
        return false;
    }

    let isValid = true;
    let errorMessage = "Ce champ est requis.";

    if (field.value.trim() === "") {
        isValid = false;
    } else {
        switch (field.id) {
            case 'nom':
                isValid = validateNom(field.value);
                errorMessage = "Le nom doit contenir uniquement des lettres .";
                break;
            case 'prenom':
                isValid = validatePrenom(field.value);
                errorMessage = "Le prénom doit contenir uniquement des lettres .";
                break;
            case 'portable':
                isValid = validatePortable(field.value);
                errorMessage = "Le numéro de téléphone doit contenir 10 chiffres.";
                break;
            case 'email':
                isValid = validateEmail(field.value);
                errorMessage = "Format d'e-mail invalide.";
                break;
            case 'disponibilite_immediate':
                isValid = validateImmediateAvailability(field);
                errorMessage = "Ce champ est requis.";
                break;
                
            // Add more cases for other specific fields if needed
        }
    }

    if (!isValid) {
        errorSpan.textContent = errorMessage;
        errorSpan.classList.remove('hidden');
        field.classList.add('border-red-500');
    } else {
        errorSpan.classList.add('hidden');
        field.classList.remove('border-red-500');
    }

    return isValid;
}

function validateImmediateAvailability(field) {
    if (field.value === '-Aucun-') {
        return false;
    } else {
        return true;
    }
}

// Function to add validation listeners (unchanged)
function addValidationListeners() {
    const fields = document.querySelectorAll('input, select');
    
    fields.forEach(field => {
        if (field.id === 'prenom') {
            field.addEventListener('change', validatePrenom);
        } else {
        field.addEventListener('blur', function() {
            const errorSpanId = `${field.id}-error`;
            validateField(field, errorSpanId);
        });
        
        field.addEventListener('input', function() {
            const errorSpanId = `${field.id}-error`;
            validateField(field, errorSpanId);
        });
    }
    });
    const prenomTexte = document.getElementById('prenomTexte');
    if (prenomTexte) {
        prenomTexte.addEventListener('blur', validatePrenom);
        prenomTexte.addEventListener('input', validatePrenom);
    }
}

// Initialize validation listeners when the page loads
window.onload = function() {
    addValidationListeners();
    //validatePrenom();
};




    function resetErrors() {
        const errorSpans = document.querySelectorAll('.text-red-600');
        errorSpans.forEach(span => span.classList.add('hidden'));
    }

    function resetBaseInfo(event) {
        event.preventDefault();
        document.querySelectorAll('#applicationForm .form-group input, #applicationForm .form-group select').forEach(input => {
            input.value = '';

             // Réinitialiser les messages d'erreur
        const errorSpan = document.getElementById(`${input.id}-error`);
        if (errorSpan) {
            errorSpan.classList.add('hidden');
        }
        });
        document.getElementById('prenomTexte').style.display = 'none';
    }

    function resetProfessionalInfo(event) {
        event.preventDefault();
        document.getElementById('applicationForm').reset(); 
        resetErrors();
}

function resetSocialInfo(event) {
    event.preventDefault();
    document.getElementById('applicationForm').reset(); 
    resetErrors();
}

function resetAdresseInfo(event) {
    event.preventDefault();
    document.getElementById('applicationForm').reset(); 
    resetErrors();

}



function resetExperienceInfo(event) {
    event.preventDefault();
    const container = document.getElementById('experiences-container');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    experienceCount = 0;  // Réinitialiser le compteur à zéro
    document.querySelector('.add-experience strong').textContent = '+ Ajouter';

     // Réinitialiser les messages d'erreur
     document.querySelectorAll('#experienceForm .text-red-600').forEach(errorSpan => {
        errorSpan.classList.add('hidden');
    });
}

    let experienceCount = 0;
   

    function addExperience() {
    experienceCount++;
   
    const container = document.getElementById('experiences-container');

    // Créer le div pour une nouvelle expérience
    const experienceDiv = document.createElement('div');
    experienceDiv.classList.add('tabular-data-div');
    experienceDiv.id = `experience-${experienceCount}`;

    // Le contenu HTML de l'expérience
    experienceDiv.innerHTML = `
        <div class="crc-tabular-count"> ${experienceCount}</div>
        <div class="form-group">
            <label for="profession-${experienceCount}" class="block text-sm font-medium text-gray-700">Profession/Titre <span class="text-red-500">*</span></label>
            <input type="text" id="profession-${experienceCount}" name="profession-${experienceCount}" required />
            <span id="profession-${experienceCount}-error" class="text-red-600 text-sm hidden">Ce champ est requis.</span>
        </div>
        <div class="form-group">
            <label for="societe-${experienceCount}" class="block text-sm font-medium text-gray-700">Société  <span class="text-red-500">*</span></label>
            <input type="text" id="societe-${experienceCount}" name="societe-${experienceCount}" required />
            <span id="societe-${experienceCount}-error" class="text-red-600 text-sm hidden">Ce champ est requis.</span>
        </div>
        <div class="form-group">
            <label for="description-${experienceCount}" class="block text-sm font-medium text-gray-700">Description <span class="text-red-500">*</span></label>
            <textarea id="description-${experienceCount}" name="description-${experienceCount}" required rows="3" class="form-control"></textarea>
            <span id="description-${experienceCount}-error" class="text-red-600 text-sm hidden">Ce champ est requis.</span>
            
        </div>
        <div class="form-group">
            <label for="periode-${experienceCount}" class="block text-sm font-medium text-gray-700">Période <span class="text-red-500">*</span></label>
            <div class="periode-row">
                <select class="periode-select" id="mois-debut-${experienceCount}" name="mois-debut-${experienceCount}" required>
                    <option value="">Mois</option>
                    ${generateMonthOptions()}
                </select>
                <select class="periode-select" id="annee-debut-${experienceCount}" name="annee-debut-${experienceCount}" required>
                    <option value="">An</option>
                    ${generateYearOptions()}
                </select>
                <span class="periode-separator">À</span>
                <select class="periode-select" id="mois-fin-${experienceCount}" name="mois-fin-${experienceCount}" required>
                    <option value="">Mois</option>
                    ${generateMonthOptions()}
                </select>
                <select class="periode-select" id="annee-fin-${experienceCount}" name="annee-fin-${experienceCount}" required>
                    <option value="">An</option>
                    ${generateYearOptions()}
                </select>
            </div>
            <div class="checkbox-row">
                <input type="checkbox" id="etudes-en-cours-${experienceCount}" name="etudes-en-cours-${experienceCount}">
                <label for="etudes-en-cours-${experienceCount}">Je travaille ici actuellement</label>
            </div>
        </div>
        <button type="button" onclick="removeExperience(${experienceCount})" class="text-red">Supprimer</button>
    `;

    // Ajouter la nouvelle expérience au conteneur
    container.appendChild(experienceDiv);


    setTimeout(() => {
        experienceDiv.classList.add('fade-in');
    }, 10);

    // Configuration des événements pour les champs de période
    setupEtudesEnCours(experienceCount);

    updateAddButtonText();
    

    addExperienceValidators(experienceCount);

}

// Function to validate a required text field
function validateRequiredField(fieldId, errorSpanId) {
    const field = document.getElementById(fieldId);
    const errorSpan = document.getElementById(errorSpanId);
    
    if (field.value.trim() === '') {
        errorSpan.textContent = 'Ce champ est requis.';
        errorSpan.classList.remove('hidden');
        field.classList.add('border-red-500');
        return false;
    } else {
        errorSpan.classList.add('hidden');
        field.classList.remove('border-red-500');
        return true;
    }
}

// Function to add validators to experience fields
function addExperienceValidators(experienceCount) {
    const fields = ['profession', 'societe', 'description'];
    fields.forEach(field => {
        const fieldId = `${field}-${experienceCount}`;
        const errorSpanId = `${fieldId}-error`;
        const inputField = document.getElementById(fieldId);
        
        inputField.addEventListener('blur', () => validateRequiredField(fieldId, errorSpanId));
        inputField.addEventListener('input', () => validateRequiredField(fieldId, errorSpanId));
    });
}

// Function to add validators to educational fields
function addEducationalValidators(educationalCount) {
    const fields = ['institut', 'specialisation', 'degree'];
    fields.forEach(field => {
        const fieldId = `${field}-${educationalCount}`;
        const errorSpanId = `${fieldId}-error`;
        const inputField = document.getElementById(fieldId);
        
        inputField.addEventListener('blur', () => validateRequiredField(fieldId, errorSpanId));
        inputField.addEventListener('input', () => validateRequiredField(fieldId, errorSpanId));
    });
}

function generateMonthOptions() {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
    return months.map((month, index) => `<option value="${index + 1}">${month}</option>`).join('');
}

function generateYearOptions() {
    const currentYear = new Date().getFullYear();
    let options = '';
    for (let year = currentYear; year >= currentYear - 50; year--) {
        options += `<option value="${year}">${year}</option>`;
    }
    return options;
}

function validatePeriod(experienceCount) {
    const moisDebut = document.getElementById(`mois-debut-${experienceCount}`).value;
    const anneeDebut = document.getElementById(`annee-debut-${experienceCount}`).value;
    const moisFin = document.getElementById(`mois-fin-${experienceCount}`).value;
    const anneeFin = document.getElementById(`annee-fin-${experienceCount}`).value;
    const etudesEnCours = document.getElementById(`etudes-en-cours-${experienceCount}`).checked;

    let errorMessage = '';

    // Vérification quand la case "Je travaille ici actuellement" est cochée
    if (etudesEnCours) {
        if (!moisDebut || !anneeDebut) {
            errorMessage = "Période ne peut pas être vide";
        }
    } else {
        // Si la case n'est pas cochée, vérifier toute la période
        if (!moisDebut || !anneeDebut || !moisFin || !anneeFin) {
            errorMessage = "Entrez une période valide";
        } else if (anneeDebut > anneeFin || (anneeDebut === anneeFin && moisDebut > moisFin)) {
            errorMessage = "La date de fin doit être postérieure ou égale à la date de début";
        }
    }

    // Afficher ou cacher le message d'erreur
    const errorElement = document.getElementById(`periode-error-${experienceCount}`);
    if (errorMessage) {
        if (!errorElement) {
            // Créer un élément d'erreur si besoin
            const errorDiv = document.createElement('div');
            errorDiv.id = `periode-error-${experienceCount}`;
            errorDiv.classList.add('text-red-500', 'text-sm');
            errorDiv.textContent = errorMessage;
            document.getElementById(`experience-${experienceCount}`).appendChild(errorDiv);
        } else {
            errorElement.textContent = errorMessage;
        }
    } else if (errorElement) {
        // Si pas d'erreur, enlever le message
        errorElement.remove();
    }
}

function setupEtudesEnCours(experienceCount) {
    const checkbox = document.getElementById(`etudes-en-cours-${experienceCount}`);
    const moisFin = document.getElementById(`mois-fin-${experienceCount}`);
    const anneeFin = document.getElementById(`annee-fin-${experienceCount}`);

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            // Désactiver Mois fin et Année fin
            moisFin.disabled = true;
            anneeFin.disabled = true;

            // Effacer les valeurs des champs Mois fin et Année fin
            moisFin.value = '';
            anneeFin.value = '';
        } else {
            // Réactiver Mois fin et Année fin
            moisFin.disabled = false;
            anneeFin.disabled = false;
        }

        // Valider la période
        validatePeriod(experienceCount);
    });

    // Ajouter des écouteurs pour la validation sur les dates
    document.getElementById(`mois-debut-${experienceCount}`).addEventListener('change', () => validatePeriod(experienceCount));
    document.getElementById(`annee-debut-${experienceCount}`).addEventListener('change', () => validatePeriod(experienceCount));
    moisFin.addEventListener('change', () => validatePeriod(experienceCount));
    anneeFin.addEventListener('change', () => validatePeriod(experienceCount));
}


function removeExperience(id) {
    const experienceDiv = document.getElementById(`experience-${id}`);
    if (experienceDiv) {

        // Ajouter la classe de fondu avant de supprimer l'élément
        experienceDiv.classList.add('fade-out');
        
        // Attendre que la transition soit terminée avant de supprimer l'élément
        setTimeout(() => {
        experienceDiv.remove();
        experienceCount--;
        renumberExperiences();
        updateAddButtonText();
    }, 500); // Doit correspondre à la durée de la transition CSS
    }
}

function updateAddButtonText() {
    const addBtn = document.querySelector('.add-experience strong');
    if (experienceCount === 0) {
        addBtn.textContent = '+ Ajouter';
    } else {
        addBtn.textContent = '+ Ajouter plus';
    }
}

function renumberExperiences() {
    const experiences = document.querySelectorAll('.tabular-data-div');
    experiences.forEach((experience, index) => {
        const countElem = experience.querySelector('.crc-tabular-count');
        countElem.textContent = index + 1;
        experience.id = `experience-${index + 1}`;

        experience.querySelectorAll('input, select').forEach(input => {
            const oldName = input.name;
            const newName = oldName.replace(/\d+$/, index + 1);
            input.name = newName;
            input.id = newName;
        });

        // Mettre à jour l'attribut onclick du bouton "Supprimer"
        const removeButton = experience.querySelector('.text-red');
        if (removeButton) {
            removeButton.setAttribute('onclick', `removeExperience(${index + 1})`);
        }
    });

    // Mettre à jour le nombre d'expériences
    experienceCount = experiences.length;
}



function updateExperienceTitles() {
    const experienceGroups = document.querySelectorAll('.experience-group');
    experienceGroups.forEach((group, index) => {
        const title = group.querySelector('h5');
        title.textContent = `Expérience ${index + 1}`;

        const oldId = group.id;
        const newId = `experience-${index + 1}`;
        group.id = newId;

        group.querySelectorAll('input, select').forEach(input => {
            const oldName = input.name;
            const newName = oldName.replace(/\d+$/, index + 1);
            input.name = newName;
            input.id = newName;
        });
    });

    experienceCount = experienceGroups.length;
}

    document.querySelector('[onclick="resetBaseInfo(event)"]').addEventListener('click', resetBaseInfo);
    document.querySelector('[onclick="resetProfessionalInfo(event)"]').addEventListener('click', resetProfessionalInfo);
    document.querySelector('[onclick="resetExperienceInfo(event)"]').addEventListener('click', resetExperienceInfo);
    document.querySelector('[onclick="resetEducationalInfo(event)"]').addEventListener('click', resetEducationalInfo);
    document.querySelector('[onclick="resetSocialInfo(event)"]').addEventListener('click', resetSocialInfo);
    document.querySelector('[onclick="resetAdresseInfo(event)"]').addEventListener('click', resetAdresseInfo);

    function setupPeriodeSearch(id) {
        const container = document.getElementById(`experience-${id}`);
        const searchInputs = container.querySelectorAll('.periode-search');

        searchInputs.forEach(input => {
            input.addEventListener('input', function() {
                const targetId = this.dataset.target;
                const select = document.getElementById(targetId);
                const filter = this.value.toLowerCase();

                Array.from(select.options).forEach(option => {
                    const text = option.textContent.toLowerCase();
                    if (text.includes(filter)) {
                        option.style.display = '';
                    } else {
                        option.style.display = 'none';
                    }
                });
            });
        });
    }

    let educationalCount = 0;
    
    function resetEducationalInfo(event) {
        event.preventDefault();
        const container = document.getElementById('educational-container');
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        educationalCount = 0;
        document.querySelector('.add-educational strong').textContent = '+ Ajouter';
    }

    function addEducational() {
        educationalCount++;

        const container = document.getElementById('educational-container');

        //Créer le div pour un nouveau détail éducatif
        const educationalDiv = document.createElement('div');
        educationalDiv.classList.add('tabular-data-div');
        educationalDiv.id = `educational-${educationalCount}`;

         // Le contenu HTML du détail éducatif
    educationalDiv.innerHTML = `
        <div class="crc-tabular-count"> ${educationalCount}</div>
        <div class="form-group">
            <label for="institut-${educationalCount}" class="block text-sm font-medium text-gray-700">Institut/École <span class="text-red-500">*</span></label>
            <input type="text" id="institut-${educationalCount}" name="institut-${educationalCount}" required />
            <span id="institut-${educationalCount}-error" class="text-red-600 text-sm hidden">Ce champ est requis.</span>
        </div>
        <div class="form-group">
            <label for="specialisation-${educationalCount}" class="block text-sm font-medium text-gray-700">Spécialisation/Service <span class="text-red-500">*</span></label>
            <input type="text" id="specialisation-${educationalCount}" name="specialisation-${educationalCount}" required />
            <span id="specialisation-${educationalCount}-error" class="text-red-600 text-sm hidden">Ce champ est requis.</span>
        </div>
        <div class="form-group">
            <label for="degree-${educationalCount}" class="block text-sm font-medium text-gray-700">Degré <span class="text-red-500">*</span></label>
            <input type="text" id="degree-${educationalCount}" name="degree-${educationalCount}" required />
            <span id="degree-${educationalCount}-error" class="text-red-600 text-sm hidden">Ce champ est requis.</span>
        </div>
        <div class="form-group">
            <label for="duree-${educationalCount}" class="block text-sm font-medium text-gray-700">Durée <span class="text-red-500">*</span></label>
            <div class="periode-row">
                <select class="periode-select" id="mois-debut-educ-${educationalCount}" name="mois-debut-educ-${educationalCount}">
                    <option value="">Mois</option>
                    ${generateMonthOptions()}
                </select>
                <select class="periode-select" id="annee-debut-educ-${educationalCount}" name="annee-debut-educ-${educationalCount}">
                    <option value="">An</option>
                    ${generateYearOptions()}
                </select>
                <span class="periode-separator">À</span>
                <select class="periode-select" id="mois-fin-educ-${educationalCount}" name="mois-fin-educ-${educationalCount}">
                    <option value="">Mois</option>
                    ${generateMonthOptions()}
                </select>
                <select class="periode-select" id="annee-fin-educ-${educationalCount}" name="annee-fin-educ-${educationalCount}">
                    <option value="">An</option>
                    ${generateYearOptions()}
                </select>
            </div>
        <div class="checkbox-row">
            <input type="checkbox" id="etudes-en-cours-educ-${educationalCount}" name="etudes-en-cours-educ-${educationalCount}">
            <label for="etudes-en-cours-educ-${educationalCount}">Études en cours</label>
        </div>
        <button type="button" onclick="removeEducational(${educationalCount})" class="text-red">Supprimer</button>
    `;

    //Ajouter le nouveau détail éducatif au conteneur
    container.appendChild(educationalDiv);

    setTimeout(() => {
        educationalDiv.classList.add('fade-in');
    }, 10);

    setupEducationalDuration(educationalCount);

    updateAddEducationalButtonText();

    addEducationalValidators(educationalCount);

    }
    

    function setupEducationalDuration(id) {
    const checkbox = document.getElementById(`etudes-en-cours-educ-${id}`);
    const moisFin = document.getElementById(`mois-fin-educ-${id}`);
    const anneeFin = document.getElementById(`annee-fin-educ-${id}`);

    checkbox.addEventListener('change', function() {
        moisFin.disabled = this.checked;
        anneeFin.disabled = this.checked;
        if (this.checked) {
            moisFin.value = '';
            anneeFin.value = '';
        }
    });
}

function validateDuration(educationalCount) {
    const moisDebut = document.getElementById(`mois-debut-educ-${educationalCount}`).value;
    const anneeDebut = document.getElementById(`annee-debut-educ-${educationalCount}`).value;
    const moisFin = document.getElementById(`mois-fin-educ-${educationalCount}`).value;
    const anneeFin = document.getElementById(`annee-fin-educ-${educationalCount}`).value;
    const educsEnCours = document.getElementById(`etudes-en-cours-educ-${educationalCount}`).checked;

    let errorMessage = '';

    // Si "Etudes en cours" est coché
    if (educsEnCours) {
        // Vérifier que les champs Mois début et Année début sont remplis
        if (!moisDebut || !anneeDebut) {
            errorMessage = "Durée ne peut pas être vide";
        }
    } else {
        // Si la case n'est pas cochée, vérifier la période complète
        if (!moisDebut || !anneeDebut || !moisFin || !anneeFin) {
            errorMessage = "Entrez une durée valide";
        } else if (anneeDebut > anneeFin || (anneeDebut === anneeFin && moisDebut > moisFin)) {
            errorMessage = "La date de fin doit être postérieure ou égale à la date de début";
        }
    }

    // Afficher ou cacher le message d'erreur
    const errorElement = document.getElementById(`duree-error-${educationalCount}`);
    if (errorMessage) {
        if (!errorElement) {
            const errorDiv = document.createElement('div');
            errorDiv.id = `duree-error-${educationalCount}`;
            errorDiv.classList.add('text-red-500', 'text-sm');
            errorDiv.textContent = errorMessage;
            document.getElementById(`educational-${educationalCount}`).appendChild(errorDiv);
        } else {
            errorElement.textContent = errorMessage;
        }
    } else if (errorElement) {
        errorElement.remove();
    }
}

function setupEducationalDuration(id) {
    const checkbox = document.getElementById(`etudes-en-cours-educ-${educationalCount}`);
    const moisFin = document.getElementById(`mois-fin-educ-${educationalCount}`);
    const anneeFin = document.getElementById(`annee-fin-educ-${educationalCount}`);

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            // Désactiver Mois fin et Année fin
            moisFin.disabled = true;
            anneeFin.disabled = true;

            // Effacer les valeurs des champs Mois fin et Année fin
            moisFin.value = '';
            anneeFin.value = '';
        } else {
            // Réactiver Mois fin et Année fin
            moisFin.disabled = false;
            anneeFin.disabled = false;
        }

        // Valider la période
        validateDuration(educationalCount);
    });

    // Ajouter des écouteurs pour la validation sur les dates
    document.getElementById(`mois-debut-educ-${educationalCount}`).addEventListener('change', () => validateDuration(educationalCount));
    document.getElementById(`annee-debut-educ-${educationalCount}`).addEventListener('change', () => validateDuration(educationalCount));
    moisFin.addEventListener('change', () => validateDuration(educationalCount));
    anneeFin.addEventListener('change', () => validateDuration(educationalCount));
}


    function removeEducational(id) {
        const educationalDiv = document.getElementById(`educational-${id}`);
        if (educationalDiv) {
            educationalDiv.classList.add('fade-out');

            setTimeout(() => {
                educationalDiv.remove();
                educationalCount--;
                renumberEducational();
                updateAddEducationalButtonText();
            }, 500);
        }
    }

    function updateAddEducationalButtonText() {
        const addBtn = document.querySelector('.add-educational strong');
        if (educationalCount === 0) {
            addBtn.textContent = '+ Ajouter';
        } else {
            addBtn.textContent = '+ Ajouter plus';
        }
    }

    function renumberEducational() {
        const educationalItems = document.querySelectorAll('.tabular-data-div');
        educationalItems.forEach((item, index) => {
            const countElem = item.querySelector('.crc-tabular-count');
            countElem.textContent = index + 1;
            item.id = `educational-${index + 1}`;

            item.querySelectorAll('input, select').forEach(input => {
                const oldName = input.name;
                const newName = oldName.replace(/\d+$/, index + 1);
                input.name = newName;
                input.id = newName;
            });

            const removeButton = item.querySelector('.text-red');
            if (removeButton) {
                removeButton.setAttribute('onclick', `removeEducational(${index + 1})`);
            }
        });

        //Mettre à jour le nombre de détails éducatifs
        educationalCount = educationalItems.length;
    }

    // async function loadCompetences() {
    //         try {
    //             const response = await fetch('competences.json');
    //             if (!response.ok) throw new Error('Network response was not ok');
    //             const data = await response.json();
    //             // Extraire les valeurs de 'technologyKeys'
    //             const competences = data.map(item => item.technologyKeys);
    //             return competences;
    //         } catch (error) {
    //             console.error('Erreur lors du chargement des compétences:', error);
    //             return [];
    //         }
    //     }

    //     document.addEventListener('DOMContentLoaded', async () => {
    //         const competences = await loadCompetences();
    //         const input = document.querySelector('#competences');

    //         const tagify = new Tagify(input, {
    //             whitelist: competences, // Liste des compétences pour l'auto-complétion
    //             enforceWhitelist: false, // Permet d'ajouter des tags non dans la liste
    //             dropdown: {
    //                 maxItems: 10, // Nombre maximal d'éléments dans le dropdown
    //                 enabled: 1, // Activer le dropdown par défaut
    //                 closeOnSelect: false
    //             }
    //         });

    //         tagify.on('add', e => {
    //             console.log('Tag ajouté:', e.detail.data.value);
    //         });

    //         tagify.on('remove', e => {
    //             console.log('Tag supprimé:', e.detail.data.value);
    //         });

    //         tagify.on('input', e => {
    //             console.log('Recherche:', e.detail.value);
    //         });
    //     });

    
    document.addEventListener('DOMContentLoaded', function() {
        const input = document.querySelector('#competences');

        // Liste des compétences
        const allCompetences = [
            'Java', 'JavaScript', 'HTML', 'CSS', 'React', 'Angular', 'Vue.js',
            'SQL', 'MySQL', 'AWS', 'Python', 'C++', 'Git', 'Docker',
            'Java EE', 'JavaFX', 'Spring', 'Hibernate',
            'Node.js', 'Express.js', 'Django', 'Flask', 'Ruby on Rails', 'PHP', 'Laravel', 'ASP.NET',
            'Android', 'iOS', 'Swift', 'Kotlin', 'React Native', 'Flutter',
            'PostgreSQL', 'MongoDB', 'Oracle', 'Redis',
            'Azure', 'Google Cloud', 'Kubernetes', 'Jenkins',
            'TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP',
            'Data Analysis', 'Data Visualization', 'Tableau', 'Power BI',
            'C#', 'Go', 'Rust', 'Scala', 'Perl', 'Haskell',
            'Project Management', 'Agile', 'Scrum', 'Leadership',
            'UX Design', 'UI Design', 'Photoshop', 'Illustrator', 'Figma',
            'SVN', 'Mercurial',
            'JUnit', 'Selenium', 'TestNG', 'Cypress', 'Jest',
            'Hadoop', 'Spark', 'Hive', 'Pig', 'Kafka'
        ];

        // Initialiser Tagify sur le champ de saisie
        const tagify = new Tagify(input, {
            whitelist: allCompetences, // Liste des compétences pour l'autocomplétion
            dropdown: {
                maxItems: 20,           // Nombre maximal d'éléments dans le menu déroulant
                classname: 'competences-list',
                enabled: 0,             // Toujours afficher le menu déroulant
                closeOnSelect: false    // Ne pas fermer le menu après sélection
            }
        });

        // Fonction de validation
        function validateCompetences() {
            const errorSpan = document.getElementById('competences-error');
            if (tagify.value.length === 0) {
                errorSpan.classList.remove('hidden');  // Afficher l'erreur
                input.classList.add('border-red-500');
            } else {
                errorSpan.classList.add('hidden');     // Cacher l'erreur
                input.classList.remove('border-red-500');
            }
        }

        // Événements pour la validation
        tagify.on('add', validateCompetences);
        tagify.on('remove', validateCompetences);

        // Validation initiale
        //validateCompetences();
    });

        
document.addEventListener('DOMContentLoaded', function () {
    const fonctionActuelleSelect = document.getElementById('fonction_actuelle');
    const errorSpan = document.getElementById('fonction_actuelle-error');
    let fieldTouched = false;

    function validateFonctionActuelle() {
        if (fieldTouched && fonctionActuelleSelect.value === "-Aucun-") {
            errorSpan.classList.remove('hidden');
            fonctionActuelleSelect.classList.add('border-red-500');
        } else {
            errorSpan.classList.add('hidden');
            fonctionActuelleSelect.classList.remove('border-red-500');
        }
    }

    fonctionActuelleSelect.addEventListener('change', function() {
        fieldTouched = true;
        validateFonctionActuelle();
    });

    fonctionActuelleSelect.addEventListener('blur', function() {
        fieldTouched = true;
        validateFonctionActuelle();
    });

    // Validation when user clicks outside the select field
    document.addEventListener('click', function(event) {
        if (fieldTouched && !fonctionActuelleSelect.contains(event.target)) {
            validateFonctionActuelle();
        }
    });

    // Set fieldTouched to true only when the field is focused
    fonctionActuelleSelect.addEventListener('focus', function() {
        fieldTouched = true;
    });

    // Clear validation state when form is reset
    document.querySelector('form').addEventListener('reset', function() {
        fieldTouched = false;
        errorSpan.classList.add('hidden');
        fonctionActuelleSelect.classList.remove('border-red-500');
    });
});


// document.addEventListener('DOMContentLoaded', function () {
//     const linkedinInput = document.getElementById('linkedin');
//     const errorSpan = document.getElementById('linkedin-error');

//     function validateLinkedIn() {
//         const linkedinValue = linkedinInput.value.trim();
//         const linkedinRegex = /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/;

//         console.log('LinkedIn Value:', linkedinValue); // Debugging line
//         console.log('Regex Test:', linkedinRegex.test(linkedinValue)); // Debugging line

//         if (!linkedinValue) {
//             errorSpan.textContent = 'Ce champ est requis.';
//             errorSpan.classList.remove('hidden');
//             linkedinInput.classList.add('border-red-500');
//         } else if (!linkedinRegex.test(linkedinValue)) {
//             errorSpan.textContent = 'Veuillez entrer un lien LinkedIn valide.';
//             errorSpan.classList.remove('hidden');
//             linkedinInput.classList.add('border-red-500');
//         } else {
//             errorSpan.classList.add('hidden');
//             linkedinInput.classList.remove('border-red-500');
//         }
//     }

//     linkedinInput.addEventListener('input', validateLinkedIn);
//     linkedinInput.addEventListener('blur', validateLinkedIn);
// });
