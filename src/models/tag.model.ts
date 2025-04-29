import { DataTypes, Model, Optional } from "sequelize";
import sequelize from '../config/database'
import { ITag } from "../interfaces/ITag.interface";

type TagCreationalAttributes = Optional<ITag, "id">

export class TagModel extends Model<ITag, TagCreationalAttributes>{
    public id!: number;
    public nome!: string;
}

TagModel.init(
{
    id : {
        primaryKey : true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        field: "id",
    },
    nome : {
        allowNull : false,
        type: DataTypes.STRING(50),
        field: "nome"
    },
}, 
{
    tableName: "tag",
    sequelize,
    timestamps: false
})