# Pasos para la implementacion del backend

## 1) se inicia el proyecto como:
npm init

## 2) se instala 'nodemon' como demonio escucha de cambios del codigo JS del servidor. Esto es como NODE pero en demonio para desarrollo que este escuchando todos los cambios que hacemos al archivo, una ves terminado ya no necesitaremos de NODEMON y solo usaremos node
npm i -D nodemon
### NOTA: es una dependencia de desarrollo. por eso se agrega -D

## 3) instalamos 'express' (el servidor que vamos a utilizar)
npm i express

## 4) instalamos 'mongoose' (el el ORM de Mongo DB para facilitar las consultas )
npm i mongoose

## 5) instalamos 'dotenv' (archivo y configuracion para variables de entorno)
npm i dotenv

## 6) Configurar NODE: creamos los scripts de arranque, el 'punto' de la instruccion indica que busque por default el archivo raiz llamado index.js
"scripts": {
  "start":"node ./index.js",
  "dev":"nodemon ./index.js",
},
## ... y para ejecutara usamos
npm run dev

## 7) Configurar Express
Es el codigo dentro de index.js

## 8) Configurar MongoDB
 8.0) crear la base de datos, con los modelos y los controladores
 8.1) crear la variable de entorni en el .env
 8.2) crear la funcion de coneccion en el archivo de configuracion mongoDBconect
 8.3) implementar la coneccion en el index.js

## 9) Definir el Router (EndPoints)
 9.1) crear carpeta routes para todos los endpoints
 9.2) crear carpeta controllers para todos los controladores de los endpoints
 9.3) habilitar JSON en EXPRESS, esto para habilitar los parametros enviados por Headers
 9.4) definir los endpoints en el index.js
 NOTA: definir en Postman: 
 Headers con -> key=content-type y value=aplication/json
 y en Body/row podemos escribir el JSON qeu se envia desde el cliente


## 10) Crear los endpoints y sus controladores

## 11) Instalar bcryptjs para encriptar contraseñas
mnp i bcryptjs

## 12) Instalar express-validator para agregar validaciones a la api sobre los enpoints, esto funje como un midleware que capta la info que se envia del cliente, y ahora valida los campos enviados
npm i express-validator

## 13) Agregar los JWT Json Wen Tokens
npm i jsonwebtoken

## 5) Habilitar el CORS para peticiones de distintas URLs
Haremos uso de [cors](https://www.npmjs.com/package/cors)
npm i cors

## )
## )
## )
## )

