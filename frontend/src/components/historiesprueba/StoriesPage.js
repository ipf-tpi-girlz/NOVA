import { CreateStoriesModal } from "./CreateHistoriesModal.js";
import { StoriesCard } from "./StoriesCard.js";

const stories = [
  {
    title: "Historia 1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nibh risus, condimentum ut eros eu, cursus suscipit orci. Fusce non felis quam. Vestibulum sed maximus tellus.",
  },
  {
    title: "Historia 2",
    desc: "Eget volutpat sem. Nunc orci leo, varius id dictum non, varius eu lectus. Sed facilisis a velit et pharetra. Ut varius dictum massa eget luctus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Historia 3",
    desc: "Praesent ut magna at nunc fermentum aliquam. Curabitur ultricies mi et posuere luctus. Proin cursus at nisl quis ornare. Pellentesque non augue rutrum, cursus tellus nec, mollis sapien. ",
  },
  {
    title: "Historia 4",
    desc: "Donec sodales ipsum vitae urna blandit vehicula. Nam pulvinar eros id posuere accumsan. Vivamus vitae libero porttitor, aliquam neque id, aliquet eros. Integer tempus leo sem, eget fermentum odio finibus a.",
  },
];
let cardCount = 0;

const frases = [
  {
    id: 1,
    title:
      "Cada pequeño paso que des, por más diminuto que sea, sigue siendo un paso hacia adelante. Tómate todo el tiempo que necesites para darlos.",
  },
  {
    id: 2,
    title:
      "Cada pequeño paso que des, por más diminuto que sea, sigue siendo un paso hacia adelante. Tómate todo el tiempo que necesites para darlos.",
  },
  {
    id: 2,
    title:
      "Cada pequeño paso que des, por más diminuto que sea, sigue siendo un paso hacia adelante. Tómate todo el tiempo que necesites para darlos.",
  },
  {
    id: 2,
    title:
      "Cada pequeño paso que des, por más diminuto que sea, sigue siendo un paso hacia adelante. Tómate todo el tiempo que necesites para darlos.",
  },
];
let frasesIndex = 0;

export function StoriesPage() {
  const main = document.createElement("main");
  main.className = "flex flex-col min-h-dvh items-center px-5 md:px-24 mb-10";

  //header
  const header = document.createElement("h1");
  header.textContent = "Historias";
  header.className = "font-serif text-4xl font-bold text-center p-6";
  main.appendChild(header);

  //historias container
  const storiesContainer = document.createElement("div");
  storiesContainer.className =
    "grid grid-cols-1 gap-9  md:grid-cols-3 mt-5 w-full";

  //render stories
  function renderStories() {
    storiesContainer.innerHTML = ""; // Clear previous stories
    cardCount = 0;
    stories.forEach((story) => {
      const storyCard = StoriesCard(story.title, story.desc);
      storiesContainer.appendChild(storyCard);
      cardCount++;
      if (cardCount % 4 === 0) {
        const emotionalMessage = document.createElement("div");
        emotionalMessage.className =
          "font-serif text-center font-semibold text-2xl md:text-lg lg:text-2xl self-center  ";
        emotionalMessage.innerText = `"${frases[frasesIndex].title}"`;

        storiesContainer.append(emotionalMessage);

        // Aumenta el índice para la próxima frase y reinicia si llega al final
        frasesIndex = (frasesIndex + 1) % frases.length;
      }
    });
  }

  //initial render
  renderStories();

  //append modal and stories container
  main.appendChild(CreateStoriesModal(stories, renderStories));
  main.appendChild(storiesContainer);

  return main;
}
