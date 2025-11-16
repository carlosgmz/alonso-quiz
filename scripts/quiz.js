const d = document,
 $difficulty = d.querySelector("#difficulty span"),
 $question = d.querySelector(".question span"),
 $questionCounter = d.querySelector("#questionCounter"),
 $answers = d.querySelectorAll(".answer"),
 $A = d.querySelector("#A"),
 $B = d.querySelector("#B"),
 $C = d.querySelector("#C"),
 $D = d.querySelector("#D")

let json, difficulty, cont = 0, contTrue = 0

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
    let params = new URLSearchParams(location.search)
    if(params.has("difficulty","normal")) {
        difficulty = "normal"
    } else if(params.has("difficulty","hard")) {
        difficulty = "hard"
    } else {
        difficulty = "normal"
    }
    json = await fetchJson(difficulty)
    $difficulty.textContent = difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
    render()
}

async function render() {
    $questionCounter.textContent = cont+1
    $question.textContent = json[cont].question
    $A.textContent = json[cont].answers[0]
    $B.textContent = json[cont].answers[1]
    $C.textContent = json[cont].answers[2]
    $D.textContent = json[cont].answers[3]
}

async function answerListener() {
    $answers.forEach(el=>{
        el.removeEventListener("click",answerListener)
        el.classList.remove("answer_hover")
    })
    if(this.textContent == json[cont].answers[0]) {
        contTrue++
        this.classList.add("true")
        await delay(3000)
        this.classList.remove("true")
    } else {
        this.classList.add("false")
        $A.classList.add("true")
        await delay(3000)
        this.classList.remove("false")
        $A.classList.remove("true")
    }
    cont++
    if(cont==30) {
        location.href = `http://localhost:5500/src/pages/result.html?difficulty=${difficulty}&guessed=${contTrue}`
        return
    }
    render()
    $answers.forEach(el=>{
        el.addEventListener("click",answerListener)
        el.classList.add("answer_hover")
    })
}

init()

$answers.forEach(el=>{
    el.addEventListener("click",answerListener)
})