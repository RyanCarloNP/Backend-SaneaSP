import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../config/database'
import { IImagemReclamacao } from "../interfaces/IImagemReclamacao.interface";

type ImagemReclamacaoCreationalAttributes = Optional<IImagemReclamacao, "id">

export class ImagemReclamacaoModel extends Model<IImagemReclamacao, ImagemReclamacaoCreationalAttributes>{
    public id!: number;
    public nome!: string;
    public id_reclamacao!: number
}

ImagemReclamacaoModel.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "id"
    },
    nome: {
        allowNull: false,
        type: DataTypes.STRING(100),
        field: "nome"
    },
    id_reclamacao: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'reclamacao',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
},{
    tableName : 'imagemReclamacao',
    sequelize,
    timestamps : false
})