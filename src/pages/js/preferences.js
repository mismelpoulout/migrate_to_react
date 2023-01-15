function setupPreferences() {
    $("#night-mode").onchange = function () {
        setNightMode(this.checked);
        setPreference("night-mode", this.checked);
    }

    $("#theme").onchange = function () {
        setCSSProp("--theme", this.value);
        setPreference("theme", this.value);
    }

    $("#anim").onchange = function () {
        if (this.checked) {
            setPreference("--animation-dur", "0.3s");
        } else {
            setPreference("--animation-dur", 0);
        }
        setCSSProp("--animation-dur", getPreference("--animation-dur"));
    }
    $("#anim").value = getPreference("--animation-dur") == 0 ? false : true;

    //load prefences
    if (getPreference("theme")) {
        setCSSProp("--theme", getPreference("theme"));
        $("#theme").value = getPreference("theme");
    }
    if (getPreference("night-mode") == "true") {
        setNightMode(true);
        $("#night-mode").checked = true;
    }

    if (getPreference("--animation-dur") == "0") {
        setCSSProp("--animation-dur", 0);
    }
    $("#anim").checked = getPreference("--animation-dur") == "0" ? false : true;

}

function setNightMode(state = false) {
    setCSSProp("--primary-background", state ? "#272727" : "#e1e1e1");
    setCSSProp("--secundary-background", state ? "#000" : "#fff");
    setCSSProp("--text-color", state ? "#fff" : "#000");
    if (state) {
        $(".side-nav").classList.add("night");
    } else {
        $(".side-nav").classList.remove("night");
    }
}

function setPreference(name, val) {
    localStorage.setItem("preference-" + name, val);
}

function getPreference(name) {
    return localStorage.getItem("preference-" + name);
}