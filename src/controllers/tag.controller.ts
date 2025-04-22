import { Request, Response } from "express";
import { ITag } from "../models/ITag.model";
import { ITagListFilter } from "../models/ITagListFilter";

let tags: ITag[] = [
  { id: 1, nome: "Esgoto" },
  { id: 2, nome: "Poluição" },
];

export const getTagList = (req: Request, res: Response) => {
  const tagFilter = req.query as ITagListFilter

  const {nome: nameFilter} = tagFilter

  //Fazendo a filtragem com todos os filtros existentes (ao mesmo tempo, para evitar sobrescrita entre os filtros)
  const foundProducts = tags.filter(({ nome }) => {
      let found : boolean = true
      if (!(nameFilter)) 
          return true;
      if (nameFilter && !nome.toUpperCase().includes(nameFilter?.toUpperCase())) 
          found = false;
      return found;
  })

  res.status(200).json(foundProducts)
};

export const getTagById = (req: Request, res: Response) => {
  const {id} = req.params;

  const tagFound = tags.find((tag) => tag.id === Number(id));

  if(!tagFound){
    res.status(404).json({
      error: true,
      message: 'Não foi possível encontrar uma tag com esse ID'
    })
    return;
  }

  res.status(200).json(tagFound)
};

export const getTagByName =  (req: Request, res: Response) => {
  const {nome : filtroNome} = req.params

  const tagFound = tags.find((tag) => tag.nome.toLowerCase().trim() === filtroNome.toLowerCase().trim());

  if (!tagFound) {
      res.status(404).json({
          "error": true,
          "message": "Nenhuma tag foi encontrada"
      })
      return
  }

  res.status(200).json({
    error: false,
    message: 'Tag encontrada',
    data: tagFound
  })
}

export const createTag = (req: Request, res: Response) => {
  const {nome : nomeNovaTag} = req.body

  const createdTag = {
    id: getNextId(),
    nome : nomeNovaTag
  }

  const existTag = tags.find((tag) => tag.nome === nomeNovaTag);
    if (existTag) {
        res.status(409).json({
            "error": true,
            "message": "Uma tag com esse nome já foi cadastrada"
        })
        return
    }

  tags.push(createdTag);

  res.status(201).json({
    error: false,
    message: 'Tag cadastrada com sucesso',
    data : createdTag
  })
};

export const updateTag = (req: Request, res: Response) => {
  const tagId = Number(req.params.id);
  const {nome : newTagName} = req.body;
  const index = tags.findIndex((tag) => tag.id === Number(tagId))

  if (index === -1) {
      res.status(404).json({
          error: true,
          message: "Não foi possível encontrar uma tag com esse ID"
      });
      return;
  }

  const existTag = tags.find((tag) => tag.nome === newTagName)

  if(existTag){
    res.status(409).json({
      error: true,
      message: 'Já existe uma tag com esse nome'
    })
    return;
  }

  tags[index] = {
      id: tagId,
      nome : newTagName
  }
  res.status(200).json({
      error: false,
      message: "Tag atualizada com sucesso",
      data: tags[index]
  });
};

export const deleteTag = (req: Request, res: Response) => {
  const tagId = Number(req.params.id);

  const index = tags.findIndex((tag) => tag.id === tagId)

  if (index === -1) {
      res.status(404).json({
          error: true,
          message: "Não foi possível encontrar uma tag com esse ID"
      });
      return;
  }

  const removedTag = tags.splice(index, 1)
  res.status(200).json({
      error: false,
      message: "Tag excluída com sucesso",
      data: removedTag
  });
};

function getNextId(){
  return tags.length != 0 ? Math.max(...tags.map(tag => tag.id)) + 1 : 1
}
