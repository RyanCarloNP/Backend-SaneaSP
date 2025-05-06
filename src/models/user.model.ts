import { DataType, DataTypes, Model, Optional } from "sequelize";
import { IUser } from "../interfaces/IUser.interface";
import sequelize from "../config/database";

type IUserCreationAttributes = Optional<IUser, 'id'>;

export class UserModel extends Model<IUser, IUserCreationAttributes>{
    public id!: number;
    public nome!: string;
    public telefone?: string;
    public email!: string;
    public senha!: string;
    public cpf!: string;
    public cep?: string;
    public cidade?: string;
    public bairro?: string;
    public rua?: string;
    public numero?: number;
    public complemento?: string;
}

UserModel.init({
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        field: 'id_usuario'
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'nome_usuario'
    },
    telefone: {
        type: DataTypes.STRING(14),
        allowNull: true,
        field: 'telefone'
    },
    email:{
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
        field: 'email'
    },
    senha:{
        type: DataTypes.STRING(100),
        allowNull: false,
        field: 'senha'
    },
    cpf:{
        type: DataTypes.CHAR(11),
        allowNull: true,
        unique: true,
        field: 'cpf'
    },
    cep:{
        type: DataTypes.CHAR(8),
        allowNull: true,
        field: 'cep'
    },
    cidade:{
        type: DataTypes.STRING(30),
        allowNull: true,
        field: 'cidade'
    },
    bairro:{
        type: DataTypes.STRING(30),
        allowNull: true,
        field: 'bairro'
    },
    rua:{
        type: DataTypes.STRING(30),
        allowNull: true,
        field: 'rua'
    },
    numero:{
        type: DataTypes.STRING(30),
        allowNull: true,
        field: 'numero'
    },
    complemento:{
        type: DataTypes.STRING(30),
        allowNull: true,
        field: 'complemento'
    }
    
},{
    tableName: 'Usuarios',
    sequelize,
    timestamps: false
})