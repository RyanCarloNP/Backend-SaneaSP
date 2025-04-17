import express from "express";
import { Request, Response } from "express";
import { iUserListFilters } from "../models/iUser";
import { listUsers } from "../controllers/user.controller";

const router = express.Router();

const users = [{
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
}];
const userNotFound = { message: "Usuário não encontrado" };

router.get("/:id", (req: Request, res: Response) => {
    const user = users.find((user) => { return user.id === Number(req.params.id) });
    if (!user) {
        res.status(404).json(userNotFound);
        return;
    }
    res.status(200).json(user);
});

router.get("", (req: Request, res: Response) => {
    const userFilters = req.query as unknown as iUserListFilters;
    const users = listUsers(userFilters);
    res.status(200).json(users);
});

router.post("/:id", (req: Request, res: Response) => {
    const user = req.body;
    users.push(user);
    res.status(201).send();
});

router.delete("/:id", (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    users.forEach((user, index) => {
        if (user.id === userId) {
            users.splice(index, 1);
            res.status(200).json({ message: "Usuário deletado com sucesso" });
            return;
        }
    });
    res.status(404).json({ userNotFound });
});

router.put("/:id", (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const dataToUpdate = req.body;
    users.forEach((user, index) => {
        if (user.id === userId) {
            users[index] = { ...user, ...dataToUpdate };
            res.status(200).json(users[index]);
            return;
        }
    });
    res.status(404).json({ userNotFound });
});

export default router;