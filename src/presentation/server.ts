import express from "express";
import path from "path";

interface Options {
  port: number;
  public_path?: string;
}

export class Server {
  private app = express();
  private readonly port: Number;
  private readonly publiPath: string;

constructor(options: Options) {
    const {port, public_path = 'public'} = options;
    this.port = port;
    this.publiPath = public_path;
}

  async start() {
    //*midleware
    // * Public folder
    this.app.use(express.static(this.publiPath));

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
