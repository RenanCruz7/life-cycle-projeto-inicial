import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Item } from 'src/app/interfaces/iItem';
import { ListaDeCompraService } from 'src/app/service/lista-de-compra.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnChanges {
  @Input() itemQueVaiSerEditado!: Item
  editando = false
  textoBtn = 'Salvar item'

  valorItem! :string
  constructor(private listaServie: ListaDeCompraService) { }

  ngOnInit(): void { }

  adicionarItem(){
    this.listaServie.adicionarItemNaLista(this.valorItem)
    this.limparCampo()
  }

  limparCampo(){
    this.valorItem = ''
  }

  editarItem(){
    this.listaServie.editarItemDaLista(this.itemQueVaiSerEditado, this.valorItem)
    this.limparCampo()
    this.editando = false
    this.textoBtn = "Salvar item"
  }


  ngOnChanges(changes: SimpleChanges){
    if(!changes['itemQueVaiSerEditado'].firstChange){
        this.editando = true
        this.textoBtn ='Editar Item'
        this.valorItem = this.itemQueVaiSerEditado?.nome;
    }
}
}
