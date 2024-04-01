function onLoad() {
    let theme = localStorage.getItem("theme") || "light";
    console.log(theme)
    if(theme === "dark") {
        toggleDarkMode()
        localStorage.setItem("theme", "dark")
    }
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
        document.getElementById("circuit1L").value = Number.NaN
        document.getElementById("circuit1C").value = Number.NaN
        document.getElementById("circuit1Q").value = Number.NaN
    } else {
        let q = Math.sqrt(rp/load_resistance-1)
        let l = ((q*load_resistance/w)-l1)*1e9
        let c = ((q/(rp*w))-c1)*1e12
        document.getElementById("circuit1L").value = l
        document.getElementById("circuit1C").value = c
        document.getElementById("circuit1Q").value = Math.abs(q)
    }
}

function circuit2(source_resistance, source_reactance, load_resistance, load_reactance, desired_q, frequency) {
    let w = 2*Math.PI*frequency
    let load_q= -load_reactance/load_resistance

    let rp = load_resistance*(1+load_q*load_q)
    let c1 = load_q/(rp*w)
    let l1 = source_reactance/w
    if (source_resistance > rp) {
        document.getElementById("circuit2L").value = Number.NaN
        document.getElementById("circuit2C").value = Number.NaN
        document.getElementById("circuit2Q").value = Number.NaN
    } else {
        let q = Math.sqrt(rp/source_resistance-1)
        let l = ((q*source_resistance/w)-l1)*1e9
        let c = ((q/(rp*w))-c1)*1e12
        document.getElementById("circuit2L").value = l
        document.getElementById("circuit2C").value = c
        document.getElementById("circuit2Q").value = Math.abs(q)
    }
}

