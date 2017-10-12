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

public class OrdemPersistence extends GenericPersistence {

	EntityManager entityManager;

	public OrdemPersistence() {
		super();
	}
	
	
	public void excluirOrdem(Ordem ordem, Servico servico, List<Tarefa> tarefas) {
        try {
        	entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			
			if(tarefas.size() > 0){
				for(Tarefa tarefa : tarefas)
					entityManager.remove(entityManager.merge(tarefa));
			}
			
			entityManager.remove(entityManager.merge(servico));
			entityManager.remove(entityManager.merge(ordem));
            entityManager.getTransaction().commit();
            
        } catch (Exception e) {
            e.printStackTrace();
            entityManager.getTransaction().rollback();
        } finally {
			entityManager.close();
		}
    }

}
