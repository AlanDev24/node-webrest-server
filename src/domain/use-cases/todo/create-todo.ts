import { CreateTodoDTO } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

export interface CreateTodoUsecase{
    execute(dto: CreateTodoDTO):Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUsecase {

    constructor(
        private readonly repository:TodoRepository
    ){};


    execute(dto: CreateTodoDTO): Promise<TodoEntity> {
        return this.repository.create(dto);
    }

}