import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { Noticia, NoticiasService } from '../noticias.service';

@Component({
  selector: 'app-lista-noticias',
  templateUrl: './lista-noticias.component.html',
  styleUrls: ['./lista-noticias.component.css']
})
export class ListaNoticiasComponent implements OnInit {

  categoria = { id: 0, nome: 'default' }
  noticias = new Array<Noticia>()

  constructor(private rota: ActivatedRoute,
    private local: Location, private noticiasServ: NoticiasService) { }

  ngOnInit(): void {
    this.rota.params.subscribe(params => {
      const id = parseInt(params['categoria']);
      this.categoria = this.noticiasServ.categorias.find((categoria) => categoria.id == id)
      this.noticiasServ.getNoticias(id).subscribe((res) => {
        this.noticias = res.filter((noticia) => noticia.idCategoria == id)
        console.log('noticias: ', this.noticias)
      })
    });
  }

  deletar(noticia) {
    const res = this.noticiasServ.deleteNoticias(noticia.id)
    res.subscribe((res) => {
      console.log(`delete ${noticia.id}: `, res)
      if (res.status == 'ok') {
        console.log('removing from view')
        this.noticiasServ.getNoticias(noticia.idCategoria).subscribe((res) => {
          this.noticias = res.filter((n) => n.idCategoria == noticia.idCategoria)
          console.log('noticias: ', this.noticias)
        })
      }
    })

  }

}
