export interface INoticia {
    id: number,
    titulo: string,
    descricao: string,
    dataPublicacao: Date,
    objAdmin: number,
    objFonte: string[],
    objImagem: string[]
}

export interface INoticiaListFilter {
    titulo?: string,
}