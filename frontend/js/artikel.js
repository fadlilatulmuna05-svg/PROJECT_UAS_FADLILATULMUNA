/* =========================
   API URL
========================= */
const API_URL = "https://project-uas-fadlilatulmuna-1h9y.vercel.app";

const articleList = document.getElementById("articleList");

/* =========================
   DATA
========================= */
let articles = [];

/* =========================
   LOAD DATA
========================= */
async function loadArticles() {
  try {
    const response = await fetch(`${API_URL}/artikel`);

    if (!response.ok) {
      throw new Error("Gagal mengambil data artikel");
    }

    articles = await response.json();
    renderArticles();

  } catch (error) {
    console.error("Error:", error);

    articleList.innerHTML = `
      <div class="empty">
        <h2>❌ Gagal Memuat Artikel</h2>
        <p>Pastikan backend online dan API dapat diakses.</p>
      </div>
    `;
  }
}

/* =========================
   RENDER
========================= */
function renderArticles() {

  articleList.innerHTML = "";

  if (articles.length === 0) {
    articleList.innerHTML = `
      <div class="empty">
        <h2>Belum Ada Artikel</h2>
        <p>Yuk mulai menulis artikel pertama ✨</p>
      </div>
    `;
    return;
  }

  articles.forEach((article) => {

    const div = document.createElement("div");
    div.className = "article-card";

    div.innerHTML = `
      <h2>${article.title}</h2>

      <div class="article-date">
        ${new Date(article.created_at).toLocaleString("id-ID")}
      </div>

      <p>${article.content}</p>

      <div class="actions">
        <button
          class="edit-btn"
          onclick="editArticle(${article.id})">
          ✏️ Edit
        </button>

        <button
          class="delete-btn"
          onclick="deleteArticle(${article.id})">
          🗑️ Hapus
        </button>
      </div>
    `;

    articleList.appendChild(div);

  });

}

/* =========================
   EDIT
========================= */
function editArticle(id) {
  localStorage.setItem("editArticleId", id);
  window.location.href = "menulis.html";
}

/* =========================
   DELETE
========================= */
async function deleteArticle(id) {

  const yakin = confirm("Yakin ingin menghapus artikel?");

  if (!yakin) return;

  try {

    const response = await fetch(`${API_URL}/artikel/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Gagal menghapus artikel");
    }

    const result = await response.json();

    alert(result.message);

    loadArticles();

  } catch (error) {

    console.error("Error:", error);
    alert("❌ Gagal menghapus artikel.");

  }

}

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", loadArticles);