let stackCounter = 0;
let stack1 = [];
let stack2 = [];
let stack3 = [];
let stack3Counter = 0;
let stack4 = [];

document.getElementById("calc-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form refresh

    // Get values
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let operand = document.getElementById("operand").value;

    // Check if stack container exists; if not, create it
    let stackContainer = document.getElementById("stack");
    if (!stackContainer) {
        stackContainer = document.createElement("div");
        stackContainer.id = "stack";
        // Insert the stack after the form-container and before the start-button-container
        let formContainer = document.querySelector(".form-container");
        let startButtonContainer = document.querySelector(".start-button-container");
        formContainer.insertAdjacentElement('afterend', stackContainer); // Insert after form-container
    }


    let stackItem = document.createElement("div");
    stackItem.className = "stack-item";

    // Generar un jobID aleatorio (un número entre 1000 y 9999)
    let jobID = Math.floor(1000 + Math.random() * 9000);

    // Guardar los inputs y el job id en un array
    let valuesArray = [num1, operand, num2, jobID];
  
    stackItem.dataset.values = JSON.stringify(valuesArray);
    stack1.push(valuesArray);

    // Leer los valores del dataset y escribir en el DOM
    let parsedValues = JSON.parse(stackItem.dataset.values);
    stackItem.textContent = `| ${parsedValues[0]} ${parsedValues[1]} ${parsedValues[2]} | ID ${parsedValues[3]}`;
    
    // Insert at the top of the stack
    stackContainer.prepend(stackItem);
    stackCounter++;

    // Ensure max 6 items in the stack
    if (stackContainer.children.length === 4) {
        // document.getElementById("stack").remove();
        stack2 = stack1;
        stack3[stack3Counter] = stack2;
        stack3Counter++;
        stack1 = [];

        // crear un lote y moverlo a bar-2 
        updateJobStackDisplay();

        stackContainer.parentNode.removeChild(stackContainer);
    }

    // Clear form inputs
    document.getElementById("calc-form").reset();
});

let jobStackCount = 0;
function updateJobStackDisplay() {
    let jobStackContainer = document.getElementById("job-stack");

    // Create the job stack container if it doesn't exist
    if (!jobStackContainer) {
        jobStackContainer = document.createElement("div");
        jobStackContainer.id = "job-stack";
        document.querySelector(".bar-2").prepend(jobStackContainer);
        jobStackCount = 0;
    }

    // Clear the current job stack display
    // jobStackContainer.innerHTML = "";

    // Flatten stack3, extract jobIDs from each nested array (last element in each sub-array)
    // let jobIDs = stack3.flatMap(subArray => subArray.map(item => item[item.length - 1]));
    let jobIDs = stack3[jobStackCount].map(item => item[item.length -1]).join(",");

    // Keep only the last 4 job IDs (oldest at the bottom)
    // jobIDs.slice(-4).forEach(jobID => {
    let jobItem = document.createElement("div");
    jobItem.className = "job-item";
    // jobItem.textContent = "testitem"+jobStackCount++;
    jobItem.textContent = jobIDs;
    jobStackContainer.appendChild(jobItem);
    jobStackCount++;
    // });

}


// Show the GIF for 10 seconds, then hide it
document.addEventListener("DOMContentLoaded", function() {
    let gif = document.getElementById("gears-gif");
    gif.style.display = "block"; // Show GIF

    setTimeout(function() {
        gif.style.display = "none"; // Hide GIF after 10 seconds
    }, 10000);
});
