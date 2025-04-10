import express from "express";
//import userRoutes from "./src/routes/user.routes";
import tagRoutes from "./src/routes/tag.routes";
import sintomaRoutes from "./src/routes/sintoma.routes";
import reclamacaoRoutes from "./src/routes/reclamacao.routes";
import noticiaRoutes from "./src/routes/noticia.routes";
import imgRoutes from "./src/routes/img.routes";
import fonteRoutes from "./src/routes/fonte.routes";
import doencaRoutes from "./src/routes/doenca.routes";
import userRoutes from "./src/routes/user.routes";

const app = express();

app.use(express.json());

//app.use("/user", userRoutes);
app.use("/tag", tagRoutes);
app.use("/sintoma", sintomaRoutes);
app.use("/reclamacao", reclamacaoRoutes);
app.use("/noticia", noticiaRoutes);
app.use("/img", imgRoutes);
app.use("/fonte", fonteRoutes);
app.use("/doenca", doencaRoutes);
app.use("/user", userRoutes)

app.listen(3000, () => {
    console.log("Backend do SaneaSP está rodando na porta 3000");
});