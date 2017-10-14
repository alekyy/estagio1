package sigup_web.webservice;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import sigup_web.entidades.Tarefa;
import sigup_web.persistence.TarefaPersistence;
import sigup_web.service.TarefaService;
import sigup_web.util.GenericPersistence;


@Path("/tarefa")
public class TarefaWebService {
	
	TarefaPersistence persistence = new TarefaPersistence();
	TarefaService service = new TarefaService();
	
	@Path("/inserir")
	@POST
	@Consumes("application/json")
	public Response inserir(Tarefa obj){
		try{
			service.criarTarefa(obj);
			return Response.status(200).entity("Salvo com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/alterar")
	@PUT
	@Consumes("application/json")
	public Response alterar(Tarefa obj){
		try{
			persistence.alterarTarefa(obj);
			return Response.status(200).entity("Atualizado com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/listarTodos")
	@GET
	@Produces("application/json")
	public List<Tarefa> listarTodos(){
		try{
			List<Tarefa>listaTarefa = persistence.listar(Tarefa.class);
			return listaTarefa;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/buscarTarefas/{idServico}")
	@GET
	@Produces("application/json")
	public List<Tarefa> buscarTarefas(@PathParam("idServico") Integer idServico){
		try{
			List<Tarefa>listaTarefa = persistence.listarComCondicao(Tarefa.class, "servico.id = " + idServico);
			return listaTarefa;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/excluir/{idTarefa}")
	@DELETE
	public Response excluir(@PathParam("idTarefa") Integer idTarefa){
		try{
			Tarefa obj = (Tarefa) persistence.buscarPorId(Tarefa.class, idTarefa);
			persistence.excluirTarefa(obj);
			return Response.status(200).entity("Excluido com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}

}

