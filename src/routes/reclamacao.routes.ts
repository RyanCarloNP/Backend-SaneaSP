import  express from "express";
import { getAllReclamacoes, getById, postReclamacao } from "../controllers/reclamacao.controller";
const router = express.Router()

router.get('/', getAllReclamacoes);
router.get('/:id', getById)

router.post('/', postReclamacao)
export default router