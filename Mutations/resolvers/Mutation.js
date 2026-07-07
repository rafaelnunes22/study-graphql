const { usuarios, proximoId} = require("../data/db");


function indiceUsuario(filtro) {
    if(!filtro) {
        return -1;
    }

    const {id, email} = filtro;

    if(id ) {
        return usuarios.findIndex(item => item.id === filtro.id);
    }

    if(email) {
        return usuarios.findIndex(item => item.email === filtro.email);
    }

    return -1;

}

module.exports = {
    novoUsuario(_,{dados}) {

        const emailExistente = usuarios.some(item => item.email === dados.email);

        if(emailExistente) {
            throw new Error("E-mail já cadastrado.")
        }

        const novo = {
            id: proximoId,
            ...dados,
            perfil_id: 1,
            status: "ATIVO"
        }

        usuarios.push(novo);
        return novo;
    },
    excluirUsuario(_,{filtro}) {
        const indexUsuario = indiceUsuario(filtro);

        if(indexUsuario < 0) {
            throw new Error("Usuário inexistente.")
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