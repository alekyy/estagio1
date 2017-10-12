package sigup_web.persistence;

import java.lang.reflect.Method;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.ItemTarefa;
import sigup_web.entidades.Peca;
import sigup_web.entidades.PecaCompra;
import sigup_web.entidades.Tarefa;
import sigup_web.util.ConexaoBanco;
import sigup_web.util.GenericPersistence;

public class CompraPersistence extends GenericPersistence {

	EntityManager entityManager;

	public CompraPersistence() {
		super();
	}
	
	
	public void gerarContas(Compra compra, ContasPagar conta){
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			entityManager.persist(compra);
			conta.setCompra(compra);
			entityManager.persist(conta);
			for(PecaCompra pecaCompra : compra.getPecaCompra()){
				pecaCompra.getPeca().setEstoque(pecaCompra.getPeca().getEstoque() + pecaCompra.getQuantidade());
				entityManager.merge(pecaCompra.getPeca());
				entityManager.persist(pecaCompra);
			}
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
		} finally {
			entityManager.close();
		}
	}
	

}
