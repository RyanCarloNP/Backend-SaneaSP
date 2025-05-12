import { ITag } from "../interfaces/ITag.interface";
import { ITagListFilter } from "../interfaces/ITagListFilter.interface";
import { IApiResponse } from "../interfaces/IApiResponse.interface";
import { HttpError } from "../enums/HttpError.enum";
import { TagModel } from "../models/tag.model";
import { Op } from "sequelize";

export const getTagList = async (tagFilter : ITagListFilter) : Promise<ITag[]> => {
  const query : any = {
    where : {}
  }
  if(tagFilter.nome){
    query.where.nome = {
      [Op.like]: `%${tagFilter.nome}%`
    };
  }
  if(tagFilter.limit){
    query.limit = tagFilter.limit
  }
  const tags = await TagModel.findAll(query);
  return tags;
}

export const countAllTags = async () : Promise<number> => {
  const tagCount = await TagModel.count();
  return tagCount;
}

export const getTagById = async (tagId : number) => {
  const tagFound = await TagModel.findOne({where : {id : tagId}})
  return tagFound;
};

export const getTagByName = async (nameFilter : string) => {
  const tagFound = await TagModel.findOne({where : {nome: nameFilter}})
  return tagFound;
}

export const createTag = async (newTagName : string) : Promise<IApiResponse<ITag>> => {
  const tagFound = await TagModel.findOne({where : {nome : {[Op.like] : `${newTagName}`}}})
  if(tagFound){
    return {
      error:true,
      message:"Já existe uma tag com esse nome",
      httpError: HttpError.Conflict
    }
  }

  const createdTag = await TagModel.create({nome : newTagName})

  return {
    error:false,
    message:"Tag cadastrada com sucesso",
    data : createdTag
  }
};

export const updateTag = async (tagData : ITag) : Promise<IApiResponse<ITag>> => {
  const tagFound = await TagModel.findOne({where : {id: tagData.id}})

  if(tagFound == null){
    return {
      error:true,
      message:"Nenhuma tag encontrada",
      httpError: HttpError.NotFound
    }
  }

  if(tagFound.nome === tagData.nome){
    return {
      error: true,
      message: "O nome da tag é igual ao seu nome anterior",
      httpError: HttpError.BadRequest
    }
  }

  const tagNameExists = await TagModel.findOne({
    where: {
      nome : {[Op.like] : `%${tagData.nome}%`},
      id : {[Op.ne] : tagData.id}
    }
  })

  if(tagNameExists){
    return {
      error:true,
      message:"Já existe uma tag com esse nome",
      httpError: HttpError.Conflict
    }
  }

  const updatedTag = await tagFound.update(tagData)

  return {
    error:false,
    message:"Tag atualizada",
    data: updatedTag
  }
};

export const deleteTag = async (tagId : number) : Promise<IApiResponse> => {
  const tagFound = await TagModel.findByPk(tagId)

  if(!tagFound){
    return {
      message: 'Nenhuma tag foi encontrada',
      error : true,
      httpError : HttpError.NotFound
    };
  }

  await tagFound.destroy();

  return {
    message: 'Tag excluída com sucesso',
    error : false,
    data : tagFound
  };
};
