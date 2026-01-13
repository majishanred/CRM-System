export const getTodoValidationMessage = (todoTitle: string = '') => {
  if (!todoTitle.length) {
    return 'Обязательное поле';
  } else if (todoTitle.length < 2) {
    return 'Минимальный размер текста - 2';
  } else if (todoTitle.length > 1 && !todoTitle.trim()) {
    return 'Текст задачи не может состоять только из пробелов';
  }

  return '';
};
