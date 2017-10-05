package sigup_web.service;

import java.util.Date;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.Ordem;
import sigup_web.entidades.Peca;
import sigup_web.entidades.Status;
import sigup_web.persistence.CompraPersistence;
import sigup_web.util.GenericPersistence;

public class OrdemService
{
	GenericPersistence persistence = new GenericPersistence();

	public OrdemService() 
	{
		super();
	}
	
	public void criarOrdem(Ordem ordem){
		ordem.setDataCriacao(new Date());
		ordem.setStatus(Status.ABERTO);
		
		persistence.inserir(ordem);
	}

}


