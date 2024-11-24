import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postControllers.js";

// Configurações para o CORS (Cross-Origin Resource Sharing)
// Permite que requisições de uma origem específica ("http://localhost:8000") acessem a API.
// O código define um objeto `corsOptions` com as configurações de origem e status de sucesso.
const corsOptions = {
  origin: "http://localhost:8000",
  optionsSucessStatus: 200
};

// Configurações para o armazenamento de imagens
// Define um objeto `storage` para o multer, que é a biblioteca utilizada para upload de arquivos.
// O `storage` configura o destino ("uploads/") e o nome do arquivo (mantém o nome original).
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

// Cria uma instância do multer com as configurações de armazenamento
const upload = multer({ storage }); // equivalente a upload({ dest: "./uploads" , storage})

// Define as rotas da API
const routes = (app) => {
  // Habilita o parsing de dados JSON enviados na requisição (middleware)
  app.use(express.json());

  // Habilita o CORS com as configurações definidas em corsOptions (middleware)
  app.use(cors(corsOptions));

  // Rota GET para listar todos os posts (delega a função listarPosts do postControllers.js)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (delega a função postarNovoPost do postControllers.js)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware upload.single para tratar a imagem)
  // Delega a função uploadImagem do postControllers.js para realizar o upload e salvar o post.
  app.post("/upload", upload.single("Imagem"), uploadImagem);

  // Rota PUT para atualizar um post existente (recebe o ID do post na URL)
  // Delega a função atualizarNovoPost do postControllers.js para atualizar o post.
  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função routes para ser utilizada em outro arquivo
export default routes;