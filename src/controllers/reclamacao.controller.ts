import { error } from 'console';
import { Request, request, Response } from "express";
import { ReclamacaoModel } from "../models/reclamacao.model";
import { ICreateReclamacao, IFilterListReclamacao, IReclamacao } from "../interfaces/IReclamacao.interface";
import { Op, where } from "sequelize";
import { IApiResponse } from "../interfaces/IApiResponse.interface";
import { HttpError } from "../enums/HttpError.enum";

export const getAllReclamacoes = async (filtros : IFilterListReclamacao): Promise<IReclamacao[]> =>{
    let query: any = {
        where : {},
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
    const reclamacao = await ReclamacaoModel.findOne({where:{id : idReclamacao}});
    return reclamacao;
}
export const postReclamacao = async (body : ICreateReclamacao):Promise<IReclamacao> => {
    const pontuacao = gerarPontuacao(body);
    const newReclamacao = {
      status: 0,
      pontuacao,
      data: new Date(),
      ...body  
    };
    const reclamacao = await ReclamacaoModel.create(newReclamacao);
    return reclamacao
}

export const putReclamacao =async(idReclamacao : number, body: IReclamacao):Promise<IApiResponse> =>{
    body.pontuacao = gerarPontuacao(body);
    
    await ReclamacaoModel.update(body, {
        where :{
            id: idReclamacao
        }
    })
    return {
        message: 'Reclamação atualizada com sucesso',
        error : false,
        data : body
    };

}

export const deleteReclamacao = async(idReclamacao : number): Promise<IApiResponse> => {
    const reclamacao = await ReclamacaoModel.findByPk(idReclamacao); 
    if(!reclamacao){
        return {
            message: 'Reclamação não encontrada',
            error : true,
            httpError: HttpError.NotFound
        };
    }
    await reclamacao.destroy();
    return {
        message: 'Reclamação excluída com sucesso',
        error : false,
        data : reclamacao
    };      
}

function gerarPontuacao(bodyRequest : IReclamacao | ICreateReclamacao): number {
    let pontuacao = 0;
    // por enquanto a pontuação de tag vai ser pela quantidade de tags adicionadas nas reclamações
    if(bodyRequest.Imagem){
        pontuacao += 100 * bodyRequest.Imagem.length;
    }

    // por enquanto a pontuação de tag vai ser pela quantidade de tags adicionadas nas reclamações
    if(bodyRequest.Tag){
        pontuacao += 100 * bodyRequest.Tag.length;
    }

    if(bodyRequest.cep && bodyRequest.rua && bodyRequest.numero && bodyRequest.bairro && bodyRequest.cidade){
        pontuacao += 200
    }
    return pontuacao
}