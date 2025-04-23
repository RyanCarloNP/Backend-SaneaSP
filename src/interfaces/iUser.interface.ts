export interface iUser {
    id: number,
    nome: string,
    telefone: string,
    email: string,
    senha: string,
    cpf: string
    cep: string,
    rua: string,
    numero: number,
    complemento: string
}

export interface iUserListFilters {
    nome?: string,
    email?: string,
    cpf?: string
}