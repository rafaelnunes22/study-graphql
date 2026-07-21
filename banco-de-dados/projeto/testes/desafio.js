const db = require("../config/db.js");


async function salvarUsuario(nome, email, senha){
    // se passar um email que nao exite ele cria
    // se existir ele edita
    const usuario = await db("usuarios").where({email}).first();

    if(!usuario) {
        await db("usuarios").insert({nome,email,senha});
        return await db("usuarios").where({email}).first();
    }

    await db("usuarios").update({nome, email, senha}).where({email});
    
    return await db("usuarios").where({email}).first();
}
async function salvarPerfil(nome, rotulo){
    // mesmo do de cima
    const perfil = await db("perfis").where({nome}).first();

    if (!perfil) {
        await db("perfis").insert({nome, rotulo});
        return await db("perfis").where({nome}).first();
    }

    await db("perfis").update({nome, rotulo}).where({nome});

    return await db("perfis").where({nome}).first();

    
}
async function adicionarPerfis(usuario, ...perfis){
    // associar um determinado usuario a um conjunto de perfis passados
    // for (perfil of perfis)
}
async function executar(){
    const usuario = await salvarUsuario("Ana", "ana@empresa3.com.br", "123456")
    const perfilA = await salvarPerfil("rg3", "Pessoal3")
    const perfilB = await salvarPerfil("fin", "Financeiro")

    console.log(usuario)
    console.log(perfilA)
    console.log(perfilB)

    // await adicionarPerfis(usuario, perfilA, perfilB);
}

executar()
.catch(err => console.log(err))
.finally(() => db.destroy());