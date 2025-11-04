const d = document,
 $correctQuestions = d.querySelector("#correctQuestions"),
 $totalQuestions = d.querySelector("#totalQuestions"),
 $progressBar = d.querySelector(".progressBar"),
 $resultMsg = d.querySelector(".resultMsg")

let difficulty, contTrue

function render() {
    $correctQuestions.textContent = contTrue
    $resultMsg.textContent = difficulty
}

function init() {
    let params = new URLSearchParams(location.search)
    if(params.has("difficulty","normal") && params.has("guessed")) {
        difficulty = "normal"
    } else if(params.has("difficulty","hard") && params.has("guessed")) {
        difficulty = "hard"
    } else {
        return
    }
    contTrue = params.get("guessed")
    if(isNaN(contTrue) || contTrue < 0 || contTrue > 30) {
        return
    }
    render()
}

init()