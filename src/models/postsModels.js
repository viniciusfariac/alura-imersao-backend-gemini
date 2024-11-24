import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Estabelece a conexão com o banco de dados MongoDB usando a string de conexão obtida da variável de ambiente.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts da coleção 'posts'.
export async function getTodosPosts() {
  // Obtém uma referência ao banco de dados 'imersao-instabytes' e à coleção 'posts'.
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");

  // Encontra todos os documentos na coleção e retorna como um array.
  return colecao.find().toArray();
}

// Função assíncrona para criar um novo post na coleção 'posts'.
export async function criarPost(novoPost) {
  // Obtém uma referência ao banco de dados 'imersao-instabytes' e à coleção 'posts'.
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");

  // Insere o novo post na coleção e retorna o resultado da inserção.
  return colecao.insertOne(novoPost);
}

// Função assíncrona para atualizar um post existente na coleção 'posts'.
export async function atualizarPost(id, novoPost) {
  // Obtém uma referência ao banco de dados 'imersao-instabytes' e à coleção 'posts'.
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");

  // Converte o ID fornecido em uma string hexadecimal para um objeto ObjectId do MongoDB.
  const objID = ObjectId.createFromHexString(id);

  // Atualiza o post com o ID especificado, definindo os novos valores.
  // O operador $set é usado para atualizar os campos do post com os valores do objeto novoPost.
  return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}