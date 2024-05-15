import * as SecureStore from 'expo-secure-store';
const SecureStorageService = {
  getValue: async (key) => {
    try {
      const value = await SecureStore.getItemAsync(key);
      return value;
    } catch (error) {
      console.error(`Error getting value for key '${key}':`, error);
      return null;
    }
  },

  setItem: async (key, value) => {
    try {
      await SecureStore.setItemAsync(key, value);
      return true;
    } catch (error) {
      console.error(`Error setting item for key '${key}':`, error);
      return false;
    }
  },

  removeItem: async (key) => {
    try {
      await SecureStore.deleteItemAsync(key);
      return true;
    } catch (error) {
      console.error(`Error removing item for key '${key}':`, error);
      return false;
    }
  },

  getAllKeys: async () => {
    try {
      const keys = await SecureStore.getAllKeysAsync();
      return keys;
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  },

  clearAllItems: async () => {
    try {
      await SecureStore.deleteAllItemsAsync();
      return true;
    } catch (error) {
      console.error('Error clearing all items:', error);
      return false;
    }
  },
};

export default SecureStorageService;

