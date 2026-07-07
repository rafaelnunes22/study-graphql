const { perfis, usuarios, proximoPerfilId } = require("../../data/db");

module.exports = {
    novoPerfil(_, {dados}) {
        const perfil = { 
            id: proximoPerfilId(),
            nome: dados.nome
        }

        perfis.push(perfil);

        return perfil;
    },
    alterarPerfil(_, {filtro, dados}) {
        const { id } = filtro;

        const indexPerfil = perfis.findIndex((item) => id === item.id)

        if (indexPerfil < 0) {
            throw new Error("Perfil inexistente")
        }

        const perfilAlterado = {
            ...perfis[indexPerfil],
            ...dados
        }

        perfis.splice(indexPerfil,1,perfilAlterado);
        
        return perfilAlterado;

    },
    excluirPerfil(_, {filtro}) {
        const {id} = filtro;

        const indexPerfil = perfis.findIndex((item) => item.id === id);

        if (indexPerfil < 0) {
            throw new Error("Perfil inexistente");
        }

        const userUsingPerfil  = usuarios.find((item) => item.perfil_id === id);

        if (userUsingPerfil) {
            throw new Error(`O Perfil está sendo utilizado pelo usuário: ${userUsingPerfil.nome} de ID: ${userUsingPerfil.id}`)
        }

        const perfilExcluido = perfis[indexPerfil];

        perfis.splice(indexPerfil, 1);

        return perfilExcluido;
    }
}