import { Op } from "sequelize";
import { ICreateTagReclamacao, ITagReclamacao } from "../interfaces/ITagReclamacao.interface";
import { TagModel, TagReclamacaoModel } from "../models";

export const getTagReclamacaoIdsList = async (reclamacaoId : number) => {
    const tags = await TagReclamacaoModel.findAll({where : {
        id_reclamacao : reclamacaoId
    }})

    return tags.map(tag => tag.id_tag)
}

export const postTagReclamacoes = async (tags : number[], reclamacaoId : number) => {
    const validTagsIds : number[] = await tagIdExistValidator(tags)

    await TagReclamacaoModel.bulkCreate(validTagsIds.map(id_tag => ({
        id_tag,
        id_reclamacao: reclamacaoId,
    })));
}

export const updateTagReclamacoes = async (tags : number[], reclamacaoId : number) => {
    // Remove tags que estavam atreladas e não existem mais no array de ids passados
    const oldTags = await getTagReclamacaoIdsList(reclamacaoId)

    const tagsToRemove = oldTags.filter(oldTag => !tags.includes(oldTag))

    await TagReclamacaoModel.destroy({
        where : {
            id_tag : {
                [Op.in] : tagsToRemove
            },
            id_reclamacao : reclamacaoId
        }
    })

    //Tags que já estão associadas e não foram removidas
    const existingTagsRelation = await TagReclamacaoModel.findAll({
        where : {
            id_reclamacao : reclamacaoId,
            id_tag : {
                [Op.in] : tags
            }
        }
    })

    
    const existingTagsRelationIds = existingTagsRelation.map(tag => tag.id_tag)

    //Tags com ids que não foram inseridos ainda na relação
    const newTags = tags.filter(tagId => {
        return !existingTagsRelationIds.includes(tagId)
    })

    const validNewTagsIds = await tagIdExistValidator(newTags)

    await TagReclamacaoModel.bulkCreate(validNewTagsIds.map(tagId => ({
        id_tag : tagId,
        id_reclamacao : reclamacaoId
    })));
}

export const deleteTagReclamacoes = async (tagReclamacao : ICreateTagReclamacao) => {
   await TagReclamacaoModel.destroy({
        where : {
            id_reclamacao : tagReclamacao.id_reclamacao,
            id_tag : tagReclamacao.id_tag
        }
   })
}

export const tagIdExistValidator = async (tags : number[]) => {
    //Verificando se as tags existem na tabela de tags
    const existingTags = await TagModel.findAll({
        where : {
            id : {
                [Op.in] : tags
            }
        }
    })

    const existingTagsIds = existingTags.map(tag => tag.id)

    if(existingTags.length != tags.length){
        const invalidTagsIds = tags.filter(tagId => {
            return !existingTagsIds.includes(tagId)
        })

        throw new Error((invalidTagsIds.length == 1 
            ? "A tag com ID: " 
            : "As tags com ID: ") 
            + invalidTagsIds.join(', ') + " não existem")
    }

    return existingTagsIds;
}
