import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'All todos': 'All',
      'Completed todos': 'Done',
      'In progress': 'In progress',
      'Enter todo name': 'Enter todo name',
      'Minimal symbols amount': 'Minimal symbols count',
      'Maximal symbols amount': 'Maximal symbols amount',
      'Space only not allowed': "Todo's name cannot contains spaces only",
      'Create todo': 'Create todo',
      'Todo List': 'Todo List',
      Profile: 'Profile',
      Users: 'Users',
      Navigation: 'Navigation',
    },
  },
  ru: {
    translation: {
      'All todos': 'Все',
      'Completed todos': 'Сделано',
      'In progress': 'В работе',
      'Enter todo name': 'Введите название задачи',
      'Minimal symbols amount': 'Минимальное количество символов',
      'Maximal symbols amount': 'Максимальное количество символов',
      'Space only not allowed': 'Текст задачи не может состоять только из пробелов',
      'Create todo': 'Создать задачу',
      'Todo List': 'Список задач',
      Profile: 'Профиль',
      Users: 'Пользователи',
      Navigation: 'Навигация',
    },
  },
};

console.log(navigator.language.split('-')[0]);

i18n.use(initReactI18next).init({
  resources,
  lng: navigator.language.split('-')[0],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
