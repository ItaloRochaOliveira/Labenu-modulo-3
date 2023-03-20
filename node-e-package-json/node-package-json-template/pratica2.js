import { countries } from "./countries.js";

// vamos criar uma aplicação que recebera um pais e pelo terminal vai buscar ele na lista

const query = process.argv[2]

if(!query){
    console.log("Faltou um argumento esperado")
} else {
    const result = countries.filter(country => country.name[0].toLowerCase().includes(query.toLowerCase()))

    console.log(result)
}