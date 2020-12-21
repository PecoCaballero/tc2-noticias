import { Component, Input, OnInit } from '@angular/core';
import { Noticia, NoticiasService } from '../noticias.service';


@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {

  @Input() id: number
  @Input() deletar: (noticia: Noticia) => void
  noticia: Noticia
  editavel: boolean

  constructor(private noticiasServ: NoticiasService) { }

  ngOnInit(): void {
    this.noticia = this.noticiasServ.noticias.find((noticia) => noticia.id == this.id)
    this.editavel = this.noticia.editavel == 1
  }


}
