package sigup_web.util;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.hibernate.ejb.EntityManagerImpl;
import org.hibernate.internal.SessionFactoryImpl;

public class ConexaoBanco {
	
	private static EntityManagerFactory factory;
	
	private static ConexaoBanco conexao;

	public synchronized static ConexaoBanco getConexao() {
		if (conexao == null) {
			conexao = new ConexaoBanco();
		}
		return conexao;
	}

	public EntityManager getEm() 
	{
		if(factory == null)
			factory = Persistence.createEntityManagerFactory("sigup");
		
		return factory.createEntityManager();
	}

	public Connection getConnection() {
		EntityManager manager = getEm();
		EntityManagerImpl factory = (EntityManagerImpl) manager;
		SessionFactoryImpl sessionFactoryImpl = (SessionFactoryImpl) factory.getSession().getSessionFactory();
		try 
		{
			return sessionFactoryImpl.getConnectionProvider().getConnection();
		} catch (SQLException ex) {
			Logger.getLogger(ConexaoBanco.class.getName()).log(Level.SEVERE, null, ex);
		}
		return null;
	}

}
