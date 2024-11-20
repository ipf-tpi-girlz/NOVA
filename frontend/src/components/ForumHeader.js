import { fetchComunity } from "../api/comunity";
import { joinComunity, deleteRelationC } from "../api/relation.comunity";
import { showNotification } from "./notification";

export const ForumHeader = (id, userId) => {
  const ForumHeader = document.createElement("div");
  ForumHeader.classList.add("forum-header-container");

  const style = document.createElement("style");
  style.textContent = `
    @keyframes gentleFadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes gentlePulse {
      0% { transform: scale(1); box-shadow: 0 0 0 rgba(255,182,193,0); }
      50% { transform: scale(1.02); box-shadow: 0 0 20px rgba(255,182,193,0.3); }
      100% { transform: scale(1); box-shadow: 0 0 0 rgba(255,182,193,0); }
    }

    .forum-header-container {
      animation: gentleFadeIn 1.2s ease-out;
    }

    .support-button {
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .support-button:hover {
      animation: gentlePulse 2s infinite;
    }

    .profile-image {
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      border: 3px solid rgba(255, 255, 255, 0.8);
    }

    .profile-image:hover {
      transform: scale(1.03);
    }

    .safe-space-badge {
      background: rgba(255, 255, 255, 0.9);
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-size: 0.875rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .member-actions {
      position: absolute;
      bottom: 1rem;
      right: 1.5rem;  /* Changed from left to right */
      display: flex;
      align-items: center;
      gap: 1rem;
      z-index: 20;
    }

    .member-message {
      background: rgba(255, 255, 255, 0.9);
      color: #805ad5;
      padding: 0.75rem 1.5rem;
      border-radius: 9999px;
      font-weight: 500;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  `;
  document.head.appendChild(style);

  const caratula = document.createElement("div");
  caratula.classList.add(
    "h-64",
    "flex",
    "rounded-xl",
    "justify-between",
    "px-8",
    "border",
    "border-purple-100",
    "relative",
    "overflow-hidden",
    "shadow-lg"
  );
  caratula.style.backgroundImage = `url("https://images.unsplash.com/photo-1516541196182-6bdb0516ed27?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")`;
  caratula.style.backgroundSize = "cover";
  caratula.style.backgroundPosition = "center";

  const overlay = document.createElement("div");
  overlay.classList.add(
    "absolute",
    "inset-0",
    "w-full",
    "h-full",
    "bg-gradient-to-r",
    "from-purple-400/50",
    "to-pink-300/50"
  );

  fetchComunity(id).then((comunidad) => {
    const datos = comunidad.community;

    const contentContainer = document.createElement("div");
    contentContainer.className = "flex items-center gap-8 z-10 relative py-4";

    const img = document.createElement("img");
    img.src = datos.img_perfil || "https://images.unsplash.com/photo-1517677129300-07b130802f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80";
    img.classList.add(
      "w-40",
      "h-40",
      "rounded-2xl",
      "shadow-xl",
      "profile-image",
      "object-cover"
    );

    const textContent = document.createElement("div");
    textContent.classList.add(
      "flex",
      "flex-col",
      "gap-3",
      "justify-center",
      "text",
      "max-w-2xl"
    );

    const safeBadge = document.createElement("div");
    safeBadge.className = "safe-space-badge text-base-800 bg-base";
    safeBadge.innerHTML = `
      <svg class="w-4 h-4 text-base-800" fill="currentColor"  viewBox="0 0 20 20">
        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
        <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"></path>
      </svg>
      Espacio Seguro y Confidencial
    `;

    const nameProfile = document.createElement("h1");
    nameProfile.innerHTML = `💜 ${datos.nombre}`;
    nameProfile.classList.add(
      "text-4xl",
      "font-bold",
      "font-sans",
      "drop-shadow-lg",
      "tracking-wide"
    );

    const desc = document.createElement("p");
    desc.innerHTML = `${datos.desc}`;
    desc.classList.add(
      "text-xl",
      "font-sans",
      "drop-shadow-md",
      "leading-relaxed"
    );

    const memberActions = document.createElement("div");
    memberActions.className = "member-actions";

    const participantes = datos.participantes || [];
    const usuarioIds = participantes.map((participante) => participante.usuario_id);

    if (!usuarioIds.includes(userId)) {
      const joinBtn = document.createElement("button");
      joinBtn.className =
        "support-button px-8 py-3 bg-white/90 text-text-800 rounded-full font-medium shadow-lg hover:bg-purple-50 transition-all duration-300 flex items-center gap-2";
      joinBtn.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        Unirme al espacio de apoyo
      `;

      joinBtn.addEventListener('click', async () => {
        try {
          await joinComunity(id);
          showNotification("success", `💜 Te has unido a ${datos.nombre || 'nuestra comunidad de apoyo'}`);
          window.location.reload();
        } catch (error) {
          showNotification("error", "No se pudo completar la acción. Por favor, intenta nuevamente.");
          console.error(error);
        }
      });

      memberActions.appendChild(joinBtn);
    } else {
      const alreadyJoinedMessage = document.createElement("p");
      alreadyJoinedMessage.className = "member-message";
      alreadyJoinedMessage.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        💜 Eres parte de nuestra comunidad
      `;

      const leaveBtn = document.createElement("button");
      leaveBtn.className =
        "support-button px-6 py-3 bg-white/90 text-purple-700 rounded-full font-medium shadow-lg hover:bg-purple-50 transition-all duration-300 flex items-center gap-2";
      leaveBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
        </svg>
        Dejar comunidad
      `;

      leaveBtn.addEventListener("click", async () => {
        try {
          await deleteRelationC(id);
          showNotification("success", `Has dejado la comunidad ${datos.nombre}. Recuerda que siempre puedes volver.`);
          window.location.reload();
        } catch (error) {
          showNotification("error", "No se pudo completar la acción. Por favor, intenta nuevamente.");
          console.error(error);
        }
      });

      memberActions.appendChild(alreadyJoinedMessage);
      memberActions.appendChild(leaveBtn);
    }

    textContent.appendChild(safeBadge);
    textContent.appendChild(nameProfile);
    textContent.appendChild(desc);

    contentContainer.appendChild(img);
    contentContainer.appendChild(textContent);

    caratula.appendChild(overlay);
    caratula.appendChild(contentContainer);
    caratula.appendChild(memberActions);
  });

  ForumHeader.appendChild(caratula);
  return ForumHeader;
};