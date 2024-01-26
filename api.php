<?php
$server="localhost";// $sername="127.0.0.1";
$username="root";
$password="";
$db="ajax_student_app";
// Connect to the database
$conn = new mysqli($server, $username, $password, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Set content type to JSON
header('Content-Type: application/json');
// Check the request type
$method = $_SERVER['REQUEST_METHOD'];
// CRUD operations
switch ($method) {
    case 'GET':
        // Retrieve student details
        $result = $conn->query("SELECT * FROM students");
        $students = array();
        while ($row = $result->fetch_assoc()) {
            $students[] = $row;
        }
        echo json_encode($students);
        break;
    case 'POST':
        // Add a new student
        $name = $_POST['name'];
        $age = $_POST['age'];
        $grade = $_POST['grade'];
        $conn->query("INSERT INTO students (name, age, grade) VALUES ('$name', $age, '$grade')");
        echo json_encode(array('status' => 'success'));
        break;
    case 'PUT':
        // Update student details
        parse_str(file_get_contents("php://input"), $_PUT);
        $id = $_PUT['id'];
        $name = $_PUT['name'];
        $age = $_PUT['age'];
        $grade = $_PUT['grade'];
        $conn->query("UPDATE students SET name='$name', age=$age, grade='$grade' WHERE id=$id");
        echo json_encode(array('status' => 'success'));
        break;
    case 'DELETE':
        // Delete a student
        parse_str(file_get_contents("php://input"), $_DELETE);
        $id = $_DELETE['id'];
        $conn->query("DELETE FROM students WHERE id=$id");
        echo json_encode(array('status' => 'success'));
        break;
}
$conn->close();
?>