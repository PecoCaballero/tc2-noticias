import { Component } from '@angular/core';
import { NoticiasService } from './noticias.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'tc2-noticias';
  categorias = new Array()

  constructor(private noticiasServ: NoticiasService) {
  }

  ngOnInit(): void {
    this.noticiasServ.getCategorias().subscribe(res => {
      this.categorias = res
    })
  }


}
