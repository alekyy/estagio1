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

import sigup_web.entidades.Servico;
import sigup_web.util.GenericPersistence;

@Path("/servico")
public class ServicoWebService{
	
	GenericPersistence persistence = new GenericPersistence();
	
	@Path("/inserir")
	@POST
	@Consumes("application/json")
	public Response inserir(Servico obj){
		try{
			persistence.inserir(obj);
			return Response.status(200).entity("Salvo com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/alterar")
	@PUT
	@Consumes("application/json")
	public Response alterar(Servico obj){
		try{
			persistence.alterar(obj);
			return Response.status(200).entity("Atualizado com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/listarTodos")
	@GET
	@Produces("application/json")
	public List<Servico> listarTodos(){
		try{
			List<Servico>listaServico = persistence.listar(Servico.class);
			return listaServico;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/excluir/{idServico}")
	@DELETE
	public Response excluir(@PathParam("idServico") Integer idServico){
		try{
			Servico obj = (Servico) persistence.buscarPorId(Servico.class, idServico);
			persistence.excluir(obj);
			return Response.status(200).entity("Excluido com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}

}

