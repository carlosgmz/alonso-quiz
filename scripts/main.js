const d = document,
 $languages = d.querySelectorAll(".languages div"),
 acceptedLanguage = ["en","es"]
 //theme

let language

function readTheme() {
    
}

function clickTheme() {

}

function applyTheme() {

}

function readLanguage() {
    language = localStorage.getItem("language")
    if(language == null || !acceptedLanguage.includes(language)) {
        localStorage.setItem("language","en")
        applyLanguage("en")
    } else if(language == "en") {
        applyLanguage("en")
    } else if(language == "es") {
        applyLanguage("es")
    }

}

function clickLanguage() {
    if(this.id == "en") {
        if(language == "en") {return}
        localStorage.setItem("language","en")
        applyLanguage("en")
    } else if(this.id == "es") {
        if(language == "es") {return}
        localStorage.setItem("language","es")
        applyLanguage("es")
    }
}

function applyLanguage() {
    if(page == "index") {

    } else if(page == "quiz") {

    }
}

readLanguage()
//readTheme()

$languages.forEach(el=>{
    el.addEventListener("click",clickLanguage)
})

//eventlistener theme