import { Component, SecurityContext } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ServicioService } from '../servicio.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  verTabla: boolean;
  verComentarios: boolean
  videosLista: any
  comentarios: any
  titulo: string
  likes: number
  dislikes!: number
  filtro: string
  router: any;
  comentario: string = ""
  comentarioArray: Array<string> = []
  verComentariosArray: Array<boolean> = []
  verBotones: boolean = true
  verLogin: boolean = true
  link: string=""
 
 
 
  constructor(private servicio: ServicioService, public sanitizer: DomSanitizer){
    this.verTabla = false
    this.verComentarios = false
    this.titulo= ""
    this.likes = 0
    this.dislikes = 0
    this.filtro=""
    
  }
  
 
public getUnVideo(){
    var headers = new HttpHeaders({
      'Authorization': `${localStorage.getItem("token")}`
    })
 
    this.servicio.getUnVideo(this.titulo).subscribe(
      response => {
        console.log(response);
        this.videosLista = JSON.parse(JSON.stringify(response))
        this.verTabla = true;
      },
      error => {
        console.log(localStorage.getItem("token"))
        console.log(error);
      }
    )
     
  }
  
 
   ngOnInit(){
    
 
    if(!localStorage.getItem('token')){
      this.verBotones = false
    }
    else{
      this.verLogin = false
    }
 
    this.servicio.getVideos().subscribe({
      next: (data: any) => {
        console.log(data);
        this.videosLista = JSON.parse(JSON.stringify(data))
        this.verTabla = true;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
    this.inicializarBools()
 
  
  }
  
  
  
 
  likear(titulo: string){
    this.servicio.likear(titulo).subscribe(
      response => {
        console.log(response);
        this.videosLista = JSON.parse(JSON.stringify(response))
        this.verTabla = true;
        this.ngOnInit()
      },
      error => {
        console.log(error);
      }
    )
  }
 
  dislikear(titulo: string){
    this.servicio.dislikear(titulo).subscribe(
      response => {
        console.log(response);
        this.videosLista = JSON.parse(JSON.stringify(response))
        this.verTabla = true;
        this.ngOnInit()
      },
      error => {
        console.log(error);
      }
    )
  }
  
  filtrarVideo(){
    var headers = new HttpHeaders({
      'Authorization': `${localStorage.getItem("token")}`
    })
    this.servicio.filtrarVideo(this.filtro).subscribe(
      response => {
        console.log(response);
        this.videosLista = JSON.parse(JSON.stringify(response))
        this.verTabla = true;
      },
      error => {
        console.log(localStorage.getItem("token"))
        console.log(error);
      }
    )
  }
 
  cerrarSesion(){
    localStorage.removeItem('token');
    this.router.navigate('/login')
  }
 
  inicializarBools(){
    for (let index = 0; index < this.videosLista.length; index++) {
      this.verComentariosArray.push(false)
    }
  }
 
  verComentariosFun(indice: number){
    this.verComentariosArray[indice] = true
  }
  
  cerrar(indice: number){
    this.verComentariosArray[indice] = false
  }
 
  comentar(titulo: string, i: number){
    if(!this.comentarioArray[i]){
      alert("Por favor rellene los campos")
      return;
    }
    
    const data = {
      comentario : this.comentarioArray[i]
    }
    this.servicio.comentar(titulo, data).subscribe(
      response => {
        console.log(response);
        this.videosLista = JSON.parse(JSON.stringify(response))
        this.ngOnInit()
      },
      error => {
        console.log(localStorage.getItem("token"))
        console.log(error);
      }
    )
  }
 
  likearComentario(titulo: string, i: number){
    this.servicio.likearComentario(titulo, i).subscribe(
      response => {
        console.log(response);
        this.videosLista = JSON.parse(JSON.stringify(response))
        this.ngOnInit()
      },
      error => {
        console.log(error);
      }
    )
  }
  
 
  dislikearUnComentario(titulo: string, i: number){
    this.servicio.dislikearComentario(titulo, i).subscribe(
      response => {
        console.log(response);
        this.videosLista = JSON.parse(JSON.stringify(response))
        this.ngOnInit()
      },
      error => {
        console.log(error);
      }
    )
  }
}