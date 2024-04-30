function onLoad() {
    let theme = localStorage.getItem("theme") || "light";
    if(theme === "dark") {
        toggleDarkMode()
        localStorage.setItem("theme", "dark")
    }
    let circuit = localStorage.getItem("circuit") || 1;
    setCircuit(circuit)
    document.getElementById("input").addEventListener("change", handleFiles, false)
}
function toggleDarkMode() {
    document.body.classList.toggle("dark_mode");
    for (let img of document.body.getElementsByTagName("img")) {
        img.classList.toggle("image_dark_mode")
    }
    for (let button of document.body.getElementsByTagName("button")) {
        button.classList.toggle("button_dark_mode")
        if(button.id === "dark_mode_button") {
            if (button.textContent === "☾") {
                button.textContent = "☼"

            } else {
                button.textContent = "☾"
            }
        }
    }
    for (let input of document.body.getElementsByTagName("input")) {
        if(input.type === "button") {
            input.classList.toggle("button_dark_mode")
        }
    }
    for (let dropdown of document.body.getElementsByClassName("dropdown-content")) {
        dropdown.classList.toggle("button_dark_mode")
    }
    let theme = localStorage.getItem("theme")
    if(theme != null && theme === "dark") {
        localStorage.setItem("theme", "light")
    } else {
        localStorage.setItem("theme", "dark")
    }
}

function calculateCircuits() {
    const source_resistance = parseFloat(document.getElementById("source_resistance").value)
    const source_reactance = parseFloat(document.getElementById("source_reactance").value)
    const load_resistance = parseFloat(document.getElementById("load_resistance").value)
    const load_reactance = parseFloat(document.getElementById("load_reactance").value)
    const desired_q = parseFloat(document.getElementById("desired_q").value)
    const frequency = parseFloat(document.getElementById("frequency").value)
    switch (localStorage.getItem("circuit")) {
        case 1:
            circuit1(source_resistance, source_reactance, load_resistance, load_reactance, desired_q, frequency)
            break;
        case 2:
            circuit2(source_resistance, source_reactance, load_resistance, load_reactance, desired_q, frequency)
            break;
    }
    circuit1(source_resistance, source_reactance, load_resistance, load_reactance, desired_q, frequency)
    circuit2(source_resistance, source_reactance, load_resistance, load_reactance, desired_q, frequency)
}

function circuit1(source_resistance, source_reactance, load_resistance, load_reactance, desired_q, frequency) {
    let w = 2*Math.PI*frequency
    let source_q= -source_reactance/source_resistance

    let rp = source_resistance*(1+source_q*source_q)
    let c1 = source_q/(rp*w)
    let l1 = load_reactance/w
    if (load_resistance > rp) {
        document.getElementById("circuitL").value = Number.NaN
        document.getElementById("circuitC").value = Number.NaN
        document.getElementById("circuitQ").value = Number.NaN
    } else {
        let q = Math.sqrt(rp/load_resistance-1)
        let l = ((q*load_resistance/w)-l1)*1e9
        let c = ((q/(rp*w))-c1)*1e12
        document.getElementById("circuitL").value = l
        document.getElementById("circuitC").value = c
        document.getElementById("circuitQ").value = Math.abs(q)
    }
}

function circuit2(source_resistance, source_reactance, load_resistance, load_reactance, desired_q, frequency) {
    let w = 2*Math.PI*frequency
    let load_q= -load_reactance/load_resistance

    let rp = load_resistance*(1+load_q*load_q)
    let c1 = load_q/(rp*w)
    let l1 = source_reactance/w
    if (source_resistance > rp) {
        document.getElementById("circuitL").value = Number.NaN
        document.getElementById("circuitC").value = Number.NaN
        document.getElementById("circuitQ").value = Number.NaN
    } else {
        let q = Math.sqrt(rp/source_resistance-1)
        let l = ((q*source_resistance/w)-l1)*1e9
        let c = ((q/(rp*w))-c1)*1e12
        document.getElementById("circuitL").value = l
        document.getElementById("circuitC").value = c
        document.getElementById("circuitQ").value = Math.abs(q)
    }
}

function openCircuitDropdown() {
    document.getElementById("dropdown-content").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('#dropdown-button')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function setCircuit(value) {
    localStorage.setItem("circuit", value)
    for (let element of document.getElementsByClassName("dropdown-content")) {

    }
    switch (value) {
        case 1:
            document.getElementById("circuitTitle").textContent = "LOW PASS Hi-Low Matching Network"
            document.getElementById("circuitImage").src="img/cllp.gif"
            break;
        case 2:
            document.getElementById("circuitTitle").textContent = "LOW PASS Low-Hi Matching Network"
            document.getElementById("circuitImage").src="img/lclp.gif"
            break;
    }
}

function handleFiles() {
    const csvInput = document.getElementById("input")
    let file = csvInput.files[0];
    let reader = new FileReader();
    if(file != null) {
        reader.readAsText(file);
        reader.onload = function() {
            let arr = reader.result.split("\n")
            for (let i = 0; i < arr.length; i++) {
                let line = arr[i];
                let values = line.split(",")
                if(values.every(value => !isNaN(value))) {
                    console.log(line)
                }
            }
        }
    }
}

