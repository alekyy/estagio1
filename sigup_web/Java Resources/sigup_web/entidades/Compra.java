package sigup_web.entidades;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "compra", schema = "sigup")
public class Compra implements Serializable{
    
	private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    @Column(name = "descricao")
    private String descricao;
    @Column(name = "dataCompra")
    private Date dataCompra;
    @OneToMany
    @JoinColumn(name = "idPecaCompra")
    private List<PecaCompra> pecaCompra;
    @Column(name = "valor")
    private Double valor;
    @ManyToOne
    @JoinColumn(name = "idusuario")
    private Usuario usuario;

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

    public Date getDataCompra() {
        return dataCompra;
    }

    public void setDataCompra(Date dataCompra) {
        this.dataCompra = dataCompra;
    }

    public List<PecaCompra> getPecaCompra() {
        return pecaCompra;
    }

    public void setPecaCompra(List<PecaCompra> pecaCompra) {
        this.pecaCompra = pecaCompra;
    }

    
    public Double getValor() {
        return valor;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }
    
    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    
}
