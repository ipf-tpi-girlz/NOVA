export function CreateStoriesModal(stories, renderStories) {
  const container = document.createElement("div");

  //boton red de contencion
  const createHistoriesBtn = document.createElement("btn");
  createHistoriesBtn.onclick = () => modal.showModal();
  createHistoriesBtn.className = "btn btn-primary   w-fit self-center";
  createHistoriesBtn.textContent = "Crear historia";

  //creacion modal
  const modal = document.createElement("dialog");
  modal.id = "modal";
  modal.className = "modal ";

  const modalBox = document.createElement("div");
  modalBox.className = "modal-box text-center bg-base-200";

  const modalBackdrop = document.createElement("form");
  modalBackdrop.method = "dialog";
  modalBackdrop.className = "modal-backdrop";

  const modalClose = document.createElement("form");
  modalClose.method = "dialog";

  const modalCloseBtn = document.createElement("button");
  modalCloseBtn.className =
    "btn btn-sm btn-circle btn-ghost absolute right-2 top-2";
  modalCloseBtn.textContent = "X";

  const modalBackdropBtn = document.createElement("button");
  modalBackdropBtn.textContent = "close";

  //contenido
  const form = document.createElement("form");
  form.className = "flex flex-col  gap-3 ";
  form.id = "stories-form";

  const title = document.createElement("h1");
  title.className = "text-lg font-semibold mb-3 ";
  title.textContent = "Publicar Historia";

  const storyTitle = document.createElement("input");
  storyTitle.className = "input input-bordered  w-full";
  storyTitle.placeholder = "Titulo";
  storyTitle.required = true;

  const storyDesc = document.createElement("textarea");
  storyDesc.className = "textarea textarea-bordered w-full ";
  storyDesc.placeholder = "Cuéntanos tu historia";
  storyDesc.required = true;

  const postStoryBtn = document.createElement("button");
  postStoryBtn.className = "btn btn-primary w-fit self-center";
  postStoryBtn.textContent = "Publicar historia";
  postStoryBtn.type = "submit";

  form.appendChild(title);
  form.appendChild(storyTitle);
  form.appendChild(storyDesc);
  form.appendChild(postStoryBtn);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newStory = {
      title: storyTitle.value,
      desc: storyDesc.value,
    };
    try {
      stories.push(newStory);
      modal.close();
      form.reset();
      renderStories(); // Re-render stories
      console.log(stories);
    } catch (error) {
      console.log(error);
    }
  });

  modalClose.appendChild(modalCloseBtn);
  modalBox.appendChild(modalClose);
  modalBox.appendChild(form);

  modalBackdrop.appendChild(modalBackdropBtn);

  modal.appendChild(modalBox);
  modal.appendChild(modalBackdrop);
  container.appendChild(createHistoriesBtn);
  container.appendChild(modal);

  return container;
}
