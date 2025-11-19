const $difficulty = d.querySelectorAll(".difficulty_choice"),
 acceptedDifficulty = ["normal","hard"]

$difficulty.forEach(el=>{
    el.addEventListener("click",e=>{
        if(acceptedDifficulty.includes(e.target.id)) {
            localStorage.setItem("difficulty",e.target.id)
            location.href = "http://localhost:5500/pages/quiz.html"
        }
    })
})