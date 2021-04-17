


export const suma = (a,b) => a + b ;
export const resta = (a,b) => a - b; 
export const mult = (a,b) => a * b ;
export const div = (a,b) => a / b ;

//valida que la operacion sea valida
export function esOperacion(op){
    return (op=='suma'||op=='resta'||op=='division'||op=='multiplicacion' )

}

// paso por parametro el tipo de operacion y valido que sea valida, luego realizo la operacion correspondiente
export const operar= (op,num1,num2 )=>{
    if (esOperacion(op)){
        switch (op) {
            case 'suma':return suma(num1,num2);
                break;
            case 'division':return div(num1,num2);
                break;
            case 'resta': return resta(num1,num2);
                break;
             case 'multiplicacion': return mult(num1,num2);
                break;
        
            default: console.log('error.')
                break;
        }
    }
}