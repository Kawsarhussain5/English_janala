
// local Funtion
function removeActiveClass (){
  const activButtons = document.getElementsByClassName('active');
  for (let btn of activButtons){
    btn.classList.remove("active");
  }
  // console.log(activButtons)
};
// login condition check 

document.getElementById("login-btn").addEventListener("click",function(){
  const enterName =document.getElementById("enter-name").value;
  const enterPass =document.getElementById("inter-pass").value;
  const newEnterPass = parseInt(enterPass)
  // console.log(enterName,enterPass)
  
  if(enterName.length!==0){
      // console.log("all ok mama")
      if(enterPass.length!==0 && newEnterPass===123456){
          // console.log("all ok mama2")
          my_modal_1.showModal()
          showSections('bennar_section')
          
          
      }
      else{
          alert('Enter Your password') 
      }
  }
  else{
      alert('Enter Your Name')
  }
 
});

// after login show section funtion
function showSections(bennar_section) {
   
  const sections = document.querySelectorAll('section.hidden');
  

  sections.forEach((section) => {
    section.classList.remove('hidden');
  });
  

  if (bennar_section) {
    const sectionToHide = document.getElementById('bennar_section');
    if (bennar_section) {
      sectionToHide.classList.add('hidden');
    }
  }
}

 







// loderspeener show/hide funtion
const showLoder =()=>{
document.getElementById('loderspeen').classList.remove("hidden");
document.getElementById('words-card-div').classList.add("hidden");

}

const hideLoder =()=>{
  document.getElementById('loderspeen').classList.add("hidden");
  document.getElementById('words-card-div').classList.remove("hidden");
  
  }

// categoryes api fetch
function lodeCategories (){
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=>res.json())
    .then((data)=>displatcategories(data.data))
};

// Get ⚡ All Words api
function lodeAllWord (){
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res)=>res.json())
    .then((data)=>displayAllWord(data.data))

};

const lodeSingelWord =(id)=>{
    // console.log(id)
    showLoder();
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    // console.log(url)

    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
      removeActiveClass ();
      const clickedButton = document.getElementById(`btn-${id}`)
      clickedButton.classList.add("active")
      // console.log(clickedButton)
      displayAllWord(data.data)
    });

};


// lodeWordDetails
const lodeWordDetails =(DetailsId) =>{
  console.log(DetailsId);
  const url = `https://openapi.programming-hero.com/api/word/${DetailsId}`;
  // console.log(url)

  fetch(url)
  .then((res)=>res.json())
  .then((data) =>displayWordDetails(data.data))

}
// pronounceWord

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-EN'; // English
  window.speechSynthesis.speak(utterance);
}

// {
//   "status": true,
//   "message": "successfully fetched a word details",
//   "data": {
//       "word": "Cautious",
//       "meaning": "সতর্ক",
//       "pronunciation": "কশাস",
//       "level": 2,
//       "sentence": "Be cautious while crossing the road.",
//       "points": 2,
//       "partsOfSpeech": "adjective",
//       "synonyms": [
//           "careful",
//           "alert",
//           "watchful"
//       ],
//       "id": 3
//   }


const displayWordDetails = (wordDetails) =>{
  // console.log(wordDetails)
  document.getElementById("word_details").showModal();
  const wordDetailsContainer= document.getElementById('word-details-container');
  wordDetailsContainer.innerHTML=`
     <div class="card bg-base-100 card-xl shadow-sm">
        <div class="card-body">
          <h2 class="card-title poppins text-3xl">${wordDetails.word} <span class="hind-siliguri">(<i class="fa-solid fa-microphone"></i>:${wordDetails.pronunciation} )</span></h2>
          <h4 class="text-xl font-semibold">Meaning</h4>
          ${wordDetails.meaning == null ? `<h4 class="text-lg font-medium ellipsis">The word dose not exist  <i class="fa-solid fa-face-smile-beam text-2xl text-blue-300"></i></h4>`:`<h4>${wordDetails.meaning}</h4>`}
          <p class="text-xl font-extrabold">Example</p>
          <p class="text-lg font-semibold">${wordDetails.sentence}</p>
          <h3 class="hind-siliguri text-2xl font-semibold">সমার্থক শব্দ গুলো</h3>
          ${wordDetails.synonyms.length>0 ? `<h1><button class="btn">${wordDetails.synonyms[0]}</button> <button class="btn">${wordDetails.synonyms[1]}</button> <button class="btn">${wordDetails.synonyms[2]}</button></h1>` : `<h4 class="text-lg font-medium poppins"><button class="btn">The words are not found<i class="fa-solid fa-face-sad-tear text-3xl text-red-400"></i></button></h4>` }

        </div>
      </div>
  `
};

// // {
//     "id": 101,
//     "level_no": 1,
//     "lessonName": "Basic Vocabulary"
// }
// displatcategoryes btn
function displatcategories(categories){
    // console.log(categories)
    const categoryContainer =document.getElementById('lode-categories-btn');
    for(let cat of categories){
        // console.log(cat.level_no)
       const categorydiv = document.createElement('div') ;
       categorydiv.innerHTML =`
        <button id="btn-${cat.level_no}" onclick="lodeSingelWord(${cat.level_no})" class="btn btn-outline btn-primary">  <img src="assets/fa-book-open.png" alt="">Lesson -${cat.level_no}</button>
       `;
       categoryContainer.append(categorydiv);
    }

};

// {
//     "id": 1,
//     "level": 3,
//     "word": "Abundant",
//     "meaning": null,
//     "pronunciation": "অবানডান্ট"
// }



//  Get ⚡ All Words display
const displayAllWord = (words)=>{
  showLoder()
    // console.log(words)
    const allWordCard = document.getElementById('words-card-div');
    allWordCard.innerHTML = "";
    // const emptyError =document.getElementsByClassName('empty-error');
    const emptyError =document.getElementsByClassName('empty-error');
    if(words.length == 0){
        allWordCard.innerHTML=`
         
      <section class="w-11/12 mx-auto bg-[#F8F8F8] py-20 rounded-sm flex flex-col text-center col-span-3 items-center justify-center gap-7 mt-11 mb-10">
        <img src="assets/alert-error.png" alt="">
        <p class="text-sm text-gray-500 hind-siliguri">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="text-4xl font-semibold hind-siliguri">নেক্সট Lesson এ যান</h1>
      </section>
    
        `
        hideLoder();
      return;
    }
    if(words.length > 0){
      document.getElementById("empty-error").classList.add("hidden")
    }
    
    words.forEach(word =>{
        // console.log(word)
      const wordCard = document.createElement('div');
      wordCard.innerHTML =`
        <div class="px-10 py-10">
        <div class="card  bg-base-100  ">
        <div class="card-body ">
          <div class="card-container flex flex-col justify-center items-center gap-6">
            <h2 class="card-title text-4xl font-bold poppins">${word.word}</h2>
          <h4 class="text-3xl font-medium poppins"><span class="Meaning ">Meaning</span>/<span class="Pronounciation">Pronounciation</span></h4>
          <h4 class="text-3xl font-medium "><span class="আগ্রহী hind-siliguri">"${word.meaning == null ?`No found`:`${word.meaning}`}</span>/<span class="ইগার hind-siliguri">${word.pronunciation == null ?`No found`:`${word.pronunciation}`}"</span></h4>
          </div>
          <div class="justify-between card-actions mt-8">
            <button onClick=lodeWordDetails('${word.id}') 
            class="btn"><i class="fa-solid fa-circle-info"></i></button>
            <button onClick=pronounceWord('${word.word}') class="btn"><i class="fa-solid fa-volume-low"></i></button>
          </div>
        </div>
      </div></div>

      `;

      allWordCard.append(wordCard)
    });
    hideLoder();
};


    


// lodeAllWord ()
lodeCategories ();