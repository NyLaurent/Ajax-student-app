document.addEventListener("DOMContentLoaded", function () {
    loadStudents();
    document.getElementById('addForm').addEventListener('submit', function (event) {
        event.preventDefault();
        addStudent();
    });
});
function loadStudents() {
    // Ajax request to get students
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                displayStudents(JSON.parse(xhr.responseText));
            } else {
                console.error('Failed to load students.');
            }
        }
    };
    xhr.open('GET', 'api.php', true);
    xhr.send();
}
function displayStudents(students) {
    var studentList = document.getElementById('studentList');
    studentList.innerHTML = '';
    students.forEach(function (student) {
        var studentDiv = document.createElement('div');
        studentDiv.innerHTML = `
            <p>ID: ${student.id}</p>
            <p>Name: ${student.name}</p>
            <p>Age: ${student.age}</p>
            <p>Grade: ${student.grade}</p>
            <button onclick="editStudent(${student.id})">Edit</button>
            <button onclick="deleteStudent(${student.id})">Delete</button>
            <hr>
        `;
        studentList.appendChild(studentDiv);
    });
}
function addStudent() {
    var name = document.getElementById('name').value;
    var age = document.getElementById('age').value;
    var grade = document.getElementById('grade').value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                loadStudents();
            } else {
                console.error('Failed to add student.');
            }
        }
    };
    xhr.open('POST', 'api.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('name=' + name + '&age=' + age + '&grade=' + grade);
}
function editStudent(id) {
    var name = prompt("Enter the new name:");
    var age = prompt("Enter the new age:");
    var grade = prompt("Enter the new grade:");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          loadStudents();
        } else {
          console.error("Failed to edit student.");
        }
      }
    };
    xhr.open("PUT", "api.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("id=" + id + "&name=" + name + "&age=" + age + "&grade=" + grade);
}
function deleteStudent(id) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                loadStudents();
            } else {
                console.error('Failed to delete student.');
            }
        }
    };
xhr.open('DELETE', 'api.php', true);
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhr.send('id=' + id);
}





