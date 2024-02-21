export class User {
  //id: number;
  name: string;
  lastName: string;
  email: string;
  phone: number;
  idRol: number;
  password: string;

  constructor(
  
    name: string,
    lastName: string,
    email: string,
    phone: number,
    idRol: number,
    password: string
  ) {
 
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.idRol = idRol;
    this.password = password;
  }


}
