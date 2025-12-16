const d = document,
 $questionSpan = d.querySelector(".question span"),
 $questionImg = d.querySelector(".question img"),
 $questionAudio = d.querySelector(".question audio"),
 $questionCounter = d.querySelector("#questionCounter"),
 $totalQuestions = d.querySelector("#totalQuestions"),
 $answers = d.querySelectorAll(".answer"),
 $main = d.querySelector("main"),
 $template = d.querySelector("#summary_template").content,
 $fragment = d.createDocumentFragment()

const FAILURE = 10, //10
 PASS = 15, //15
 REMARKABLE = 20, //20
 OUTSTANDING = 25, //25
 TOTAL_QUESTIONS = 68 //30

let json, cont = 0, numGuessed = 0, questionPointer = 0, correctAnswer

async function fetchJson(language) {
    let res = await fetch(`../json/${language}/quiz.json`)
    return await res.json()
}

async function delay() {
    return new Promise((resolve)=>setTimeout(()=>{
        resolve()
    }, 3000))
}

async function init() {
    json = await fetchJson("en")
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
        $questionImg.classList.remove("question_hidden")
    } else if(!$questionImg.classList.contains("question_hidden")) {
        $questionImg.classList.add("question_hidden")
        $questionImg.src = ""
    }
    if(typeof json[questionPointer].audio !== "undefined") {
        $questionAudio.src = `../assets/audio/${json[questionPointer].audio}`
        $questionAudio.classList.remove("question_hidden")
    } else if(!$questionAudio.classList.contains("question_hidden")) {
        $questionAudio.classList.add("question_hidden")
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
        el.textContent = answersCopy[answerPointer]
        answersCopy.splice(answerPointer,1)
    })
}

async function renderResult() {
    //stats section
    const $stats = d.createElement("section")
    $stats.classList.add("stats")
    const $correctQuestions = d.createElement("div")
    $correctQuestions.classList.add("correctQuestions")
    $correctQuestions.textContent = `${numGuessed} out of ${TOTAL_QUESTIONS} (${(numGuessed/TOTAL_QUESTIONS*100).toFixed(0)}%)`
    const $resultMsg = d.createElement("div")
    $resultMsg.classList.add("resultMsg")
    if(numGuessed < FAILURE) {
        $resultMsg.textContent = "Awful. Better luck next time!"
    } else if(numGuessed < PASS) {
        $resultMsg.textContent = "Casual Formula One fan"
    } else if(numGuessed < REMARKABLE) {
        $resultMsg.textContent = "Better than average Alonso fan"
    } else if(numGuessed < OUTSTANDING) {
        $resultMsg.textContent = "A real diehard Alonsista"
    } else if(numGuessed < TOTAL_QUESTIONS) {
        $resultMsg.textContent = "The craziest Alonso fan ever"
    } else $resultMsg.textContent = "You didn't cheat, did you?"
    $stats.append($correctQuestions,$resultMsg)

    //summary section
    const $summary = d.createElement("section")
    $summary.classList.add("summary")
    const $info = d.createElement("div")
    $info.classList.add("info")
    let $seed = d.createElement("div")
    $seed.classList.add("seed") 
    $seed.textContent = "Seed:"
    $info.append($seed)
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
    let $a = d.createElement("a")
    $a.target = "_blank"
    let $img = d.createElement("img")
    $a.appendChild($img)
     //twitter-X share button
     const $twitter = $a.cloneNode(true)
     $twitter.href = ""
     $twitter.querySelector("img").src = "../assets/imgs/twitter-x.svg"
     $twitter.querySelector("img").alt = "twitter"
     //instagram share button
     const $instagram = $a.cloneNode(true)
     $instagram.href = ""
     $instagram.querySelector("img").src = "../assets/imgs/instagram.svg"
     $instagram.querySelector("img").alt = "instagram"
     //threads share button
     const $threads = $a.cloneNode(true)
     $threads.href = ""
     $threads.querySelector("img").src = "../assets/imgs/threads.svg"
     $threads.querySelector("img").alt = "threads"
     //facebook share button
     const $facebook = $a.cloneNode(true)
     $facebook.href = ""
     $facebook.querySelector("img").src = "../assets/imgs/facebook.svg"
     $facebook.querySelector("img").alt = "facebook"
     //discord share button
     const $discord = $a.cloneNode(true)
     $discord.href = ""
     $discord.querySelector("img").src = "../assets/imgs/discord.svg"
     $discord.querySelector("img").alt = "discord"
    $socials.append($twitter,$instagram,$threads,$facebook,$discord)
    $share.appendChild($socials)

    //return section
    const $return = d.createElement("section")
    $return.classList.add("return")
    $a = d.createElement("a")
    $a.href = "http://localhost:5500/pages/index.html"
    let $button = d.createElement("button")
    $button.textContent = "Take another quiz"
    $a.appendChild($button)
    $return.appendChild($a)

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
    localStorage.setItem(`selectedAnswer${cont+1}`,this.textContent)

    if(this.textContent == json[questionPointer].answers[0]) {
        numGuessed++
        this.classList.add("true")
        await delay()
        this.classList.remove("true")
    } else {
        this.classList.add("false")
        d.querySelector(`#${correctAnswer}`).classList.add("true")
        await delay()
        this.classList.remove("false")
        d.querySelector(`#${correctAnswer}`).classList.remove("true")
    }
    //removes question from array to prevent repeats
    json.splice(questionPointer,1)
    cont++
    if(cont==TOTAL_QUESTIONS) {
        await renderResult()
        return
    }
    await renderQuestion()
    $answers.forEach(el=>{
        el.addEventListener("click",answerListener)
        el.classList.add("answer_hover")
    })
}

init()

$answers.forEach(el=>{
    el.addEventListener("click",answerListener)
})