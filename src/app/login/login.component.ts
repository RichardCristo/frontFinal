import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Usuario } from './Usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario!: string
  pass!: string

  constructor(private http : HttpClient) { 
    
  }

  login() {
    if(!this.usuario || !this.pass){
      alert("Por favor rellene los campos")
      return;
    }

    localStorage.setItem("usuario", this.usuario)
    
    const data: Usuario = {
      username: this.usuario,
      password: this.pass
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    console.log(this.usuario)
    console.log(this.pass)
    console.log(data.username)
    console.log(data.password)
    return this.http.post("http://localhost:3000/login", data, {headers}).subscribe((response:any) => {
        const data = JSON.parse(JSON.stringify(response));
        localStorage.setItem("token", data.claveJWT)
        console.log(data.claveJWT)
        console.log(localStorage.getItem("token"))
      },
      error => {
        console.log(error);
      })}
}
