var pacman = pacman || {}

pacman ={
    Pacman:class{
        constructor(){
            this.array =[
                [0,'x',2,3,4],
                [10,11,12,'x',14],
                [20,'x',22,23,24],
                [30,'x','x',33,'x'],
                [40,41,42,43,44]
            ]
            this.posicionPacman=[]
            this.posicionFantasma=[]
        }
        PintarMapa(){

            var div =document.getElementById('tabla')
            div.innerHTML=""
            for(let i=0;i<this.array.length;i++){
                let tr=document.createElement('tr')
                div.appendChild(tr)
                //console.log("array n: "+i)
                for(let j=0;j<this.array[i].length;j++){
                    let td=document.createElement('td')
                    td.style.textAlign='center'
                    td.style.width='150px'
                    td.style.height='150px'
                    if(this.array[i][j]=='x'){
                        td.style.backgroundColor='black'
                    }
                    if(this.array[i][j]=='C'){
                        td.style.backgroundColor='yellow'
                        this.posicionPacman[0]=i
                        this.posicionPacman[1]=j
                    }
                    if(this.array[i][j]=='F'){
                        td.style.backgroundColor='red'
                        this.posicionFantasma[0]=i
                        this.posicionFantasma[1]=j
                    }
                   // td.innerHTML=this.array[i][j]
                    tr.appendChild(td)
                    //console.log("valor:"+this.array[i][j] )
                }
            }
        }
        GenerarPosicionPacman(){
            let random1=Math.floor(Math.random()*this.array.length)
            let random2=Math.floor(Math.random()*this.array.length)
            //console.log(random1+"este es el random1")
            //console.log(random2+"este es el random2")
            if(this.array[random1][random2]=='x'){
              //  console.log("no se puede esta posicion")
                this.GenerarPosicionPacman()
            }else{
               // console.log("si se puede esta posicion")
                this.array[random1][random2]='C'
            }
            document.getElementById('tabla').innerHTML=""
            this.PintarMapa()
        }
        GenerarPosicionFantasma(){
            let random1=Math.floor(Math.random()*this.array.length)
            let random2=Math.floor(Math.random()*this.array.length)
            //console.log(random1+"este es el random1")
            //console.log(random2+"este es el random2")
            if(this.array[random1][random2]=='x' || this.array[random1][random2]=='C'){
              //  console.log("no se puede esta posicion")
                this.GenerarPosicionFantasma()
            }else{
                //console.log("si se puede esta posicion")
                this.array[random1][random2]='F'
            }
            document.getElementById('tabla').innerHTML=""
            this.PintarMapa()
        }
        ComprobarBotones(){
            let botones=document.getElementById('botones')
           // console.log(botones)
            botones.onclick=(e) =>{
                if(e.target.id=='arriba'){
                    console.log("pulsaste arriba")
                    this.Mover((this.posicionPacman[0])-1,this.posicionPacman[1])
                    this.PintarMapa()
                }else if(e.target.id=='abajo'){
                    console.log("pulsaste abajo")
                    this.Mover((this.posicionPacman[0])+1,this.posicionPacman[1])
                    this.PintarMapa()
                }else if(e.target.id=='derecha'){
                    console.log("pulsaste derecha")
                    this.Mover(this.posicionPacman[0],(this.posicionPacman[1])+1)
                    this.PintarMapa()
                }else if(e.target.id=='izquierda'){
                    console.log("pulsaste izquierda")
                    this.Mover(this.posicionPacman[0],(this.posicionPacman[1])-1)
                    this.PintarMapa()
                }
            }
        }
        Mover(pos1,pos2){
            console.log("posicion actual"+this.posicionPacman[0]+" "+this.posicionPacman[1])
            this.array[pos1][pos2]='C'
            this.array[this.posicionPacman[0]][this.posicionPacman[1]]=''
            this.posicionPacman[0]=pos1
            this.posicionPacman[1]=pos2
            console.log("posicion a mover :"+pos1+" "+pos2)
            console.log(this.array[pos1][pos2])

        }
    } 
}


var juego = new pacman.Pacman()
//juego.PintarMapa()
//console.log(juego)
//var posArr=0
//let v = juego.array[0].indexOf('C')
//console.log(v)

juego.GenerarPosicionPacman()
juego.GenerarPosicionFantasma()
juego.ComprobarBotones()
//juego.Mover(0,1)