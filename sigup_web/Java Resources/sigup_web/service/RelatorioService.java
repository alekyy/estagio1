package sigup_web.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.ServletOutputStream;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.StreamingOutput;

import com.lowagie.text.pdf.codec.Base64.OutputStream;

import net.sf.jasperreports.engine.JRExporterParameter;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import sigup_web.util.ConexaoBanco;

public class RelatorioService
{

	public RelatorioService() 
	{
		super();
	}
	
	private String filtro;
    private Date dataInicial;
    private Date dataFinal;

    public Response gerarRelatorio(String arquivoJasper) {
        try {
            JasperReport relatorio;
            //gera relatorio com as classes do jasper
            HashMap p = new HashMap();
            p.put("param", filtro);
            JasperPrint jasperPrint = JasperFillManager.fillReport("C:/Unipar/Estágio 1/Projetos/sigup_web/WebContent/WEB-INF/relatorios/" + arquivoJasper, p, ConexaoBanco.getConexao().getConnection());
            ByteArrayOutputStream dadosByte = new ByteArrayOutputStream();
            JRPdfExporter exporter = new JRPdfExporter();
            exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
            exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, dadosByte);
            exporter.exportReport();
            byte[] bytes = dadosByte.toByteArray();
            return downloadPdfFile(bytes, arquivoJasper);
        } catch (Exception e) {
            System.out.println("erro: " + e.getMessage());
            throw new WebApplicationException(e.getMessage());
        }
    }
    
    public Response downloadPdfFile(byte[] data, String arquivoJasper)
    {
        StreamingOutput fileStream =  new StreamingOutput()
        {
            @Override
            public void write(java.io.OutputStream output) throws IOException, WebApplicationException
            {
                try
                {
                    output.write(data);
                    output.flush();
                }
                catch (Exception e)
                {
                    throw new WebApplicationException("File Not Found !!");
                }
            }
        };

      int recorte = arquivoJasper.indexOf(".");
      String nomePDF = arquivoJasper.substring(0, recorte);          
      
        return Response
                .ok(fileStream, MediaType.APPLICATION_OCTET_STREAM)
                .type("application/pdf")
                .header("Content-disposition", "inline; filename=\"" + nomePDF + ".pdf\"")
                .build();
    }

   
//    
//    public void gerarRelatorioOS() {
//        try {            
//            //gera relatorio com as classes do jasper
//            HashMap p = new HashMap();            
//            if (dataInicial != null && dataFinal != null) {
//                p.put("datainicial", dataFormatada(dataInicial));
//                p.put("datafinal", dataFormatada(dataFinal));
//            }
//            
//            p.put("cliente", "%"+filtro+"%");
//            
//            JasperReport relatorio;
//            String arquivoJasper = "relOrdemServico.jasper";
//            FacesContext facesContext = FacesContext.getCurrentInstance();
//            facesContext.responseComplete();
//            ServletContext scontext = (ServletContext) facesContext.getExternalContext().getContext();
//            
//            JasperPrint jasperPrint = JasperFillManager.fillReport(scontext.getRealPath("/WEB-INF/reports/" + arquivoJasper), p, Conexao.getConnection());
//            ByteArrayOutputStream dadosByte = new ByteArrayOutputStream();
//            JRPdfExporter exporter = new JRPdfExporter();
//            exporter.setParameter(JRExporterParameter.JASPER_PRINT, jasperPrint);
//            exporter.setParameter(JRExporterParameter.OUTPUT_STREAM, dadosByte);
//            exporter.exportReport();
//            byte[] bytes = dadosByte.toByteArray();
//            if (bytes != null && bytes.length > 0) {
//                int recorte = arquivoJasper.indexOf(".");
//                String nomePDF = arquivoJasper.substring(0, recorte);
//                HttpServletResponse response = (HttpServletResponse) facesContext.getExternalContext().getResponse();
//                response.setContentType("application/pdf");
//                response.setHeader("Content-disposition", "inline; filename=\"" + nomePDF + ".pdf\"");
//                response.setContentLength(bytes.length);
//                ServletOutputStream outputStream = response.getOutputStream();
//                outputStream.write(bytes, 0, bytes.length);
//                outputStream.flush();
//                outputStream.close();
//            }
//        } catch (Exception e) {
//            System.out.println("erro: " + e.getMessage());
//        }
//    }
//
//    public String getFiltro() {
//        return filtro;
//    }
//
//    public void setFiltro(String filtro) {
//        this.filtro = filtro;
//    }
//
//    public Date getDataInicial() {
//        return dataInicial;
//    }
//
//    public void setDataInicial(Date dataInicial) {
//        this.dataInicial = dataInicial;
//    }
//
//    public Date getDataFinal() {
//        return dataFinal;
//    }
//
//    public void setDataFinal(Date dataFinal) {
//        this.dataFinal = dataFinal;
//    }
//    
//    private String dataFormatada(Date data) {
//        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
//        if (data != null) {
//            return format.format(data);
//        } else {
//            return "";
//        }
//    }

}


