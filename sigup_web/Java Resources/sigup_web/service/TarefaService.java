package sigup_web.service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.ws.rs.core.Response;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.ContasReceber;
import sigup_web.entidades.Item;
import sigup_web.entidades.ItemTarefa;
import sigup_web.entidades.Ordem;
import sigup_web.entidades.Servico;
import sigup_web.entidades.Peca;
import sigup_web.entidades.Status;
import sigup_web.entidades.Tarefa;
import sigup_web.entidades.TipoOrdem;
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
	
	public Response criarTarefa(Tarefa tarefa) throws Exception{
		if(tarefa.getItemTarefa().size() > 0){
			for(ItemTarefa itemTarefa : tarefa.getItemTarefa()){
				Item item = (Item) persistence.buscarPorId(Item.class, itemTarefa.getItem().getId());
				if(item.getEstoque() < itemTarefa.getQuantidade())
					return Response.status(401).entity("Não foi possível adicionar um ou mais itens na tarefa por falta em estoque.").build();
			}
		}
		
		tarefa.setDataInicio(new Date());
		tarefa.setStatus(Status.ABERTO);
		
		Servico servico = (Servico) persistence.buscarPorId(Servico.class, tarefa.getServico().getId());
		servico.setStatus(Status.EM_PROGRESSO);
		
		persistence.criarTarefa(tarefa, servico);
		return Response.status(200).entity("Tarefa criada com sucesso.").build();
	}
	
	public void editarTarefa(Tarefa tarefa) throws Exception{
		persistence.alterarTarefa(tarefa);
		
		List<Tarefa> tarefas = persistence.listarComCondicao(Tarefa.class, "servico.id = " + tarefa.getServico().getId());
		Boolean tarefasConcluidas = true;
		
		for(Tarefa t : tarefas){
			if(!t.getStatus().equals(Status.FINALIZADO))
				tarefasConcluidas = false;
		}
		
		if(tarefasConcluidas){
			Servico servico = (Servico) persistence.buscarPorId(Servico.class, tarefa.getServico().getId());
			Ordem ordem = (Ordem) persistence.buscarPorId(Ordem.class, servico.getOrdem().getId());
			
			servico.setDataTermino(new Date());
			ordem.setDataFinalizacao(new Date());
			servico.setStatus(Status.FINALIZADO);
			ordem.setStatus(Status.FINALIZADO);
			
			if(ordem.getTipoOrdem().equals(TipoOrdem.PROJETO)){
				ContasReceber contasReceber = new ContasReceber();
				
				contasReceber.setDataLancamento(new Date());
				Calendar cal = Calendar.getInstance();
				cal.add(Calendar.MONTH, 1);
				contasReceber.setDataVencimento(cal.getTime());
				contasReceber.setServico(servico);
				contasReceber.setValor(0.0);
				
				for(Tarefa t : tarefas){
					contasReceber.setValor(contasReceber.getValor() + t.getCusto());
					if(t.getItemTarefa().size() > 0){
						for(ItemTarefa itemTarefa : t.getItemTarefa()){
							if(!itemTarefa.isGarantia())
							contasReceber.setValor(contasReceber.getValor() + (itemTarefa.getItem().getValor() * itemTarefa.getQuantidade()));
						}
					}
				}
				persistence.finalizacao(ordem, servico, contasReceber);
			}else
				persistence.finalizacao(ordem, servico, null);
			
		}
	}
	
}


