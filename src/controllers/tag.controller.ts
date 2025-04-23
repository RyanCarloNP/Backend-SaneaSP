import { Request, Response } from "express";
import { ITag } from "../interfaces/ITag.interface";
import { ITagListFilter } from "../interfaces/ITagListFilter.interface";
import { IResponse } from "../interfaces/IResponse.interface";
import { HttpError } from "../enums/HttpError.enum";

let tags: ITag[] = [
  { id: 1, nome: "Esgoto" },
  { id: 2, nome: "Poluição" },
];

export const getTagList = (tagFilter : ITagListFilter) => {

  const {nome: nameFilter} = tagFilter
  const foundProducts = tags.filter(({ nome }) => {
      let found : boolean = true
      if (!(nameFilter)) 
          return true;
      if (nameFilter && !nome.toUpperCase().includes(nameFilter?.toUpperCase())) 
          found = false;
      return found;
  })

  return foundProducts;
};

export const getTagById = (tagId : number) => {
  const tagFound = tags.find((tag) => tag.id === tagId);
  return tagFound;
};

export const getTagByName =  (nameFilter : string) => {
  const tagFound = tags.find((tag) => tag.nome.toLowerCase().trim() === nameFilter.toLowerCase().trim());
  return tagFound;
}

export const createTag = (newTagName : string) => {
  const existTag = tags.find((tag) => tag.nome === newTagName);
  if (existTag) return

  const createdTag = {
    id: getNextId(),
    nome : newTagName
  }

  tags.push(createdTag);

  return createdTag;
};

export const updateTag = (tagId : number, updatedTagName : string) : IResponse<ITag> => {
  const index = tags.findIndex((tag) => tag.id === tagId)
  
  if (index === -1) {
    return {
      error:true,
      message: "Nenhuma tag encontrada",
      httpError: HttpError.NotFound
    }
  }

  const existTag = tags.find((tag) => {
    // Se for a própria tag, só impede caso o nome seja exatamente igual (case-sensitive)
    if(tag.id === tagId){
      return tag.nome === updatedTagName;
    }

    return tag.nome.trim().toLowerCase() === updatedTagName.trim().toLowerCase()
  })

  if(existTag) return {
    error: true,
    message: "Já existe uma tag cadastrada com esse nome",
    httpError: HttpError.Conflict
  };

  tags[index] = {
      id: tagId,
      nome : updatedTagName
  }

  return {
    error:false,
    message: "Tag atualizada com sucesso",
    data:tags[index]
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
