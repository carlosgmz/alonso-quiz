const d = document,
 $difficulty = d.querySelector("#difficulty span"),
 $question = d.querySelector(".question span"),
 $questionCounter = d.querySelector("#questionCounter"),
 $totalQuestions = d.querySelector("#totalQuestions"),
 $answers = d.querySelectorAll(".answer"),
 $A = d.querySelector("#A"),
 $B = d.querySelector("#B"),
 $C = d.querySelector("#C"),
 $D = d.querySelector("#D"),
 $main = d.querySelector("main"),
 $template = d.querySelector("#summary_template").content,
 $fragment = d.createDocumentFragment()

const acceptedDifficulty = ["normal","hard"],
 FAILURE = 10,
 PASS = 15,
 REMARKABLE = 20,
 OUTSTANDING = 25,
 TOTAL_QUESTIONS = 30,
 DELAY = 1000 //3000

let json, difficulty, cont = 0, contGuessed = 0

async function fetchJson(difficulty) {
    let res = await fetch(`../locale/en/quiz_${difficulty}.json`)
    return await res.json()
}

async function delay(miliseconds) {
    return new Promise((resolve)=>setTimeout(()=>{
        resolve()
    }, miliseconds))
}

async function init() {
    difficulty = localStorage.getItem("difficulty")
    if(!acceptedDifficulty.includes(difficulty)) {
        difficulty = "normal"
    }
    json = await fetchJson(difficulty)
    $totalQuestions.textContent = TOTAL_QUESTIONS
    $difficulty.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
    await renderQuiz()
}

async function renderQuiz() {
    $questionCounter.textContent = cont+1
    $question.textContent = json[cont].question
    $A.textContent = json[cont].answers[0]
    $B.textContent = json[cont].answers[1]
    $C.textContent = json[cont].answers[2]
    $D.textContent = json[cont].answers[3]
}

async function renderResult() {
    const $stats = d.createElement("section")
    $stats.classList.add("stats")
    const $correctQuestions = d.createElement("div")
    $correctQuestions.classList.add("correctQuestions")
    $correctQuestions.textContent = `${contGuessed} out of ${TOTAL_QUESTIONS}`
    const $resultMsg = d.createElement("div")
    $resultMsg.classList.add("resultMsg")
    if(difficulty == "normal") {
        if(contGuessed < FAILURE) {
            $resultMsg.textContent = "Awful. Better luck next time!"
        } else if(contGuessed < PASS) {
            $resultMsg.textContent = "Casual Formula One fan"
        } else if(contGuessed < REMARKABLE) {
            $resultMsg.textContent = "Casual Alonso fan"
        } else if(contGuessed < OUTSTANDING) {
            $resultMsg.textContent = "Better than average Alonso fan"
        } else if(contGuessed < TOTAL_QUESTIONS) {
            $resultMsg.textContent = "Knowledgeable Alonso fan"
        } else $resultMsg.textContent = "Congrats, you achieved full score!"
    } else {
        if(contGuessed < FAILURE) {
            $resultMsg.textContent = "Normal difficulty might suit you"
        } else if(contGuessed < PASS) {
            $resultMsg.textContent = "Close, but yet so far" 
        } else if(contGuessed < REMARKABLE) {
            $resultMsg.textContent = "You are a true Alonsista!"
        } else if(contGuessed < OUTSTANDING) {
            $resultMsg.textContent = "A real diehard Alonso fan"
        } else if(contGuessed < TOTAL_QUESTIONS) {
            $resultMsg.textContent = "The craziest Alonso fan ever"
        } else $resultMsg.textContent = "You didn't cheat, did you?"
    }
    $stats.append($correctQuestions,$resultMsg)

    const $summary = d.createElement("section")
    $summary.classList.add("summary")
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
    $summary.appendChild($fragment)

    $main.replaceChildren($stats,$summary)
}

async function answerListener() {
    $answers.forEach(el=>{
        el.removeEventListener("click",answerListener)
        el.classList.remove("answer_hover")
    })

    localStorage.setItem(`question${cont+1}`,json[cont].question)
    localStorage.setItem(`answer${cont+1}`,json[cont].answers[0])
    localStorage.setItem(`selectedAnswer${cont+1}`,this.textContent)

    if(this.textContent == json[cont].answers[0]) {
        contGuessed++
        this.classList.add("true")
        await delay(DELAY)
        this.classList.remove("true")
    } else {
        this.classList.add("false")
        $A.classList.add("true")
        await delay(DELAY)
        this.classList.remove("false")
        $A.classList.remove("true")
    }
    cont++
    if(cont==TOTAL_QUESTIONS) {
        await renderResult()
        return
    }
    await renderQuiz()
    $answers.forEach(el=>{
        el.addEventListener("click",answerListener)
        el.classList.add("answer_hover")
    })
}

init()

$answers.forEach(el=>{
    el.addEventListener("click",answerListener)
})