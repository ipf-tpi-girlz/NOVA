import { ProfessionalCard } from "../components/ProfessionalCard";
import { Footer } from "../components/footer";
const profesionales = [
  {
    name: "Dr. Emily Carter",
    desc: "A senior data scientist with expertise in machine learning, deep learning, and statistical analysis. Emily has over 10 years of experience in developing predictive models and analyzing complex datasets.",
  },
  {
    name: "Michael Rodriguez",
    desc: "A seasoned software engineer specializing in backend development and cloud architecture. Michael has a strong background in building scalable web applications and managing cloud infrastructure using AWS and Azure.",
  },
  {
    name: "Anna Kim",
    desc: "A marketing strategist with a focus on digital campaigns and social media analytics. Anna has a keen eye for brand development and has led successful campaigns for both startups and Fortune 500 companies.",
  },
  {
    name: "David Singh",
    desc: "A financial analyst with expertise in investment analysis and portfolio management. David has a proven track record of providing strategic insights for optimizing investment portfolios and mitigating financial risks.",
  },
  {
    name: "David Singh",
    desc: "A financial analyst with expertise in investment analysis and portfolio management. David has a proven track record of providing strategic insights for optimizing investment portfolios and mitigating financial risks.",
  },
  {
    name: "David Singh",
    desc: "A financial analyst with expertise in investment analysis and portfolio management. David has a proven track record of providing strategic insights for optimizing investment portfolios and mitigating financial risks.",
  },
];

export const ContactsPage = () => {
  const main = document.createElement("main");
  main.classList.add("flex", "flex-col");

  const interfazProfesionales = document.createElement("div");
  interfazProfesionales.className =
    "flex bg-base-200  shadow-xl mx-12 mt-8  p-5 rounded-3xl";

  //div profesionales
  const containerProfesionales = document.createElement("div");
  containerProfesionales.className = "max-w-xl ";

  const containertitle = document.createElement("div");
  containertitle.textContent = "Algunos Perfiles que te recomendamos";
  containertitle.className =
    "break-all text-center font-bold  font-serif text-2xl mb-2";

  const profesional = document.createElement("div");
  profesional.className =
    "flex flex-col justify-content  mb-2   gap-2 overflow-auto max-h-[64vh] ";

  profesionales.forEach(({ name, desc }) => {
    const profesionalCard = ProfessionalCard(name, desc);
    profesional.appendChild(profesionalCard);
  });

  containerProfesionales.appendChild(containertitle);
  containerProfesionales.appendChild(profesional);

  const divider = document.createElement("div");
  divider.className = "divider lg:divider-horizontal";

  //div preview perfil profesionales
  const previewProfesionales = document.createElement("div");
  previewProfesionales.textContent = "yo muestro las preview de los perfiles";
  previewProfesionales.className = " text-center w-full ";
  profesional.appendChild(Footer());

  interfazProfesionales.appendChild(containerProfesionales);
  interfazProfesionales.appendChild(divider);
  interfazProfesionales.appendChild(previewProfesionales);

  main.appendChild(interfazProfesionales);

  return main;
};
