import { encryptData, decryptData } from './encryption';

const USER_KEY = 'current_user';
const USERS_KEY = 'registered_users';

export const getCurrentUser = () => {
    try {
        return JSON.parse(localStorage.getItem(USER_KEY)) || null;
    } catch {
        return null;
    }
};

export const setCurrentUser = (user) => {
    if (user) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(USER_KEY);
    }
};

export const getUserSpecificKey = (baseKey) => {
    const user = getCurrentUser();
    return user ? `${baseKey}_${user.id}` : baseKey;
};

export const getStorageForCurrentUser = (key, defaultValue = null) => {
    try {
        const userKey = getUserSpecificKey(key);
        const encryptedData = localStorage.getItem(userKey);
        if (!encryptedData) return defaultValue;

        const decryptedData = decryptData(encryptedData);
        return decryptedData || defaultValue;
    } catch (error) {
        console.error(`Error getting ${key} for current user:`, error);
        return defaultValue;
    }
};

export const setStorageForCurrentUser = (key, value) => {
    try {
        const userKey = getUserSpecificKey(key);
        const encryptedData = encryptData(value);
        localStorage.setItem(userKey, encryptedData);
        return true;
    } catch (error) {
        console.error(`Error setting ${key} for current user:`, error);
        return false;
    }
};

export const clearStorageForCurrentUser = (key) => {
    try {
        const userKey = getUserSpecificKey(key);
        localStorage.removeItem(userKey);
        return true;
    } catch (error) {
        console.error(`Error clearing ${key} for current user:`, error);
        return false;
    }
}; 