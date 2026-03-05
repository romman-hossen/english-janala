const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};
//loadLevelWord section 
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
  .then((res) => res.json())
    .then((json) => displayLevelWord(json.data));
    
}
// id
// : 
// 5
// level
// : 
// 1
// meaning
// : 
// "আগ্রহী"
// pronunciation
// : 
// "ইগার"
// word
// : 
// "Eager"
const displayLevelWord = (words) => {
    const WordCounter = document.getElementById("word-container");
    WordCounter.innerHTML = "";
    console.log(words)
    words.forEach(word =>{
    console.log(word)
    const card = document.createElement("div");
    card.innerHTML =`
      <div class="bg-base-100 text-center shadow-sm py-10 space-y-6 px-3 md:px-0">
      <h3 class="text-3xl font-bold">${word.word}</h3>
      <p class="text-xl font-medium">Meaning /Pronounciation</p>
      <h3 class="font-bangla text-3xl font-semibold text-[#18181B]">"${word.meaning} / ${word.pronunciation}"</h3>
       <div class="flex justify-between items-center py-5 px-6">
          <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
         </button>
        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
           <i class="fa-solid fa-volume-high"></i>
        </button>
      </div>
     </div>
    `;
    console.log(card)
    WordCounter.append(card);
  }) 
     
    console.log(words) 
}
// loadLevelWord("re")

// lessons section
const displayLessons = (data) => {
  const labelContainer = document.getElementById("label-container");
   data.forEach((elem) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
         <button  onclick="loadLevelWord(${elem.level_no})" class="btn btn-outline btn-primary" >
         <i class="fa-solid fa-book-open"></i>Lesson - ${elem.level_no}
         </button>
   `;
   labelContainer.append(btnDiv)
  });
};
loadLessons();
