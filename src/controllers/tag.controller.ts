import { ITag } from "../interfaces/ITag.interface";
import { ITagListFilter } from "../interfaces/ITagListFilter.interface";
import { IResponse } from "../interfaces/IResponse.interface";
import { HttpError } from "../enums/HttpError.enum";
import { TagModel } from "../models/tag.model";
import { FindOptions, Op } from "sequelize";

let tags: ITag[] = [
  { id: 1, nome: "Esgoto" },
  { id: 2, nome: "Poluição" },
];

export interface teste{
  where : ITagListFilter
}

export const getTagList = async (tagFilter : ITagListFilter) : Promise<ITag[]> => {
  const tags = await TagModel.findAll();
  return tags;
}

export const getTagById = async (tagId : number) => {
  const tagFound = await TagModel.findOne({where : {id : tagId}})
  return tagFound;
};

export const getTagByName = async (nameFilter : string) => {
  const tagFound = await TagModel.findOne({where : {nome: {[Op.like] : nameFilter}
  }})
  return tagFound;
}

export const createTag = async (nome : string) : Promise<ITag> => {
  const createdTag = await TagModel.create({nome})

  return createdTag;
};

export const updateTag = async (updatedTag : ITag) : Promise<IResponse<ITag>> => {
  const tagFound = await TagModel.findOne({where : {id: updatedTag.id}})
  if(tagFound == null){
    return {
      error:true,
      message:"Nenhuma tag encontrada",
      httpError: HttpError.NotFound
    }
  }
    
  const tagNameExists = await TagModel.findOne({
    where: {
      [Op.or]: [
        {[Op.and]: [{id : updatedTag.id}, {nome: updatedTag.nome}]},
        {nome : {[Op.like] : updatedTag.nome}}
      ],
    }
  })

  if(tagNameExists){
    return {
      error:true,
      message:"Já existe uma tag com esse nome",
      httpError: HttpError.Conflict
    }
  }

  const tag = await tagFound.update(updatedTag)
  return {
    error:false,
    message:"Tag atualizada",
    data: updatedTag
  }
};

export const deleteTag = (tagId : number) => {
  const index = tags.findIndex((tag) => tag.id === tagId)

  if (index === -1) return

  const deletedTag = tags.splice(index, 1)
  
  return deletedTag
};

function getNextId(){
  return tags.length != 0 ? Math.max(...tags.map(tag => tag.id)) + 1 : 1
}
