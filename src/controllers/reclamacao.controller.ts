import { ICreateReclamacao, IFilterListReclamacao, IReclamacao } from "../interfaces/IReclamacao.interface";
import { Op, where } from "sequelize";
import { IApiResponse } from "../interfaces/IApiResponse.interface";
import { HttpError } from "../enums/HttpError.enum";
import { ImagemReclamacaoModel, ReclamacaoModel, TagModel, TagReclamacaoModel } from "../models";
import { postTagReclamacoes, updateTagReclamacoes } from "./tag-reclamacao.controller";
import { createImagemReclamacao, updateImagemReclamacao } from "./imagem-reclamacao.controller";
import { IImagemReclamacao } from "../interfaces/IImagemReclamacao.interface";

const reclamacaoFindIncludes = [
    {
        //Trazer as tags da reclamação
        model: TagModel,
        as: 'Tags',  
        through: { attributes: [] } //Para dados da tabela associativa TagReclamacoes nao vierem juntos do resultado
    },
    {
        //Trazer as imagens da reclamação
        model: ImagemReclamacaoModel,
        as: 'Imagens',
        attributes: {exclude : ['id_reclamacao']},
    }
]

export const getAllReclamacoes = async (filtros : IFilterListReclamacao): Promise<IReclamacao[]> =>{
    let query: any = {
        where : {},
        include: reclamacaoFindIncludes
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
    const reclamacao = await ReclamacaoModel.findOne(
    {
        where:{id : idReclamacao},
        include: reclamacaoFindIncludes
    });
    return reclamacao;
}
export const postReclamacao = async (body : ICreateReclamacao):Promise<IReclamacao | null> => {
    const {Tags, Imagens, ...reclamacaoBody} = body;
    
    const pontuacao = gerarPontuacao(body);

    const newReclamacao = {
      status: 0,
      pontuacao,
      data: new Date(),
      ...reclamacaoBody
    };

    //Cria reclamação
    const reclamacao = await ReclamacaoModel.create(newReclamacao);

    if(Imagens && Imagens.length > 0){
        await createImagemReclamacao(Imagens, reclamacao.id);
    }

    // Criando registro de associação
    if(Tags && Tags.length > 0)
        await postTagReclamacoes(Tags, reclamacao.id)

    const response = await ReclamacaoModel.findByPk(reclamacao.id, 
    {
        include: reclamacaoFindIncludes
    })
    
    return response
}

export const putReclamacao = async(idReclamacao : number, body: IReclamacao):Promise<IApiResponse> => {
    body.pontuacao = gerarPontuacao(body);
    
    await ReclamacaoModel.update(body, {
        where :{
            id: idReclamacao
        }
    })

    if(body.Tags)
        await updateTagReclamacoes(body.Tags, idReclamacao);

    if(body.Imagens){
        await updateImagemReclamacao(body.Imagens, idReclamacao)
    }

    const response = await ReclamacaoModel.findByPk(idReclamacao, {
        include: reclamacaoFindIncludes
    })

    return {
        message: 'Reclamação atualizada com sucesso',
        error : false,
        data : response
    };
}

export const deleteReclamacao = async(idReclamacao : number): Promise<IApiResponse> => {
    const reclamacao = await ReclamacaoModel.findByPk(idReclamacao, {
        include: reclamacaoFindIncludes
    }); 
    
    if(!reclamacao){
        return {
            message: 'Reclamação não encontrada',
            error : true,
            httpError: HttpError.NotFound
        };
    }
    
    //Associações com tags e reclamações são excluidas com cascade
    await reclamacao.destroy();

    return {
        message: 'Reclamação excluída com sucesso',
        error : false,
        data : reclamacao
    };      
}

function gerarPontuacao(bodyRequest : ICreateReclamacao | IReclamacao): number {
    let pontuacao = 0;
    // por enquanto a pontuação de tag vai ser pela quantidade de tags adicionadas nas reclamações
    if(bodyRequest.Imagens && bodyRequest.Imagens?.length > 0){
        pontuacao += 100 * bodyRequest.Imagens.length;
    }

    // por enquanto a pontuação de tag vai ser pela quantidade de tags adicionadas nas reclamações
    if(bodyRequest.Tags && bodyRequest.Tags?.length > 0){
        pontuacao += 100 * bodyRequest.Tags.length;
    }

    if(bodyRequest.cep && bodyRequest.rua && bodyRequest.numero && bodyRequest.bairro && bodyRequest.cidade){
        pontuacao += 200
    }
    
    return pontuacao
}