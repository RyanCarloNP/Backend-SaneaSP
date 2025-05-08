import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";
import { INoticia } from "../interfaces/INoticia.interface";

type INoticiaCreationAttributes = Optional<INoticia, "id">;

export class NoticiaModel extends Model<INoticia, INoticiaCreationAttributes> {
    id!: number;
    titulo!: string;
    descricao!: string;
    dataPublicacao!: Date;
    objAdmin!: number;
    objFonte!: string[];
    objImagem!: string[];
}

NoticiaModel.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        field: 'id_noticia'
    },
    titulo: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'titulo'
    },
    descricao: {
        type: DataTypes.STRING(500),
        allowNull: false,
        field: 'descricao'
    },
    dataPublicacao: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'data_publicacao'
    },
    objAdmin: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'id_admin'
    },
    objFonte: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        field: 'fonte'
    },
    objImagem: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
        field: 'imagens'
    }
}, {
    tableName: "noticia",
    sequelize,
    timestamps: false
})