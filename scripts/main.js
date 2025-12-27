const doc = document,
 $languages = doc.querySelectorAll(".languages div"),
 acceptedLanguage = ["en","es"]

async function fetchLocale(language) {
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

async function clickLanguage() {
    if(this.id == "en") {
        if(localStorage.getItem("language") == "en") {return}
        localStorage.setItem("language","en")
        await applyLanguage("en",doc)
    } else if(this.id == "es") {
        if(localStorage.getItem("language") == "es") {return}
        localStorage.setItem("language","es")
        await applyLanguage("es",doc)
    }
}

export async function applyLanguage(language,html) {
    let locale = await fetchLocale(language)
    html.querySelectorAll("[data-i18n]").forEach(el=>{
        let name = el.getAttribute("data-i18n")
        el.textContent = locale[name]
    })
}

(async () => {
    await applyLanguage(await readLanguage(),doc)
})()

$languages.forEach(async el=>{
    el.addEventListener("click",clickLanguage)
})