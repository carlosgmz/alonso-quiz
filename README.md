# Alonso Quiz

## Description

Small quiz website on Fernando Alonso's motorsport career. Text, images and audio (team radio) based questions.

If you want to add more questions to repo then read the following, or send an email.


## Quiz JSON Syntax

Quiz JSON files are found under the locales folder as a quiz.json file, one file per language. File consists of an array with an object per question, here is the syntax:

- question: Question wording.

- answers: Answer array, four items. First answer must be the correct one, other three are the wrong ones. (it gets randomized later through javascript)

- img (optional): image file name if necessary, without path. stored in assets/imgs/quiz

- audio (optional): audio file name if necessary, without path. stored in assets/audio

- extra (optional): additional information if necessary shown after selecting an answer.


## Contact

If you want to contact me then send an email to `carlosgmzes@proton.me`.