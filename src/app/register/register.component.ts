import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  usuario : string=""
  contrasena: string = ""
  
  constructor(private http : HttpClient) { 
    
  }

  register() {
    if(!this.usuario || !this.contrasena){
      alert("Por favor rellene los campos")
      return;
    }
    
    let data  = {
      username: this.usuario,
      password: this.contrasena
    }
    this.http.post("http://localhost:3000/register", data).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      })
    }
}
