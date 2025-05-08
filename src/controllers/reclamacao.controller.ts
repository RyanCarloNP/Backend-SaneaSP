import { Request, request, Response } from "express";
import { ReclamacaoModel } from "../models/reclamacao.model";
import { IFilterListReclamacao, IReclamacao } from "../interfaces/IReclamacao.interface";
import { Op } from "sequelize";

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
export const postReclamacao = async (body : IReclamacao):Promise<IReclamacao> => {
    const {titulo,descricao,idUsuario,bairro,cep,cidade,complemento,numero,rua, objImagem, objTag} = body;
    let pontuacao = 0
    if(objImagem){
        pontuacao = 100 * objImagem?.length;
    }

    // por enquanto a pontuação de tag vai ser pela quantidade de tags adicionadas nas reclamações
    if(objTag){
        pontuacao = 100 * objTag?.length;
    }

    
    const newReclamacao = {
      status: 0,
      pontuacao,
      data: new Date(),
      titulo,
      descricao,
      idUsuario,
      bairro,
      cep,
      cidade,
      complemento,
      numero,
      rua,
    };
    const reclamacao = await ReclamacaoModel.create(newReclamacao);
    return reclamacao
}
