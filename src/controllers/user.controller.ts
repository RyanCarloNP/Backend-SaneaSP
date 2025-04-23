import { iUser, iUserListFilters } from "../interfaces/iUser.interface";

const users = [
    {
        id: 1,
        nome: "Ryan Carlo Negretti Pereira",
        telefone: "(15) 99699-9062",
        email: "ryan@gmail.com",
        senha: "123456",
        cpf: "511.433.668-16",
        cep: "18112-525",
        rua: "Carmelina Garcia",
        numero: 303,
        complemento: " "
    }
];

export const listUsers = (userFilters: iUserListFilters) => {
    const {
        nome: nameFilter,
        email: emailFilter,
        cpf: cpfFilter
    } = userFilters;

    const foundUsers = users.filter(({ nome, email, cpf }) => {
        if (!(nameFilter || emailFilter || cpfFilter)) return true;
        let found = true;

        if (nameFilter && !nome.toLowerCase().includes(nameFilter.toLowerCase())) found = false;
        if (emailFilter && !email.toLowerCase().includes(emailFilter.toLowerCase())) found = false;
        if (cpfFilter && !cpf.toLowerCase().includes(cpfFilter.toLowerCase())) found = false;

        return found;
    });
    return foundUsers;
}