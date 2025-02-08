<?php

use PHPUnit\Framework\TestCase;

require_once 'todo.php';

class TodoTest extends TestCase
{
    protected function setUp(): void
    {
        $_SESSION['todos'] = [];
    }

    public function testAddTask(): void
    {
        addTask('Купить молоко');
        $tasks = listTasks();
        $this->assertCount(1, $tasks);
        $this->assertEquals('Купить молоко', $tasks[0]['text']);
        $this->assertFalse($tasks[0]['completed']);

        $this->assertFalse(addTask('  '));
        $tasksAfterEmpty = listTasks();
        $this->assertCount(1, $tasksAfterEmpty, 'Пустая задача не должна добавляться');
    }

    public function testListTasks(): void
    {
        $this->assertEmpty(listTasks());

        addTask('Задача 1');
        addTask('Задача 2');
        $tasks = listTasks();
        $this->assertCount(2, $tasks);
        $this->assertEquals('Задача 1', $tasks[0]['text']);
        $this->assertEquals('Задача 2', $tasks[1]['text']);
    }

    public function testCompleteTask(): void
    {
        addTask('Задача для выполнения');
        $this->assertTrue(completeTask(0));
        $tasks = listTasks();
        $this->assertTrue($tasks[0]['completed']);

        $this->assertFalse(completeTask(1));
        $this->assertFalse(completeTask(-1));
    }

    public function testDeleteTask(): void
    {
        addTask('Задача 1');
        addTask('Задача 2');
        addTask('Задача 3');

        $this->assertTrue(deleteTask(1));
        $tasksAfterDelete = listTasks();
        $this->assertCount(2, $tasksAfterDelete);
        $this->assertEquals('Задача 1', $tasksAfterDelete[0]['text']);
        $this->assertEquals('Задача 3', $tasksAfterDelete[1]['text']);

        $this->assertFalse(deleteTask(5));
    }

    public function testEditTask(): void
    {
        addTask('Старая задача');
        $this->assertTrue(editTask(0, 'Новая задача'));
        $tasks = listTasks();
        $this->assertEquals('Новая задача', $tasks[0]['text']);

        $this->assertFalse(editTask(1, 'Другая задача'));
        $this->assertFalse(editTask(0, '  '));
        $tasksAfterEmptyEdit = listTasks();
        $this->assertEquals('Новая задача', $tasksAfterEmptyEdit[0]['text'], 'Текст задачи не должен измениться при попытке установить пустой текст');
    }

    public function testCountCompletedTasks(): void
    {
        addTask('Задача 1');
        addTask('Задача 2');
        addTask('Задача 3');

        $this->assertEquals(0, countCompletedTasks());

        completeTask(0);
        $this->assertEquals(1, countCompletedTasks());

        completeTask(2);
        $this->assertEquals(2, countCompletedTasks());
    }
}