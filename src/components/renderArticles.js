export async function renderArticles() {
  const container = document.getElementById("articles");

  try {
    const response = await fetch("src/data/articles.json");
    const articles = await response.json();

    container.innerHTML = ""; // limpa antes

    articles.forEach((article) => {
      const card = document.createElement("div");
      card.className = "article-card";

      const icon = document.createElement("span");
      icon.className = "article-icon";
      icon.innerHTML = article.icon || "📘"; // fallback se não tiver

      const text = document.createElement("div");
      text.className = "article-text";

      const title = document.createElement("a");
      title.className = "article-title";
      title.href = article.url || "#";
      title.textContent = article.title;

      const desc = document.createElement("p");
      desc.className = "article-desc";
      desc.textContent = article.description;

      text.appendChild(title);
      text.appendChild(desc);

      card.appendChild(icon);
      card.appendChild(text);

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Erro ao carregar artigos:", err);
  }
}
