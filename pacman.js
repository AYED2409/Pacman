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
        }
        //inicio del juego
        init(){
            this.GenerarPosicionPacman();
            this.GenerarPosicionFantasma();
            this.ComprobarBotones();
        }
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
                    tr.appendChild(td)
                }
            }
        }
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
        ComprobarBotones(){
            let botones=document.getElementById('botones');
            botones.onclick=(e) =>{
                if(e.target.id=='arriba'){
                    this.Mover((this.posicionPacman[0])-1,this.posicionPacman[1],this.posicionPacman,this.posicionFantasma);
                    this.MoverFantasma();
                    this.PintarMapa();
                }else if(e.target.id=='abajo'){
                    this.Mover((this.posicionPacman[0])+1,this.posicionPacman[1],this.posicionPacman,this.posicionFantasma);
                    this.MoverFantasma();
                    this.PintarMapa();
                }else if(e.target.id=='derecha'){
                    this.Mover(this.posicionPacman[0],(this.posicionPacman[1])+1,this.posicionPacman,this.posicionFantasma);
                    this.MoverFantasma();
                    this.PintarMapa();
                }else if(e.target.id=='izquierda'){
                    this.Mover(this.posicionPacman[0],(this.posicionPacman[1])-1,this.posicionPacman,this.posicionFantasma);
                    this.MoverFantasma();
                    this.PintarMapa();
                }
            }
        }
        Mover(pos1,pos2,arrayPropio,arrayEnemigo){
            if(pos1>this.array.length-1 || pos2>this.array.length-1 || pos1<0 || pos2<0 || this.array[pos1][pos2]=='x'){
                console.log("movimiento incorrecto")
            }else{
                this.array[pos1][pos2]=this.array[arrayPropio[0]][arrayPropio[1]];
                this.array[arrayPropio[0]][arrayPropio[1]]='';
                arrayPropio[0]=pos1;
                arrayPropio[1]=pos2;
                if(arrayPropio[0]==arrayEnemigo[0] && arrayPropio[1]==arrayEnemigo[1]){
                    document.getElementById('mensaje').innerHTML='Perdiste!!!!!';
                    this.array[arrayEnemigo[0]][arrayEnemigo[1]]='F';
                    this.PintarMapa();
                    document.getElementById('botones').style.pointerEvents='none';
                }
            }
        }
        MoverFantasma(){
            let random1=Math.floor(Math.random()*4);
            if(random1==0){
                console.log("arriba")
                if(this.posicionFantasma[0]>0 && this.array[this.posicionFantasma[0]-1][this.posicionFantasma[1]]!='x'){
                    //console.log("si puede subir")
                    //console.log("posicionFantasma0---_>: "+this.posicionFantasma[0])
                    this.Mover((this.posicionFantasma[0])-1,this.posicionFantasma[1],this.posicionFantasma,this.posicionPacman);
                }else{
                    //console.log("no puede subir")
                    this.MoverFantasma()
                }
            }else if(random1==1){
                console.log("izquierda")
                if(this.posicionFantasma[1]>0 && this.array[this.posicionFantasma[0]][this.posicionFantasma[1]-1]!='x'){
                    this.Mover((this.posicionFantasma[0]),this.posicionFantasma[1]-1,this.posicionFantasma,this.posicionPacman);
                }else{
                    //console.log("no puede izquierda")
                    this.MoverFantasma();
                }
                
            }else if(random1==2){
                console.log("abajo")
                if(this.posicionFantasma[0]<this.array.length-1 && this.array[this.posicionFantasma[0]+1][this.posicionFantasma[1]]!='x'){
                    this.Mover((this.posicionFantasma[0])+1,this.posicionFantasma[1],this.posicionFantasma,this.posicionPacman);
                }else{
                    //console.log("no puede bajar")
                    this.MoverFantasma()
                }
                
            }else if(random1==3){
                console.log("derecha")
                if(this.posicionFantasma[1]<this.array.length-1 && this.array[this.posicionFantasma[0]][this.posicionFantasma[1]+1]!='x'){
                    this.Mover((this.posicionFantasma[0]),this.posicionFantasma[1]+1,this.posicionFantasma,this.posicionPacman);
                }else{
                   // console.log("no puede derecha")
                    this.MoverFantasma()
                }
                
            }
        }
    } 
}
var juego = new pacman.Pacman()
juego.init()
