import { HeaderProfile } from "../components/HeaderProfile.js";
import { ProfileUser } from "../components/profileUser.js";
export const Perfil = () => {
    const $container = document.createElement("div");
    $container.classList.add("flex", "gap-4", "bg-base-", "min-h-screen");

    $container.appendChild(ProfileUser())

    $container.appendChild(HeaderProfile())
    return $container;
}