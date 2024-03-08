import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../domain/dtos/todos/update-todo.dto";

export class TodosController {
  constructor() {}

  public getTodos = async (req: Request, res: Response) => {
    const todosFromDB = await prisma.todo.findMany();

    return res.json(todosFromDB);
  };

  public getTodosById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    return res.json(todo);
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
    if (error) return res.status(400).json({ error: error });

    const todo = await prisma.todo.create({
      data: createTodoDTO!,
    });

    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const [error, updateTodoDTO] = UpdateTodoDTO.create({
      ...req.body,
      id,
    });

    if(error) return res.status(400).json({ error });

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo)
      return res.status(404).json({ error: `TODO NOT FOUND with id ${id}` });

    await prisma.todo.update({
      where: {
        id: id,
      },
      data: updateTodoDTO!.values
    });

    res.json(updateTodoDTO);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    if (isNaN(id))
      return res.status(400).json({ error: "ID argument is not a number" });

    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo)
      return res.status(404).json({ error: `TODO NOT FOUND with id ${id}` });

    await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    res.json(`TODO DELETED SUCCESSFULLY with id ${{ id }}`);
  };
}
