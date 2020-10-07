import items from "./gallery-items.js";
function renderHTML(items) {
  return items
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a 
            class="gallery__link"
            href="${original}"
        >
            <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
            />
        </a>
    </li>`;
    })
    .join("");
}
const galleryList = document.querySelector(".js-gallery");
const galleryMarkup = renderHTML(items);
galleryList.insertAdjacentHTML("beforeend", galleryMarkup);
const bodyEl = document.querySelector("body");
bodyEl.addEventListener("click", openModal);
bodyEl.addEventListener("click", closeModal);
bodyEl.addEventListener("keydown", closeModal);
function openModal(e) {
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  const modal = document.querySelector(".lightbox");
  modal.classList.add("is-open");
  e.preventDefault();
  importFullSizeImage(e);
}
function closeModal(e) {
  if (
    !(
      e.target.classList.contains("lightbox__button") ||
      e.target.classList.contains("lightbox__overlay") ||
      e.key == "Escape"
    )
  ) {
    return;
  }
  const modal = document.querySelector(".lightbox");
  modal.classList.remove("is-open");
  deleteSourceFromModal();
}
function importFullSizeImage(e) {
  const fullSizeImage = e.target.dataset.source;
  const imageInModal = document.querySelector(".lightbox__image");
  imageInModal.setAttribute("src", fullSizeImage);
  const description = e.target.getAttribute("alt");
  imageInModal.setAttribute("alt", description);
}
function deleteSourceFromModal(params) {
  const imageInModal = document.querySelector(".lightbox__image");
  imageInModal.setAttribute("src", "");
}
