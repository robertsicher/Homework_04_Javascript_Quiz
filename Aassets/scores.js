//Define the variables
var clearBtn = document.querySelector("#clear-button");
var scoresDisplay = document.querySelector("#scores-display");
var scoresTable = document.querySelector("#scores-table");
var scoresChild;
var currentPage = document.location.href;
var allScores;

// On load, display all scores from the local storage
renderScores();

function renderScores() {

  // Pulls the scores from the local storage
  getAllScores();
  
  // If there are scores in the allScores array, display the highscores table
  if(allScores.length > 0){
    scoresTable.removeAttribute("class");
    scoresTable.setAttribute("class","table table-responsive table-striped");
    
    // Sort the entries in the allScores array by "score"
    var data = allScores.sort(compareValues("score", "desc"));
    
    //Display all the updated scores from the allScores array
    for(var i=0; i < data.length; i++){
      var tr = document.createElement("tr");
      var tdName = document.createElement("td");
      var tdScore = document.createElement("td");
      var tdDate = document.createElement("td");
      tdName.textContent = data[i].name
      tdScore.textContent = data[i].score
      tdDate.textContent = data[i].date
      tr.appendChild(tdName);
      tr.appendChild(tdScore);
      tr.appendChild(tdDate);
      scoresDisplay.appendChild(tr);
      
    }
  }   
  
  // If the allScores array is empty, do not display the highscores table
  else{
    scoresTable.setAttribute("class","d-none");
  }
  
}

// Pulls the scores from the local storage
function getAllScores() {

  // If the allScores array is not initialised, initialise it with an empty array
  if(!localStorage.getItem("allScores")){
    allScores = [];
  }
  else{
    allScores = JSON.parse(localStorage.getItem("allScores"));
  }
}


// Function to sort the entries in the allScores array
function compareValues(key, order = "asc") {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }
    
    const varA = (typeof a[key] === "string")
    ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === "string")
    ? b[key].toUpperCase() : b[key];
    
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === "desc") ? (comparison * -1) : comparison
      );
  };
}
  
// Add event listener for the clear Highscores button
clearBtn.addEventListener("click", function(){

  // Ask the user to confirm they want to clear the highscores before proceeding
  var confirmClear = confirm("Are you sure you want to clear the Highscores?\nOk = Yes. Cancel = No")
  
  if (confirmClear){
    localStorage.setItem("allScores","");
    renderScores();
  }

})