const form = document.getElementById("articleForm");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

/* ID ARTIKEL YANG DIEDIT */
const editArticleId =
localStorage.getItem("editArticleId");

/* LOAD DATA SAAT MODE EDIT */
window.addEventListener("load", async () => {

  if (!editArticleId) return;

  try {

    const response =
      await fetch(
        `http://localhost:3000/artikel/${editArticleId}`
      );

    const article =
      await response.json();

    titleInput.value =
      article.title;

    contentInput.value =
      article.content;

  } catch (error) {

    console.error(error);

  }

});

/* SUBMIT */
form.addEventListener("submit", async function (e) {

  e.preventDefault();

  const title =
    titleInput.value.trim();

  const content =
    contentInput.value.trim();

  /* VALIDASI */
  if (title === "" || content === "") {

    showToast(
      "⚠️ Semua field wajib diisi"
    );

    return;
  }

  if (title.length < 5) {

    showToast(
      "⚠️ Judul terlalu pendek"
    );

    return;
  }

  if (content.length < 20) {

    showToast(
      "⚠️ Artikel terlalu pendek"
    );

    return;
  }

  try {

    let response;

    /* MODE EDIT */
    if (editArticleId) {

      response =
        await fetch(
          `http://localhost:3000/artikel/${editArticleId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type":
              "application/json"
            },
            body: JSON.stringify({
              title,
              content
            })
          }
        );

    }

    /* MODE TAMBAH */
    else {

      response =
        await fetch(
          "http://localhost:3000/artikel",
          {
            method: "POST",
            headers: {
              "Content-Type":
              "application/json"
            },
            body: JSON.stringify({
              title,
              content
            })
          }
        );

    }

    const result =
      await response.json();

    showToast(
      result.message
    );

    localStorage.removeItem(
      "editArticleId"
    );

    setTimeout(() => {

      window.location.href =
        "artikel.html";

    }, 1200);

  } catch (error) {

    console.error(error);

    showToast(
      "❌ Terjadi kesalahan"
    );

  }

});

/* TOAST */
function showToast(message) {

  const toast =
    document.createElement("div");

  toast.className =
    "toast";

  toast.innerText =
    message;

  document.body.appendChild(
    toast
  );

  setTimeout(() => {

    toast.classList.add(
      "show"
    );

  }, 100);

  setTimeout(() => {

    toast.classList.remove(
      "show"
    );

    setTimeout(() => {

      toast.remove();

    }, 300);

  }, 2500);

}