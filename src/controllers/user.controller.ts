import { IUser, IUserListFilters } from "../interfaces/IUser.interface";
import { UserModel } from "../models/user.model";
import { Op } from "sequelize"
import { HttpError } from "../enums/HttpError.enum";
import { IApiResponse } from "../interfaces/IApiResponse.interface";

export const getUserList = async (userFilter: IUserListFilters): Promise<IUser[]> => {
    const query: any = {};

    if (userFilter.nome) {
        query.where = {
            [Op.like]: `%${userFilter.nome}%`
        };
    };

    if (userFilter.email) {
        query.where = {
            [Op.like]: `%${userFilter.email}%`
        };
    };

    if (userFilter.cpf) {
        query.where = {
            [Op.like]: `%${userFilter.cpf}%`
        };
    };

    const user = await UserModel.findAll(query);
    return user;
}

export const getUserById = async (userId: number) => {
    const foundUser = await UserModel.findOne({ where: { id: userId } });
    return foundUser;
}

export const createUser = async (id: number, nome: string, telefone: string, email: string, senha: string, cpf: string, cep: string, cidade: string, bairro: string,
    rua: string, numero: number, complemento: string): Promise<IApiResponse<IUser>> => {

    const foundUser = await UserModel.findOne({
        where: {
            [Op.or]: [
                { nome: { [Op.like]: `${nome}` } },
                { email: { [Op.like]: `${email}` } },
                { cpf: { [Op.like]: `${cpf}` } }
            ]
        }
    });

    if (foundUser) {
        return {
            error: true,
            message: "Este Usuário já está Cadastrado.",
            httpError: HttpError.Conflict
        }
    }

    const createdUser = await UserModel.create({ id, nome, telefone, email, senha, cpf, cep, cidade, bairro, rua, numero, complemento });
    return {
        error: false,
        message: "Usuário cadastrado com sucesso!",
        data: createdUser
    }
}

export const updateUser = async (userData: IUser): Promise<IApiResponse<IUser>> => {
    const foundUser = await UserModel.findOne({ where: { id: userData.id } });

    if (foundUser == null) {
        return {
            error: true,
            message: "Usuário não encontrado.",
            httpError: HttpError.NotFound
        }
    }

    if (foundUser.nome == userData.nome) {
        return {
            error: true,
            message: "O nome do usuário é igual ao seu nome anterior",
            httpError: HttpError.BadRequest
        }
    }

    if (foundUser.email == userData.email) {
        return {
            error: true,
            message: "O email do usuário é igual ao seu email anterior",
            httpError: HttpError.BadRequest
        }
    }

    const userNameExistis = await UserModel.findOne({
        where: {
            [Op.or]: {
                { nome: { [Op.like]: `%${userData.nome}%` } },
        { id: { [Op.like]: userData.id } }
            }
        }  
    })
}