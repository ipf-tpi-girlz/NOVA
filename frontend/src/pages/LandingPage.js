import { HeroLanding, Info, Features, JoinNow, Stats } from "../components";

export const LandingPage = () => {
  const main = document.createElement("main");
  main.className = "flex flex-col justify-center gap-6";
  //Hero
  main.appendChild(HeroLanding());

  //Estadisticas
  main.appendChild(Stats());

  //Info
  main.appendChild(Info());

  //Features
  main.appendChild(Features());

  //Join Now
  main.appendChild(JoinNow());

  return main;
};
