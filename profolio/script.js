const header = document.querySelector("[data-header]");
const filterButtons = document.querySelectorAll("[data-filter]");
const projectCards = document.querySelectorAll(".project-card");
const copyButton = document.querySelector("[data-copy]");
const toast = document.querySelector("[data-toast]");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    projectCards.forEach((card) => {
      const tags = card.dataset.tags.split(" ");
      card.classList.toggle("hidden", filter !== "all" && !tags.includes(filter));
    });
  });
});

copyButton?.addEventListener("click", async () => {
  const value = copyButton.dataset.copy;

  try {
    await navigator.clipboard.writeText(value);
    toast.classList.add("visible");
    window.setTimeout(() => toast.classList.remove("visible"), 1800);
  } catch {
    window.location.href = `mailto:${value}`;
  }
});
