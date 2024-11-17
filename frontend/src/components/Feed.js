import manosunidas from "../assets/manosunidas.png";
import { ForumCard, ArticleCard, PostsFeed } from "./index";
import { fetchComunities } from "../api/comunity"

export function Feed() {
  //Contenedor del feed
  const containerFeed = document.createElement("div");
  containerFeed.className = "flex flex-col md:flex-row gap-6";

  //Divisor
  const divider = document.createElement("div");
  divider.className = "divider m-0";

  //Contenedor de los posts
  const containerPost = document.createElement("div");
  containerPost.classList.add(
    "flex",
    "flex-col",
    "gap-3",
    "items-center",
    "lg:items-start"
  );
  //Titulo
  const postsTitle = document.createElement("h1");
  postsTitle.className = "text-lg font-semibold";
  postsTitle.textContent = "Últimos posts";

  containerPost.appendChild(postsTitle);
  containerPost.appendChild(divider.cloneNode(true));
  containerPost.appendChild(PostsFeed());

  //Contenedor de los foros
  const containerForums = document.createElement("div");
  containerForums.classList.add(
    "flex",
    "flex-col",
    "gap-3",
    "items-center",
    "lg:items-start"
  );


  //Titulo
  const forumstTitle = document.createElement("h1");
  forumstTitle.className = "text-lg font-semibold";
  forumstTitle.textContent = "Foros Populares";

  containerForums.appendChild(forumstTitle);
  containerForums.appendChild(divider);


  //Contenedor de los articulos
  const containerArticulo = document.createElement("div");
  containerArticulo.classList.add(
    "flex",
    "flex-col",
    "gap-3",
    "items-center",
    "lg:items-start"
  );
  //Titulo
  const articlesTitle = document.createElement("h1");
  articlesTitle.className = "text-lg font-semibold";
  articlesTitle.textContent = "Últimos artículos";

  containerArticulo.appendChild(articlesTitle);
  containerArticulo.appendChild(divider.cloneNode(true));

  fetchComunities().then(data => {
    const foros = data.community
    console.log(foros)
    foros.forEach(e => {
      const newForum = ForumCard(
        e.id,
        e.img_perfil || "https://media.istockphoto.com/id/857146092/es/foto/mar-de-manos.jpg?s=612x612&w=0&k=20&c=7iUAtDTLL8MpCqDJXDHo8E8ZySoZqGoSTjdNJs9HXj8=",
        e.nombre,
        e.desc
      );
      console.log(e.desc)
      containerForums.appendChild(newForum);
    });
  });
  //!FOROS TERMINADO


  //!Articulos
  const newArticle1 = ArticleCard(
    "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600",
    "Articulo 1",
    "Descripcion"
  );
  const newArticle2 = ArticleCard(
    "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=600",
    "Hola",
    "Descripcion"
  );
  containerArticulo.appendChild(newArticle1);
  containerArticulo.appendChild(newArticle2);

  containerFeed.appendChild(containerForums);
  containerFeed.appendChild(containerPost);
  containerFeed.appendChild(containerArticulo);

  return containerFeed;
}

