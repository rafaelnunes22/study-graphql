const db = require('../config/db.js');

const novoUsuario = {
    nome: "Pedro",
    email: "pedro@empresa.com.br",
    senha: "12345678"
}

async function exercicio() {
    const {qtde} = await db('usuarios').count("* as qtde").first()

    console.log(qtde)

    //insere (se a tabela estiver vazia)
    if (qtde === 0) {
        await db.insert(novoUsuario).into("usuarios");
    }

    // consultar
    let {id} = await db('usuarios').select('id').limit(1).first();

    // alterar
    await db('usuarios').where({id})
    .update({nome: 'Pedro Garcia', email: 'pedro.garcia@empresa.com.br'});

    return await db('usuarios').where({id});
}

exercicio()
    .then((usuario) => console.log(usuario))
    .finally(() => db.destroy())
