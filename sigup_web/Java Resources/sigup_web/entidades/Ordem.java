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
@Table(name = "ordem", schema = "sigup")
public class Ordem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "idordem")
	private Integer id;
	
	@Column(name = "titulo")
	private String titulo;
	
	@Column(name = "descricao")
	private String descricao;
	
	@Column(name = "dataCriacao")
	private Date dataCriacao;
	
	@Column(name = "dataFinalizacao")
	private Date dataFinalizacao;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "tipoOrdem")
	private TipoOrdem tipoOrdem;
	
	@Column(name = "prioridade")
	private Integer prioridade;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private Status status;
	
	@ManyToOne
	@JoinColumn(name = "idproduto")
	private Produto produto;
	
	@ManyToOne
	@JoinColumn(name = "idusuario")
	private Usuario usuario;
	
	public Ordem() {
		dataCriacao = new Date();
		status = Status.ABERTO;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public Date getDataCriacao() {
		return dataCriacao;
	}
	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}
	public Date getDataFinalizacao() {
		return dataFinalizacao;
	}
	public void setDataFinalizacao(Date dataFinalizacao) {
		this.dataFinalizacao = dataFinalizacao;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public TipoOrdem getTipoOrdem() {
		return tipoOrdem;
	}
	public void setTipoOrdem(TipoOrdem tipoOrdem) {
		this.tipoOrdem = tipoOrdem;
	}
	public Integer getPrioridade() {
		return prioridade;
	}
	public void setPrioridade(Integer prioridade) {
		this.prioridade = prioridade;
	}
	public Produto getProduto() {
		return produto;
	}
	public void setProduto(Produto produto) {
		this.produto = produto;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

}
