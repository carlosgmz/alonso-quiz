const doc = document,
 $languages = doc.querySelectorAll(".languages div"),
 acceptedLanguage = ["en","es"],
 //$darkmode = doc.querySelector(".darkmode-div button"),
 //acceptedTheme = ["light","dark"]
 $datapolicy = doc.querySelector(".datapolicy"),
 $datapolicyPopup = doc.querySelector(".datapolicy-popup")

/**
 * Fetches the content locale json file
 * @param {*} language 
 * @returns Object
 */
export async function fetchLocale(language) {
    let res = await fetch(`./locales/${language}/messages.json`)
    return await res.json()
}

/**
 * Reads language from local storage if it exists, else returns default browser language
 * @returns String
 */
async function readLanguage() {
    let language = localStorage.getItem("language")
    if(language == null || language === "undefined" || !acceptedLanguage.includes(language)) {
        let str = navigator.language.substring(0,2)
        if(acceptedLanguage.includes(str)) {
            localStorage.setItem("language",str)
            return str
        }
        else {return "en"}
    } else if(language == "en") {
        return "en"
    } else if(language == "es") {
        return "es"
    }
}

/*
function readTheme() {
    let theme = localStorage.getItem("theme")
    if(theme == null || theme === "undefined" || !acceptedTheme.includes(theme)) {
        localStorage.setItem("theme","light")
        return "light"
    } else if(theme == "light") {
        return "light"
    } else if(theme == "dark") {
        return "dark"
    }
}
*/

/**
 * Applies language to all html data-i18n tags
 * @param {*} language 
 * @param {*} html 
 */
export async function applyLanguage(language,html) {
    let locale = await fetchLocale(language)
    html.querySelectorAll("[data-i18n]").forEach(el=>{
        let name = el.getAttribute("data-i18n")
        el.textContent = locale[name]
    })
}

/*
function applyTheme() {

}
*/

(async () => {
    await applyLanguage(await readLanguage(),doc)
})()

//readTheme()

// click event listener on language emoji flags
$languages.forEach(async el=>{
    el.addEventListener("click",async e=>{
        if(e.target.id == "en") {
            if(localStorage.getItem("language") == "en") {return}
            localStorage.setItem("language","en")
            await applyLanguage("en",doc)
        } else if(e.target.id == "es") {
            if(localStorage.getItem("language") == "es") {return}
            localStorage.setItem("language","es")
            await applyLanguage("es",doc)
        }
    })
})

/*
$darkmode.addEventListener("click",async e=>{
    if(localStorage.getItem("theme") == "light") {
        localStorage.setItem("theme","dark")
        applyTheme("dark")
    } else if(localStorage.getItem("theme") == "dark") {
        localStorage.setItem("theme","light")
        applyTheme("light")
    }
})
*/

// click event listener for datapolicy popup
$datapolicy.addEventListener("click",e=>{
    $datapolicyPopup.classList.toggle("datapolicy-popup-shown")
})