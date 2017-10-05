package sigup_web.service;

import java.util.Date;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.Peca;
import sigup_web.persistence.CompraPersistence;

public class CompraService
{
	CompraPersistence persistence = new CompraPersistence();

	public CompraService() 
	{
		super();
	}
	
	public void verificarCompra(Compra compra, Boolean novaCompra) throws Exception{
		Peca peca = new Peca();
		if(compra.getDescricao() != null)
			compra.setDataCompra(new Date());
		else{
			peca = (Peca) persistence.buscarPorId(Peca.class, compra.getPeca().getId());
			compra.setValor(peca.getValor() * compra.getQuantidade());
			compra.setDataCompra(new Date());
		}
		
		if(novaCompra)
			gerarContasPagar(compra, peca);
		else
			alterarContasPagar(compra, peca);
	}
	
	private void gerarContasPagar(Compra compra, Peca peca) throws Exception{
		ContasPagar conta = new ContasPagar();
		conta.setDataLancamento(compra.getDataCompra());
		conta.setValor(compra.getValor());
		
		persistence.gerarContas(compra, conta, peca);
	}
	
	private void alterarContasPagar(Compra compra, Peca peca) throws Exception{
		Integer quantidadeAntigaPecas = 0;
		ContasPagar conta = (ContasPagar) persistence.listarComCondicao(ContasPagar.class, "compra.id = " + compra.getId()).iterator().next();
		
		if(compra.getPeca() != null){
			Compra compraAntiga = (Compra) persistence.listarComCondicao(Compra.class, "id = " + compra.getId()).iterator().next();
			quantidadeAntigaPecas = compraAntiga.getQuantidade();
		}
		
		conta.setDataLancamento(compra.getDataCompra());
		conta.setValor(compra.getValor());
		
		persistence.alterarContas(compra, conta, peca, quantidadeAntigaPecas);
	}

}


