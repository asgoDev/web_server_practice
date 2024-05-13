import express from "express";
import path from "path";

export const startServer = (options) => {
  const { port, public_path = "public" } = options;

  const app = express();

  //Para poder usar middleware se utiliza .use(), método propio de express.
  app.use(express.static(public_path)); // contenido estatico que ponemos disponible

  app.get("*", (req, res) => {
    const indexPath = path.join(__dirname + `../../../${public_path}`);
    res.sendFile(indexPath);
  });

  app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`);
  });
};
