package sigup_web.persistence;

import java.lang.reflect.Method;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.Item;
import sigup_web.entidades.ItemMontado;
import sigup_web.entidades.ItemPeca;
import sigup_web.entidades.ItemTarefa;
import sigup_web.entidades.Peca;
import sigup_web.entidades.PecaCompra;
import sigup_web.entidades.Tarefa;
import sigup_web.util.ConexaoBanco;
import sigup_web.util.GenericPersistence;

public class ItemPersistence extends GenericPersistence {

	EntityManager entityManager;

	public ItemPersistence() {
		super();
	}
	
	
	public void criarItem(Item item){
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			entityManager.persist(item);
			for(ItemPeca itemPeca : item.getItemPeca()){
				entityManager.persist(itemPeca);
			}
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
		} finally {
			entityManager.close();
		}
	}
	
	public void montarItens(ItemMontado itemMontado){
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			entityManager.persist(itemMontado);
			
			itemMontado.getItem().setEstoque(itemMontado.getItem().getEstoque() + itemMontado.getQuantidade());	
			entityManager.merge(itemMontado.getItem());
			
			int i;
			
				for(ItemPeca itemPeca : itemMontado.getItem().getItemPeca()){
					Peca peca = (Peca) super.buscarPorId(Peca.class, itemPeca.getPeca().getId());
					for(i=0; i < itemMontado.getQuantidade(); i++){
						peca.setEstoque(peca.getEstoque() - itemPeca.getQuantidade());
					}
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
	
	public void alterarItem(Item item){
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			
			for(ItemPeca itemPeca : item.getItemPeca()){
				if(itemPeca.getId() == null)
					entityManager.persist(itemPeca);
				else
					entityManager.merge(itemPeca);
			}
			
			entityManager.merge(item);
				
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
		} finally {
			entityManager.close();
		}
	}
	
	public void excluirItem(Item item){
		try {
			entityManager = ConexaoBanco.getConexao().getEm();
			entityManager.getTransaction().begin();
			
			for(ItemPeca itemPeca : item.getItemPeca()){
				entityManager.remove(entityManager.merge(itemPeca));
			}
			
			entityManager.remove(entityManager.merge(item));
			entityManager.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
			entityManager.getTransaction().rollback();
		} finally {
			entityManager.close();
		}
	}
	

}
