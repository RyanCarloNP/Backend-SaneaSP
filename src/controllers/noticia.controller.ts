import { INoticia, INoticiaListFilter } from "../interfaces/INoticia.interface";
import { NoticiaModel } from "../models/noticia.model";
import { Op } from "sequelize";
import { HttpError } from "../enums/HttpError.enum";
import { IApiResponse } from "../interfaces/IApiResponse.interface";

export const getNoticiaList = async (noticiaFilter: INoticiaListFilter): Promise<INoticia[]> => {
    const query: any = { where: {} };

    if (noticiaFilter.titulo) { query.where.titulo = { [Op.like]: `%${noticiaFilter.titulo}%` } };

    const noticia = await NoticiaModel.findAll(query);
    return noticia;
}

export const getNoticiaById = async (noticiaId: number) => {
    const noticia = await NoticiaModel.findOne({ where: { id: noticiaId } });
    return noticia;
}

export const getNoticiaByName = async (noticiaName: string) => {
    const noticia = await NoticiaModel.findOne({ where: { titulo: noticiaName } });
    return noticia;
}

export const createNoticia = async (nome: string, descricao: string, dataPublicacao: Date,
    objAdmin: number, objFonte: string[], objImagem: string[]): Promise<IApiResponse<INoticia>> => {
    
    const foundNoticia = await NoticiaModel.findOne({where:{[Op.like]: `${nome}`}});
    
}