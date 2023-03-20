import { countries } from "./countries.js";

const name = process.argv[2];
const code = process.argv[3]

if (!name || !code) {
  console.log("Faltou um argumento esperado");
} else {
    const newCountry = {
        name,
        code
    }

  countries.push(newCountry);
  countries.sort((a,b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1)

  console.log(countries.find((country) => country.name === name));
  //ou
  console.log(countries[countries.length -1])
  console.log(countries)
}
