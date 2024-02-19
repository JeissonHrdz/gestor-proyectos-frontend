export class Usuario{

    id:number;
    name: string;
    lastName: string;
    email: string;
    phone: number;
    idRol: number
    password: string;


   constructor(id: number, name:string, lastName:string, email:string, phone:number,
    idRol: number, password: string){
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.idRol = idRol;
        this.password = password;

   }

}