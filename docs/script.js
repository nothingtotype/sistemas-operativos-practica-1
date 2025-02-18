let stackCounter = 0;
let emptyStack = null;
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
    stackItem.textContent = `${num1} ${operand} ${num2}`;

    // Insert at the top of the stack
    stackContainer.prepend(stackItem);
    stackCounter +=1;

    // Ensure max 6 items in the stack
    if (stackContainer.children.length > 4) {
        emptyStack = stackContainer;
        // document.getElementById("stack").remove();

        stackContainer.parentNode.removeChild(stackContainer);
    }

    // Clear form inputs
    document.getElementById("calc-form").reset();
});

// Show the GIF for 10 seconds, then hide it
document.addEventListener("DOMContentLoaded", function() {
    let gif = document.getElementById("gears-gif");
    gif.style.display = "block"; // Show GIF

    setTimeout(function() {
        gif.style.display = "none"; // Hide GIF after 10 seconds
    }, 10000);
});
