package sigup_web.entidades;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "tarefa", schema = "sigup")
public class Tarefa implements Serializable{
	
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idtarefa")
	private Integer id;
	
	@Column(name = "titulo")
	private String titulo;
	
	@Column(name = "descricao")
	private String descricao;
	
	@Column(name = "prioridade")
	private Integer prioridade;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private Status status;
	
	@Column(name = "dataInicio")
	private Date dataInicio;
	
	@Column(name = "dataTermino")
	private Date dataTermino;
	
	@ManyToOne
	@JoinColumn(name = "idservico")
	private Servico servico;
	
	@Column(name = "custo")
	private Double custo;
	
	@OneToOne
	@JoinColumn(name = "idresponsavel")
	private Colaborador responsavel;
	
	@OneToMany
	@JoinColumn(name = "idItemTarefa")
    private List<ItemTarefa> itemTarefa;
	
	public Tarefa() {
		status = Status.ABERTO;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public Integer getPrioridade() {
		return prioridade;
	}
	public void setPrioridade(Integer prioridade) {
		this.prioridade = prioridade;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public Date getDataInicio() {
		return dataInicio;
	}
	public void setDataInicio(Date dataInicio) {
		this.dataInicio = dataInicio;
	}
	public Date getDataTermino() {
		return dataTermino;
	}
	public void setDataTermino(Date dataTermino) {
		this.dataTermino = dataTermino;
	}
	public Servico getServico() {
		return servico;
	}
	public void setServico(Servico servico) {
		this.servico = servico;
	}
	
	public void setCusto(Double custo) {
		this.custo = custo;
	}
	public Double getCusto() {
		return custo;
	}
	
	public void setResponsavel(Colaborador responsavel) {
		this.responsavel = responsavel;
	}
	public Colaborador getResponsavel() {
		return responsavel;
	}
	
	public List<ItemTarefa> getItemTarefa() {
        return itemTarefa;
    }

    public void setItemTarefa(List<ItemTarefa> itemTarefa) {
        this.itemTarefa = itemTarefa;
    }

}
