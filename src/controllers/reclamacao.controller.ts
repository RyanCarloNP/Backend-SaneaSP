import { Request, request, Response } from "express";
import { ReclamacaoModel } from "../models/reclamacao.model";
import { IReclamacao } from "../interfaces/IReclamacao.interface";
import { where } from "sequelize";

export const getAllReclamacoes = async (): Promise<IReclamacao[]> =>{
    const reclamacoes = await ReclamacaoModel.findAll({});
    return reclamacoes
};

export const getById = async (idReclamacao: number): Promise<IReclamacao | null> =>{
    const reclamacao = await ReclamacaoModel.findOne({where:{id : idReclamacao}});
    return reclamacao;
}
export const postReclamacao = async (req:Request, res:Response) => {
    let body = req.body;
    console.log(body);
}
