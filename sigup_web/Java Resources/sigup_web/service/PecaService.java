package sigup_web.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.ws.rs.core.Response;

import sigup_web.entidades.Compra;
import sigup_web.entidades.ContasPagar;
import sigup_web.entidades.ItemPeca;
import sigup_web.entidades.ItemTarefa;
import sigup_web.entidades.Ordem;
import sigup_web.entidades.Servico;
import sigup_web.entidades.Peca;
import sigup_web.entidades.PecaCompra;
import sigup_web.entidades.Status;
import sigup_web.entidades.Tarefa;
import sigup_web.persistence.CompraPersistence;
import sigup_web.persistence.ServicoPersistence;
import sigup_web.persistence.TarefaPersistence;
import sigup_web.util.GenericPersistence;

public class PecaService
{
	GenericPersistence persistence = new GenericPersistence();

	public PecaService() 
	{
		super();
	}
	
	public Response excluirPeca(Integer idpeca) throws Exception{
		Peca peca = (Peca) persistence.buscarPorId(Peca.class, idpeca);
		
		if(peca.getEstoque() > 0)
			return Response.status(401).entity("Não é possivel deletar uma peça que possui estoque.").build();
		else{
			List<PecaCompra> pecaCompra = persistence.listarComCondicao(PecaCompra.class, "idpeca = " + peca.getId());
			if(pecaCompra.size() > 0)
				return Response.status(401).entity("Não é possivel deletar uma peça que possui um histórico de compra.").build();
			else{
				List<ItemPeca> itemPeca = persistence.listarComCondicao(ItemPeca.class, "idpeca = " + peca.getId());
				if(itemPeca.size() > 0)
					return Response.status(401).entity("Não é possivel deletar uma peça que está sendo usado em um item.").build();
				else{
					persistence.excluir(peca);
					return Response.status(200).entity("Peça excluida com sucesso.").build();
				}
			}
		}
	}
	
}


