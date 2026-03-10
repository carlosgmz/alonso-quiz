const doc = document,
 $start = doc.querySelector(".button-start"),
 $endless = doc.querySelector("#endless-input")

//event listener for quiz start button
$start.addEventListener("click",e=>{
    if($endless.checked) {location.href = "./quiz?category=endless"}
    else {location.href = "./quiz?category=standard"}
})