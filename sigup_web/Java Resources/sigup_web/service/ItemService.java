package sigup_web.service;

import java.util.Date;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.Item;
import sigup_web.entidades.Peca;
import sigup_web.persistence.CompraPersistence;

public class ItemService
{
	CompraPersistence persistence = new CompraPersistence();

	public ItemService() 
	{
		super();
	}
	
	public void gerarValorItem(Item item, Boolean novoItem) throws Exception{
		if(item.getPecas() != null){
			for(Peca peca : item.getPecas()){
				item.setValor(0.0);
				item.setValor(item.getValor() + peca.getValor());
			}
			item.setValor(item.getValor() * 1.2);
		}
		
		if(novoItem)
			persistence.inserir(item);
		else
			persistence.alterar(item);
	}

}


