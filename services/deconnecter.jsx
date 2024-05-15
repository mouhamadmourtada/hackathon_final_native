// il me faut un service de déconnexion, la déconnexion doit vider le store
// allez y génère tout 
import SecureStorageService from './store'; // Import du service de stockage sécurisé

const DeconnecterService = {
    deconnecter: () => {
        SecureStorageService.removeItem('token');
        return null;
    }
};


export default DeconnecterService