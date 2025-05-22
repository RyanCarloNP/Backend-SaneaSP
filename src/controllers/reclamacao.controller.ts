import { ICreateReclamacao, IFilterListReclamacao, IReclamacao } from "../interfaces/IReclamacao.interface";
import { Op, where } from "sequelize";
import { IApiResponse } from "../interfaces/IApiResponse.interface";
import { HttpError } from "../enums/HttpError.enum";
import { ReclamacaoModel, TagModel, TagReclamacaoModel } from "../models";
import { postTagReclamacoes, updateTagReclamacoes } from "./tag-reclamacao.controller";

export const getAllReclamacoes = async (filtros : IFilterListReclamacao): Promise<IReclamacao[]> =>{
    let query: any = {
        where : {},
        include: [{
            model: TagModel,
            as: 'tags',  
            through: { attributes: [] } //Para dados da tabela TagReclamacoes nao vierem juntos do resultado
        }]
    }
    if(filtros){
        if (filtros.titulo) {
            query.where.titulo = {
                [Op.like]: `%${filtros.titulo}%`
            };
        }
        if (filtros.rua) {
            query.where.rua = {
                [Op.like]: `%${filtros.rua}%`
            };
        }
        if (filtros.cep) {
            query.where.cep = {
                [Op.like]: `%${filtros.cep}%`
            };
        }
        if (filtros.bairro) {
            query.where.bairro = {
                [Op.like]: `%${filtros.bairro}%`
            };
        }
        if (filtros.cidade) {
            query.where.cidade = {
                [Op.like]: `%${filtros.cidade}%`
            };
        }
        if (filtros.status) {
            query.where.status = {
                [Op.like]: `%${filtros.status}%`
            };
        }
        // if (filtros.data) {
        //     const data = new Date(filtros.data);
        //     query.where.data = {
        //         [Op.like]: `%${filtros.data}%`
        //     };
        // }
        if(filtros.pontuacao){
            query.where.pontuacao = {
                [Op.like]: `${filtros.pontuacao}`
            }
        }
    }
    const reclamacoes = await ReclamacaoModel.findAll(query);
    return reclamacoes
};

export const getById = async (idReclamacao: number): Promise<IReclamacao | null> =>{
    const reclamacao = await ReclamacaoModel.findOne(
    {
        where:{id : idReclamacao},
        include: [{
            model: TagModel,
            as: 'tags',  
            through: { attributes: [] } 
        }]
    });
    return reclamacao;
}
export const postReclamacao = async (body : ICreateReclamacao):Promise<IReclamacao | null> => {
    const {tags} = body;
    
    const pontuacao = gerarPontuacao(body);

    const newReclamacao = {
      status: 0,
      pontuacao,
      data: new Date(),
      ...body
    };

    //Cria reclamação
    const reclamacao = await ReclamacaoModel.create(newReclamacao);

    // Criando registro de associação
    if(tags)
        await postTagReclamacoes(tags, reclamacao.id)

    const response = await ReclamacaoModel.findByPk(reclamacao.id, 
    {
        include: [{
            model: TagModel,
            as: 'tags',  
            through: { attributes: [] } 
        }]
    })
    
    return response
}

export const putReclamacao = async(idReclamacao : number, body: IReclamacao):Promise<IApiResponse> => {
    body.pontuacao = gerarPontuacao(body);
    
    await ReclamacaoModel.update(body, {
        where :{
            id: idReclamacao
        }
    })

    if(body.tags)
        await updateTagReclamacoes(body.tags, idReclamacao);

    const response = await ReclamacaoModel.findByPk(idReclamacao, {
        include: [{
            model: TagModel,
            as: 'tags',  
            through: { attributes: [] } //Para dados da tabela TagReclamacoes nao vierem juntos do resultado
        }]
    })

    return {
        message: 'Reclamação atualizada com sucesso',
        error : false,
        data : response
    };
}

export const deleteReclamacao = async(idReclamacao : number): Promise<IApiResponse> => {
    const reclamacao = await ReclamacaoModel.findByPk(idReclamacao, {
        include: [{
            model: TagModel,
            as: 'tags',  
            through: { attributes: [] } 
        }]
    }); 
    
    if(!reclamacao){
        return {
            message: 'Reclamação não encontrada',
            error : true,
            httpError: HttpError.NotFound
        };
    }
    
    //Associações com tags e reclamações são excluidas com cascade
    await reclamacao.destroy();

    return {
        message: 'Reclamação excluída com sucesso',
        error : false,
        data : reclamacao
    };      
}

function gerarPontuacao(bodyRequest : ICreateReclamacao): number {
    let pontuacao = 0;
    // por enquanto a pontuação de tag vai ser pela quantidade de tags adicionadas nas reclamações
    if(bodyRequest.imagens && bodyRequest.imagens?.length > 0){
        pontuacao += 100 * bodyRequest.imagens.length;
    }

    // por enquanto a pontuação de tag vai ser pela quantidade de tags adicionadas nas reclamações
    if(bodyRequest.tags && bodyRequest.tags?.length > 0){
        pontuacao += 100 * bodyRequest.tags.length;
    }

    if(bodyRequest.cep && bodyRequest.rua && bodyRequest.numero && bodyRequest.bairro && bodyRequest.cidade){
        pontuacao += 200
    }
    
    return pontuacao
}