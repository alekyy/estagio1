package sigup_web.util;

import java.lang.reflect.Method;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

public class GenericPersistence {
	
	EntityManager entityManager;

	public GenericPersistence() {
	}

	public Object buscarPorId(Class classe, Integer id) {
		Object retornando = null;
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			retornando = entityManager.find(classe, id);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			entityManager.close();
		}
		return retornando;
	}

	public Object inserir(Object obj) {
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			entityManager.persist(obj);
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
		} finally {
			entityManager.close();
		}
        return obj;
    }

	public void alterar(Object objeto) {
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			entityManager.merge(objeto);
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			entityManager.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			entityManager.close();
		}
		
	}

	public List listar(Class classe) {
		Query query = null;
		List<Object> result = null;
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			query = entityManager.createQuery("from " + classe.getSimpleName());
			result = query.getResultList();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			entityManager.close();
		}
		return result;
	}

	public List listarComOrdenacao(Class classe, String nomeColuna) {
		Query query = null;
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			query = entityManager.createQuery("from " + classe.getSimpleName() + " order by " + nomeColuna);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			entityManager.close();
		}
		return query.getResultList();
	}

	public List listarComCondicao(Class classe, String condicao) {
		Query query = null;
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			query = entityManager.createQuery("from " + classe.getSimpleName() + " where " + condicao);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			entityManager.close();
		}
		return query.getResultList();
	}
	
    public void excluir(Object objeto) {
        try {
        	entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
            Method getChave = objeto.getClass().getMethod("getId", new Class[0]);
            objeto = entityManager.find(objeto.getClass(), getChave.invoke(objeto, new Object[0]));
            entityManager.remove(objeto);
            entityManager.getTransaction().commit();
            
        } catch (Exception e) {
            e.printStackTrace();
            entityManager.getTransaction().rollback();
        } finally {
			entityManager.close();
		}
    }

}
