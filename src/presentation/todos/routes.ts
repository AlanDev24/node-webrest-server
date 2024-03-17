import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatSourceImpl } from "../../infrastructure/datasource/todo.datasource.implementation";
import { TodoRepositoryImpl } from "../../infrastructure/repositiries/repository.todo.implementation";

export class TodoRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new TodoDatSourceImpl();
    const todoRepository = new TodoRepositoryImpl(datasource);

    const todoController = new TodosController(todoRepository);

    router.get("/",todoController.getTodos);
    router.get("/:id",todoController.getTodosById);

    router.post("/",todoController.createTodo);
    router.put("/:id",todoController.updateTodo);

    router.delete("/:id", todoController.deleteTodo)

    return router;
  }
}
