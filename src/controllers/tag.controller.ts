import { Request, Response} from "express";
import { ITag } from "../models/ITag.model";

let tags : ITag[] = [
    { id: 1, nome: 'Esgoto' },
    { id: 2, nome: 'Poluição' },
]

export const listarTags = (req : Request, res : Response) => {
    //Comando para listar todas tags no banco de dados
    res.status(200).json(tags)
}

export const listarTag = (req : Request, res : Response) => {
    
    const {id} = req.params

    const tagFound = tags.find((tag) => tag.id === Number(id))
    if(!tagFound)
        res.status(404).json(
            {error: true, message : 'Nenhuma tag encontrada'}
        )
    
    res.status(200).json(
        {error: true, message : 'Tag encontrada', data : tagFound}
    )
}

export const criarTag = (req : Request, res : Response) => {
    res.status(200).json({'message' : 'teste'})
}