// Add your API endpoint here
var API_ENDPOINT ="https://snjn1hriwk.execute-api.ap-south-1.amazonaws.com/prod";


// Function to save student data
document.getElementById("savestudent").onclick = function() {
    var inputData = {
        "studentid": $('#studentId').val(),
        "name": $('#name').val(),
        "class": $('#class').val(),
        "age": $('#age').val()
    };

    $.ajax({
        url: API_ENDPOINT,
        type: 'POST',
        data: JSON.stringify(inputData),
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            document.getElementById("studentSaved").innerHTML = "Student Data Saved!";
        },
        error: function() {
            alert("Error saving student data.");
        }
    });
}

// Function to retrieve all students
document.getElementById("getstudents").onclick = function() {
    $.ajax({
        url: API_ENDPOINT,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function(response) {
            $('#studentTable tbody').empty(); // Clear previous data
            jQuery.each(response, function(i, data) {
                $("#studentTable tbody").append(`
                    <tr>
                        <td>${data['studentId']}</td>
                        <td>${data['name']}</td>
                        <td>${data['class']}</td>
                        <td>${data['age']}</td>
                    </tr>
                `);
            });
        },
        error: function() {
            alert("Error retrieving student data.");
        }
    });
}
