package sigup_web.persistence;

import java.lang.reflect.Method;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.Peca;
import sigup_web.util.ConexaoBanco;
import sigup_web.util.GenericPersistence;

public class CompraPersistence extends GenericPersistence {

	EntityManager entityManager;

	public CompraPersistence() {
		super();
	}
	
	
	public void gerarContas(Compra compra, ContasPagar conta, Peca peca){
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			entityManager.persist(compra);
			conta.setCompra(compra);
			entityManager.persist(conta);
			if(peca.getEstoque() != null){
				peca.setEstoque(peca.getEstoque() + compra.getQuantidade());
				entityManager.merge(peca);
			}
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
		} finally {
			entityManager.close();
		}
	}
	
	public void alterarContas(Compra compra, ContasPagar conta, Peca peca, Integer quantidadeAntigaPecas){
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			entityManager.merge(compra);
			entityManager.merge(conta);
			if(peca.getEstoque() != null){
				peca.setEstoque((peca.getEstoque() - quantidadeAntigaPecas)+ compra.getQuantidade());
				entityManager.merge(peca);
			}
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			entityManager.getTransaction().rollback();
			e.printStackTrace();
		} finally {
			entityManager.close();
		}
	}

}
