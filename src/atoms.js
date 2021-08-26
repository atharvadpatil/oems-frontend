import { atom } from "recoil";

const localStorageEffect = key => ({setSelf, onSet}) => {
    const savedValue = localStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  
    onSet(newValue => {
    //   if (newValue instanceof DefaultValue) {
    //     localStorage.removeItem(key);
    //   } else {
        localStorage.setItem(key, JSON.stringify(newValue));
    //   }
    });
  };

export const userData = atom({
    key: "userData",
    default: {},
    effects_UNSTABLE: [
        localStorageEffect('userData'),
    ]
});

export const isLoggedIn = atom({
    key: "isLoggedIn",
    default: false,
    effects_UNSTABLE: [
        localStorageEffect('isLoggedIn'),
    ]
});

export const currentClassId = atom({
    key: "currentClassId",
    default: 0,
    effects_UNSTABLE: [
        localStorageEffect('currentClassId'),
    ]
});

export const currentTabId = atom({
    key: "currentTabId",
    default: 0,
    effects_UNSTABLE: [
        localStorageEffect('currentTabId'),
    ]
});

export const quizDrawerId = atom({
    key: "quizDrawerId",
    default: 0,
    effects_UNSTABLE: [
        localStorageEffect('quizDrawerId'),
    ]
});