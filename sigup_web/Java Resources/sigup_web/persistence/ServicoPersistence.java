package sigup_web.persistence;

import java.lang.reflect.Method;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.Ordem;
import sigup_web.entidades.Peca;
import sigup_web.entidades.Servico;
import sigup_web.entidades.Tarefa;
import sigup_web.util.ConexaoBanco;
import sigup_web.util.GenericPersistence;

public class ServicoPersistence extends GenericPersistence {

	EntityManager entityManager;

	public ServicoPersistence() {
		super();
	}
	
	
	public void criarServico(Servico servico, Ordem ordem){
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			entityManager.persist(servico);
			entityManager.merge(ordem);
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
		} finally {
			entityManager.close();
		}
	}
	
	public void excluirServico(Object objeto, List<Tarefa> tarefas) {
        try {
        	entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			
			if(tarefas.size() > 0){
				for(Tarefa tarefa : tarefas)
					entityManager.remove(entityManager.merge(tarefa));
			}
			
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
