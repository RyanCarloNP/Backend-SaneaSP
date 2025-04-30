import { Request, request, Response } from "express";
import { ReclamacaoModel } from "../models/reclamacao.model";
import { IFilterListReclamacao, IReclamacao } from "../interfaces/IReclamacao.interface";
import { Op } from "sequelize";

export const getAllReclamacoes = async (filtros : IFilterListReclamacao): Promise<IReclamacao[]> =>{
    let query: any = {}
    if(filtros){
        if (filtros) {
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
        }
        console.log(query);
        const reclamacoes = await ReclamacaoModel.findAll(query);
    return reclamacoes
};

export const getById = async (idReclamacao: number): Promise<IReclamacao | null> =>{
    const reclamacao = await ReclamacaoModel.findOne({where:{id : idReclamacao}});
    return reclamacao;
}
export const postReclamacao = async (body : IReclamacao):Promise<IReclamacao> => {
    const {titulo,descricao,idUsuario,bairro,cep,cidade,complemento,numero,rua} = body;
    const newReclamacao = {
      status: 0,
      pontuacao: 200,
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
    const reclamacao = await ReclamacaoModel.create(newReclamacao)
    return reclamacao
}
