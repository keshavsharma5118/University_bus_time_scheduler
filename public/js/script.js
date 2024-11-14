// Function to format the date and time
function updateDateTime() {
    const now = new Date();

    // Format date as "DD-MMM-YYYY"
    const day = String(now.getDate()).padStart(2, '0'); // Get day and pad with 0
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[now.getMonth()]; // Get month name
    const year = now.getFullYear(); // Get full year

    // Format time as "HH:MM:SS"
    const hours = String(now.getHours()).padStart(2, '0'); // Get hours and pad with 0
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Get minutes and pad with 0
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Get seconds and pad with 0

    // Set the formatted date and time to HTML elements
    document.getElementById('date').textContent = `${day}-${month}-${year}`;
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the date and time every second
setInterval(updateDateTime, 1000);

// Call the function once to initialize
updateDateTime();


// JavaScript function to show alert message
document.getElementById("maintenanceBtn").addEventListener("click", function() {
    alert("The site is currently under maintenance. Please try again later.");
});

