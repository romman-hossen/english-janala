
const createSynonyms= (arr) =>{
  const htmlElement = arr.map(elem => `<span class ="btn">${elem}</span>`);
  return htmlElement.join(" ")
}
const loadingSnipper = (status) => {
  if(status == true){
    document.getElementById("snipper").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  }
  else{
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("snipper").classList.add("hidden");

  }
}

const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

// toogoling btn 
const removeActive = () =>{
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  lessonBtn.forEach(btn => btn.classList.remove("active"));
  
}

//loadLevelWord section 
const loadLevelWord = (id) => {
   loadingSnipper(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
  .then((res) => res.json())
    .then((json) =>{
      removeActive()
      const clickBtn = document.getElementById(`lesson-btn-${id}`) 
      // const lessonBtn = document.querySelectorAll(".lesson-btn");
      // lessonBtn.forEach(btn => {
      //   btn.classList.remove("active")
      // })
      clickBtn.classList.add("active")
      
      displayLevelWord(json.data)
      
    });
    
}

const loadWordDetail = async(id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  // console.log(url)
  const res = await fetch(url);
  const details = await res.json();
  disPlayDetails(details.data)
  
}
const disPlayDetails = (word) => {
  const detailsContainer = document.getElementById("details-container")
  detailsContainer.innerHTML = `
   <div class="">
            <h2 class="text-2xl font-bold">
              ${word.word} (<i class="fa-solid fa-microphone-lines"></i> :${
             word.pronunciation
             })
            </h2>
          </div>
          <div class="">
            <h2 class="font-bold">Meaning</h2>
            <p>${word.meaning}</p>
          </div>
          <div class="">
            <h2 class="font-bold">Example</h2>
            <p>${word.sentence}</p>
          </div>
          <div class="">
            <h2 class="font-bold font-bangla">সমার্থক শব্দ গুলো</h2>
            <div class ="">
            ${createSynonyms(word.synonyms)}
            </div>
          </div>`

   document.getElementById("word_modal").showModal();
  
            
}

const displayLevelWord = (words) => {
    const WordCounter = document.getElementById("word-container");
    WordCounter.innerHTML = "";
    if(words.length == 0){
      WordCounter.innerHTML =`
       <div class="text-center col-span-full space-y-5">
       <img class ="mx-auto" src="./assets/alert-error.png" alt="">
      <p class="font-bangla text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h3 class="font-bangla text-4xl font-semibold text-[#18181B]">নেক্সট Lesson এ যান</h3>
     </div>
      `
      loadingSnipper(false);
      return;
    }
    words.forEach(word =>{
    console.log(word)
    const card = document.createElement("div");
    card.innerHTML =`
      <div class="bg-base-100 text-center shadow-sm py-10 space-y-6 px-3 md:px-2">
      <h3 class="text-3xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h3>
      <p class="text-xl font-medium">Meaning /Pronounciation</p>
      <h3 class="font-bangla text-3xl font-semibold text-[#18181B]">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"}"</h3>
       <div class="flex justify-between items-center py-5 px-6">
          <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
         </button>
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
           <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>
     </div>
    `;
    // console.log(card)
    WordCounter.append(card);
  })  
  loadingSnipper(false);    
  // console.log(words) 
}
// loadLevelWord("re")

// lessons section
const displayLessons = (data) => {
  const labelContainer = document.getElementById("label-container");
   data.forEach((elem) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
         <button id="lesson-btn-${elem.level_no}"  onclick="loadLevelWord(${elem.level_no})" class="btn btn-outline btn-primary lesson-btn" >
         <i class="fa-solid fa-book-open"></i>Lesson - ${elem.level_no}
         </button>
   `;
   labelContainer.append(btnDiv)
  });
};
loadLessons();

// search system 
document.getElementById("btn-search").addEventListener("click", () =>{
  removeActive()
  const input = document.getElementById("input-search");
  const searchValue = input.value.trim().toLowerCase();
  console.log(searchValue);
  fetch("https://openapi.programming-hero.com/api/words/all")
  .then (res => res.json())
  .then (data => {
    const allWord = data.data;
    const filterWord = allWord.filter(word => word.word.toLowerCase().includes(searchValue));
    // console.log(filterWord) 
    displayLevelWord (filterWord);
  });


})
