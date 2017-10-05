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

import sigup_web.entidades.Empresa;
import sigup_web.util.GenericPersistence;

@Path("/empresa")
public class EmpresaWebService{
	
	GenericPersistence persistence = new GenericPersistence();
	
	@Path("/inserir")
	@POST
	@Consumes("application/json")
	public Response inserir(Empresa obj){
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
	public Response alterar(Empresa obj){
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
	public List<Empresa> listarTodos(){
		try{
			List<Empresa>listaEmpresa = persistence.listar(Empresa.class);
			return listaEmpresa;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/excluir/{idEmpresa}")
	@DELETE
	public Response excluir(@PathParam("idEmpresa") Integer idEmpresa){
		try{
			Empresa obj = (Empresa) persistence.buscarPorId(Empresa.class, idEmpresa);
			persistence.excluir(obj);
			return Response.status(200).entity("Excluido com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}

}

