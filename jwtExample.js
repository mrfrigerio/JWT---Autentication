/**
 *
 * Neste exemplo, foi utilizado o modelo de chave publica/privada de
 * autenticação com o algoritmo RS256. Poderia também ser utiliado o
 * modelo de chave única MD5
 * - Site para gerar chave publica/privada ==> https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/
 * - Site para gerar chave publica/privada ==> http://travistidwell.com/jsencrypt/demo/
 * - Site para gerar chave única MD5 ==> https://www.md5online.org/
 *
*/

const jwt = require('jsonwebtoken')
const fs = require('fs')
const { resolve } = require('path')

const publicKey = fs.readFileSync(resolve(__dirname, 'public.key'), 'utf-8')
const privateKey = fs.readFileSync(resolve(__dirname, 'private.key'), 'utf-8')

const signConfig = {
  issuer: 'Marcelo Ragnelli Corporation',
  subject: 'autenticação JWT',
  audience: 'users',
  expiresIn: '12h',
  algorithm: 'RS256'
}

/**
 *
 *   var signConfig = {
 *     issuer:  '',
 *     subject:  '',
 *     audience:  '',
 *     expiresIn:  '12h',
 *     algorithm:  'RS256'
 *   }

* issuer — Software organization who issues the token.
* subject — Intended user of the token.
* audience — Basically identity of the intended recipient of the token..
* expiresIn — Expiration time after which the token will be invalid.
* algorithm — Encryption algorithm to be used to protect the token.

*/

const authSign = jwt.sign({ id: 1, name: 'Ragnelli' }, privateKey, signConfig) // Token JWT gerado
const { id, name } = jwt.verify(authSign, publicKey) // Dados gerados após validação do token com a chave pública

console.log('JWT', authSign)
console.log('\nDecodificação\n', `id: ${id}, name: ${name}`)
