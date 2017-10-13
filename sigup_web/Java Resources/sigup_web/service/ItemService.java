package sigup_web.service;

import java.util.Date;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.Item;
import sigup_web.entidades.ItemPeca;
import sigup_web.entidades.Peca;
import sigup_web.persistence.CompraPersistence;

public class ItemService
{
	CompraPersistence persistence = new CompraPersistence();

	public ItemService() 
	{
		super();
	}
	
	public void gerarValorItem(Item item) throws Exception{
		if(item.getItemPecas() != null){
			item.setValor(0.0);
			for(ItemPeca itemPeca : item.getItemPecas()){
				item.setValor(item.getValor() + (itemPeca.getPeca().getValor() * itemPeca.getQuantidade()));
			}
			item.setValor(item.getValor() * 1.2);
		}
		
			persistence.inserir(item);
	}

}


