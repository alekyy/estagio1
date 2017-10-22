package sigup_web.webservice;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

import sigup_web.service.RelatorioService;
import sigup_web.util.GenericPersistence;

@Path("/relatorio")
public class RelatorioWebService{
	
	GenericPersistence persistence = new GenericPersistence();
	RelatorioService service = new RelatorioService();
	
	
	@Path("/gerarRelatorio/{relatorio}")
	@GET
	@Produces("application/json")
	public Response gerarRelatorio(@PathParam("relatorio") String relatorio){
		try{
			return service.gerarRelatorio(relatorio);
		}catch(Exception e){
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}
	

}

