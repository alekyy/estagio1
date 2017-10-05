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

import sigup_web.entidades.Item;
import sigup_web.service.ItemService;
import sigup_web.util.GenericPersistence;

@Path("/item")
public class ItemWebService{
	
	GenericPersistence persistence = new GenericPersistence();
	ItemService service = new ItemService();
	
	@Path("/inserir")
	@POST
	@Consumes("application/json")
	public Response inserir(Item obj){
		try{
			service.gerarValorItem(obj, true);
			return Response.status(200).entity("Salvo com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/alterar")
	@PUT
	@Consumes("application/json")
	public Response alterar(Item obj){
		try{
			service.gerarValorItem(obj, false);
			return Response.status(200).entity("Atualizado com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/listarTodos")
	@GET
	@Produces("application/json")
	public List<Item> listarTodos(){
		try{
			List<Item>listaItem = persistence.listar(Item.class);
			return listaItem;
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	
	@Path("/excluir/{idItem}")
	@DELETE
	public Response excluir(@PathParam("idItem") Integer idItem){
		try{
			Item obj = (Item) persistence.buscarPorId(Item.class, idItem);
			persistence.excluir(obj);
			return Response.status(200).entity("Excluido com sucesso").build();
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}

}

