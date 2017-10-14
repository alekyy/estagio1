package sigup_web.persistence;

import java.lang.reflect.Method;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.Item;
import sigup_web.entidades.ItemPeca;
import sigup_web.entidades.ItemTarefa;
import sigup_web.entidades.Ordem;
import sigup_web.entidades.Peca;
import sigup_web.entidades.Servico;
import sigup_web.entidades.Tarefa;
import sigup_web.util.ConexaoBanco;
import sigup_web.util.GenericPersistence;

public class TarefaPersistence extends GenericPersistence {

	EntityManager entityManager;

	public TarefaPersistence() {
		super();
	}
	
	
	public void criarTarefa(Tarefa tarefa, Servico servico){
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			entityManager.persist(tarefa);
			if(tarefa.getItemTarefa().size() > 0){
				for(ItemTarefa itemTarefa : tarefa.getItemTarefa())
					entityManager.persist(itemTarefa);
			}
			entityManager.merge(servico);
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
		} finally {
			entityManager.close();
		}
	}
	
	public void excluirTarefa(Tarefa tarefa) {
        try {
        	entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			
			if(tarefa.getItemTarefa().size() > 0){
				for(ItemTarefa itemTarefa : tarefa.getItemTarefa())
					entityManager.remove(entityManager.merge(itemTarefa));
			}
			
			entityManager.remove(entityManager.merge(tarefa));
            entityManager.getTransaction().commit();     
        } catch (Exception e) {
            e.printStackTrace();
            entityManager.getTransaction().rollback();
        } finally {
			entityManager.close();
		}
    }
	
	public void alterarTarefa(Tarefa tarefa){
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			
			for(ItemTarefa itemTarefa : tarefa.getItemTarefa()){
				if(itemTarefa.getId() == null)
					entityManager.persist(itemTarefa);
				else
					entityManager.merge(itemTarefa);
			}
			
			entityManager.merge(tarefa);
				
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
		} finally {
			entityManager.close();
		}
	}

}
