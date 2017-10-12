package sigup_web.service;

import java.util.Date;
import java.util.List;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.ItemTarefa;
import sigup_web.entidades.Peca;
import sigup_web.entidades.PecaCompra;
import sigup_web.entidades.Tarefa;
import sigup_web.persistence.CompraPersistence;

public class CompraService
{
	CompraPersistence persistence = new CompraPersistence();

	public CompraService() 
	{
		super();
	}
	
	public void verificarCompra(Compra compra) throws Exception{
		Double valor = 0.0;
		for(PecaCompra pecaCompra : compra.getPecaCompra()){
			valor += pecaCompra.getPeca().getValor() * pecaCompra.getQuantidade();
		}	
		compra.setDataCompra(new Date());
		compra.setValor(valor);
		gerarContasPagar(compra);
	}
	
	private void gerarContasPagar(Compra compra) throws Exception{
		ContasPagar conta = new ContasPagar();
		conta.setDataLancamento(compra.getDataCompra());
		conta.setValor(compra.getValor());
		
		persistence.gerarContas(compra, conta);
	}


}


