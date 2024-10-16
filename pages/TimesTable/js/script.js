let table = document.getElementById("table");

let value;

for (let i = 1; i < 11; i++) { // generate table
    const table_row = document.createElement("tr");
    for (let j = 1; j < 11; j++) {
        if (i === 1) { // first row all headers
            const table_header = document.createElement("th");
            value = i * j;
            table_header.innerText = value;
            table_row.appendChild(table_header);
        } else {
            if (j === 1) { // first column all headers
                const table_header = document.createElement("th");
                value = i * j;
                table_header.innerText = value;
                table_row.appendChild(table_header)
            } else {
                const table_data = document.createElement("td");
                table_data.setAttribute("onclick", "color_click()");
                value = i * j;
                table_data.innerText = value;
                table_row.appendChild(table_data);
            }
        }
    }
    table.appendChild(table_row);
}

function color_click() {
    const cell = event.target;
    if (selected == false){
        cell.id = "not";
        selected = true;
    } else {
        const previousSelectedCell = document.querySelector("#not");
        if (cell != previousSelectedCell){
            previousSelectedCell.id = "";
            cell.id = "not";
        } else {
            cell.id = "";
            selected = false;
        }
    }
}

let colors = ["red", "blue", "green"]; // Array of colors to cycle through
let index = 0; // Keep track of the current color index
let intervalId = null; // Store the interval ID to control it


function seizure() {
    // If the interval is already running, clear it (to stop multiple intervals)
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
        document.body.style.backgroundColor = "white"; // Change the color
        return; // Exit to avoid starting a new interval immediately
    }

    // Start a new interval that changes the background color every 500ms
    intervalId = setInterval(() => {
        document.body.style.backgroundColor = colors[index]; // Change the color
        index = (index + 1) % colors.length; // Move to the next color (cycle back to 0)
    }, 500); // Change color every 500 milliseconds
}

let selected = false;