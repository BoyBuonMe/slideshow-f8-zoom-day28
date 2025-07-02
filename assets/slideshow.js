const container = document.querySelector(".slideshow .container");
const controls = document.querySelector(".slideshow .controls");
const slidesItem = Array.from(container.querySelectorAll(".slide-item"));
const slidesImg = Array.from(document.querySelectorAll(".slide-img"));
const firstItem = slidesItem[0].cloneNode(true);
container.appendChild(firstItem);
slidesItem.push(firstItem);
console.log(slidesItem);

let currentIndex = 0;
const maxIndex = slidesItem.length - 1;

controls.onclick = (event) => {
  const controlsBtn = event.target.closest(".btn");

  if (controlsBtn.matches(".prev-btn")) {
    currentIndex--;
    currentIndex = (currentIndex + slidesItem.length) % slidesItem.length;

    // if (currentIndex === 0) {
    //   slidesItem.slice(0, maxIndex - 1);
      
    //   container.style.transition = `none`;
    //   currentIndex = maxIndex;
    //   container.style.translate = `-${currentIndex * 100}%`;
      
    //   setTimeout(() => {
    //     container.style.transition = `all ease 0.7s`;
    //   }, 10);
    // }
    console.log(currentIndex);
  }

  if (controlsBtn.matches(".next-btn")) {
    currentIndex++;
    currentIndex = (currentIndex + slidesItem.length) % slidesItem.length;

    // if (currentIndex % slidesItem.length === maxIndex) {
    //   container.style.transition = `none`;
    //   currentIndex = 0;

    //   setTimeout(() => {
    //     container.style.transition = `all ease 0.5s`;
    //   }, 100);
    // }
    console.log(currentIndex);
  }

  //   if (controlsBtn.matches(".prev-btn")) {
  //     if(currentIndex === 0) {
  //         currentIndex = maxIndex;
  //     } else {
  //         currentIndex--;
  //     }
  //   }

  //   if (controlsBtn.matches(".next-btn")) {
  //     if(currentIndex === maxIndex) {
  //         currentIndex = 0;
  //     } else {
  //         currentIndex++;
  //     }
  //   }

  const offset = `-${currentIndex * 100}%`;
  container.style.translate = offset;
};

container.ontransitionend = () => {
  if (currentIndex === maxIndex) {
    container.style.transition = `none`;
    currentIndex = 0;
    container.style.translate = `-${currentIndex * 100}%`;

    setTimeout(() => {
      container.style.transition = `all ease 0.7s`;
    }, 50);
  }
};
