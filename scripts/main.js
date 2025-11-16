const d = document,
 $languages = d.querySelectorAll(".languages div"),
 accepted = ["en","es"]
 //theme

function readTheme() {
    
}

function clickTheme() {

}

function applyTheme() {

}

function readLanguage() {
    let language = localStorage.getItem("language")
    if(language == null || !accepted.includes(language)) {
        localStorage.setItem("language","en")
        applyLanguage("en")
    } else if(language = "en") {
        applyLanguage("en")
    } else if(language = "es") {
        applyLanguage("es")
    }

}

function clickLanguage() {
    if(this.id == "en") {
        localStorage.setItem("language","en")
        applyLanguage("en")
    } else if(this.id == "es") {
        localStorage.setItem("language","es")
        applyLanguage("es")
    }
}

function applyLanguage() {
    if(page == "index") {

    } else if(page == "quiz") {

    } else if(page == "result") {
        
    }
}

readLanguage()
readTheme()

$languages.forEach(el=>{
    el.addEventListener("click",clickLanguage)
})

//eventlistener theme