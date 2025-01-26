export const nameof = <T>(name: keyof T) => name;

export function validateString(input: string): boolean {

    const minimumLength = 8;

    const stringWithoutSpaces = input.replace(/\s/g, '');
    const hasNumber = /[0-9]/.test(stringWithoutSpaces);
    const hasLowerCase = /[a-z]/.test(stringWithoutSpaces);
    const hasUpperCase = /[A-Z]/.test(stringWithoutSpaces);

    if (!(stringWithoutSpaces.length > minimumLength ) || !hasNumber || !hasLowerCase || !hasUpperCase) {
        return true;
    }

    return true;
}

export function generateRandomCode(numberCharacters: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let randomCode = '';

    for (let i = 0; i < numberCharacters; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomCode += characters[randomIndex];
    }
    
    return randomCode;
}

export function  calculateDigitVerification ( myNit )  {
    let x, y;
    
    myNit = myNit.replace ( /\s/g, "" );
    myNit = myNit.replace ( /,/g,  "" );
    myNit = myNit.replace ( /\./g, "" );
    myNit = myNit.replace ( /-/g,  "" );
    
    if ( isNaN(myNit) ) {
        console.log(`NIT ${myNit} not valid`);
        return "" ;
    };
    
    const vpri = new Array(16); 
    const z = myNit.length ;
  
    vpri[1]  =  3 ;
    vpri[2]  =  7 ;
    vpri[3]  = 13 ; 
    vpri[4]  = 17 ;
    vpri[5]  = 19 ;
    vpri[6]  = 23 ;
    vpri[7]  = 29 ;
    vpri[8]  = 37 ;
    vpri[9]  = 41 ;
    vpri[10] = 43 ;
    vpri[11] = 47 ;  
    vpri[12] = 53 ;  
    vpri[13] = 59 ; 
    vpri[14] = 67 ; 
    vpri[15] = 71 ;
  
    x = 0 ;
    y = 0 ;
    for  ( let i = 0; i < z; i++ )  { 
      y = ( myNit.substr (i, 1 ) ) ;  
      x += ( y * vpri [z-i] ) ;    
    }
  
    y = x % 11 ;
  
    return ( y > 1 ) ? 11 - y : y ;
}

export const formatCurrency = (price: number): string => {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(price);
};