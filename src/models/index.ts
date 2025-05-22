import { TagModel } from "./tag.model";
import { ReclamacaoModel } from "./reclamacao.model";
import { TagReclamacaoModel } from "./tagReclamacao.model";

//Adicionando associação entre Tag e Reclamações
ReclamacaoModel.belongsToMany(TagModel, {through :  TagReclamacaoModel, foreignKey: 'id_reclamacao', as : 'tags'  })
TagModel.belongsToMany(ReclamacaoModel, {through: TagReclamacaoModel, foreignKey: 'id_tag'})

//Fazendo o export dos models com as modificações
export {
    ReclamacaoModel, 
    TagModel, 
    TagReclamacaoModel
};