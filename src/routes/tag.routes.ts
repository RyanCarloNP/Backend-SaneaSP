import { Request, Response } from "express";
import express from "express";
import {
  countTags,
  createTag,
  deleteTag,
  getTagById,
  getTagByName,
  getTagList,
  updateTag,
} from "../controllers/tag.controller";
import { ITagListFilter } from "../interfaces/ITagListFilter.interface";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const tagFilter = req.query as unknown as ITagListFilter;
    const foundTags = await getTagList(tagFilter);

    res.status(200).json(foundTags);
  } catch (error) {
    console.log(`Ocorreu um erro de servidor ${error} `);
    res.status(500).json({
      error: true,
      message: `Ocorreu um erro de servidor ${error} `,
    });
  }
});

router.get("/total", async (req: Request, res: Response) => {
  try {
    const count = await countTags();
    res.status(200).json(count);
  } catch (error) {
    console.log(`Ocorreu um erro de servidor ${error} `);
    res.status(500).json({
      error: true,
      message: `Ocorreu um erro de servidor ${error} `,
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const tagFound = await getTagById(Number(id));

    if (!tagFound) {
      res.status(404).json({
        error: true,
        message: "Não foi possível encontrar uma tag com esse ID",
      });
      return;
    }
    res.status(200).json(tagFound);
  } catch (error) {
    console.log(`Ocorreu um erro de servidor ${error} `);
    res.status(500).json({
      error: true,
      message: `Ocorreu um erro de servidor ${error} `,
    });
  }
});

router.get("/nome/:nome", async (req: Request, res: Response) => {
  try {
    const { nome } = req.params;
    const tagFound = await getTagByName(nome);

    if (!tagFound) {
      res.status(404).json({
        error: true,
        message: "Nenhuma tag foi encontrada",
      });
      return;
    }

    res.status(200).json({
      error: false,
      message: "Tag encontrada",
      data: tagFound,
    });
  } catch (error) {
    console.log(`Ocorreu um erro de servidor ${error} `);
    res.status(500).json({
      error: true,
      message: `Ocorreu um erro de servidor ${error} `,
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const { nome } = req.body;

    const result = await createTag(nome);

    if (result.error) {
      res.status(Number(result.httpError)).json({
        error: true,
        message: result.message,
      });
      return;
    }

    res.status(201).json(result);
  } catch (error) {
    console.log(`Ocorreu um erro de servidor ${error} `);
    res.status(500).json({
      error: true,
      message: `Ocorreu um erro de servidor ${error} `,
    });
  }
});

router.put("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { nome } = req.body;

    const result = await updateTag({ id, nome });

    if (result.error) {
      res
        .status(Number(result.httpError))
        .json({ error: true, message: result.message });
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(`Ocorreu um erro de servidor ${error} `);
    res.status(500).json({
      error: true,
      message: `Ocorreu um erro de servidor ${error} `,
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await deleteTag(Number(id));

    if (result.error) {
      res
        .status(Number(result.httpError))
        .json({ error: true, message: result.message });
      return;
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(`Ocorreu um erro de servidor ${error} `);
    res.status(500).json({
      error: true,
      message: `Ocorreu um erro de servidor ${error} `,
    });
  }
});

export default router;
