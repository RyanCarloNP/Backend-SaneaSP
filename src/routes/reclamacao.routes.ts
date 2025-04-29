import express, { Request, Response } from "express";
import { getAllReclamacoes, getById, postReclamacao } from "../controllers/reclamacao.controller";
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const foundReclamacoes = await getAllReclamacoes();
        res.status(200).json(foundReclamacoes);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Ocorreu um erro de servidor ${error} `,
        });
    }
});
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const reclamacao = await getById(id);
        if (!reclamacao) {
            res.status(404).json({
                error: true,
                message: "Não foi possível encontrar uma Reclamação com esse ID"
            })
        }

        res.status(200).json(reclamacao);
        return;
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Ocorreu um erro de servidor ${error} `,
        });
    }
})

router.post('/', postReclamacao)
export default router