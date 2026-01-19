# Alonso Quiz

## Description

Small quiz website on Fernando Alonso's motorsport career. Text, images and audio (team radio) based questions.

Not a huge amount of questions at the moment - once it gets to a higher amount only a certain number will be loaded per quiz. If you want to add more questions then read the following:


## Quiz JSON Syntax

Quiz JSON files are found under the _locales folder as a quiz.json file, one file per language. File consists of an array with an object per question, here is the syntax:

- question: Question wording.

- answers: Answer array, four items. First answer must be the correct one, other three are the wrong ones. (it gets randomized later through javascript)

- themes: words for quick ctrl+f identification. Examples: wdc,year(2001,2002...),img,audio,general,warning,qualy,meme,teammate,team,social

- img (optional): image file name, without path. files under assets/imgs/quiz

- audio (optional): audio file name, without path. files under assets/audio

- extra (optional): additional information shown after selecting an answer.


## Contact

If you want to contact me then send an email to `carlosgmzes@proton.me`.