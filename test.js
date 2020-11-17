var students = [];
var editMode = false;
var studentIndex;

function createStudent() {
    if (editMode) {
        editSuccess();
        renderListStudent();
        addMode();
    } else {
        var name = getInputValue('name');
        var phone = getInputValue('phone');
        var age = getInputValue('age');
        var address = getInputValue('address');
        var birth = getInputValue('birth');
        addStudent({
            name: name,
            phone: phone,
            age: age,
            address: address,
            birth: birth
        });
        renderListStudent();
    }
}

function renderListStudent() {
    var students = (localStorage.getItem("students")) ? JSON.parse(localStorage.getItem("students")) : [];
    // if (students.length === 0) {
    //     document.getElementById('list_student').style.display = "none";
    // } else {
    //     document.getElementById('list_student').style.display = "block";
    var html = "<tr>" +
        "<thead>" +
        "<th >STT</th>" +
        "<th>Họ Tên</th>" +
        "<th>Số điện thoại</th>" +
        "<th>Tuổi</th>" +
        "<th>Địa chỉ</th>" +
        "<th>Ngày sinh</th>" +
        "<th>Tùy chọn</th>" +
        "</thead>" +
        "</tr>";
    for (i = 0; i < students.length; i++) {
        var student = students[i];
        html += "<tr>" +
            "<td>" + (i + 1) + "</td>" +
            "<td>" + student.name + "</td>" +
            "<td>" + student.phone + "</td>" +
            "<td>" + student.age + "</td>" +
            "<td>" + student.address + "</td>" +
            "<td>" + student.birth + "</td>" +
            "<td><button class='btn btn-danger' onclick='deleteStudent(" + i + ")'>Xóa</button><button class='btn btn-warning' onclick='editButton(" + i + ")'>Sửa</button></td>" +
            "</tr>";
    }
    setHTML('list_student', html);
    // }
    localStorage.setItem("students", JSON.stringify(students));
}

function getInputValue(selector) {
    return document.getElementById(selector).value;
}

function addStudent(student) {
    students = JSON.parse(localStorage.getItem("students"));
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    clearInput();
}

function setHTML(idName, createValue) {
    var content = document.getElementById(idName);
    content.innerHTML = createValue;
}

function deleteStudent(id) {
    students = JSON.parse(localStorage.getItem("students"));
    students.splice(id, 1);
    renderListStudent();
    localStorage.setItem("students", JSON.stringify(students));
}
// sửa thông tin sinh viên
function editStudent(index, student) {
    students[index] = student;
}
// render thông tin từ bảng vào thẻ input
function editButton(index) {
    students = JSON.parse(localStorage.getItem("students"));
    studentIndex = index; //gán vị trí sinh viên bằng vị trí muốn chỉnh sửa phục vụ phía sau
    var student = students[index];
    setInputValue('name', student.name);
    setInputValue('phone', student.phone);
    setInputValue('age', student.age);
    setInputValue('address', student.address);
    setInputValue('birth', student.birth);
    setHTML('addStudent', "Update");
    rewriteMode();
    localStorage.setItem("students", JSON.stringify(students));
}

function setInputValue(selector, textTable) {
    let content = document.getElementById(selector);
    content.value = textTable;
    // có thể viết như sau
    // var name=document.getElementById('nane');
    // name.value=students[index].name;
}
// chỉnh sửa và lưu vào bảng
function editSuccess() {
    //lấy giá trị thẻ input sau khi chỉnh sửa
    students = JSON.parse(localStorage.getItem("students"));
    var name = getInputValue('name');
    var phone = getInputValue('phone');
    var age = getInputValue('age');
    var address = getInputValue('address');
    var birth = getInputValue('birth');
    editStudent(studentIndex, {
        name,
        phone,
        age,
        address,
        birth
    });
    localStorage.setItem("students", JSON.stringify(students));
    setHTML('addStudent', "Thêm sinh viên");
    clearInput();
}
//khi editMode=true thì sửa nếu = false thì thêm sinh viên
function rewriteMode() {
    editMode = true;
}

function addMode() {
    editMode = false;
}
//clear Input
function clearInput() {
    setInputValue('name', "");
    setInputValue('phone', "");
    setInputValue('age', "");
    setInputValue('address', "");
    setInputValue('birth', "");
}