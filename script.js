// Journal des indices et menu déroulant
const logList = document.getElementById('log-list');

// Variables pour la solution
const trueCulprit = "Luka"; // Le vrai coupable
const essentialClues = [
    "Un journal intime appartenant à Luka, contenant des critiques violentes contre David.",
    "Une paire de chaussures boueuses correspondant aux traces trouvées dans la cave.",
    "Une corde identique à celle utilisée dans le meurtre."
];

// Indices par pièce
const roomClues = {
    "Cuisine": [
        "Un torchon taché de sang.",
        "Une note manuscrite suspecte."
    ],
    "Salon": [
        "Une photo de famille cassée.",
        "Un livre annoté par David."
    ],
    "Chambre 1": [
        "Une lettre adressée à Sandra.",
        "Un bijou caché sous le lit."
    ],
    "Chambre 2": [
        "Un journal intime appartenant à Luka, contenant des critiques violentes contre David."
    ],
    "Chambre 3": [
        "Une lettre déchirée.",
        "Une bouteille de vin vide."
    ],
    "Salle de Bain": [
        "Une serviette tachée de rouge.",
        "Un gant en cuir."
    ],
    "Cave": [
        "Une bouteille cassée avec des traces de sang.",
        "Une empreinte de chaussure."
    ],
    "Jardin": [
        "Une corde identique à celle utilisée dans le meurtre.",
        "Une lampe torche abandonnée."
    ],
    "Cour devant la maison": [
        "Des traces de pneus récentes.",
        "Une paire de chaussures boueuses correspondant aux traces trouvées dans la cave."
    ]
};

// Fonction pour afficher les indices trouvés dans une pièce
function enterRoom(room) {
    clearLog(); // Effacer les indices précédents
    const clues = roomClues[room];
    if (clues && clues.length > 0) {
        alert(`Vous explorez ${room}. Voici ce que vous trouvez :`);
        clues.forEach(addLog);
    } else {
        alert(`Vous explorez ${room}, mais rien de significatif ne semble s'y trouver.`);
    }
}

// Ajouter un indice au journal
function addLog(clue) {
    const listItem = document.createElement('li');
    listItem.textContent = clue;
    logList.appendChild(listItem);
    updateAvailableClues(); // Mettre à jour le menu déroulant
}

// Fonction pour normaliser les chaînes (pour éviter les problèmes de formatage)
function normalizeString(str) {
    return str.trim().toLowerCase(); // Supprimer les espaces et uniformiser en minuscule
}

// Fonction pour valider si les indices collectés contiennent tous les indices essentiels
function validateClues(collectedClues, requiredClues) {
    const normalizedCollected = collectedClues.map(normalizeString);
    const normalizedRequired = requiredClues.map(normalizeString);

    return normalizedRequired.every(clue => normalizedCollected.includes(clue));
}

// Fonction pour afficher les indices trouvés dans une pièce
function enterRoom(room) {
    clearLog(); // Effacer les indices précédents

    const clues = roomClues[room];
    if (clues && clues.length > 0) {
        alert(`Vous explorez ${room}. Voici ce que vous trouvez :`);
        clues.forEach(addLog);
    } else {
        alert(`Vous explorez ${room}, mais rien de significatif ne semble s'y trouver.`);
    }
}

// Effacer les indices affichés dans le journal
function clearLog() {
    logList.innerHTML = "";
}

// Mettre à jour le menu déroulant des indices collectés
function updateAvailableClues() {
    const availableClues = document.getElementById('available-clues');
    availableClues.innerHTML = ""; // Réinitialiser la liste
    const clues = document.querySelectorAll('#log-list li'); // Récupérer les indices collectés
    clues.forEach(clue => {
        const option = document.createElement('option');
        option.value = clue.textContent;
        option.textContent = clue.textContent;
        availableClues.appendChild(option);
    });
}

// Ajouter un indice sélectionné à la liste des indices intégrés
function addClue() {
    const availableClues = document.getElementById('available-clues');
    const selectedClues = document.getElementById('selected-clues');
    const selectedOption = availableClues.value;

    if (selectedOption) {
        const existingClues = Array.from(selectedClues.children).map(li => li.textContent);
        if (!existingClues.includes(selectedOption)) {
            const clueItem = document.createElement('li');
            clueItem.textContent = selectedOption;
            selectedClues.appendChild(clueItem);
        }
    }
}

// Valider l'hypothèse
function submitHypothesis() {
    const selectedClues = Array.from(document.getElementById('selected-clues').children).map(li => li.textContent);
    const selectedSuspect = document.getElementById('suspect').value;
    const resultMessage = document.getElementById('result-message');

    // Validation stricte
    if (normalizeString(selectedSuspect) === normalizeString(trueCulprit) && validateClues(selectedClues, essentialClues)) {
        resultMessage.textContent = "Félicitations ! Vous avez résolu l'affaire avec succès.";
        resultMessage.className = "result-message green";
    } else {
        resultMessage.textContent = "Votre hypothèse est incorrecte. Vérifiez vos indices et suspect.";
        resultMessage.className = "result-message red";

        // Réinitialiser après une erreur
        document.getElementById('selected-clues').innerHTML = ""; // Effacer les indices sélectionnés
        document.getElementById('suspect').value = ""; // Réinitialiser le suspect
    }
}

// Initialiser les pièces de la maison
function initializeRooms() {
    const rooms = Object.keys(roomClues);
    const mapContainer = document.querySelector('.map');

    rooms.forEach(room => {
        const roomDiv = document.createElement('div');
        roomDiv.classList.add('room');
        roomDiv.textContent = room;
        roomDiv.onclick = () => enterRoom(room);
        mapContainer.appendChild(roomDiv);
    });
}


// Ajouter des événements pour les interactions
document.getElementById('log-list').addEventListener('DOMSubtreeModified', updateAvailableClues);
document.getElementById('add-clue').addEventListener('click', addClue);
document.getElementById('submit-hypothesis').addEventListener('click', submitHypothesis);

const masterSection = document.getElementById('game-master-section');
const toggleButton = document.getElementById('toggle-master-section');

// Fonction pour afficher/masquer la section Maître du Jeu
toggleButton.addEventListener('click', () => {
    if (masterSection.style.display === "none" || !masterSection.style.display) {
        masterSection.style.display = "block";
    } else {
        masterSection.style.display = "none";
    }
});

const depositionsSection = document.getElementById('depositions-section');
const accessButton = document.getElementById('access-button');
const accessCodeInput = document.getElementById('access-code');
const errorMessage = document.getElementById('error-message'); 

// Code secret défini
const secretCode = "2206"; // Remplacez "1234" par votre code secret

// Gestion de l'accès
accessButton.addEventListener('click', () => {
    const enteredCode = accessCodeInput.value;
    if (enteredCode === secretCode) {
        depositionsSection.style.display = "block";
        document.getElementById('code-access').style.display = "none";
    } else {
        errorMessage.style.display = "block";
        setTimeout(() => {
            errorMessage.style.display = "none";
        }, 3000);
    }
});

// Sélectionner les boutons d'accès et de masquage
const accessButtons = document.querySelectorAll('.access-button');
const hideButtons = document.querySelectorAll('.hide-deposition');

// Fonction pour gérer l'accès aux dépositions
accessButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.target; // Récupérer l'ID de la déposition cible
        const inputId = `access-${targetId.split('-')[1]}`; // ID de l'input associé
        const correctCode = button.dataset.code; // Code correct pour cette déposition
        const inputElement = document.getElementById(inputId); // Élément input pour le code
        const errorMessage = button.nextElementSibling; // Élément pour le message d'erreur

        // Vérifier si le code est correct
        if (inputElement.value === correctCode) {
            document.getElementById(targetId).style.display = 'block'; // Afficher la déposition
            inputElement.value = ''; // Réinitialiser le champ input
            errorMessage.style.display = 'none'; // Masquer le message d'erreur
        } else {
            errorMessage.style.display = 'block'; // Afficher le message d'erreur
            setTimeout(() => {
                errorMessage.style.display = 'none'; // Masquer le message après 3 secondes
            }, 3000);
        }
    });
});

// Fonction pour masquer les dépositions
hideButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.target; // Récupérer l'ID de la déposition cible
        document.getElementById(targetId).style.display = 'none'; // Masquer la déposition
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-hypothesis');
    const selectedClues = document.getElementById('selected-clues');
    const suspectInput = document.getElementById('suspect');
    const resultMessage = document.getElementById('result-message');

    // Variables pour la validation
    const trueCulprit = "Luka"; // Le coupable réel
    const essentialClues = [
        "Un journal intime appartenant à Luka, contenant des critiques violentes contre David.",
        "Une paire de chaussures boueuses correspondant aux traces trouvées dans la cave.",
        "Un morceau de corde identique à celle utilisée dans le meurtre."
    ];

    // Gestion de la soumission de l'hypothèse
    submitButton.addEventListener('click', () => {
        const selectedCluesList = Array.from(selectedClues.children).map(li => li.textContent);
        const selectedSuspect = suspectInput.value;

        // Vérification des indices et du coupable
        if (selectedSuspect === trueCulprit && essentialClues.every(clue => selectedCluesList.includes(clue))) {
            resultMessage.textContent = "Félicitations ! Vous avez résolu l'affaire avec succès.";
            resultMessage.className = "result-message green";
        } else {
            resultMessage.textContent = "Votre hypothèse est incorrecte. Vérifiez vos indices et suspect.";
            resultMessage.className = "result-message red";

            // Réinitialisation des champs après une tentative erronée
            selectedClues.innerHTML = ""; // Effacer la liste des indices sélectionnés
            suspectInput.value = ""; // Réinitialiser le champ suspect
        }
    });
});

// Initialiser les pièces et interactions
initializeRooms();
