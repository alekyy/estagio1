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

import sigup_web.entidades.ContasReceber;
import sigup_web.entidades.Servico;
import sigup_web.service.ServicoService;
import sigup_web.util.GenericPersistence;

@Path("/servico")
public class ServicoWebService{
	
	GenericPersistence persistence = new GenericPersistence();
	ServicoService service = new ServicoService();
	
	@Path("/inserir")
	@POST
	@Consumes("application/json")
	public Response inserir(Servico obj){
		try{
			service.criarServico(obj);
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
	
	@Path("/finalizar")
	@PUT
	@Consumes("application/json")
	public Response finalizar(Servico obj){
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
	
	@Path("/listarAbertos")
	@GET
	@Produces("application/json")
	public List<Servico> listarAbertos(){
		try{
			List<Servico>listaServico = persistence.listarComCondicao(Servico.class, "status = 'ABERTO'");
			return listaServico;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/listarProgresso")
	@GET
	@Produces("application/json")
	public List<Servico> listarProgresso(){
		try{
			List<Servico>listaServico = persistence.listarComCondicao(Servico.class, "status = 'EM_PROGRESSO'");
			return listaServico;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/listarFinalizados")
	@GET
	@Produces("application/json")
	public List<Servico> listarFinalizadas(){
		try{
			List<Servico>listaServico = persistence.listarComCondicao(Servico.class, "status = 'FINALIZADO'");
			return listaServico;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/buscarServico/{idOrdem}")
	@GET
	@Produces("application/json")
	public Response buscarServico(@PathParam("idOrdem") Integer idOrdem){
		try{
			Servico servico = (Servico) persistence.listarComCondicao(Servico.class, "ordem.id = " + idOrdem).iterator().next();
			return Response.status(200).entity(servico).build();
		}catch(Exception e){
			e.printStackTrace();
			return Response.status(500).build();
		}
	}
	
	@Path("/excluir/{idServico}")
	@DELETE
	public Response excluir(@PathParam("idServico") Integer idServico){
		try{
			Servico obj = (Servico) persistence.buscarPorId(Servico.class, idServico);
			service.excluirOrdem(obj);
			return Response.status(200).entity("Excluido com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}

}

