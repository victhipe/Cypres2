describe('Задание 5 - Unit testing nested objects - To-Do List', () => {
  beforeEach(() => {
    cy.visit('index.html'); 
  });

  it('1. Отображение пустого списка задач при загрузке', () => {
    cy.get('#taskList').should('be.empty');
  });

  it('2. Добавление новой задачи в список', () => {
    const taskText = 'Купить молоко';
    cy.get('#newTaskInput').type(taskText);
    cy.get('#addTaskButton').click();

    cy.get('#taskList li').should('have.length', 1);
    cy.get('#taskList li').should('contain.text', taskText);
  });

  it('3. Добавление нескольких задач и проверка их количества', () => {
    const tasks = ['Позвонить другу', 'Написать письмо', 'Прочитать книгу'];
    tasks.forEach(task => {
      cy.get('#newTaskInput').type(task);
      cy.get('#addTaskButton').click();
    });

    cy.get('#taskList li').should('have.length', tasks.length);
    tasks.forEach(task => {
      cy.get('#taskList li').should('contain.text', task);
    });
  });

  it('4. Отметка задачи как выполненной', () => {
    const taskText = 'Завершить задание';
    cy.get('#newTaskInput').type(taskText);
    cy.get('#addTaskButton').click();

    cy.get('#taskList li button').contains('Выполнено').click(); // Находим кнопку "Выполнено" в задаче
    cy.get('#taskList li').should('have.class', 'completed'); // Проверяем, что задача получила класс 'completed'
    cy.get('#taskList li button').contains('Не выполнено').should('be.visible'); // Кнопка должна измениться на "Не выполнено"
  });

  it('5. Удаление задачи из списка', () => {
    const taskText = 'Удалить эту задачу';
    cy.get('#newTaskInput').type(taskText);
    cy.get('#addTaskButton').click();

    cy.get('#taskList li').should('have.length', 1);
    cy.get('#taskList li button').contains('Удалить').click(); // Находим кнопку "Удалить"

    cy.get('#taskList').should('be.empty'); // Список задач должен стать пустым
  });

  it('6. Проверка, что поле ввода очищается после добавления задачи', () => {
    const taskText = 'Задача для проверки очистки поля';
    cy.get('#newTaskInput').type(taskText);
    cy.get('#addTaskButton').click();

    cy.get('#newTaskInput').should('have.value', ''); // Поле ввода должно быть пустым
  });
});