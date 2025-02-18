document.getElementById("calc-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get values
    let num1 = document.getElementById("num1").value;
    let num2 = document.getElementById("num2").value;
    let operand = document.getElementById("operand").value;

    // Create stack item
    let stackContainer = document.getElementById("stack");
    let stackItem = document.createElement("div");
    stackItem.className = "stack-item";
    stackItem.textContent = `${num1} ${operand} ${num2}`;

    // Append to stack (limit to 6 entries)
    if (stackContainer.children.length >= 6) {
        stackContainer.removeChild(stackContainer.firstChild); // Remove oldest entry
    }
    stackContainer.appendChild(stackItem);

    // Clear form inputs
    document.getElementById("calc-form").reset();
});
