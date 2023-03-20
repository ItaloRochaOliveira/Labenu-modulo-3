const nome = process.argv[2]

const idade = process.argv[3]

const novaIdade = String(Number(idade) + 7)


console.log(`Olá, ${nome}! Você tem ${idade} anos`)
console.log(`Em sete anos você terá ${novaIdade}`)