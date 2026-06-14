const header = document.querySelector("[data-header]");
const filterButtons = document.querySelectorAll("[data-filter]");
const projectGrid = document.querySelector("[data-project-grid]");
const copyButton = document.querySelector("[data-copy]");
const toast = document.querySelector("[data-toast]");

const updateHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 24);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

let projects = [];
let activeFilter = "all";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const renderProjects = () => {
  const visibleProjects = projects.filter(
    (project) => activeFilter === "all" || project.categories.includes(activeFilter)
  );

  projectGrid.innerHTML = visibleProjects
    .map((project, index) => {
      const cover = project.cover
        ? `<img src="${escapeHtml(project.cover)}" alt="${escapeHtml(project.title)} project preview" />`
        : `<div class="project-cover-placeholder">Add a cover image to<br />${escapeHtml(project.folder)}</div>`;
      const links = Object.entries(project.links || {})
        .filter(([, url]) => url)
        .map(([label, url]) => `<a href="${escapeHtml(url)}" target="_blank" rel="noreferrer">${escapeHtml(label)}</a>`)
        .join("");

      return `
        <article class="project-card" data-tags="${escapeHtml(project.categories.join(" "))}">
          <div class="project-cover">${cover}</div>
          <div class="project-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</div>
          <div class="project-topline">
            <span>${escapeHtml(project.type)}</span>
            <span>${escapeHtml(project.period)}</span>
          </div>
          <h3>${escapeHtml(project.title)}</h3>
          <p>${escapeHtml(project.summary)}</p>
          <ul>${project.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          ${links ? `<div class="project-links">${links}</div>` : ""}
          <div class="tags">${project.technologies.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
        </article>
      `;
    })
    .join("");
};

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects();
  });
});

fetch("projects/projects.json")
  .then((response) => {
    if (!response.ok) throw new Error("Project data could not be loaded.");
    return response.json();
  })
  .then((data) => {
    projects = data;
    renderProjects();
  })
  .catch(() => {
    projectGrid.innerHTML =
      '<p class="projects-error">Projects load on GitHub Pages or through a local web server.</p>';
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
