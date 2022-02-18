// Membuat pilihan dari komputer
function getPilihanKomputer(){
    const comp = Math.random();
    if (comp < 0.34) return "batu";   
    if (comp >= 0.34 && comp < 0.67) return "kertas";
    return "gunting" 
};

// Ruls Permainan
let result = null
function getResult(comp, player){
    if (player == comp) return result = "DRAW";
    if (player == "batu") return ( comp == "gunting") ? result =  'PLAYER 1 <br> WIN' : result = "COM <br>WIN";
    if ( player == "kertas") return (comp == "batu") ? result = 'PLAYER 1 <br> WIN' : result = 'COM <br> WIN';
    if (player = "gunting") return (comp == "kertas") ? result = 'PLAYER 1 <br> WIN' : result ="COM <br> WIN";    
};

/* GAME START */
// DOM Selector

const versus = document.querySelector (".VS h1");
const resultClass = document.querySelector (".VS div");
const textResult = document.querySelector (".VS h5");
const compBox = document.querySelectorAll (".box.compImage");
const playerBox = document.querySelectorAll (".box.playerImage");

//* adding delay for comp

function wait(){
    let start = new Date().getTime();
    let i = 0 ;

    setInterval(function(){
        if (new Date().getTime() - start >= 1000){
            clearInterval;
            return;
        }

        compBox[i++].style.backgroundColor = "#c4c4c4";
        if (i == compBox.length) i = 0;
    }, 50);

    setTimeout(function(){
        setInterval(function(){
            if (new Date().getTime() - start >= 1200) {
                clearInterval;
                return;
            }

            compBox[i++].style.backgroundColor = '#9c835f';
            if (i == compBox.length) i = 0 ;

            
        }, 50);
    }, 50);
}

//* Menangkap pilihan pemain

let player = document.querySelectorAll(".box .player");
for (let i = 0; i < playerBox.length; i++) {
    playerBox[i].style.backgroundColor = '#9c835f';
}

player.forEach(function(choice){
    choice.addEventListener("click",function(){

        if (result == null) {
            let compChoice = getPilihanKomputer();
            let playerChoice = choice.className.substr(7,7);
            	/* Jalankan Rules permainan untuk mendapatkan hasil */
			result = getResult(compChoice, playerChoice);

			/* Berikan greyBox pada pilihan pemain */
			if (playerChoice == 'batu') {
				playerBox[0].style.backgroundColor = '#c4c4c4';
			}
			else if (playerChoice == 'kertas') {
				playerBox[1].style.backgroundColor = '#c4c4c4';
			}
			else {
				playerBox[2].style.backgroundColor = '#c4c4c4';
			}

            wait();

            setTimeout(function(){
                	/* Samarkan tulisan VS dengan background saat hasil ditampilkan */
				versus.style.color = '#9c835f';

				/* Tampilkan class result */
				resultClass.classList.add('result');

				/* Tampilkan hasil dalam class result (kotak hijau) */
				textResult.innerHTML = result;
				if (result == "DRAW") {
					textResult.style.backgroundColor = '#225c0e';
				}
				else {
					textResult.style.backgroundColor = '#4c9654';
				}

                /* Berikan greyBox pada comp choice */
				if (compChoice == 'batu') {
					compBox[0].style.backgroundColor = '#c4c4c4';
				}
				if (compChoice == 'kertas') {
					compBox[1].style.backgroundColor = '#c4c4c4';
				}
				if (compChoice == 'gunting') {
                    compBox[2].style.backgroundColor = '#c4c4c4';
                }
            }, 1200)
        }
        else {
            alert("Tekan refresh terlebih dahulu untuk mengulang")
        }
    })
})


//* Reset game
let reset = document.querySelector(".refresh")
reset.addEventListener('click', function(){
    textResult.innerHTML = "";
    resultClass.classList.remove('result');

    for (let i = 0; i < compBox.length; i++) {
        playerBox[i].style.backgroundColor = '#9c835f';
        compBox[i].style.backgroundColor = "#9c835f"
    }

    versus.style.color = "black"

    result = null
});

