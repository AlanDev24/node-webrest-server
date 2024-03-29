import { prisma } from "../../data/postgres";
import {
  CreateTodoDTO,
  TodoDatasource,
  TodoEntity,
  UpdateTodoDTO,
} from "../../domain";

export class TodoDatSourceImpl implements TodoDatasource {
  async create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDTO!,
    });

    return TodoEntity.fromObject(todo);
  }
  async getAll(): Promise<TodoEntity[]> {
    const todosFromDB = await prisma.todo.findMany();

    return todosFromDB.map((todo) => TodoEntity.fromObject(todo));
  }

  async findById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({
      where: {
        id: id,
      },
    });

    if (!todo) throw "Todo with id " + id + " not found";
    return TodoEntity.fromObject(todo);
  }
  async updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
    await this.findById(updateTodoDTO.id);

    const updatedTodo = await prisma.todo.update({
      where: {
        id: updateTodoDTO.id,
      },
      data: updateTodoDTO!.values,
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    await this.findById(id);
    const deleted = await prisma.todo.delete({
      where: {
        id: id,
      },
    });
    return TodoEntity.fromObject(deleted);
  }
}
