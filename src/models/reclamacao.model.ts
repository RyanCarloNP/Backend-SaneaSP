import { Model, Optional } from "sequelize";
import { IReclamacao } from "../interfaces/IReclamacao.interface";
import { StatusReclamacao } from "../enums/statusReclamacao.enum";
import { IEndereco } from "../interfaces/IEndereco.interface";
import { DataType } from "sequelize-typescript";
import sequelize from "../config/database";

type ReclamacaoCreationalAttributes = Optional<IReclamacao, "id">

export class ReclamacaoModel extends Model<IReclamacao, ReclamacaoCreationalAttributes> {
  public id!: number;
  public titulo!: string;
  public descricao!: string;
  public data!: Date;
  public status!: StatusReclamacao;
  public pontuacao!: number;
  public cep ?: string;
  public objUsuario!: number;
  public objImagem?: string[];
  public objTag?: string[];
}

ReclamacaoModel.init(
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            type: DataType.INTEGER,
            field: "id"
        },
        titulo: {
            allowNull: false,
            type: DataType.STRING(50),
            field: "titulo"
        },
        descricao: {
            allowNull: false,
            type: DataType.STRING(500),
            field:"descricao"
        },
        data: {
            allowNull: false,
            type: DataType.DATE(),
            field:"data"
        },
        status: {
            allowNull: true,
            type: DataType.INTEGER,
            field: "status"
        },
        cep: {
            allowNull: true,
            type: DataType.STRING(30),
            field: "cep"
        },
        cidade: {
            allowNull: true,
            type: DataType.STRING(30),
            field:"cidade"
        },
        bairro: {
            allowNull: true,
            type: DataType.STRING(30),
        },
        rua: {
            allowNull: true,
            type: DataType.STRING(30),
        },
        numero: {
            allowNull: true,
            type: DataType.STRING(30),
        },
        complemento: {
            allowNull: true,
            type: DataType.STRING(30),
        },
        pontuacao: {
            allowNull: false,
            type: DataType.DECIMAL(5, 2),
        },
        objUsuario: {
            allowNull: false,
            type: DataType.INTEGER,
            field:"id_usuario"
        }
    },
    {
        tableName: "reclamacao",
        sequelize,
        timestamps:false
    }
);
