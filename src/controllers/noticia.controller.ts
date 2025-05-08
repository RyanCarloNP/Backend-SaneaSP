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

export const getNoticiaByTitle = async (noticiaTitle: string) => {
    const noticia = await NoticiaModel.findOne({ where: { titulo: noticiaTitle } });
    return noticia;
}

export const createNoticia = async (newNoticia: INoticia): Promise<IApiResponse<INoticia>> => {
    const noticiaFound = await NoticiaModel.findOne({ where: { titulo: { [Op.like]: `${newNoticia.titulo}` } } });

    if (noticiaFound) {
        return {
            error: true,
            message: "Está notícia já está cadastrada",
            httpError: HttpError.Conflict
        }
    }

    const createdNoticia = await NoticiaModel.create(newNoticia);
    return {
        error: false,
        message: "Noticia cadastrada com sucesso",
        data: createdNoticia
    }
}

export const updateNoticia = async (noticiaData: INoticia): Promise<IApiResponse<INoticia>> => {
    const noticiaFound = await NoticiaModel.findOne({ where: { id: noticiaData.id } });

    if (noticiaFound == null) {
        return {
            error: true,
            message: "Nenhuma noticia encontrada",
            httpError: HttpError.NotFound
        }
    }

    if (noticiaFound.titulo === noticiaData.titulo) {
        return {
            error: true,
            message: "O titulo da noticia é igual ao seu titulo anterior",
            httpError: HttpError.BadRequest
        }
    }

    const noticiaTitleExists = await NoticiaModel.findOne({
        where: {
            titulo: { [Op.like]: `%${noticiaData.titulo}%` },
            id: { [Op.ne]: noticiaData.id }
        }
    })

    if (noticiaTitleExists) {
        return {
            error: true,
            message: "Já existe uma noticia com esse titulo",
            httpError: HttpError.Conflict
        }
    }

    const updatedNoticia = await noticiaFound.update(noticiaData);
    return {
        error: false,
        message: "Noticia atualizada com sucesso",
        data: updatedNoticia
    }
}

export const deleteNoticia = async (noticiaId: number): Promise<IApiResponse> => {
    const noticiaFound = await NoticiaModel.findByPk(noticiaId)

    if (!noticiaFound) {
        return {
            message: 'Nenhuma noticia foi encontrada',
            error: true,
            httpError: HttpError.NotFound
        };
    }

    await noticiaFound.destroy();
    return {
        error: false,
        message: "Noticia excluida com sucesso",
        data: noticiaFound
    }
}