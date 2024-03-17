import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDTO } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from '../../domain/repositories/todo.repository';
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, UpdateTodo } from "../../domain";

export class TodosController {
  constructor(
    private readonly todoRepository: TodoRepository
  ) {}

  public getTodos = (req: Request, res: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then(todos => res.json(todos))
      .catch(err => res.status(400).json([err]))
  };

  public getTodosById =  (req: Request, res: Response) => {
    const id = +req.params.id;

    new GetTodo(this.todoRepository)
      .execute(id)
      .then(todo => res.json( todo ))
      .catch(err => res.status(400).json([err]))

  };

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
    if (error) return res.status(400).json({ error: error });

    new CreateTodo(this.todoRepository)
      .execute(createTodoDTO!)
      .then(todo =>  res.json(todo))
      .catch(error => res.status(400).json({ error}))
  };

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    const [error, updateTodoDTO] = UpdateTodoDTO.create({
      ...req.body,
      id,
    });

    if(error) return res.status(400).json({ error });

    new UpdateTodo(this.todoRepository)
    .execute(updateTodoDTO!)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({ error}))
  };

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id;

    new DeleteTodo(this.todoRepository)
    .execute(id)
    .then(todo => res.json(todo))
    .catch(error => res.status(400).json({ error}))
  };
}
