package sigup_web.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.Ordem;
import sigup_web.entidades.Peca;
import sigup_web.entidades.Servico;
import sigup_web.entidades.Status;
import sigup_web.entidades.Tarefa;
import sigup_web.persistence.CompraPersistence;
import sigup_web.persistence.OrdemPersistence;
import sigup_web.util.GenericPersistence;

public class OrdemService
{
	OrdemPersistence persistence = new OrdemPersistence();

	public OrdemService() 
	{
		super();
	}
	
	public void criarOrdem(Ordem ordem) throws Exception{
		ordem.setDataCriacao(new Date());
		ordem.setStatus(Status.ABERTO);
		
		persistence.inserir(ordem);
	}
	
	public void excluirOrdem(Ordem ordem) throws Exception{
		List<Servico> servicos = persistence.listarComCondicao(Servico.class, "ordem.id = " + ordem.getId());
		Servico servico = null;
		List<Tarefa> tarefas = new ArrayList<>();
		if(!servicos.isEmpty()){
			servico = servicos.iterator().next();
			
			tarefas = persistence.listarComCondicao(Tarefa.class, "servico.id = " + servico.getId());
		}
		
		persistence.excluirOrdem(ordem, servico, tarefas);
		
	}

}


