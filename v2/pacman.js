var pacman = pacman || {}
pacman ={
    Pacman:class{
        constructor(){
            //posiciones del mapa
            this.array =[
                [0,'x',2,3,4],
                [10,11,12,'x',14],
                [20,'x',22,23,24],
                [30,'x','x',33,'x'],
                [40,41,42,43,44]
            ];
            //posicion Actual de Pacman y fantasma
            this.posicionPacman=[];
            this.posicionFantasma=[];
            this.intervalo=null;
        }
        //inicio del juego
        init(){
            this.GenerarPosicionPacman();
            this.GenerarPosicionFantasma();
            this.ComprobarBotones();
            this.ComrpobarReset();
            this.GenerarIntervalo();
        }
        //mueve el Fantasma cada 1 segundo, se detiene cuando Pacman es comido
        GenerarIntervalo(){
            this.intervalo=setInterval(()=>this.MoverFantasma(),1000);    
        }
        //Se recorre la matriz y se pinta NEGRO=muro, AMARILLO=Pacman, Rojo=Fantasma
        PintarMapa(){
            var div =document.getElementById('tabla');
            div.innerHTML="";
            for(let i=0;i<this.array.length;i++){
                let tr=document.createElement('tr');
                div.appendChild(tr);
                for(let j=0;j<this.array[i].length;j++){
                    let td=document.createElement('td');
                    td.style.textAlign='center';
                    td.style.width='150px';
                    td.style.height='150px';
                    if(this.array[i][j]=='x'){
                        td.style.backgroundColor='black';
                    }
                    if(this.array[i][j]=='C'){
                        td.style.backgroundColor='yellow';
                        this.posicionPacman[0]=i;
                        this.posicionPacman[1]=j;
                    }
                    if(this.array[i][j]=='F'){
                        td.style.backgroundColor='red';
                        this.posicionFantasma[0]=i;
                        this.posicionFantasma[1]=j;
                    }
                    tr.appendChild(td);
                }
            }
        }
        //Genera una posición aleatoria de  Pacman en la matriz, en una ubicación distinta de los muros
        GenerarPosicionPacman(){
            let random1=Math.floor(Math.random()*this.array.length);
            let random2=Math.floor(Math.random()*this.array.length);
            if(this.array[random1][random2]=='x'){
                this.GenerarPosicionPacman();
            }else{
                this.array[random1][random2]='C';
            }
            document.getElementById('tabla').innerHTML="";
            //this.PintarMapa()
        }
        //Genera una posicion aleataroia del Fantasma en la matriz, en una ubicacion distinta de los muros y de Pacman
        GenerarPosicionFantasma(){
            let random1=Math.floor(Math.random()*this.array.length);
            let random2=Math.floor(Math.random()*this.array.length);
            if(this.array[random1][random2]=='x' || this.array[random1][random2]=='C'){
                this.GenerarPosicionFantasma();
            }else{
                this.array[random1][random2]='F';
            }
            document.getElementById('tabla').innerHTML="";
            this.PintarMapa();
        }
        //Comprueba el movimiento que desea realizar el usuario, a continuacion se mueve el fantasma aleatoriamente
        ComprobarBotones(){
            let botones=document.getElementById('botones');
            botones.onclick=(e) =>{
                if(e.target.id=='arriba'){
                    this.Mover((this.posicionPacman[0])-1,this.posicionPacman[1],this.posicionPacman,this.posicionFantasma);
                    this.PintarMapa();
                }else if(e.target.id=='abajo'){
                    this.Mover((this.posicionPacman[0])+1,this.posicionPacman[1],this.posicionPacman,this.posicionFantasma);
                    this.PintarMapa();
                }else if(e.target.id=='derecha'){
                    this.Mover(this.posicionPacman[0],(this.posicionPacman[1])+1,this.posicionPacman,this.posicionFantasma);
                    this.PintarMapa();
                }else if(e.target.id=='izquierda'){
                    this.Mover(this.posicionPacman[0],(this.posicionPacman[1])-1,this.posicionPacman,this.posicionFantasma);
                    this.PintarMapa();
                }
            }
        }
        //Mueve un elemento, se indica pos1=indica el indice del array, pos2=indica indice del elemento del array, arrayPropio= array de la posicion del elemento a mover(posicionPacman o PosicionFantasma), arrayEnemigo= array de la posicion del elemento rival(posicionFantasma o posicionPacman)
        Mover(pos1,pos2,arrayPropio,arrayEnemigo){
            if(pos1>this.array.length-1 || pos2>this.array.length-1 || pos1<0 || pos2<0 || this.array[pos1][pos2]=='x'){
                //console.log("movimiento incorrecto")
            }else{
                this.array[pos1][pos2]=this.array[arrayPropio[0]][arrayPropio[1]];
                this.array[arrayPropio[0]][arrayPropio[1]]='';
                arrayPropio[0]=pos1;
                arrayPropio[1]=pos2;
                if(arrayPropio[0]==arrayEnemigo[0] && arrayPropio[1]==arrayEnemigo[1]){
                    document.getElementById('mensaje').innerHTML='¡¡¡¡¡¡¡Perdiste!!!!!!!!';
                    this.array[arrayEnemigo[0]][arrayEnemigo[1]]='F';
                    this.PintarMapa();
                    document.getElementById('botones').style.pointerEvents='none';
                }
            }
        }
        //Mueve el fantasma,se genera un numero aleatiro de 0-3(0=arriba,1=izquierda,2=abajo,3=derecha), si no se puede mover a la direccion aleatoria se vuelve a llamar a la funcion hasta generar un movimiento posible
        MoverFantasma(){
            let random1=Math.floor(Math.random()*4);
            if(random1==0){
                //console.log("arriba")
                if(this.posicionFantasma[0]>0 && this.array[this.posicionFantasma[0]-1][this.posicionFantasma[1]]!='x'){
                    this.Mover((this.posicionFantasma[0])-1,this.posicionFantasma[1],this.posicionFantasma,this.posicionPacman);
                }else{
                    this.MoverFantasma();
                }
            }else if(random1==1){
                //console.log("izquierda")
                if(this.posicionFantasma[1]>0 && this.array[this.posicionFantasma[0]][this.posicionFantasma[1]-1]!='x'){
                    this.Mover((this.posicionFantasma[0]),this.posicionFantasma[1]-1,this.posicionFantasma,this.posicionPacman);
                }else{
                    this.MoverFantasma();
                }
            }else if(random1==2){
                //console.log("abajo")
                if(this.posicionFantasma[0]<this.array.length-1 && this.array[this.posicionFantasma[0]+1][this.posicionFantasma[1]]!='x'){
                    this.Mover((this.posicionFantasma[0])+1,this.posicionFantasma[1],this.posicionFantasma,this.posicionPacman);
                }else{
                    this.MoverFantasma();
                }
            }else if(random1==3){
                //console.log("derecha")
                if(this.posicionFantasma[1]<this.array.length-1 && this.array[this.posicionFantasma[0]][this.posicionFantasma[1]+1]!='x'){
                    this.Mover((this.posicionFantasma[0]),this.posicionFantasma[1]+1,this.posicionFantasma,this.posicionPacman);
                }else{
                    this.MoverFantasma();
                } 
            }
            this.PintarMapa();
            if(this.posicionFantasma[0]==this.posicionPacman[0] && this.posicionPacman[1]==this.posicionFantasma[1]){
                clearInterval(this.intervalo);
            }
        }
        //Reinicia el juego, se reestablecen los valores necesarios y se llama a la funcion de iniciar
        ComrpobarReset(){
            var btnReset=document.getElementById('resetear');
            btnReset.onclick=()=>{
                document.getElementById('tabla').innerHTML="";
                document.getElementById('mensaje').innerHTML="Pacman";
                this.array[this.posicionPacman[0]][this.posicionPacman[1]]=0;
                this.array[this.posicionFantasma[0]][this.posicionFantasma[1]]=0;
                document.getElementById('botones').style.pointerEvents='auto';
                this.init();
            }
        }
    } 
}
var juego = new pacman.Pacman();
juego.init();