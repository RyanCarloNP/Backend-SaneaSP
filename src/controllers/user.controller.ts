import { IUser, IUserListFilters } from "../interfaces/IUser.interface";
import { UserModel } from "../models/user.model";
import { Op } from "sequelize"
import { HttpError } from "../enums/HttpError.enum";
import { IApiResponse } from "../interfaces/IApiResponse.interface";

export const getUserList = async (userFilter: IUserListFilters): Promise<IUser[]> => {
    const query: any = { where: {} };

    if (userFilter.nome) { query.where.nome = { [Op.like]: `%${userFilter.nome}%` } };

    if (userFilter.email) { query.where.email = { [Op.like]: `%${userFilter.email}%` } };

    if (userFilter.cpf) { query.where.cpf = { [Op.like]: `%${userFilter.cpf}%` } };

    const user = await UserModel.findAll(query);
    return user;
}

export const getUserById = async (userId: number) => {
    const foundUser = await UserModel.findOne({ where: { id: userId } });
    return foundUser;
}

export const getUserByName = async (userName: string) => {
    const foundUser = await UserModel.findOne({ where: { nome: userName } });
    return foundUser;
}

export const getUserByEmail = async (userEmail: string) => {
    const foundUser = await UserModel.findOne({ where: { email: userEmail } });
    return foundUser;
}

export const getUserByCPF = async (userCPF: string) => {
    const foundUser = await UserModel.findOne({ where: { cpf: userCPF } });
    return foundUser;
}

export const createUser = async (user: IUser): Promise<IApiResponse<IUser>> => {
    const userFound = await UserModel.findOne({
        where: {
            email: { [Op.like]: `${user.email}` },
            cpf: { [Op.like]: `${user.cpf}` },
            nome: { [Op.like]: `${user.nome}` }
        }
    });

    if (userFound) {
        return {
            error: true,
            message: "Usuário ja cadastrado",
            httpError: HttpError.BadRequest
        }
    }

    const createdUser = await UserModel.create(user);
    return {
        error: false,
        message: "Usuário cadastrado com sucesso",
        data: createdUser
    }
}

export const updateUser = async (userData: IUser): Promise<IApiResponse<IUser>> => {
    const userFound = await UserModel.findOne({ where: { id: userData.id } });

    if (userFound == null) {
        return {
            error: true,
            message: "Usuário não encontrado.",
            httpError: HttpError.NotFound
        }
    }

    if (userFound.nome === userData.nome) {
        return {
            error: true,
            message: "O nome do usuário é igual ao seu nome anterior",
            httpError: HttpError.BadRequest
        }
    }

    if (userFound.email === userData.email) {
        return {
            error: true,
            message: "O email do usuário é igual ao seu email anterior",
            httpError: HttpError.BadRequest
        }
    }

    const userNameExistis = await UserModel.findOne({
        where: {
            nome: { [Op.like]: `${userData.nome}` },
            id: { [Op.ne]: userData.id }
        }
    })

    if (userNameExistis) {
        return {
            error: true,
            message: "Já existe um usuário com esse nome",
            httpError: HttpError.Conflict
        }
    }

    const updateUser = await userFound.update(userData);

    return {
        error: false,
        message: "Usuário atualizado com sucesso!",
        data: updateUser
    }
};

export const deleteUser = async (userId: number): Promise<IApiResponse> => {
    const userFound = await UserModel.findByPk(userId);

    if (!userFound) {
        return {
            message: 'Nenhum usuário foi encontrado',
            error: true,
            httpError: HttpError.NotFound
        }
    }

    await userFound.destroy();

    return {
        message: 'Usuário excluido com sucesso!',
        error: false,
        data: userFound
    }
}