//public:

class User {
  public id: string;
  public name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

//para criar:
const user1 = new User("u001", "it");
//para editar:
user1.name = "it2";
//para mostrar:
console.log(user1);
console.log(user1.id);

//private:

class UserPrivate {
  private id: string;
  private name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  public getId(): void {
    console.log(this.id);
  }
  public getName(): void {
    console.log(this.name);
  }

  public setId(newId: string): void {
    this.id = newId;
  }

  public setName(newName: string): void {
    this.id = newName;
  }
}

//para criar:
const user2 = new UserPrivate("u001", "it");
//para editar:
user2.setId("u002");
//para mostrar:
user2.getId();
