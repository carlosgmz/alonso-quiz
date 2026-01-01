import {applyLanguage, fetchLocale} from "./main.js"

const d = document,
 $questionSpan = d.querySelector(".question span"),
 $questionImg = d.querySelector(".question img"),
 $questionAudio = d.querySelector(".question audio"),
 $questionCounter = d.querySelector("#questionCounter"),
 $totalQuestions = d.querySelector("#totalQuestions"),
 $extra = d.querySelector(".extra"),
 $extraSpan = d.querySelector(".extra span"),
 $answers = d.querySelectorAll(".answer"),
 $next = d.querySelector(".next"),
 $nextImg = d.querySelector(".next img"),
 $prev = d.querySelector(".prev"),
 //$prevImg = d.querySelector(".prev img"),
 $main = d.querySelector("main"),
 $template = d.querySelector("#summary_template").content,
 $fragment = d.createDocumentFragment()

const FAILURE = 20, //10
 PASS = 34, //15
 REMARKABLE = 50, //20
 OUTSTANDING = 60, //25
 TOTAL_QUESTIONS = 70 //30

let json, cont = 0, numGuessed = 0, questionPointer = 0, correctAnswer

async function fetchJson(language) {
    let res = await fetch(`../_locales/${language}/quiz.json`)
    return await res.json()
}

async function init() {
    json = await fetchJson(localStorage.getItem("language"))
    $totalQuestions.textContent = TOTAL_QUESTIONS
    await renderQuestion()
}

async function renderQuestion() {
    $questionCounter.textContent = cont+1

    //random question is selected from array
    questionPointer = Math.random()*json.length>>0
    
    $questionSpan.textContent = json[questionPointer].question
    if(typeof json[questionPointer].img !== "undefined") {
        $questionImg.src = `../assets/imgs/quiz/${json[questionPointer].img}`
        $questionImg.classList.remove("hidden")
    } else if(!$questionImg.classList.contains("hidden")) {
        $questionImg.classList.add("hidden")
        $questionImg.src = ""
    }
    if(typeof json[questionPointer].audio !== "undefined") {
        $questionAudio.src = `../assets/audio/${json[questionPointer].audio}`
        $questionAudio.classList.remove("hidden")
    } else if(!$questionAudio.classList.contains("hidden")) {
        $questionAudio.classList.add("hidden")
        $questionAudio.src = ""
    }
    //creates a copy of the question's answers
    let answersCopy = [...json[questionPointer].answers]
    $answers.forEach(el=>{
        //selects a random answer
        let answerPointer = Math.random()*answersCopy.length>>0
        //checks if it selected the correct answer for later
        if(answersCopy[answerPointer] == json[questionPointer].answers[0]) {correctAnswer = el.id}
        //adds answer text to div textcontent
        el.lastChild.textContent = answersCopy[answerPointer]
        answersCopy.splice(answerPointer,1)
    })
}

async function renderResult() {
    //stats section
    const $stats = d.createElement("section")
    $stats.classList.add("stats")
    const $resultQuestions = d.createElement("div")
    $resultQuestions.classList.add("resultQuestions")
    const $span1 = d.createElement("span")
    $span1.textContent = numGuessed
    const $span2 = d.createElement("span")
    $span2.setAttribute("data-i18n","correct_questions")
    const $span3 = d.createElement("span")
    $span3.textContent = TOTAL_QUESTIONS
    const $span4 = d.createElement("span")
    $span4.textContent = ` (${(numGuessed/TOTAL_QUESTIONS*100).toFixed(0)}%)`
    $resultQuestions.append($span1,$span2,$span3,$span4)
    const $resultMsg = d.createElement("div")
    $resultMsg.classList.add("resultMsg")
    const $span5 = d.createElement("span")
    if(numGuessed < FAILURE) {
        $span5.setAttribute("data-i18n","failure")
    } else if(numGuessed < PASS) {
        $span5.setAttribute("data-i18n","pass")
    } else if(numGuessed < REMARKABLE) {
        $span5.setAttribute("data-i18n","remarkable")
    } else if(numGuessed < OUTSTANDING) {
        $span5.setAttribute("data-i18n","outstanding")
    } else if(numGuessed < TOTAL_QUESTIONS) {
        $span5.setAttribute("data-i18n","max")
    } else $span5.setAttribute("data-i18n","cheat")
    $resultMsg.appendChild($span5)
    $stats.append($resultQuestions,$resultMsg)

    //summary section
    const $summary = d.createElement("section")
    $summary.classList.add("summary")
    const $info = d.createElement("div")
    $info.classList.add("summary-info")
    const $span6 = d.createElement("span")
    $span6.setAttribute("data-i18n","summary")
    $info.appendChild($span6)
    const $summary_result = d.createElement("div")
    $summary_result.classList.add("summary_result")
    for(let i = 1; i <= TOTAL_QUESTIONS; i++) {
        let $clone = $template.cloneNode(true)
        $clone.querySelector("span").textContent = i
        $clone.querySelector(".summary_question").textContent = localStorage.getItem(`question${i}`)
        $clone.querySelector(".summary_answer").textContent = localStorage.getItem(`answer${i}`)
        if($clone.querySelector(".summary_answer").textContent != localStorage.getItem(`selectedAnswer${i}`)) {
            $clone.querySelector(".summary_answer").classList.add("false")
        } else {
            $clone.querySelector(".summary_answer").classList.add("true")
        }
        $fragment.appendChild($clone)
    }
    $summary_result.appendChild($fragment)
    $summary.append($info,$summary_result)
    
    //share section
    const $share = d.createElement("section")
    $share.classList.add("share")
    const $socials = d.createElement("div")
    $socials.classList.add("socials")
    let $div = d.createElement("div")
    let $a = d.createElement("a")
    $a.target = "_blank"
    let $img = d.createElement("img")
    $a.appendChild($img)
    $div.appendChild($a)
    const url = "http://localhost:5500/pages/index.html"
    const urlEncoded = encodeURIComponent(url)
    let localejson = await fetchLocale(localStorage.getItem("language"))
    const msg = encodeURIComponent(localejson.share_msg1 + `${(numGuessed/TOTAL_QUESTIONS*100).toFixed(0)}%` + localejson.share_msg2)
     //copy link button
     const $link = d.createElement("div")
     $link.classList.add("link-btn")
     $img = d.createElement("img")
     $img.src = "../assets/imgs/link-svgrepo-com.svg"
     $img.alt = "copy link"
     $link.appendChild($img)
     //twitter-X share button
     const $twitter = $div.cloneNode(true)
     $twitter.querySelector("a").href = `https://twitter.com/intent/tweet?url=${urlEncoded}&text=${msg}`
     $twitter.classList.add("twitter-btn")
     $twitter.querySelector("img").src = "../assets/imgs/twitter-x.svg"
     $twitter.querySelector("img").alt = "twitter"
     //whatsapp share button
     const $whatsapp = $div.cloneNode(true)
     $whatsapp.querySelector("a").href = `https://api.whatsapp.com/send?text=${msg} ${urlEncoded}`
     $whatsapp.classList.add("whatsapp-btn")
     $whatsapp.querySelector("img").src = "../assets/imgs/whatsapp.svg"
     $whatsapp.querySelector("img").alt = "whatsapp"
     //threads share button
     const $threads = $div.cloneNode(true)
     $threads.querySelector("a").href = `https://www.threads.net/intent/post?text=${msg}&url=${urlEncoded}`
     $threads.classList.add("threads-btn")
     $threads.querySelector("img").src = "../assets/imgs/threads.svg"
     $threads.querySelector("img").alt = "threads"
     //facebook share button
     const $facebook = $div.cloneNode(true)
     $facebook.querySelector("a").href = `https://www.facebook.com/sharer.php?u=${urlEncoded}`
     $facebook.classList.add("facebook-btn")
     $facebook.querySelector("img").src = "../assets/imgs/facebook.svg"
     $facebook.querySelector("img").alt = "facebook"
    $socials.append($link,$twitter,$whatsapp,$threads,$facebook)
    $share.appendChild($socials)

    //return section
    const $return = d.createElement("section")
    $return.classList.add("return")
    $a = d.createElement("a")
    $a.href = "http://localhost:5500/pages/index.html"
    let $button = d.createElement("button")
    $button.setAttribute("data-i18n","button_return")
    $a.appendChild($button)
    $return.appendChild($a)
    
    await applyLanguage(localStorage.getItem("language"),$stats)
    await applyLanguage(localStorage.getItem("language"),$summary)
    await applyLanguage(localStorage.getItem("language"),$share)
    await applyLanguage(localStorage.getItem("language"),$return)

    //previous quiz sections are replaced with result sections
    $main.replaceChildren($stats,$summary,$share,$return)
}

async function answerListener() {
    $answers.forEach(el=>{
        el.removeEventListener("click",answerListener)
        el.classList.remove("answer_hover")
    })

    localStorage.setItem(`question${cont+1}`,json[questionPointer].question)
    localStorage.setItem(`answer${cont+1}`,json[questionPointer].answers[0])
    localStorage.setItem(`selectedAnswer${cont+1}`,this.lastChild.textContent)

    //if answer is correct
    if(this.lastChild.textContent == json[questionPointer].answers[0]) {
        numGuessed++
        this.classList.add("true")
    } else {
        this.classList.add("false")
        d.querySelector(`#${correctAnswer}`).classList.add("true")
    }
    //shows up extra info if required
    if(typeof json[questionPointer].extra !== "undefined") {
        $extraSpan.textContent = `ⓘ ${json[questionPointer].extra}`
        $extra.classList.remove("hidden")
    }
    //removes question from array to prevent repeats
    json.splice(questionPointer,1)
    cont++
    $next.classList.remove("hidden")
    $prev.classList.remove("hidden")
}

init()

$answers.forEach(el=>{
    el.addEventListener("click",answerListener)
})

$next.addEventListener("mouseover",e=>{
    $nextImg.src = "../assets/imgs/flecha_2_2.png"
})
$next.addEventListener("mouseout",e=>{
    $nextImg.src = "../assets/imgs/flecha_2.png"
})
$next.addEventListener("click",async e=>{
    if(cont==TOTAL_QUESTIONS) {
        await renderResult()
        return
    }
    $answers.forEach(el=>{
        el.classList.remove("true")
        el.classList.remove("false")
    })
    $next.classList.add("hidden")
    $prev.classList.add("hidden")
    $extra.classList.add("hidden")
    $extraSpan.textContent = ""
    await renderQuestion()
    $answers.forEach(el=>{
        el.addEventListener("click",answerListener)
        el.classList.add("answer_hover")
    })
})
$questionImg.addEventListener("click",async e=>{
    if(e.target.classList.contains("zoomed-in")) {
        await d.exitFullscreen()
        e.target.classList.remove("zoomed-in")
    } else {
        await e.target.requestFullscreen()
        e.target.classList.add("zoomed-in")
    }
})