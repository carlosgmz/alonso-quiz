const doc = document,
 $languages = doc.querySelectorAll(".languages div"),
 acceptedLanguage = ["en","es"]
 //$darkmode = doc.querySelector(".darkmode-div button"),
 //acceptedTheme = ["light","dark"]

export async function fetchLocale(language) {
    let res = await fetch(`../_locales/${language}/messages.json`)
    return await res.json()
}

async function readLanguage() {
    let language = localStorage.getItem("language")
    if(language == null || language === "undefined" || !acceptedLanguage.includes(language)) {
        localStorage.setItem("language","en")
        return "en"
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