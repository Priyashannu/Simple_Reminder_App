if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
        if (Notification.permission !== "granted") {
            alert("Please allow notification access!!");
        }
    });
}

let timeoutIds = [];

function scheduleReminder() {
    var title = document.getElementById("title").value;
    var time = document.getElementById("time").value;

    if (time === "") {
        alert("Please select a time for the reminder.");
        return;
    }

    // Get current date and combine it with the selected time
    let currentDate = new Date();
    let dateString = currentDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    let dateTimeToString = dateString + " " + time;
    let scheduleTime = new Date(dateTimeToString);
    let currentTime = new Date();

    let timeDifference = scheduleTime - currentTime;

    if (timeDifference > 0) {
        addReminder(title, time); // No need for description and date

        var timeoutId = setTimeout(function () {
            document.getElementById("notificationSound").play();

            var notification = new Notification(title, {
                body: "Reminder: " + title,
                requireInteraction: true,
            });
        }, timeDifference);

        timeoutIds.push(timeoutId);
    } else {
        alert("The scheduled time is in the past.");
    }
}

function addReminder(title, time) {
    var tableBody = document.getElementById("reminderTableBody");

    let row = tableBody.insertRow();

    let titleCell = row.insertCell(0);
    let timeCell = row.insertCell(1);
    let actionCell = row.insertCell(2);

    titleCell.innerHTML = title;
    timeCell.innerHTML = time;
    actionCell.innerHTML = `<button onClick="deleteReminder(this)">Delete</button>`;
}

function deleteReminder(button) {
    var row = button.closest("tr");
    var index = row.rowIndex;

    clearTimeout(timeoutIds[index - 1]);
    timeoutIds.splice(index - 1, 1);
    row.remove();
}
