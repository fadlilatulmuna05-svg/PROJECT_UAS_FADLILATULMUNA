require('dotenv').config();

const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   READ ALL ARTICLES
========================= */
app.get('/artikel', (req, res) => {

    db.query(
        'SELECT * FROM articles ORDER BY id DESC',
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );

});

/* =========================
   CREATE ARTICLE
========================= */
app.post('/artikel', (req, res) => {

    const { title, content } = req.body;

    db.query(
        'INSERT INTO articles (title, content) VALUES (?, ?)',
        [title, content],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: 'Artikel berhasil ditambahkan'
            });

        }
    );

});

/* =========================
   READ ONE ARTICLE
========================= */
app.get('/artikel/:id', (req, res) => {

    db.query(
        'SELECT * FROM articles WHERE id = ?',
        [req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result[0]);
        }
    );

});

/* =========================
   UPDATE ARTICLE
========================= */
app.put('/artikel/:id', (req, res) => {

    const { title, content } = req.body;

    db.query(
        'UPDATE articles SET title=?, content=? WHERE id=?',
        [title, content, req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: 'Artikel berhasil diupdate'
            });

        }
    );

});

/* =========================
   DELETE ARTICLE
========================= */
app.delete('/artikel/:id', (req, res) => {

    db.query(
        'DELETE FROM articles WHERE id=?',
        [req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                success: true,
                message: 'Artikel berhasil dihapus'
            });

        }
    );

});

/* =========================
   SERVER
========================= */
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server Running On Port ${PORT}`);
    });
}

module.exports = app;