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

import sigup_web.entidades.Cidade;
import sigup_web.entidades.ContasReceber;
import sigup_web.util.GenericPersistence;

@Path("/contasReceber")
public class ContasReceberWebService{
	
	GenericPersistence persistence = new GenericPersistence();
	
	@Path("/buscarContasReceber/{idServico}")
	@GET
	@Produces("application/json")
	public Response buscarContasReceber(@PathParam("idServico") Integer idServico){
		try{
			System.out.println(idServico);
			ContasReceber conta = (ContasReceber) persistence.listarComCondicao(ContasReceber.class, "idservico = " + idServico).iterator().next();
			return Response.status(200).entity(conta).build();
		}catch(Exception e){
			e.printStackTrace();
			return Response.status(500).build();
		}
	}

}

