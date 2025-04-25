import { IEndereco } from './IEndereco.interface';
import { StatusReclamacao } from "../enums/statusReclamacao.enum";

export interface Reclamacao{
    id : number,
    titulo: string,
    descricao: string,
    data: Date,
    status: StatusReclamacao,
    pontuacao: number,
    endereco ?: IEndereco,
    objUsuario: number,
    objImagem ?: string[],
    objTag ?: string[],
}