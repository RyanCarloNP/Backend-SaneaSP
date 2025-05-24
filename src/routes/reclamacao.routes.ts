import express, { Request, Response } from "express";
import { deleteReclamacao, getAllReclamacoes, getById, postReclamacao, putReclamacao } from "../controllers/reclamacao.controller";
import { IFilterListReclamacao } from "../interfaces/IReclamacao.interface";
const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const query : IFilterListReclamacao = req.query
        const foundReclamacoes = await getAllReclamacoes(query);
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
            return;
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

router.post('/', async (req: Request, res: Response) =>{
    try {
        const body = req.body;
        const reclamacao = await postReclamacao(body);
        res.status(201).json(reclamacao);
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Ocorreu um erro de servidor ${error} `,
        });
    }
})

router.put('/:id', async (req:Request, res: Response) =>{
    try {
        const id = Number(req.params.id);
        const body = req.body;

        const existReclamacao = await getById(id);
        if(existReclamacao){
            const result = await putReclamacao(id,body);
            if(!result.error){
                res.status(200).json(result.data);
            }
            else{
                throw `Erro na execução do Update ${result.message}`;
            }
        }
        else{
            res.status(404).json({error:true,mensage:'Reclamação não encontrada'})
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Ocorreu um erro de servidor ${error} `,
        });
    }
});
router.delete('/:id',async(req:Request,res:Response)=>{
    try {
        const idReclamacao = Number(req.params.id);
        const result = await deleteReclamacao(idReclamacao);
        if(result.error){
            res.status(404).json(result);
        }
        else{
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: `Ocorreu um erro de servidor ${error} `,
        });
    }
})
export default router