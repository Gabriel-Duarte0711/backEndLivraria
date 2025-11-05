
import { db } from "../config/db.js"
// ============================
//  Rotas CRUD
// ============================


export async function criarAvaliacao(req, res) {
    try {
        const { usuario_id, livro_id, nota, comentario } = req.body;
        if (!usuario_id || !livro_id || nota === undefined)
            return res.status(400).json({ erro: "Campos obrigatórios" });

        await db.execute(
            "INSERT INTO avaliacoes (usuario_id, livro_id, nota, comentario) VALUES (?, ?, ?, ?)",
            [usuario_id, livro_id, nota, comentario || null]
        );

        res.json({ mensagem: "Avaliação criada com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


export async function listarAvaliacoes(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM avaliacoes");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};

export async function avaliacoesLivros(req, res) {
    try {
        const [rows] = await db.execute(`
        SELECT
            l.titulo AS Categoria,
            AVG(a.nota) AS MédiaNotas,
            COUNT(a.id) AS TotalAvaliacoes
        FROM livros l
        INNER JOIN  avaliacoes a ON l.id = a.livro_id
        GROUP BY l.id, l.titulo
`);
    res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
};


