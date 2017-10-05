package sigup_web.entidades;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "servico", schema = "sigup")
public class Servico {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idservico")
	private Integer id;
	
	@Column(name = "titulo")
	private String titulo;
	
	@Column(name = "descricao")
	private String descricao;
	
	@Column(name = "prioridade")
	private Integer prioridade;
	
	@Column(name = "dataInicio")
	private Date dataInicio;
	
	@Column(name = "dataTermino")
	private Date dataTermino;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private Status status;
	
	@OneToOne
	@JoinColumn(name = "idordem")
	private Ordem ordem;
	
	public Servico() {
		dataInicio = new Date();
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
	public Ordem getOrdem() {
		return ordem;
	}
	public void setOrdem(Ordem ordem) {
		this.ordem = ordem;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
}
