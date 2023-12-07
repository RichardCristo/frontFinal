import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient) { }

  anashe: any = { }

  getData(){
    return this.http.get('/api/getData')
  }

  getUnVideo(data: any){
    let headers= new HttpHeaders({
      'Content-type':'application/json'
    })
    return this.http.get("http://localhost:3000/video/titulo/"+data, {headers})
  }

  getVideos(){
    let headers= new HttpHeaders({
      'Content-type':'application/json'
    })
    return this.http.get("http://localhost:3000/video/getVideos",{headers});
  }

  anadirVideo(data: any){
    let headers= new HttpHeaders({
      'Authorization': localStorage.getItem('token') || ' '
    })
    console.log("enviando datos:", data)
    return this.http.post("http://localhost:3000/video/anadirVideo",data,{headers})
  }

  likear(data: any){
    let headers= new HttpHeaders({
      'Content-type':'application/json', 'Authorization': localStorage.getItem('token') || ' '
    })
    console.log(localStorage.getItem('token'))

    console.log(headers.toString)
    return this.http.patch("http://localhost:3000/video/like/"+data, this.anashe, {headers})
  }
  
  dislikear(data: any){
    let headers= new HttpHeaders({
      'Content-type':'application/json', 'Authorization': localStorage.getItem('token') || ' '
    })
    return this.http.patch("http://localhost:3000/video/dislike/"+data, this.anashe, {headers})
  }

  filtrarVideo(data: any){
    let headers= new HttpHeaders({
      'Content-type':'application/json'
    })
    return this.http.get("http://localhost:3000/video/etiqueta/"+data, {headers})
  }

  editarVideo(titulo: any, data: any){
    let headers= new HttpHeaders({
      'Content-type':'application/json', 'Authorization': localStorage.getItem('token') || ' '
    })
    console.log(localStorage.getItem('token'))
    console.log(titulo, data)
    return this.http.patch("http://localhost:3000/video/editarVideo/"+titulo,data, {headers})
  }

  borrarVideo(titulo: any){
    let headers= new HttpHeaders({
      'Content-type':'application/json', 'Authorization': localStorage.getItem('token') || ' '
    })
    return this.http.delete("http://localhost:3000/video/borrarVideo/"+titulo, {headers})
  }

  comentar(titulo: any, data: any){
    let headers= new HttpHeaders({
      'Content-type':'application/json', 'Authorization': localStorage.getItem('token') || ' '
    })
    return this.http.patch("http://localhost:3000/comentario/hacerUnComentario/"+titulo,data,{headers})
  }

  getComentarios(titulo: string){
    let headers= new HttpHeaders({
      'Content-type':'application/json'
    })
    return this.http.patch("http://localhost:3000/comentario/getComentarios",titulo,{headers})
  }

  likearComentario(titulo: any, i: any){
    let headers= new HttpHeaders({
      'Content-type':'application/json', 'Authorization': localStorage.getItem('token') || ' '
    })
    console.log(headers)
    return this.http.patch("http://localhost:3000/comentario/like/"+titulo+"/"+i, this.anashe, {headers})
  }

  dislikearComentario(titulo: any, i: any){
    let headers= new HttpHeaders({
      'Content-type':'application/json', 'Authorization': localStorage.getItem('token') || ' '
    })
    console.log(headers)
    return this.http.patch("http://localhost:3000/comentario/dislike/"+titulo+"/"+i, this.anashe, {headers})
  }

  getUsuario(usuario: any) {
    let headers= new HttpHeaders({
      'Content-type':'application/json', 
    })
    return this.http.get("http://localhost:3000/usuario/getUsuario/"+usuario,{headers})
  }

  videosDelUsuario(usuario: any){
    let headers= new HttpHeaders({
      'Content-type':'application/json', 
    })
    return this.http.get("http://localhost:3000/video/videosDelUsuario/"+usuario,{headers})
  }
}
