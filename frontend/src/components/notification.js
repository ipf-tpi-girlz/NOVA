export const showNotification = (type, message) => {
  const $notification = document.createElement("div");
  $notification.classList.add(
    "fixed",
    "bottom-4",
    "right-4",
    "px-6",
    "py-3",
    "rounded-lg",
    "shadow-lg",
    "transform",
    "transition-all",
    "duration-300",
    "ease-out",
    "flex",
    "items-center",
    "space-x-3",
    "z-50",
    type === "error" ? "bg-red-100" : "bg-purple-50",
    "translate-y-full",
    "opacity-0"
  );

  const icon =
    type === "error"
      ? `<svg class="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`
      : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>`;

  $notification.innerHTML = `
        <div class="flex-shrink-0">${icon}</div>
        <p class=" font-medium">${message}</p>
    `;

  document.body.appendChild($notification);

  requestAnimationFrame(() => {
    $notification.classList.remove("translate-y-full", "opacity-0");
  });

  setTimeout(() => {
    $notification.classList.add("translate-y-full", "opacity-0");
    setTimeout(() => $notification.remove(), 300);
  }, 3000);
};
