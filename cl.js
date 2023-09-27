console.log("ur mom");
console.log("ur dad");
console.log("my name is TIMMY!!!");

// Function to check the user's input
function checkCode() {
  const userInput = document.getElementById("codeInput").value;

  // Make an HTTP GET request to fetch pass.txt
  fetch("pass.txt")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text();
    })
    .then((data) => {
      // Check if the user's input matches the content of pass.txt
      if (userInput === data.trim()) {
        document.getElementById("discordLink").style.display = "block";
      } else {
        alert("Incorrect code. Please try again.");
      }
    })
    .catch((error) => {
      console.error("Error fetching pass.txt:", error);
    });
}

// Add a click event listener to the "Check Code" button
document.getElementById("checkCode").addEventListener("click", checkCode);
