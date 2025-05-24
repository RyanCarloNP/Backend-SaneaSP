import { Op } from "sequelize"
import { ImagemReclamacaoModel } from "../models"

export const createImagemReclamacao = async (imagens : string[], idReclamacao : number) => {
    const newImages = imagens.map(imagem => 
        (
            {
                nome : imagem,
                id_reclamacao : idReclamacao
            }
        )
    )

    await ImagemReclamacaoModel.bulkCreate(newImages)
}

export const updateImagemReclamacao = async(imagens : string[], reclamacaoId : number) => {
    const oldImages = await getImagesNamesList(reclamacaoId); //Lista de imagens antigas
    let excludedImages : string [] = []

    //Verificando as imagens que já existiam
    if(oldImages.length > 0)
        excludedImages = oldImages.filter(oldImage => !imagens.includes(oldImage))

    //Removendo todas imagens que não estão mais atreladas a reclamação
    if(excludedImages.length > 0){
        await ImagemReclamacaoModel.destroy(
        {
            where : 
            {
                nome : {
                    [Op.in] : excludedImages
                }
            }
        })
    }

    //Criando os relacionamentos que não existiam antes
    const newImages = imagens.filter(imagem => !oldImages.includes(imagem))
    .map(imagem => ({
        nome : imagem,
        id_reclamacao : reclamacaoId
    }))

    if(newImages.length > 0)
        await ImagemReclamacaoModel.bulkCreate(newImages)
}

export const getImagesNamesList = async (reclamacaoId : number) => {
    const oldImages = await ImagemReclamacaoModel.findAll({
        where : {
            id_reclamacao : reclamacaoId
        }
    })

    return oldImages.map(image => image.nome)
}