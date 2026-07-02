const articleList =
document.getElementById("articleList");

/* DATA */
let articles = [];

/* LOAD DATA */
async function loadArticles() {

  try {

    const response =
      await fetch(
        "http://localhost:3000/artikel"
      );

    articles =
      await response.json();

    renderArticles();

  } catch (error) {

    console.error(error);

    articleList.innerHTML = `
      <div class="empty">
        <h2>Gagal Memuat Artikel</h2>
        <p>Pastikan backend berjalan.</p>
      </div>
    `;

  }

}

/* RENDER */
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

    const div =
      document.createElement("div");

    div.classList.add("article-card");

    div.innerHTML = `

      <h2>
        ${article.title}
      </h2>

      <div class="article-date">
        ${new Date(article.created_at).toLocaleString()}
      </div>

      <p>
        ${article.content}
      </p>

      <div class="actions">

        <button
          class="edit-btn"
          onclick="editArticle(${article.id})"
        >
          ✏️ Edit
        </button>

        <button
          class="delete-btn"
          onclick="deleteArticle(${article.id})"
        >
          🗑️ Hapus
        </button>

      </div>

    `;

    articleList.appendChild(div);

  });

}

/* EDIT */
function editArticle(id) {

  localStorage.setItem(
    "editArticleId",
    id
  );

  window.location.href =
    "menulis.html";

}

/* DELETE */
async function deleteArticle(id) {

  const confirmDelete =
    confirm(
      "Yakin ingin menghapus artikel?"
    );

  if (!confirmDelete) return;

  try {

    const response =
      await fetch(
        `http://localhost:3000/artikel/${id}`,
        {
          method: "DELETE"
        }
      );

    const result =
      await response.json();

    alert(result.message);

    loadArticles();

  } catch (error) {

    console.error(error);

    alert(
      "Gagal menghapus artikel"
    );

  }

}

/* INIT */
loadArticles();