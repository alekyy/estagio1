package sigup_web.service;

import java.util.Date;
import java.util.List;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.Item;
import sigup_web.entidades.ItemMontado;
import sigup_web.entidades.ItemPeca;
import sigup_web.entidades.ItemTarefa;
import sigup_web.entidades.Peca;
import sigup_web.entidades.PecaCompra;
import sigup_web.persistence.CompraPersistence;
import sigup_web.persistence.ItemPersistence;

public class ItemService
{
	ItemPersistence persistence = new ItemPersistence();

	public ItemService() 
	{
		super();
	}
	
	public void gerarValorItem(Item item, boolean novo) throws Exception{
		
		if(item.getItemPeca() != null){
			item.setValor(0.0);
			for(ItemPeca itemPeca : item.getItemPeca()){
				item.setValor(item.getValor() + (itemPeca.getPeca().getValor() * itemPeca.getQuantidade()));
			}
			item.setValor(item.getValor() * 1.2);
		}
		
			if(novo)
				persistence.criarItem(item);
			else
				persistence.alterarItem(item);
	}
	
	Integer itensPossiveis = 0;
	Boolean continuar = true;
	
	public Integer verificarItensDisponiveisParaMontagem(Item item) throws Exception{
		do {
			
			for(ItemPeca itemPeca : item.getItemPeca()){
				if(itemPeca.getPeca().getEstoque() >= itemPeca.getQuantidade()){
					itemPeca.getPeca().setEstoque(itemPeca.getPeca().getEstoque() - itemPeca.getQuantidade());
				}else
					continuar = false;
			}
			
			if(continuar)
				itensPossiveis++;
			
		} while (continuar);
		
		return itensPossiveis;

	}
	
	public void montarItens(ItemMontado itemMontado) throws Exception{
		if(verificarItensDisponiveisParaMontagem(itemMontado.getItem()) >= itemMontado.getQuantidade()){
			itemMontado.setDataMontagem(new Date());
			persistence.montarItens(itemMontado);
		}else
			throw new WebApplicationException(500);
			
	}
	
	public Response excluirItem(Integer iditem) throws Exception{
		Item item = (Item) persistence.buscarPorId(Item.class, iditem);
		
		if(item.getEstoque() > 0)
			return Response.status(401).entity("Não é possivel deletar um item possui estoque.").build();
		else{
		
				List<ItemMontado> itemMontado = persistence.listarComCondicao(ItemMontado.class, "idItem = " + item.getId());
				if(itemMontado.size() > 0)
					return Response.status(401).entity("Não é possivel deletar um item com registros de Montagem.").build();
				else{
					List<ItemTarefa> itemTarefa = persistence.listarComCondicao(ItemTarefa.class, "idItem = " + item.getId());
					if(itemTarefa.size() > 0)
						return Response.status(401).entity("Não é possivel deletar um item com registros de Tarefas.").build();
					else{
						persistence.excluirItem(item);
						return Response.status(200).entity("Item excluido com sucesso.").build();
					}
			
			}
		}
	}
	

}


