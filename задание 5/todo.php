<?php
session_start();

if (!isset($_SESSION['todos'])) {
    $_SESSION['todos'] = [];
}

function addTask(string $task): bool
{
    if (empty(trim($task))) {
        return false;
    }
    $_SESSION['todos'][] = ['text' => $task, 'completed' => false];
    return true;
}

function listTasks(): array
{
    return $_SESSION['todos'];
}

function completeTask(int $index): bool
{
    if (isset($_SESSION['todos'][$index])) {
        $_SESSION['todos'][$index]['completed'] = true;
        return true;
    }
    return false;
}

function deleteTask(int $index): bool
{
    if (isset($_SESSION['todos'][$index])) {
        array_splice($_SESSION['todos'], $index, 1);
        return true;
    }
    return false;
}

function editTask(int $index, string $newTaskText): bool
{
    if (empty(trim($newTaskText))) {
        return false;
    }
    if (isset($_SESSION['todos'][$index])) {
        $_SESSION['todos'][$index]['text'] = $newTaskText;
        return true;
    }
    return false;
}

function countCompletedTasks(): int
{
    $count = 0;
    foreach ($_SESSION['todos'] as $task) {
        if ($task['completed']) {
            $count++;
        }
    }
    return $count;
}