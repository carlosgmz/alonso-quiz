# Alonso Quiz

## Description

Small quiz website on Fernando Alonso's motorsport career. Text, images and audio (team radio) based questions.

If you want to add more questions to repo then read the following, or send an email.


## Quiz JSON Syntax

Quiz JSON files are found under the locales folder as a quiz.json file, one per language. File consists of an array with an object per question, with the following syntax:

- question: Question wording.

- answers: Answer array, four items. First answer must be the correct one, other three must be wrong. (it gets randomized later through javascript)

- img (optional): image file name. stored in assets/imgs/quiz

- audio (optional): audio file name. stored in assets/audio

- extra (optional): additional information shown after selecting an answer.


## Dependencies

-[Bootstrap Icons](https://icons.getbootstrap.com/), loaded via jsdelivr CDN.


## Contact

If you want to contact me then send an email to `carlosgmzes@proton.me`.