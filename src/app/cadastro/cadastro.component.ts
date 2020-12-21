import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { Categoria, NoticiasService, Noticia } from '../noticias.service';

export enum MODE {
  CADASTRAR,
  EDITAR
}


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  formCadastro: FormGroup
  categorias = new Array<Categoria>()
  modo = MODE.CADASTRAR
  feedback = {
    message: '',
    show: false,
    class: 'success'
  }

  constructor(private noticiasServ: NoticiasService, private local: Location, private rota: ActivatedRoute,) { }

  ngOnInit(): void {
    let noticia = {
      titulo: null,
      idCategoria: null,
      subtitulo: null,
      conteudo: null
    }
    this.initForm()
    const url = this.rota.snapshot.url[0].path
    console.log(url)
    this.categorias = this.noticiasServ.categorias

    if (url == 'editar') {
      this.modo = MODE.EDITAR
      const id = parseInt(this.rota.snapshot.paramMap.get("id"))
      noticia = this.noticiasServ.noticias.find((noticia) => noticia.id == id)
      this.formCadastro.get("titulo").setValue(noticia.titulo, { emitEvent: false });
      this.formCadastro.get("categoria").setValue(noticia.idCategoria, { emitEvent: false });
      this.formCadastro.get("subtitulo").setValue(noticia.subtitulo, { emitEvent: false });
      this.formCadastro.get("conteudo").setValue(noticia.conteudo, { emitEvent: false });
    }
  }

  onSubmit() {
    let noticia = {
      titulo: this.formCadastro.get('titulo').value,
      subtitulo: this.formCadastro.get('subtitulo').value,
      idCategoria: parseInt(this.formCadastro.get('categoria').value),
      conteudo: this.formCadastro.get('conteudo').value,
    } as Noticia
    if (this.modo == MODE.CADASTRAR) {
      console.log('cadastrando...', noticia);
      const result = this.noticiasServ.postNoticia(noticia)
      result.subscribe((res) => {
        console.log('cadastro res: ', res)
        if (res.status == 'ok') {
          this.feedback = {
            message: res.msg ?? 'Cadastrado com sucesso!',
            show: true,
            class: 'success'
          }
        } else {
          this.feedback = {
            message: res.msg ?? 'Ocorreu um erro! Tente novamente mais tarde',
            show: true,
            class: 'error'
          }
        }
      })
    } else {
      noticia.id = parseInt(this.rota.snapshot.paramMap.get("id"))
      const result = this.noticiasServ.editNoticia(noticia)
      result.subscribe((res) => {
        console.log('edit res: ', res)
        if (res.status == 'ok') {
          this.feedback = {
            message: res.msg ?? 'Editado com sucesso!',
            show: true,
            class: 'success'
          }
        } else {
          this.feedback = {
            message: res.msg ?? 'Ocorreu um erro! Tente novamente mais tarde',
            show: true,
            class: 'error'
          }
        }
      })
    }
  }

  get titulo() {
    return this.modo == MODE.CADASTRAR ? 'Cadastrar nova notícia' : 'Editar notícia'
  }

  get textoBotao() {
    return this.modo == MODE.CADASTRAR ? 'Cadastrar' : 'Editar'
  }

  private initForm() {
    this.formCadastro = new FormGroup({
      categoria: new FormControl(null),
      titulo: new FormControl(null),
      subtitulo: new FormControl(null),
      conteudo: new FormControl(null)
    })
    console.log('initForm: ', this.formCadastro)
  }

}
