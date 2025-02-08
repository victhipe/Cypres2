<?php
require_once 'todo.php';

header('Content-Type: text/plain; charset=utf-8');

$action = $_GET['action'] ?? '';

switch ($action) {
    case 'addTask':
        $task = $_POST['task'] ?? '';
        if (addTask($task)) {
            echo 'success';
        } else {
            echo 'error: empty task';
        }
        break;

    case 'listTasks':
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(listTasks());
        break;

    case 'completeTask':
        $index = isset($_GET['index']) ? intval($_GET['index']) : -1;
        if (completeTask($index)) {
            echo 'success';
        } else {
            echo 'error: invalid index';
        }
        break;

    case 'deleteTask':
        $index = isset($_GET['index']) ? intval($_GET['index']) : -1;
        if (deleteTask($index)) {
            echo 'success';
        } else {
            echo 'error: invalid index';
        }
        break;

    case 'editTask':
        $index = isset($_POST['index']) ? intval($_POST['index']) : -1;
        $newTaskText = $_POST['newTaskText'] ?? '';
        if (editTask($index, $newTaskText)) {
            echo 'success';
        } else {
            echo 'error: invalid index or empty text';
        }
        break;

    default:
        echo 'error: invalid action';
        break;
}