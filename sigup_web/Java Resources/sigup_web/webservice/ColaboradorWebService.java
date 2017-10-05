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

import sigup_web.entidades.Colaborador;
import sigup_web.entidades.NivelAcesso;
import sigup_web.util.GenericPersistence;

@Path("/colaborador")
public class ColaboradorWebService{
	
	GenericPersistence persistence = new GenericPersistence();
	
	@Path("/inserir")
	@POST
	@Consumes("application/json")
	public Response inserir(Colaborador obj){
		try{
			persistence.inserir(obj.getUsuario());
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
	public Response alterar(Colaborador obj){
		try{
			persistence.alterar(obj.getUsuario());
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
	public List<Colaborador> listarTodos(){
		try{
			List<Colaborador>listaColaborador = persistence.listar(Colaborador.class);
			return listaColaborador;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/excluir/{idColaborador}")
	@DELETE
	public Response excluir(@PathParam("idColaborador") Integer idColaborador){
		try{
			Colaborador obj = (Colaborador) persistence.buscarPorId(Colaborador.class, idColaborador);
			persistence.excluir(obj);
			return Response.status(200).entity("Excluido com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}

}

