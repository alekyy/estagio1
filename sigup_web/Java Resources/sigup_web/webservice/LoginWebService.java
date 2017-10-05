package sigup_web.webservice;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import sigup_web.entidades.Usuario;
import sigup_web.service.LoginService;
import sigup_web.util.GenericPersistence;

@Path("/login")
public class LoginWebService{
	
	GenericPersistence persistence = new GenericPersistence();
	LoginService service = new LoginService();
	
	@Path("/login")
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	public Response login(Usuario user) {
		try {
			return Response.status(200).entity(service.Autenticacao(user)).build();
		} catch (WebApplicationException e) {
			throw new WebApplicationException(401);
		} catch (Exception e) {
			e.printStackTrace();
			throw new WebApplicationException(500);
		}
	}

}

