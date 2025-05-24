import { TagModel } from "./tag.model";
import { ReclamacaoModel } from "./reclamacao.model";
import { TagReclamacaoModel } from "./tagReclamacao.model";
import { ImagemReclamacaoModel } from "./imagemReclamacao.model";

//Adicionando associação entre Tag e Reclamações
ReclamacaoModel.belongsToMany(TagModel, 
    {through :  TagReclamacaoModel, foreignKey: 'id_reclamacao', as : 'Tags'  })
TagModel.belongsToMany(ReclamacaoModel, 
    {through: TagReclamacaoModel, foreignKey: 'id_tag', as: 'reclamacoes'})

//Adicionando associação entre Imagem e Reclamações
ReclamacaoModel.hasMany(ImagemReclamacaoModel, 
    {foreignKey: 'id_reclamacao', as: 'Imagens'})
ImagemReclamacaoModel.belongsTo(ReclamacaoModel, 
    {foreignKey: 'id_reclamacao', as: 'reclamacao'})

//Fazendo o export dos models com as modificações
export {
    ReclamacaoModel, 
    TagModel, 
    TagReclamacaoModel,
    ImagemReclamacaoModel
};