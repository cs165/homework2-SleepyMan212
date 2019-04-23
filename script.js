// TODO(you): Write the JavaScript necessary to complete the homework.

// You can access the RESULTS_MAP from "constants.js" in this file since
// "constants.js" has been included before "script.js" in index.html.
let count = [];
let answers = [];
let answer = {score:0,target:""};
const questionIDs = document.querySelectorAll('div[data-question-id]');
const submit = document.querySelector("#submit");
const h2 = document.querySelector(".submit_panel>h2");
const p = document.querySelector(".submit_panel>p");
const questionGroup = [...questionIDs].reduce((sum,questionID)=>{
  // console.log(questionID);
  if(sum[questionID.dataset.questionId]===undefined){
    sum[questionID.dataset.questionId] = [];
  }
  sum[questionID.dataset.questionId].push(questionID);
  return sum;
},{})

// console.log(questionIDs[0])
questionIDs.forEach((questionID)=>{
  questionID.addEventListener("click",(e)=>{
    if(count.length==3) return;
    e.stopPropagation();
    const currentId = e.currentTarget.dataset.questionId;
    const currentIds = document.querySelectorAll("div[data-question-id="+currentId+"]>.checkbox")
    choiceId = e.currentTarget.dataset.choiceId
    // init
    currentIds.forEach((cur)=>{
      cur.parentElement.style.backgroundColor="#cfe3ff";
      cur.parentElement.style.opacity="0.6";
      cur.src="images/unchecked.png"
    });
    // change the select
    e.currentTarget.children[1].src="images/checked.png";
    e.currentTarget.style.backgroundColor="#cfe3ff";
    e.currentTarget.style.opacity="1";

    if(count.indexOf(currentId)== -1){
      count.push(currentId);
      if(count.length==3){
        answers = [...document.querySelectorAll("img[src='images/checked.png']")];
        answers =answers.map(a=>a.parentElement.dataset.choiceId)
                        .reduce((sum,a)=>{
                          console.log(sum[a]);
                          if(sum[a]===undefined){
                            sum[a]=0;
                            console.log(sum[a]);
                          }
                          sum[a]++;
                          console.log(sum);
                          return sum;
                        },{});
        for(a in answers){
          if(answers[a]>answer.score){
            answer.score = answers[a];
            answer.target = a;
          }
        }
        p.innerText = RESULTS_MAP[answer.target].contents;
        h2.innerText = "You got:"+RESULTS_MAP[answer.target].title;
        console.log(RESULTS_MAP[answer.target].title);
        // console.log(RESULTS_MAP[answer.target.title]);
        console.log(RESULTS_MAP[answer.target].contents);
      }
    }
  });
});

function initial() {
  count = [];
  answers = [];
  answer = {score:0,target:""};
  p.innerText = "";
  // h2.innerText = "You got:";
  h2.innerText = "";
  questionIDs.forEach((questionID)=>{
    questionID.style.backgroundColor="#f4f4f4";
    questionID.style.opacity="1";
    questionID.children[1].src="images/unchecked.png";
  })
}
submit.addEventListener("click",initial);
