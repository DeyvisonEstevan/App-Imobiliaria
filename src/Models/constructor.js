import React, {Component} from 'react';

export default class Constructor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imovel: ' ',
      finalidade: ' ',
      preco: ' ',
      imagem: ' ',
      lista: [],
    };
    this.Listar();
  }
  Listar = () => {
    const banco = new ImovelDatabase();
    banco.Listar().then(listaCompleta => {
      this.setState({lista: listaCompleta});
    });
  };

  Cadastrar = (imovel, finalidade, preco, imagem) => {
    const imovelNovo = new Imovel(imovel, finalidade, preco, imagem);
    const banco = new ImovelDatabase();
    banco.Adicionar(imovelNovo);
    this.Listar();
  };

  FinalidadeAluguel = id => {
    const banco = new ImovelDatabase();
    banco.Aluguel(id);
    this.Listar();
  };

  FinalidadeVenda = id => {
    const banco = new ImovelDatabase();
    banco.Venda(id);
    this.Listar();
  };

  DeletarImovel = id => {
    const banco = new ImovelDatabase();
    banco.Deletar(id);
    this.Listar();
  };
}
