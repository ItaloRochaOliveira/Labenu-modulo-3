/* EXERCÍCIO DE FIXAÇÃO*/
// 1. Crie um novo objeto. Este objeto é uma pessoa e deve possuir três propriedades:
//   a. nome, que é uma string;
//   b. idade, que é um número;
//   c. corFavorita, que é uma string.

const It: {
  nome: string,
  idade: number,
  corFavorita: string
} = {
  nome: "it",
  idade: 21,
  corFavorita: "azul"
}

// 2. Crie mais três objetos, que também precisam ter apenas os campos definidos acima. Crie um type Pessoa para garantir
// que todos os objetos tenham as mesmas propriedades.
type TPerson = {
  nome: string,
  idade: number,
  corFavorita: string
}

const Ma: TPerson = {
  nome: "Ma",
  idade: 25,
  corFavorita: "verde"
}

const Hi: TPerson = {
  nome: "Hi",
  idade: 28,
  corFavorita: "verde"
}

// 3. Modifique o type Pessoa para que possamos escolher apenas entre as cores do arco-íris. Utilize um enum para isso.
enum COR{
  ARCO_IRIS = "todas as cores"
}

type TPersonArcoIris = {
  nome: string,
  idade: number,
  corFavorita: COR
}

const ItArcoIris: TPersonArcoIris = {
  nome: "it",
  idade: 21,
  corFavorita: COR.ARCO_IRIS
}