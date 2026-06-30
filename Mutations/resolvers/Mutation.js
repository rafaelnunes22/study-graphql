const { usuarios, proximoId} = require("../data/db");

module.exports = {
    novoUsuario(_,args) {

        const emailExistente = usuarios.some(item => item.email === args.email);

        if(emailExistente) {
            throw new Error("E-mail já cadastrado.")
        }

        const novo = {
            id: proximoId,
            ...args,
            perfil_id: 1,
            status: "ATIVO"
        }

        usuarios.push(novo);
        return novo;
    }
}