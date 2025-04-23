import { IEndereco } from './IEndereco.interface';
import { StatusReclamacao } from "../enums/statusReclamacao.enum";

export interface Reclamacao{
    id : number,
    titulo: string,
    descricao: string,
    objUsuario: number,
    data: Date,
    objImagem : string,
    objTag : string,
    status: StatusReclamacao,
    endereco: IEndereco
}