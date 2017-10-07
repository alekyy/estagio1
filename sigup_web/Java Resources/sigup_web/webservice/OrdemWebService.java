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

import sigup_web.entidades.Ordem;
import sigup_web.service.OrdemService;
import sigup_web.util.GenericPersistence;

@Path("/ordem")
public class OrdemWebService{
	
	GenericPersistence persistence = new GenericPersistence();
	OrdemService service = new OrdemService();
	
	@Path("/inserir")
	@POST
	@Consumes("application/json")
	public Response inserir(Ordem obj){
		try{
			service.criarOrdem(obj);
			return Response.status(200).entity("Salvo com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/alterar")
	@PUT
	@Consumes("application/json")
	public Response alterar(Ordem obj){
		try{
			persistence.alterar(obj);
			return Response.status(200).entity("Atualizado com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/finalizar")
	@PUT
	@Consumes("application/json")
	public Response finalizar(Ordem obj){
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
	public List<Ordem> listarTodos(){
		try{
			List<Ordem>listaOrdem = persistence.listar(Ordem.class);
			return listaOrdem;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/listarAbertos")
	@GET
	@Produces("application/json")
	public List<Ordem> listarAbertos(){
		try{
			List<Ordem>listaOrdem = persistence.listarComCondicao(Ordem.class, "status = 'ABERTO'");
			return listaOrdem;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/listarProgresso")
	@GET
	@Produces("application/json")
	public List<Ordem> listarProgresso(){
		try{
			List<Ordem>listaOrdem = persistence.listarComCondicao(Ordem.class, "status = 'EM_PROGRESSO'");
			return listaOrdem;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/listarFinalizadas")
	@GET
	@Produces("application/json")
	public List<Ordem> listarFinalizadas(){
		try{
			List<Ordem>listaOrdem = persistence.listarComCondicao(Ordem.class, "status = 'FINALIZADO'");
			return listaOrdem;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/excluir/{idOrdem}")
	@DELETE
	public Response excluir(@PathParam("idOrdem") Integer idOrdem){
		try{
			Ordem obj = (Ordem) persistence.buscarPorId(Ordem.class, idOrdem);
			service.excluirOrdem(obj);
			return Response.status(200).entity("Excluido com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}

}

