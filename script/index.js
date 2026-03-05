const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => displayLessons(data.data));
};

const displayLessons = (data) => {
  const labelContainer = document.getElementById("label-container");
  const lessons = data.forEach((elem) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
         <button class="btn btn-outline btn-primary" >
         <i class="fa-solid fa-book-open"></i>Lesson - ${elem.level_no}
         </button>
   `;
   labelContainer.append(btnDiv)
  });
};
loadLessons();
