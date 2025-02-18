document.getElementById("calc-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form refresh

    // Get values
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let operand = document.getElementById("operand").value;

    // Create stack item
    let stackContainer = document.getElementById("stack");
    let stackItem = document.createElement("div");
    stackItem.className = "stack-item";
    stackItem.textContent = `${num1} ${operand} ${num2}`;

    // Insert at the top of the stack
    stackContainer.prepend(stackItem);

    // Ensure max 6 items in the stack
    if (stackContainer.children.length > 6) {
        stackContainer.removeChild(stackContainer.lastChild);
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
