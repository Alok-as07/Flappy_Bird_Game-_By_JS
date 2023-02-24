let bird = document.querySelector(".bird");
let gamedisplay = document.querySelector(".gamecontainer");
let bodyy = document.querySelector(".bodyy");
let ground = document.querySelector(".moveroad");
let birdleft = 250;
let birdbottom = 345; 
let gravity = 1.4;
let gameoverstate = false;
let gap = 550;
let gameOverbox=document.querySelector(".gameovermsgbox");

if (!gameoverstate) {
  function startGame() {
    birdbottom -= gravity;
    bird.style.bottom = birdbottom + "px";
    bird.style.left = birdleft + "px";
  }
  let timerId = setInterval(() => {
    startGame();
  }, 10);
  
 
    function control() {
    document.onkeyup = (e) => {
      console.log("key code is: ", e.keyCode);
      if (e.keyCode == 32  ) {
        jump();
      }
    };
   };
  function jump() {
    if (birdbottom < 650) {
      birdbottom += 100;
      bird.style.bottom = birdbottom + "px";
    }
  }
  document.addEventListener("keyup", control);

  function generateObstacle() {
    let obstacleleft = 1500;
    let obstaclebottom;
    let randomheight = Math.random() * 100;
    if (randomheight < 100) {
      obstaclebottom = randomheight;
    }
    const obstacle = document.createElement("div");
    const topObstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
    topObstacle.classList.add("topObstacle");
    gamedisplay.appendChild(obstacle);
    gamedisplay.appendChild(topObstacle);
    obstacle.style.left = obstacleleft + "px";
    topObstacle.style.left = obstacleleft + "px";
    obstacle.style.bottom = obstaclebottom + "px";
    topObstacle.style.bottom = obstaclebottom+gap+"px";
    function moveObstacle() {
      obstacleleft -= 2;
      obstacle.style.left = obstacleleft + "px";
      topObstacle.style.left = obstacleleft + "px";
      if (obstacleleft === -60) {
        clearInterval(timerobstacle);
        gamedisplay.removeChild(obstacle);
        gamedisplay.removeChild(topObstacle);
      }
      console.log("bird btm : "+birdbottom);

    
      if (((obstacleleft >= 240 && obstacleleft <= 260) && (birdbottom <= 350 + obstaclebottom)) ||birdbottom <= 100) {
        gameOver();
        gameOverbox.style.visibility = 'visible';
      }
      else if(((obstacleleft >= 240 && obstacleleft <= 260) && (birdbottom >= (gap-70) + obstaclebottom )))
      {
        gameOver();
        gameOverbox.style.visibility = 'visible';
      }
    }
    let timerobstacle = setInterval(() => {
      moveObstacle();
    }, 10);
    if (!gameoverstate) {
      let timerId = setTimeout(() => {
        generateObstacle();
      }, 2000);
    }
    function gameOver() {
      clearInterval(timerobstacle);
      clearInterval(timerId);
      gameoverstate = true;
      document.removeEventListener("keyup", control);
      // let gameovermsg = document.createElement("div");
      // gameovermsg.classList.add("gameovermsg");
      // gamedisplay.appendChild(gameovermsg);
      // gameovermsg.innerHTML = "<h1> GAME OVER </h1> <br> ";
      gameOverbox.style.visibility = 'visible';
    }
  }
  btn = document.querySelector('#refresh');
        btn.addEventListener("click", function () {
            location.reload();
        });

  generateObstacle();
}
