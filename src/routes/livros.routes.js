import express from "express"
import { 
    listarLivros, 
    criarLivro, 
    obterLivro, 
    atualizarLivro, 
    deletarLivro 
} from "../controllers/livros.controller.js";

import {
    avaliacoesLivros
} from "../controllers/avaliacoes.controller.js"
const router = express.Router();


router.get("/", listarLivros)
router.post("/", criarLivro)
router.get("/avaliacoes", avaliacoesLivros)
router.get("/:id", obterLivro)
router.put("/:id", atualizarLivro)
router.delete("/:id", deletarLivro)


export default router;