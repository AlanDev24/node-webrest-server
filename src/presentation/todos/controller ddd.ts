import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from '../../domain/repositories/todo.repository';

export class TodosController {
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos)
  };

  public getTodosById = async (req: Request, res: Response) => {
    const id = +req.params.id;

    try {
    const todo= await this.todoRepository.findById(id);
    res.json(todo);
    } catch (error) {
      res.status(400).json({error});
    }
  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
    if (error) return res.status(400).json({ error: error });

    const todo = await this.todoRepository.create(createTodoDTO!);
    res.json(todo);
  };

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const [error, updateTodoDTO] = UpdateTodoDTO.create({
      ...req.body,
      id,
    });

    if(error) return res.status(400).json({ error });

    const updatedTodo = await this.todoRepository.updateById(updateTodoDTO!);
    res.json(updatedTodo);
  };

  public deleteTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;

    const deletedTodo = await this.todoRepository.deleteById(id);
    res.json(deletedTodo);
  };
}
