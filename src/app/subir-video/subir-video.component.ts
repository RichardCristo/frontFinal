import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../servicio.service';
import { response } from 'express';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
 
@Component({
  selector: 'app-subir-video',
  templateUrl: './subir-video.component.html',
  styleUrls: ['./subir-video.component.css']
})
export class SubirVideoComponent {
  titulo!: string;
  etiquetas: string = '';
  statusPublish!: string;
  previewListing: any = {};
  verTabla: boolean = false
  selectedFile: File | null = null;
  newListing: any;
  miniatura: File | null = null;
  url: any
  publicador: any
  link: string=""
  charactersAfterEqual: string = '';
  dynamicUrl: SafeResourceUrl;
 
  constructor(private router: Router,private http: HttpClient, private servicio: ServicioService, private sanitizer: DomSanitizer){
    this.dynamicUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
  }
  
 
  onFileChange(event: any) {
    
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.miniatura = fileList[0];
    } else {
      console.log("no funciona");
    }
  }
  
  
  anadirVideo() {
    this.publicador = localStorage.getItem("usuario")
 
    if (!this.titulo || !this.etiquetas || !this.miniatura) {
      alert("Por favor rellene los campos")
      return;
    }
 
    for(let i = 0; i < this.etiquetas.length; i++){
      if(this.etiquetas[i] == " "){
        alert("Las etiquetas se escriben asi: etiqueta1,etiqueta2,etiqueta3,etc con solo una palabra con etiqueta")
      return;
      }
    }
  
    const formData = new FormData();
    let etiquetasArray = this.etiquetas.split(',');
  
    formData.append('video', JSON.stringify({
      titulo: this.titulo,
      etiquetas: etiquetasArray,
      publicador : this.publicador,
      link: this.link
    }));
    formData.append('miniatura',this.miniatura)
  
    this.servicio.anadirVideo(formData).subscribe(
      response => {
        console.log(response);
        this.verTabla = true;
        this.getUnVideo()
      },
      error => {
        console.log(error);
      }
    );
 
 
  }
  extractCharacters() {
    const position = this.link.indexOf('=');
 
    if (position !== -1) {
      this.charactersAfterEqual = this.link.substring(position + 1);
      console.log("jejerej")
      console.log(this.charactersAfterEqual)
      this.link = "https://www.youtube.com/embed/"+ this.charactersAfterEqual
      const unsafeUrl = this.link
      this.dynamicUrl = this.sanitizer.bypassSecurityTrustResourceUrl(unsafeUrl)
      
      
    } else {
      console.log('El signo de igual no está presente en la URL');
    }
  }
  
  
  async getUnVideo(){
    console.log("estoy aca")
    await this.servicio.getVideos().subscribe((videos: any) => {
      console.log("entro")
      videos.forEach((element: any) => {
        if(element.titulo == this.titulo){
          this.url = element.miniatura
        }
      });
    })
  }  
  
}