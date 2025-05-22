import { ICreateTagReclamacao, ITagReclamacao } from "../interfaces/ITagReclamacao.interface";
import { TagModel, TagReclamacaoModel } from "../models";

export const getTagReclamacaoIdsList = async (reclamacaoId : number) => {
    const tags = await TagReclamacaoModel.findAll({where : {
        id_reclamacao : reclamacaoId
    }})

    return tags.map(tag => tag.id_tag)
}

export const postTagReclamacoes = async (tags : number[], reclamacaoId : number) => {
    await Promise.all(tags.map(async tagId => {
       await createTagReclamacoes({id_tag : tagId, id_reclamacao : reclamacaoId})
    })) 
}

export const updateTagReclamacoes = async (tags : number[], reclamacaoId : number) => {
    // Remove tags que estavam atreladas e não existem mais no array de ids passados
    const olderTags = await getTagReclamacaoIdsList(reclamacaoId)
    await Promise.all(olderTags.map(async tagId => {
        if(!tags.includes(tagId))
           await deleteTagReclamacoes({id_tag : tagId, id_reclamacao : reclamacaoId});
    })) 

    // Adiciona tags que não estavam atreladas a reclamação
    await Promise.all(tags.map(async tagId => {
        const existingRelation = await TagReclamacaoModel.findOne({
            where : {
                id_reclamacao : reclamacaoId,
                id_tag : tagId
            }
        })
        //Adiciona se nao existir em TagReclamacoes
        if(!existingRelation){
           await createTagReclamacoes({id_tag : tagId, id_reclamacao : reclamacaoId});
        }
    })) 
}

export const deleteTagReclamacoes = async (tagReclamacao : ICreateTagReclamacao) => {
   await TagReclamacaoModel.destroy({
        where : {
            id_reclamacao : tagReclamacao.id_reclamacao,
            id_tag : tagReclamacao.id_tag
        }
   })
}

export const createTagReclamacoes = async (tagReclamacao : ICreateTagReclamacao) =>{
    const existingTag = await TagModel.findByPk(tagReclamacao.id_tag);
    if(existingTag){
        await TagReclamacaoModel.create(tagReclamacao)
    }
    else{
        //Caso não exista a tag com o ID, retorna um erro para o try catch
        throw new Error(`Tag com ID ${tagReclamacao.id_tag} não encontrada.`);
    }
}