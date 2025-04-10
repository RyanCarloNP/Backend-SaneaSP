import  express from "express"
import {listarTags,criarTag, listarTag} from "../controllers/tag.controller" 

const router = express.Router()
    
router.get('/', listarTags)
router.get('/:id', listarTag)
router.post('/', criarTag)

export default router