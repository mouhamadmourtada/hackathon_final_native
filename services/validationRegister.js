export const isValidatedUser = (userData) => {
    const errors = {};
  
    if (!userData.email) {
      errors.email = "Veuillez entrer une adresse e-mail";
    } else if (!isValidEmail(userData.email)) {
      errors.email = "Veuillez entrer une adresse e-mail valide";
    }
  
   
    if (!userData.nom) {
      errors.nom = "Veuillez saisir votre nom";
    }
  
    if (!userData.prenom) {
      errors.prenom = "Veuillez saisir votre prénom";
    }
  
    if (!userData.adresse) {
      errors.adresse = "Veuillez saisir votre  adresse";
    }
  
    if (!userData.lieuNaissance) {
      errors.lieuNaissance = "Veuillez saisir votre lieu de naissance";
    }
  
    if (!userData.dateNaissance) {
      errors.dateNaissance = "Veuillez sélectionner votre date de naissance";
    }
  
    if (!userData.password) {
      errors.password = "Veuillez entrer un mot de passe";
    } else if (userData.password.length < 5) {
      errors.password = "Le mot de passe doit avoir au moins 5 caractères";
    }
  
    return errors;
  };
  
  const isValidEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };
  

  
// export const isValidatedCriterePhysiqueGardien = (critereData) => {
//     const validateRange = (value) => {
//         return value >= 0 && value <= 100;
//     };

//     const errors = {};


//     if (!critereData.saut) {
//         errors.saut = "Veuillez entrer la valeur de saut";
//     } else if (isNaN(critereData.saut) || !validateRange(critereData.saut)) {
//         errors.saut = "La valeur de saut doit être un nombre valide entre 0 et 100";
//     }

//     if (!critereData.plongeon) {
//         errors.plongeon = "Veuillez entrer la valeur de plongeon";
//     } else if (isNaN(critereData.plongeon) || !validateRange(critereData.plongeon)) {
//         errors.plongeon = "La valeur de plongeon doit être un nombre valide entre 0 et 100";
//     }

//     if (!critereData.arret) {
//         errors.arret = "Veuillez entrer la valeur d'arrêt";
//     } else if (isNaN(critereData.arret) || !validateRange(critereData.arret)) {
//         errors.arret = "La valeur d'arrêt doit être un nombre valide entre 0 et 100";
//     }

//     if (!critereData.degagement) {
//         errors.degagement = "Veuillez entrer la valeur de dégagement";
//     } else if (isNaN(critereData.degagement) || !validateRange(critereData.degagement)) {
//         errors.degagement = "La valeur de dégagement doit être un nombre valide entre 0 et 100";
//     }

//     if (!critereData.placement) {
//         errors.placement = "Veuillez entrer la valeur de placement";
//     } else if (isNaN(critereData.placement) || !validateRange(critereData.placement)) {
//         errors.placement = "La valeur de placement doit être un nombre valide entre 0 et 100";
//     }

//     if (!critereData.reflex) {
//         errors.reflex = "Veuillez entrer la valeur de réflexe";
//     } else if (isNaN(critereData.reflex) || !validateRange(critereData.reflex)) {
//         errors.reflex = "La valeur de réflexe doit être un nombre valide entre 0 et 100";
//     }

//     return errors;
// };
  
  

// export const isValidatedCriterePhysiqueJoueur = (critereData) => {
//     const validateRange = (value, max) => {
//         return value >= 0 && value <= max;
//       };
//     const errors = {};
  
//     if (!critereData.vitesse) {
//       errors.vitesse = "Veuillez entrer la vitesse";
//     } else if (isNaN(critereData.vitesse) || !validateRange(critereData.vitesse, 100)) {
//         errors.vitesse = "La valeur de vitesse doit être un nombre valide entre 0 et 100";;
//     }
  
//     if (!critereData.puissance) {
//       errors.puissance = "Veuillez entrer la puissance";
//     } else if (isNaN(critereData.puissance) || !validateRange(critereData.puissance, 100)) {
//       errors.puissance = "La puissance doit être un nombre valide entre 0 et 100";
//     }
  
//     if (!critereData.endurance) {
//       errors.endurance = "Veuillez entrer l'endurance";
//     } else if (isNaN(critereData.endurance) || !validateRange(critereData.endurance, 100)) {
//       errors.endurance = "L'endurance doit être un nombre valide entre 0 et 100";
//     }
  
//     if (!critereData.taille) {
//       errors.taille = "Veuillez entrer la taille";
//     } else if (isNaN(critereData.taille) || !validateRange(critereData.taille, 300)) {
//       errors.taille = "La taille doit être un nombre valide entre 0 et 300";
//     }
  
//     if (!critereData.controle) {
//       errors.controle = "Veuillez entrer le contrôle";
//     } else if (isNaN(critereData.controle) || !validateRange(critereData.controle, 100)) {
//       errors.controle = "Le contrôle doit être un nombre valide entre 0 et 100";
//     }
  
//     if (!critereData.passe) {
//       errors.passe = "Veuillez entrer le passe";
//     } else if (isNaN(critereData.passe) || !validateRange(critereData.passe, 100)) {
//       errors.passe = "Le passe doit être un nombre valide entre 0 et 100";
//     }
  
//     if (!critereData.tir) {
//       errors.tir = "Veuillez entrer le tir";
//     } else if (isNaN(critereData.tir) || !validateRange(critereData.tir, 100)) {
//       errors.tir = "Le tir doit être un nombre valide entre 0 et 100";
//     }
  
//     if (!critereData.dribble) {
//       errors.dribble = "Veuillez entrer le dribble";
//     } else if (isNaN(critereData.dribble) || !validateRange(critereData.dribble, 100)) {
//       errors.dribble = "Le dribble doit être un nombre valide entre 0 et 100";
//     }
  
//     if (!critereData.tete) {
//       errors.tete = "Veuillez entrer le jeu de tête";
//     } else if (isNaN(critereData.tete) || !validateRange(critereData.tete, 100)) {
//       errors.tete = "Le jeu de tête doit être un nombre valide entre 0 et 100";
//     }

//     if (!critereData.piedDroit) {
//         errors.piedDroit = "Veuillez saisir l'estimation de votre pied droit";
//     } else if (isNaN(critereData.piedDroit) || !validateRange(critereData.piedDroit, 100)) {
//         errors.piedDroit = "Cette valeur doit être un nombre valide entre 0 et 100";
//     }

//     if (!critereData.piedGauche) {
//         errors.piedGauche = "Veuillez saisir l'estimation de votre pied gauche";
//     } else if (isNaN(critereData.piedGauche) || !validateRange(critereData.piedGauche, 100)) {
//         errors.piedGauche = "Cette valeur doit être un nombre valide entre 0 et 100";
//     }
//     if (!critereData.poids) {
//         errors.poids = "Veuillez renseigner votre poids";
//     } else if (isNaN(critereData.poids) || !validateRange(critereData.poids, 180)) {
//         errors.poids = "Cette valeur doit être un nombre valide entre 0 et 180 kg";
//     }
  
//     if (!critereData.piedFort) {
//       errors.piedFort = "Veuillez sélectionner le pied fort";
//     }
  
//     return errors;
// };
  