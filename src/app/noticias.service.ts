import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastService } from './toast-service';


export interface Categoria {
  id: number,
  nome: string
}


export interface Noticia {
  id?: number,
  titulo: string,
  subtitulo: string,
  editavel?: number,
  conteudo: string,
  data?: string,
  idCategoria: number
}

export interface HttpHandler {
  status: string
  msg?: string
  id?: number
}

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  categorias = new Array<Categoria>()
  noticias = new Array<Noticia>()

  constructor(private http: HttpClient, private toastService: ToastService) { }

  getCategorias() {
    const categoriasObservable = this.http.get<Categoria[]>('https://tiagoifsp.ddns.net/noticias/categorias/listar.php')
    categoriasObservable.subscribe(res => {
      this.categorias = res
    })
    return categoriasObservable
  }

  getNoticias(id: number) {
    const params = new HttpParams({ fromObject: { id: id.toString() } })
    const noticiasObservable = this.http.get<Noticia[]>(`https://tiagoifsp.ddns.net/noticias/noticias/listar.php`, { params: params })
    noticiasObservable.subscribe(res => {
      this.noticias = res
    })
    return noticiasObservable
  }

  postNoticia(noticia: Noticia) {
    const params = new HttpParams({ fromObject: { titulo: noticia.titulo, subtitulo: noticia.subtitulo, conteudo: noticia.conteudo, idCategoria: noticia.idCategoria.toString() } })
    const result = this.http.post<HttpHandler>(`https://tiagoifsp.ddns.net/noticias/noticias/cadastrar.php`, params)
    console.log('cadastro finalizado')
    return result
  }

  editNoticia(noticia: Noticia) {
    const params = new HttpParams({ fromObject: { id: noticia.id.toString(), titulo: noticia.titulo, subtitulo: noticia.subtitulo, conteudo: noticia.conteudo, idCategoria: noticia.idCategoria.toString() } })
    const result = this.http.post<HttpHandler>(`https://tiagoifsp.ddns.net/noticias/noticias/editar.php`, params)
    return result
  }

  deleteNoticias(id: number) {
    const params = new HttpParams({ fromObject: { id: id.toString() } })
    return this.http.get<HttpHandler>(`https://tiagoifsp.ddns.net/noticias/noticias/deletar.php`, { params: params })
  }

}
