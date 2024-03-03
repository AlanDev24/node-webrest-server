import express, { Router } from "express";
import path from "path";

interface Options {
  port: number;
  routes: Router
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: Number;
  private readonly publiPath: string;
  private readonly routes: Router

constructor(options: Options) {
    const {port, public_path = 'public', routes} = options;

    this.port = port;
    this.publiPath = public_path;
    this.routes = routes;
}

  async start() {
    //*midleware
    this.app.use(express.json());
    this.app.use(express.urlencoded({extended: true}));

    // * Public folder
    this.app.use(express.static(this.publiPath));

    //* Routes
    this.app.use( this.routes );

    //* SPA
    this.app.get("*", (req, res) => {
      const indexPath = path.join(__dirname + `../../../${this.publiPath}/index.html`);
      res.sendFile(indexPath);
      return;
    });

    this.app.listen(3000, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
