/* =========================
   API URL
========================= */
const API_URL = "https://project-uas-fadlilatulmuna-1h9y.vercel.app";

const form = document.getElementById("articleForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

/* =========================
   ID ARTIKEL YANG DIEDIT
========================= */
const editArticleId = localStorage.getItem("editArticleId");

/* =========================
   LOAD DATA SAAT MODE EDIT
========================= */
window.addEventListener("DOMContentLoaded", async () => {

  if (!editArticleId) return;

  try {

    const response = await fetch(`${API_URL}/artikel/${editArticleId}`);

    if (!response.ok) {
      throw new Error("Gagal mengambil data artikel");
    }

    const article = await response.json();

    titleInput.value = article.title;
    contentInput.value = article.content;

  } catch (error) {

    console.error(error);
    showToast("❌ Gagal memuat artikel");

  }

});

/* =========================
   SUBMIT FORM
========================= */
form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  /* VALIDASI */
  if (!title || !content) {
    showToast("⚠️ Semua field wajib diisi");
    return;
  }

  if (title.length < 5) {
    showToast("⚠️ Judul minimal 5 karakter");
    return;
  }

  if (content.length < 20) {
    showToast("⚠️ Isi artikel minimal 20 karakter");
    return;
  }

  try {

    let response;

    /* =========================
       UPDATE
    ========================= */
    if (editArticleId) {

      response = await fetch(`${API_URL}/artikel/${editArticleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content
        })
      });

    }

    /* =========================
       CREATE
    ========================= */
    else {

      response = await fetch(`${API_URL}/artikel`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          content
        })
      });

    }

    if (!response.ok) {
      throw new Error("Gagal menyimpan artikel");
    }

    const result = await response.json();

    showToast(result.message);

    localStorage.removeItem("editArticleId");

    setTimeout(() => {
      window.location.href = "artikel.html";
    }, 1000);

  } catch (error) {

    console.error(error);
    showToast("❌ Gagal menyimpan artikel");

  }

});

/* =========================
   TOAST
========================= */
function showToast(message) {

  const toast = document.createElement("div");

  toast.className = "toast";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 100);

  setTimeout(() => {

    toast.classList.remove("show");

    setTimeout(() => {
      toast.remove();
    }, 300);

  }, 2500);

}