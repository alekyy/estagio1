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

import sigup_web.entidades.Compra;
import sigup_web.service.CompraService;
import sigup_web.util.GenericPersistence;

@Path("/compra")
public class CompraWebService{
	
	GenericPersistence persistence = new GenericPersistence();
	CompraService service = new CompraService();
	
	@Path("/inserir")
	@POST
	@Consumes("application/json")
	public Response inserir(Compra obj){
		try{
			service.verificarCompra(obj, true);
			return Response.status(200).entity("Salvo com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/alterar")
	@PUT
	@Consumes("application/json")
	public Response alterar(Compra obj){
		try{
			service.verificarCompra(obj, false);
			return Response.status(200).entity("Atualizado com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/listarTodos")
	@GET
	@Produces("application/json")
	public List<Compra> listarTodos(){
		try{
			List<Compra>listaCompra = persistence.listar(Compra.class);
			return listaCompra;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/excluir/{idCompra}")
	@DELETE
	public Response excluir(@PathParam("idCompra") Integer idCompra){
		try{
			Compra obj = (Compra) persistence.buscarPorId(Compra.class, idCompra);
			persistence.excluir(obj);
			return Response.status(200).entity("Excluido com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}

}

