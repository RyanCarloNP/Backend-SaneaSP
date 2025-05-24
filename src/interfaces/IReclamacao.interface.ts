import { IEndereco } from './IEndereco.interface';
import { StatusReclamacao } from "../enums/statusReclamacao.enum";

export interface IReclamacao{
    id : number,
    titulo: string,
    descricao: string,
    data: Date,
    status: StatusReclamacao,
    pontuacao: number,
    cep ?: string,
    cidade ?: string,
    bairro ?: string,
    rua ?: string,
    numero ?: string,
    complemento ?: string,
    idUsuario: number,
    Imagens ?: string[] //Nomes das imagens,
    Tags ?: number[] //Ids das tags,
}

export interface IFilterListReclamacao{
    titulo ?: string,
    descricao ?: string,
    data ?: Date,
    status ?: StatusReclamacao,
    pontuacao? : number,
    cep ?: string,
    cidade ?: string,
    bairro ?: string,
    rua ?: string,
    numero ?: string,
    complemento ?: string
}

export interface ICreateReclamacao{
    titulo: string,
    descricao: string,
    cep ?: string,
    cidade ?: string,
    bairro ?: string,
    rua ?: string,
    numero ?: string,
    complemento ?: string,
    idUsuario: number,
    Imagens ?: string[],
    Tags ?: number[]
}