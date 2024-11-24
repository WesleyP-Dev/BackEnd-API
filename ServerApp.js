import express from "express";
import routes from "./src/routes/postsRoutes.js";

// Cria uma instância do Express, e inicia o servidor na porta 6500
const app = express();
app.use(express.static('uploads'));

routes(app);

app.listen(6500, () => {
    console.log("Servidor escutando...");
});