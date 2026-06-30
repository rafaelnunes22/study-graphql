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
    },
    excluirUsuario(_,{id}) {
        const indexUsuario = usuarios.findIndex(item => item.id === id);

        if(indexUsuario < 0) {
            throw new Error("Id inexistente.")
        }

        const usuarioExcluido = usuarios.splice(indexUsuario,1);

        return usuarioExcluido[0];
    },
    alterarUsuario(_, args) {
        const indexUsuario = usuarios.findIndex(item => item.id === args.id);

        if(!indexUsuario) {
            throw new Error("Id inexistente.")
        }

        const usuarioAlterado = {...usuarios[indexUsuario], ...args};

        usuarios.splice(indexUsuario, 1, usuarioAlterado);

        return usuarioAlterado;

    }
}