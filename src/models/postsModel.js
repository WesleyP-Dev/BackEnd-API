import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js"
// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para buscar todos os posts do banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados "imersao-instabytes"
    const db = conexao.db("Insta-lyne");
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}
//função para criar Post, fazendo a inserção de um novo documento na coleção "posts" do banco de dados
export async function criarPost(novoPost) {
    const db = conexao.db("Insta-lyne");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}
// Função para fazer upload de imagem, fazendo a atualização de um documento específico na coleção "posts" do banco de dados
export async function atualizarPost(id, novoPost) {
    const db = conexao.db("Insta-lyne");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}