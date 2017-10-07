package sigup_web.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.Ordem;
import sigup_web.entidades.Servico;
import sigup_web.entidades.Peca;
import sigup_web.entidades.Status;
import sigup_web.entidades.Tarefa;
import sigup_web.persistence.CompraPersistence;
import sigup_web.persistence.ServicoPersistence;
import sigup_web.util.GenericPersistence;

public class ServicoService
{
	ServicoPersistence persistence = new ServicoPersistence();

	public ServicoService() 
	{
		super();
	}
	
	public void criarServico(Servico servico){
		servico.setDataInicio(new Date());
		servico.setStatus(Status.ABERTO);
		
		servico.getOrdem().setStatus(Status.EM_PROGRESSO);
		
		persistence.criarServico(servico, servico.getOrdem());
	}
	
	public void excluirOrdem(Servico servico) throws Exception{
		List<Tarefa> tarefas = tarefas = persistence.listarComCondicao(Tarefa.class, "servico.id = " + servico.getId());
		
		persistence.excluirServico(servico, tarefas);
		
	}

}


