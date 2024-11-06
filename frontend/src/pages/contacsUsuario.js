import { ProfessionalCard } from "../components/ProfessionalCard";
import { ProfessionalPreview } from "../components/ProfessionalPreview";
import { Footer } from "../components/footer";
const profesionales = [
  {
    id: 1,
    name: "Dr. Emily Carter",
    desc: "A senior data scientist with expertise in machine learning, deep learning, and statistical analysis. Emily has over 10 years of experience in developing predictive models and analyzing complex datasets.",
    phone: "555-1234",
    email: "emily.carter@example.com",
    aptitudes: [
      "Machine Learning",
      "Deep Learning",
      "Statistical Analysis",
      "Data Visualization",
    ],
    acercaDe:
      "Dr. Emily Carter is passionate about harnessing the power of data to drive decision-making and improve outcomes in various industries.",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    desc: "A seasoned software engineer specializing in backend development and cloud architecture. Michael has a strong background in building scalable web applications and managing cloud infrastructure using AWS and Azure.",
    phone: "555-5678",
    email: "michael.rodriguez@example.com",
    aptitudes: [
      "Backend Development",
      "Cloud Architecture",
      "Scalable Web Applications",
      "AWS",
      "Azure",
    ],
    acercaDe:
      "Michael is dedicated to optimizing performance and ensuring the reliability of systems through innovative solutions.",
  },
  {
    id: 3,
    name: "Anna Kim",
    desc: "A marketing strategist with a focus on digital campaigns and social media analytics. Anna has a keen eye for brand development and has led successful campaigns for both startups and Fortune 500 companies.",
    phone: "555-8765",
    email: "anna.kim@example.com",
    aptitudes: [
      "Digital Marketing",
      "Social Media Analytics",
      "Brand Development",
      "Campaign Management",
    ],
    acercaDe:
      "Anna thrives on creativity and data-driven insights to help brands connect with their audiences effectively.",
  },
  {
    id: 4,
    name: "David Singh",
    desc: "A financial analyst with expertise in investment analysis and portfolio management. David has a proven track record of providing strategic insights for optimizing investment portfolios and mitigating financial risks.",
    phone: "555-4321",
    email: "david.singh@example.com",
    aptitudes: [
      "Investment Analysis",
      "Portfolio Management",
      "Financial Modeling",
      "Risk Assessment",
    ],
    acercaDe:
      "David is committed to guiding clients toward financial success through informed investment strategies.",
  },
  {
    id: 5,
    name: "David Singh",
    desc: "A financial analyst with expertise in investment analysis and portfolio management. David has a proven track record of providing strategic insights for optimizing investment portfolios and mitigating financial risks.",
    phone: "555-6543",
    email: "david.singh2@example.com",
    aptitudes: [
      "Investment Analysis",
      "Portfolio Management",
      "Market Research",
      "Financial Planning",
    ],
    acercaDe:
      "With a strong analytical background, David aims to provide valuable insights for long-term financial growth.",
  },
  {
    id: 6,
    name: "David Singh",
    desc: "A financial analyst with expertise in investment analysis and portfolio management. David has a proven track record of providing strategic insights for optimizing investment portfolios and mitigating financial risks.",
    phone: "555-7890",
    email: "david.singh3@example.com",
    aptitudes: [
      "Investment Analysis",
      "Portfolio Management",
      "Equity Research",
      "Valuation",
    ],
    acercaDe:
      "David leverages his expertise to help clients navigate the complexities of financial markets.",
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

  profesionales.forEach(
    ({ id, name, desc, phone, email, aptitudes, acercaDe }) => {
      const profesionalCard = ProfessionalCard(id, name, desc);
      profesionalCard.addEventListener("click", () => {
        const preview = document.getElementById("preview");
        preview.innerHTML = "";
        preview.appendChild(
          ProfessionalPreview(id, name, desc, phone, email, aptitudes, acercaDe)
        );
      });
      profesional.appendChild(profesionalCard);
    }
  );

  containerProfesionales.appendChild(containertitle);
  containerProfesionales.appendChild(profesional);

  const divider = document.createElement("div");
  divider.className = "divider lg:divider-horizontal";

  //div preview perfil profesionales
  const previewProfesionales = document.createElement("div");
  previewProfesionales.id = "preview";
  previewProfesionales.textContent = "yo muestro las preview de los perfiles";
  previewProfesionales.className = " text-center w-full ";
  profesional.appendChild(Footer());

  interfazProfesionales.appendChild(containerProfesionales);
  interfazProfesionales.appendChild(divider);
  interfazProfesionales.appendChild(previewProfesionales);

  main.appendChild(interfazProfesionales);

  return main;
};
