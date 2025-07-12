const container = document.querySelector(".slideshow .container");
const controls = document.querySelector(".slideshow .controls");
const slidesItem = Array.from(container.querySelectorAll(".slide-item"));

// Tạo cuộn vô hạn bằng cách nhân bản slide đầu và cuối
const firstItem = slidesItem[0].cloneNode(true);
const lastItem = slidesItem[slidesItem.length - 1].cloneNode(true);

// Thêm các slide nhân bản: slide cuối ở đầu, slide đầu ở cuối
container.insertBefore(lastItem, slidesItem[0]);
container.appendChild(firstItem);

console.log({ container });
// Cập nhật mảng slides để bao gồm các slide nhân bản
console.log("ccc", container.querySelectorAll(".slide-item"));
const allSlides = Array.from(container.querySelectorAll(".slide-item"));
console.log("Total slides (including clones):", allSlides.length);


// Bắt đầu ở index 1 (slide thật đầu tiên, sau slide cuối được nhân bản)
let currentIndex = 1;
const originalSlideCount = slidesItem.length;

// Lấy các phần tử counter
const currentSlideElement = document.querySelector(".current-slide");
const totalSlidesElement = document.querySelector(".total-slides");

// Thiết lập vị trí ban đầu và counter
container.style.translate = `-${currentIndex * 100}%`;
totalSlidesElement.textContent = originalSlideCount; // Tổng số slide không bao gồm nhân bản

// Hàm để cập nhật counter slide
function updateSlideCounter() {
  // Chuyển đổi index nội bộ thành index hiển thị (bắt đầu từ 1)
  let displayIndex = currentIndex;
  
  // Xử lý các slide nhân bản
  if (currentIndex === 0) {
    displayIndex = originalSlideCount; // Slide cuối
  } else if (currentIndex === allSlides.length - 1) {
    displayIndex = 1; // Slide đầu
  }
  
  currentSlideElement.textContent = displayIndex;
}

// Cập nhật counter ban đầu
updateSlideCounter();

controls.onclick = (event) => {
  const controlsBtn = event.target.closest(".btn");

  if (!controlsBtn) return;

    if (controlsBtn.matches(".prev-btn")) {
    currentIndex--;
    // Ngăn chặn đi dưới 0 (slide cuối nhân bản)
    if (currentIndex < 0) {
      currentIndex = 0;
    }
    console.log("Previous clicked, new index:", currentIndex);
  }

  if (controlsBtn.matches(".next-btn")) {
    currentIndex++;
    // Ngăn chặn đi quá slide nhân bản cuối cùng
    if (currentIndex >= allSlides.length) {
      currentIndex = allSlides.length - 1;
    }
    console.log("Next clicked, new index:", currentIndex);
  }

  // Áp dụng transition
  const offset = `-${currentIndex * 100}%`;
  container.style.translate = offset;
  
  // Cập nhật counter
  updateSlideCounter();
};

container.ontransitionend = () => {
  // Nếu chúng ta đang ở slide đầu nhân bản (ở cuối)
  if (currentIndex === allSlides.length - 1) {
    container.style.transition = "none";
    currentIndex = 1; // Nhảy đến slide đầu thật
    container.style.translate = `-${currentIndex * 100}%`;
    updateSlideCounter(); // Cập nhật counter sau khi nhảy
    
    setTimeout(() => {
      container.style.transition = "all ease 0.7s";
    }, 50);
  }
  
  // Nếu chúng ta đang ở slide cuối nhân bản (ở đầu)
  if (currentIndex === 0) {
    container.style.transition = "none";
    currentIndex = originalSlideCount; // Nhảy đến slide cuối thật
    container.style.translate = `-${currentIndex * 100}%`;
    updateSlideCounter(); // Cập nhật counter sau khi nhảy
    
    setTimeout(() => {
      container.style.transition = "all ease 0.7s";
    }, 50);
  }
};