package sigup_web.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.ItemTarefa;
import sigup_web.entidades.Ordem;
import sigup_web.entidades.Servico;
import sigup_web.entidades.Peca;
import sigup_web.entidades.Status;
import sigup_web.entidades.Tarefa;
import sigup_web.persistence.CompraPersistence;
import sigup_web.persistence.ServicoPersistence;
import sigup_web.persistence.TarefaPersistence;
import sigup_web.util.GenericPersistence;

public class TarefaService
{
	TarefaPersistence persistence = new TarefaPersistence();

	public TarefaService() 
	{
		super();
	}
	
	public void criarTarefa(Tarefa tarefa) throws Exception{
		tarefa.setDataInicio(new Date());
		tarefa.setStatus(Status.ABERTO);
		
		Servico servico = (Servico) persistence.buscarPorId(Servico.class, tarefa.getServico().getId());
		servico.setStatus(Status.EM_PROGRESSO);
		
		persistence.criarTarefa(tarefa, servico);
	}
	
}


