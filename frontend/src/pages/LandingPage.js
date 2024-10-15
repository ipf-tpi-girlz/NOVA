import { HeroLanding, Info, Features, JoinNow, Stats } from "../components";

export const LandingPage = () => {
  const main = document.createElement("main");

  //Hero
  main.appendChild(HeroLanding());

  //Info
  main.appendChild(Info());

  //Estadisticas
  main.appendChild(Stats());

  //Features
  main.appendChild(Features());

  //Join Now
  main.appendChild(JoinNow());

  return main;
};
