import { MongoClient } from 'mongodb';

// Importa a classe MongoClient do pacote mongodb,
// responsável por gerenciar a conexão com o banco de dados.

export default async function conectarAoBanco(stringConexao) {
  // Função assíncrona para conectar ao banco de dados.
  // Recebe a string de conexão como parâmetro.

  let mongoClient;

  try {
    // Cria um novo cliente MongoDB com a string de conexão fornecida.
    mongoClient = new MongoClient(stringConexao);
    // Exibe uma mensagem no console indicando que a conexão está sendo estabelecida.
    console.log('Conectando ao cluster do banco de dados...');
    // Tenta estabelecer a conexão com o banco de dados.
    // O await garante que a próxima linha seja executada após a conexão ser estabelecida.
    await mongoClient.connect();
    // Exibe uma mensagem de sucesso caso a conexão seja estabelecida.
    console.log('Conectado ao MongoDB Atlas com sucesso!');

    // Retorna o cliente MongoDB para que possa ser utilizado em outras partes do código.
    return mongoClient;
  } catch (erro) {
    // Captura qualquer erro que possa ocorrer durante a conexão.
    // Exibe uma mensagem de erro no console e encerra o processo.
    console.error('Falha na conexão com o banco!', erro);
    process.exit();
  }
}