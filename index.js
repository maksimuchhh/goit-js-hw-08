import items from "./src/gallery-items";

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
const bodyEl = document.querySelector("body");
const imageInModal = document.querySelector(".lightbox__image");
const modal = document.querySelector(".lightbox");

galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

bodyEl.addEventListener("click", openModal);
bodyEl.addEventListener("click", closeModal);
bodyEl.addEventListener("keydown", closeModal);
bodyEl.addEventListener("keydown", nextImage);
bodyEl.addEventListener("keydown", previousImage);

function openModal(e) {
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }

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

  modal.classList.remove("is-open");

  deleteSourceFromModal();
}

function importFullSizeImage(e) {
  const fullSizeImage = e.target.dataset.source;
  imageInModal.setAttribute("src", fullSizeImage);
  const description = e.target.getAttribute("alt");
  imageInModal.setAttribute("alt", description);
}

function deleteSourceFromModal() {
  imageInModal.setAttribute("src", "");
}

function nextImage(e) {
  if (!(e.key === "ArrowRight")) {
    return;
  }

  let index = items.findIndex((el) => {
    return el.original === imageInModal.getAttribute("src");
  });

  if (index === items.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  const nextPic = items[index].original;
  const nextDescr = items[index].description;

  imageInModal.setAttribute("src", nextPic);
  imageInModal.setAttribute("alt", nextDescr);
}

function previousImage(e) {
  if (!(e.key === "ArrowLeft")) {
    return;
  }

  let index = items.findIndex((el) => {
    return el.original === imageInModal.getAttribute("src");
  });

  if (index === 0) {
    index = items.length;
  }

  index -= 1;

  const previousPic = items[index].original;
  const previousDescr = items[index].description;

  imageInModal.setAttribute("src", previousPic);
  imageInModal.setAttribute("alt", previousDescr);
}
