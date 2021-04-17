
import express from 'express'
//const express = require('express')
const app = express()
import  fs from 'fs'
import * as operaciones from './operaciones.js'

/* ------------ INSTANCIA DEl SERVIDOR --------------- */

app.set('PUERTO', 8080)
const PORT = process.env.PORT || app.get('PUERTO')

/* ----------- app.listen : pone en marcha el listen del servidor ------------------ */
const server = app.listen(PORT, () => {
    console.log(`Servidor express escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en Servidor: ${error}`))



// 1
app.get('/',(req,res)  => {
    
    let horario = new Date().getHours();

   // pregunto si existe la variable y en el caso de que exista hago la resta para tener el horario correcto  
    if ( process.env.PORT) { horario= horario-3}
    
    if (horario>=6 &&horario<=12){
            res.send(`<h3 style="color:blue;">Buenos dias!</h3>`);
        }   
     if (horario>=13 &&horario<=19){
        res.send(`<h3 style="color:blue;">'Buenas tardes!</h3>`);
     }

     else {
        res.send(`<h3 style="color:blue;">'Buenas noches!</h3>`);
     }
})

/*2) Así mismo, dispondrá de otra ruta get ‘/random’ la cuál iniciará un cálculo de 10000 números
aleatorios en el rango del 1 al 20. Luego de dicho proceso, el servidor retornará un objeto cuyas
claves sean los números salidos y el valor asociado a cada clave será la cantidad de veces que salió
dicho número. */

app.get('/random', (req,res) => {
    let  numeros ={}
        
    for (let i = 0; i<=10000; i ++){
        let num = Math.floor((Math.random() * (21-1)+1));
        if (numeros.hasOwnProperty(([num]))){  
            numeros[num]++;  
        }
        else{
            numeros = {...numeros ,[num] :1}  // si el numero no esta contenido en el objeto le agregamos un 1 a su contador
        }
    }
    res.json(numeros)
})


/* 3) Definir otra ruta get llamada ‘/info’ que sea capaz de leer el archivo package.json y devuelva un
objeto con el siguiente formato y datos:
let info = {
 contenidoStr: (contenido del archivo leído en formato string),
 contenidoObj: (contenido del archivo leído en formato objeto),
 size: (tamaño en bytes del archivo)
}
Esta ruta será capaz de:
• Mostrar por consola el objeto info luego de leer el archivo.
• Guardar el objeto info en un archivo llamado info.txt dentro de la misma carpeta de
package.json, preservando el formato de representación del objeto en el archivo
(tabuladores, saltos de línea, etc)
• Utilizar la lectura y escritura de archivos en modo asincrónico con async await.*/

app.get('/info' , async (req , res)=>{
    
    

    try {
        // Lectura de archivo
        let datos = await fs.promises.readFile('./package.json','utf-8');
        let datosParse=  JSON.parse(datos)
        
        
        let info = {
            contenidoStr: JSON.stringify(JSON.parse(datos)),
            contenidoObj:datosParse ,
            size: datos.length,
        };
      
         console.log(info);
       
        // escritura
      
        await fs.promises.writeFile('./info.txt', JSON.stringify(info, null,4 ))
        res.send(info)
    

    }

    catch(error){

        res.status(500).send(`Error de lectura o escritura del archivo ${error}`)
    }

})


//4


app.get('/operaciones' , (req , res)=>{

    let query = req.query
    // la conversion a number con *1 es mas rapida
    let num1 = (query.num1)*1
    let num2 = (query.num2)*1
    let operacion= query.operacion

    // valido todas las opciones para que la operacion se pueda realizar , para no repetir codigo tambien valide que en la division el num2 sea distinto a 0
    if (!operaciones.esOperacion(operacion)|| typeof num1!='number' ||  typeof num2 !='number' || (operacion=='division'&& num2==0)){

        res.json({
            error: {
                num1: {
                    valor: num1,
                    tipo: typeof num1
                },
                num2: {
                    valor: num2,
                    tipo: typeof num2
                },
                operacion: {
                    valor: operacion,
                    tipo: typeof operacion
                }
            }
        })
    }

    else {
        let result=operaciones.operar(operacion,num1,num2);
        res.json({
            num1,
            num2,
            operacion: operacion,
            resultado: result,
        });
        
    }
})

