export class User {
  //Atributos (caracteristicas, informções e dados)
  //se colocar valores ele considera como valor padrão...

  //precisa ta no formato longo e no pequeno não
  //   id: string;
  //   name: string;
  //   email: string;
  //   password: string;
  //   createdAd: string;

  //métodos (ações, comportamentos e funções)

  //formato longo
  //   constructor(
  //   id: string,
  //   name: string,
  //   email: string,
  //   password: string,
  //   createdAd: string
  //   ) {
  //     this.id = id;
  //     this.name = name;
  //     this.email = email;
  //     this.password = password;
  //     this.createdAd = createdAd;
  //   }

  //formato menor
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private password: string,
    private createdAd: string
  ) {}
  correr() {
    let passos;
  }

  public getId() {
    return this.id;
  }

  public setId(newId: string) {
    this.id = newId;
  }

  public getName() {
    return this.name;
  }

  public setName(newName: string) {
    this.name = newName;
  }

  public getEmail() {
    return this.email;
  }

  public setEmail(newEmail: string) {
    this.email = newEmail;
  }

  public getPassaword() {
    return this.password;
  }

  public setPassaword(newPassaword: string) {
    this.password = newPassaword;
  }

  public getCreatedAt() {
    return this.createdAd;
  }

  public setCreatedAt(newCreatedAt: string) {
    this.createdAd = newCreatedAt;
  }

  public getAllItens() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      createdAd: this.createdAd,
    };
  }
}

// instanciar user
// const user1 = new User("u001", "it", "it@", "0001", "17/04/2023");
// console.log(user1);
