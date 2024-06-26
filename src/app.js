const { envs } = require("./config/env.js");
const { startServer } = require("./server/server.js");

const main = () => {
  startServer({
    port: envs.PORT,
    public_path: envs.PUBLIC_PATH,
  });
};

// Funcion agnostica autoconvocada.
//agnostica porque no tiene nombre
// autoconvocada porque se ejecuta de una vez con los parentesis
(async () => {
  main();
})();
