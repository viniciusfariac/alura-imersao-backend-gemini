import { getTodosPosts, criarPost, atualizarPost } from "../models/postsModels.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiServices.js";

// Função assíncrona para listar todos os posts.
// Chama a função getTodosPosts do modelo para buscar os posts e retorna os dados em formato JSON.
export async function listarPosts(req, res) {
  const posts = await getTodosPosts();
  res.status(200).json(posts);
}

// Função assíncrona para criar um novo post.
// Extrai os dados do novo post da requisição e chama a função criarPost do modelo.
// Retorna o post criado ou um erro caso ocorra alguma falha.
export async function postarNovoPost(req, res) {
  const novoPost = req.body;
  try {
    const postCriado = await criarPost(novoPost);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}

// Função assíncrona para fazer upload de uma imagem e criar um novo post.
// Cria um novo objeto de post com a descrição gerada pelo serviço Gemini e salva a imagem.
// Chama a função criarPost do modelo para inserir o novo post no banco de dados.
export async function uploadImagem(req, res) {
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname,
    alt: ""
  };
  try {
    // Cria o post com descrição vazia inicialmente
    const postCriado = await criarPost(novoPost);
    // Renomeia o arquivo da imagem para usar o ID do post
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    fs.renameSync(req.file.path, imagemAtualizada);
    // Retorna o post criado
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}

// Função assíncrona para atualizar um post existente.
// Busca a imagem, gera uma descrição usando o serviço Gemini e atualiza o post no banco de dados.
export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;
  try {
    // Lê a imagem do sistema de arquivos
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    // Gera a descrição da imagem usando o serviço Gemini
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    // Cria um objeto com os novos dados do post
    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt
    };

    // Chama a função atualizarPost do modelo para atualizar o post no banco de dados
    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ "Erro": "Falha na requisição" });
  }
}