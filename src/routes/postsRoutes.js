import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o Multer para lidar com uploads de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js"; // Importa as funções controladoras para lidar com a lógica dos posts
import cors from "cors";

// Configuração do CORS
const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica o diretório para armazenar as imagens enviadas
    cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo por simplicidade
    cb(null, file.originalname); // Considere usar uma estratégia de geração de nomes únicos para produção
  }
});

// Cria uma instância do middleware Multer
const upload = multer({ storage: storage });

// Define as rotas usando o objeto Express app
const routes = (aplicacao) => {
  // Permite que o servidor interprete corpos de requisições no formato JSON
  aplicacao.use(express.json());
  aplicacao.use(cors(corsOptions))
  // Rota para recuperar uma lista de todos os posts
  aplicacao.get("/posts", listarPosts); // Chama a função controladora apropriada
  // Rota para criar um novo post
  aplicacao.post("/posts", postarNovoPost); // Chama a função controladora para criação de posts
  // Rota para upload de imagens (assumindo uma única imagem chamada "imagem")
  aplicacao.post("/upload", upload.single("imagem"), uploadImagem); // Chama a função controladora para processamento da imagem`
  // Rota para atualizar um post existente
  aplicacao.put("/upload/:id", atualizarNovoPost)
};

export default routes;