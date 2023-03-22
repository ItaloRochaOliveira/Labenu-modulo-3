//  PRÁTICA GUIADA - Parte 1
// Crie um sistema de cadastro de usuários que contenha:

// 1.1 Type Alias para uma pessoa (TPerson) com as propriedades id, name, email, password e role;
export type TPerson = {
    id: string | number,
    name: string,
    email: string,
    password: string,
    // role: string
    //ou
    role: ROLE //antes tava "Admin" | "Normal"
}

// const person : TPerson = {
//     id: 1,
//     name: "it",
//     email: "it@gmail.com",
//     password: "1234",
//     role: "Admin"
// }

// 1.2. Type Aliases para 2 contas (AdminAccount, NormalAccount) com as propriedades account e permission;
export type TAdminAccount = {
    nickName: string,
    permission: true
}

export type TNormalAccount = {
    nickName: string,
    permission: false
}

//1.3. Crie exemplos de usuários Admin e Normal;
const userAdmin : TAdminAccount = {
    nickName: "It",
    permission: true
}




/* PRÁTICA GUIADA - Parte 2
Vamos continuar nosso sistema de cadastro de usuários criando:

*/ 
// 1. Enum com valores ADMIN e NORMAL e atribua ã propriedade role do Tperson;
enum ROLE { //valores pré-definidos (dados que não mudam)
    ADMIN = "Admin",
    NORMAL= "Normal"
}

const person : TPerson = {
    id: 1,
    name: "it",
    email: "it@gmail.com",
    password: "1234",
    role: ROLE.ADMIN
}


// 2. Tipo Intersection unindo: pessoa(Person) + permissão (Role);
type TPersonAdmin = TPerson & TAdminAccount

const personAdmin: TPersonAdmin = {
    id: 1,
    name: "it",
    email: "it@gmail.com",
    password: "1234",
    role: ROLE.ADMIN,

    nickName: "ItPregramer",
    permission: true
}

type TPersonNormal = TPerson & TNormalAccount
const personNormal: TPersonNormal = {
    id: 1,
    name: "ita",
    email: "ita@gmail.com",
    password: "1234",
    role: ROLE.NORMAL,

    nickName: "ItaProgramer",
    permission: false
}


// 3. Um array de usuários que permite guardar apenas usuários do tipo Person + Role;

const arrayPersonRole: (TPersonAdmin | TPersonNormal)[] = [personAdmin, personNormal]

//ou
// const arrayPersonRole: Array<TPersonAdmin | TPersonNormal> = [personAdmin, personNormal]

console.log(arrayPersonRole)