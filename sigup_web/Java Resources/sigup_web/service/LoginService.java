package sigup_web.service;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import javax.ws.rs.WebApplicationException;

import org.hibernate.metamodel.source.annotations.entity.EntityClass;

import sigup_web.entidades.Cliente;
import sigup_web.entidades.Colaborador;
import sigup_web.entidades.Usuario;
import sigup_web.util.ConexaoBanco;
import sigup_web.util.GenericPersistence;

public class LoginService
{
	GenericPersistence persistence = new GenericPersistence();
	EntityManager entityManager;

	public LoginService() 
	{
		super();
	}
	
	public Object Autenticacao(Usuario usuario){
		Query query = null;
		Usuario resultado = new Usuario();
		entityManager = ConexaoBanco.getConexao().getEm();
		entityManager.getTransaction().begin();
		String sql = "from Usuario where login = '" + usuario.getLogin() + "' AND senha = '" + usuario.getSenha() + "'";
		query = entityManager.createQuery(sql);
			try {
				resultado = (Usuario) query.getSingleResult();
			} catch (NoResultException e) {
				throw new WebApplicationException(401);
			}
			if(resultado.getNivelAcesso().equals("CLIENTE")){
				return persistence.listarComCondicao(Cliente.class, "usuario.id = " + resultado.getId());
			}else{
				return persistence.listarComCondicao(Colaborador.class, "usuario.id = " + resultado.getId());
			}
		}

}


