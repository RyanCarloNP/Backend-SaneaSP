import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../config/database'
import { ITagReclamacao } from "../interfaces/ITagReclamacao.interface";

type TagReclamacaoCreationalAttributes = Optional<ITagReclamacao, "id">

export class TagReclamacaoModel extends Model<ITagReclamacao, TagReclamacaoCreationalAttributes>{
    public id!: number;
    public id_tag!: number;
    public id_reclamacao!: number
}

TagReclamacaoModel.init({
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
        field: "id"
    },
    id_tag: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'tag',
            key: 'id'
        },
        onDelete: 'CASCADE'
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
    tableName : 'tagReclamacao',
    sequelize,
    timestamps : false
})