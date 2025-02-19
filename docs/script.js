let stackCounter = 0;
let stack1 = [];
let stack2 = [];
let stack3 = [];
let stack3Counter = 0;
let stack4 = [];
let jobStackCount = 0;


document.getElementById("calc-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form refresh

    // Get values
    let name = document.getElementById("name").value;
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
    let valuesArray = [num1, operand, num2, name, jobID];
  
    stackItem.dataset.values = JSON.stringify(valuesArray);
    stack1.push(valuesArray);

    // Leer los valores del dataset y escribir en el DOM
    let parsedValues = JSON.parse(stackItem.dataset.values);
    stackItem.textContent = `| ${parsedValues[0]} ${parsedValues[1]} ${parsedValues[2]} | ID ${parsedValues[4]}`;
    
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
    let nameVal = document.getElementById("name").value;
    document.getElementById("calc-form").reset();
    document.getElementById("name").value = nameVal;
});


// funcion para crear lotes

function updateJobStackDisplay() {
    if (!stack3) {
        stack3 = [];
    }
    let jobStackContainer = document.getElementById("job-stack");
    console.log(jobStackContainer);

    // Create the job stack container if it doesn't exist
    if (!jobStackContainer) {
        jobStackContainer = document.createElement("div");
        jobStackContainer.id = "job-stack";
        document.querySelector(".bar-2").prepend(jobStackContainer);
        jobStackCount = 0;
    }
    console.log(jobStackCount);

    // let jobIDs = stack3[jobStackCount].map(item => item[item.length -1]).join(",");
    let jobIDs = stack3[jobStackCount].map(item => item[4]).join(",");
    console.log(jobIDs);
    let jobItem = document.createElement("div");
    jobItem.className = "job-item";

    jobItem.textContent = jobIDs;
    jobStackContainer.appendChild(jobItem);
    jobStackCount++;
    // });
}


function removeLastJobStackDisplay() {
    // Si existe al menos un lote, elimina el primero (el más antiguo) con shift()
    if (jobStackCount > 0) {
        document.querySelector('#job-stack > div:last-of-type').remove();
        jobStackCount--;
    }
}


// funcion que muestra el gif y el contador

function showGifWithCountdown(duration) {
    // Get the GIF element and show it
    let gif = document.getElementById("gears-gif");
    gif.style.display = "block";
    
    // Check if a counter element exists; if not, create it below the GIF
    let counter = document.getElementById("gif-counter");
    if (!counter) {
        counter = document.createElement("div");
        counter.id = "gif-counter";
        // Insert the counter element right after the GIF element
        gif.parentNode.insertAdjacentElement("afterend", counter);
    }
    
    // Initialize the countdown
    let remaining = duration;
    counter.textContent = `${remaining} seconds remaining`;
    
    // Update the countdown every second
    let countdownInterval = setInterval(() => {
        remaining--;
        if (remaining <= 0) {
            clearInterval(countdownInterval);
            gif.style.display = "none";  // Hide the GIF when time is up
            counter.textContent = "";    // Clear the counter
        } else {
            counter.textContent = `${remaining} seconds remaining`;
        }
    }, 1000);
}

// operaciones matematicas
// Suma: suma num1 y num2
function suma(stackItem) {
    let num1 = parseFloat(stackItem[0]);
    let num2 = parseFloat(stackItem[2]);
    return num1 + num2;
}

// Resta: resta num2 a num1
function resta(stackItem) {
    let num1 = parseFloat(stackItem[0]);
    let num2 = parseFloat(stackItem[2]);
    return num1 - num2;
}

// Multiplicación: multiplica num1 por num2
function multiplicacion(stackItem) {
    let num1 = parseFloat(stackItem[0]);
    let num2 = parseFloat(stackItem[2]);
    return num1 * num2;
}

// División: divide num1 entre num2 (verificando división por cero)
function division(stackItem) {
    let num1 = parseFloat(stackItem[0]);
    let num2 = parseFloat(stackItem[2]);
    if (num2 === 0) {
        return "Error: División por cero";
    }
    return num1 / num2;
}

// Residuo: calcula el resto de la división de num1 entre num2
function residuo(stackItem) {
    let num1 = parseFloat(stackItem[0]);
    let num2 = parseFloat(stackItem[2]);
    if (num2 === 0) {
        return "Error: División por cero";
    }
    return num1 % num2;
}

// Potencia: eleva num1 a la potencia de num2
function potencia(stackItem) {
    let num1 = parseFloat(stackItem[0]);
    let num2 = parseFloat(stackItem[2]);
    return Math.pow(num1, num2);
}

// Función principal que selecciona la operación según el operador
function calcular(stackItem) {
    let operador = stackItem[1];
    switch(operador) {
        case '+': return suma(stackItem);
        case '-': return resta(stackItem);
        case '*': return multiplicacion(stackItem);
        case '/': return division(stackItem);
        case 'residuo': return residuo(stackItem);
        case 'potencia': return potencia(stackItem);
        default: return "Operador desconocido";
    }
}
