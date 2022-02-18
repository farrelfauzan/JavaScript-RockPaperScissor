// OOP Version

class GameRPS {
    constructor(player, comp){
        this.player = player;
        this.comp = comp;
        this.result = null;
        this.round = 1


        // DOM Select
        this.versus = document.querySelector (".VS h1");
        this.resultClass = document.querySelector (".VS div");
        this.textResult = document.querySelector (".VS h5");
        this.compBox = document.querySelectorAll (".box.compImage");
        this.playerBox = document.querySelectorAll (".box.playerImage");
    }

    getResult(player, comp){
        if (player.choice === comp.choice) this.result = 'DRAW';
        if (player.choice === 'batu' && comp.choice === 'gunting') { this.result = 'PLAYER 1 <br>  WIN'; }
        if (player.choice === 'batu' && comp.choice === 'kertas') { this.result = 'COM <br>WIN'; }
        if (player.choice === 'kertas' && comp.choice === 'batu') { this.result = 'PLAYER  1 <br>WIN'; }
        if (player.choice === 'kertas' && comp.choice === 'gunting') { this.result = 'COM  <br>WIN'; }
        if (player.choice === 'gunting' && comp.choice === 'kertas') { this.result = 'PLAYER 1 <br> WIN'; }
        if (player.choice === 'gunting' && comp.choice === 'batu') { this.result = 'COM <br> WIN'; }  
    }

    setGreyBoxPlayer(player){
        if (player.choice === 'batu') { 
            this.playerBox[0].style.backgroundColor = '#c4c4c4'; 
        } 
        else if (player.choice === 'kertas') {
             this.playerBox[1].style.backgroundColor = '#c4c4c4'; 
            } else this.playerBox[2].style.backgroundColor = '#c4c4c4';
    }

    setGreyBoxComp(comp){
        if (comp.choice === 'batu') { 
            this.compBox[0].style.backgroundColor = '#c4c4c4'; 
        } else if (comp.choice === 'kertas') { 
            this.compBox[1].style.backgroundColor = '#c4c4c4'; 
        } else this.compBox[2].style.backgroundColor = '#c4c4c4';
    }

    showResult(player, comp){
    this.versus.style.color = '#9c835f';
    this.resultClass.classList.add('result');
    this.textResult.innerHTML = this.result;
    this.textResult.style.backgroundColor = '#4c9654';
    if (this.result === 'DRAW') { this.textResult.style.backgroundColor = '#225c0e'; }
    this.setGreyBoxComp(comp);
    }

    compMikir(){
        let start = new Date().getTime();
        let i = 0 ;

        setInterval(() =>{
        if (new Date().getTime() - start >= 1000){
            clearInterval;
            return;
        }

        //* Comp try to think before play
        this.compBox[i++].style.backgroundColor = "#c4c4c4";
        if (i == this.compBox.length) i = 0;
        }, 50);

        setTimeout(() =>{
            setInterval(() => {
                if (new Date().getTime() - start >= 1200) {
                  clearInterval;
                  return;
                }
                //* Reselect the DOM 
                const compBox = document.querySelectorAll('.box.compImage');
                compBox[i++].style.backgroundColor = '#9c835f';
                if (i == compBox.length) i = 0;
            }, 50);
        }, 50);
    }   

    startGameRPS(player, comp){
        comp.getPilihanKomputer();
        this.getResult(player, comp);
        this.setGreyBoxPlayer(player);

        this.compMikir();

        //* Nunjukin hasil setelah compMikir()
        setTimeout(()=>{
            this.showResult(player, comp);
        }, 1200);

        this.round++;
    }

    refresh(){
        this.textResult.innerHTML = '';
        this.resultClass.classList.remove('result');
        this.versus.style.color = 'black';
        this.result = null;
    
        for (let i = 0; i < this.compBox.length; i++) {
          this.playerBox[i].style.backgroundColor = '#9c835f';
          this.compBox[i].style.backgroundColor = '#9c835f';
    }
  }
}

class Player{
    constructor(){
        this.choice = null
    }

    getPlayerChoice(choice){
        this.choice = choice;
    }
}

class Comp extends Player{
    constructor(){
        super();
    }

    getPilihanKomputer(){
        const comp = Math.random();
        if (comp < 0.34) this.choice = "batu";   
        if (comp >= 0.34 && comp < 0.67) this.choice =  "kertas";
        this.choice ="gunting"
    }
}

//* Initialization Object
let player1 = new Player();
let bot = new Comp();
let game = new GameRPS();

//* Event Listener for player choices
document.querySelectorAll('.box .player').forEach((choice)=>{
    choice.addEventListener('click',()=>{
        // The game can be play if there's no result (null)
        if(!game.result){
            const playerChoice = choice.className.substr(7,7)
            
            player1.getPlayerChoice(playerChoice);

            // Start RPS Game
            game.startGameRPS(player1, bot)
        }else{
            alert("Tekan refresh terlebih dahulu untuk mengulang")
        }
    })
})


//* Refresh

document
.querySelector(".refresh")
.addEventListener ('click', () => game.refresh());

