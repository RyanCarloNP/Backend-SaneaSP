import { iUser, iUserListFilters } from "../models/iUser";

const users = [];

export const listUsers = (userFilters: iUserListFilters) => {
    const {
        nome: nameFilter,
        email: emailFilter,
        cpf: cpfFilter
    } = userFilters;

    const foundUsers = users.filter(({ name, email, cpf }) => {
        if (!(nameFilter || emailFilter || cpfFilter)) return true;
        let found = true;

        if (nameFilter && !name.toLowerCase().includes(nameFilter.toLowerCase())) found = false;
        if (emailFilter && !email.toLowerCase().includes(emailFilter.toLowerCase())) found = false;
        if (cpfFilter && !cpf.toLowerCase().includes(cpfFilter.toLowerCase())) found = false;

        return found;
    });
    return foundUsers;
}