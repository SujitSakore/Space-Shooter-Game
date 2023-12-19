var rocket = document.getElementById('rocket');
var board = document.getElementById('board');
var boardWidth = parseInt(board.offsetWidth);
var boardHeight = parseInt(board.offsetHeight);
var score = 0;
var bulletCounts = 200;
var alienCount = 100;
var play = false;

window.addEventListener('keydown', (e) => {
    var left = parseInt(window.getComputedStyle(rocket).getPropertyValue("left"));
    if(e.key == 'ArrowLeft' && left>0) {
        rocket.style.left = left - 15 + "px";
    }
    else if(e.key == "ArrowRight" && left <= boardWidth-36) {
        rocket.style.left = left + 15 + "px";
    }
    if(e.key == "ArrowUp" || e.keyCode == 32 &&bulletCounts>0 && play===true && alienCount>0) {
        var bullet_sound = new Audio('./sound/alien_end.mp3');
        bullet_sound.play();
        var bullet = document.createElement("div");
        bullet.classList.add("bullets");
        board.appendChild(bullet);
        bulletCounts--;
        document.getElementById('display-bullet').innerText=bulletCounts;
        if(bulletCounts<=0) {
            var gameOver = new Audio('./sound/gameOver.mp3');
            gameOver.play();
            setTimeout(()=>{
                window.alert("No missile left");
                window.location.reload();
            },4000);
        }
        var moveBullets = setInterval( ()=> {
            var aliens = document.getElementsByClassName('alien');
            for(var i=0;i<aliens.length;i++) {
                var alien = aliens[i];
                var alienBound = alien.getBoundingClientRect();
                var bulletBound = bullet.getBoundingClientRect();

                if(bulletBound.left>=alienBound.left&&
                    bulletBound.right<=alienBound.right&&
                    bulletBound.top<=alienBound.top&&
                    bulletBound.bottom<=alienBound.bottom) {
                        var alien_end = new Audio('./sound/alien_end.mp3');
                        alien_end.play();
                      alien.parentElement.removeChild(alien);
                      bullet.parentElement.removeChild(bullet);
                      score++;
                      alienCount--;
                        document.getElementById('display-score').innerText=score;
                        document.getElementById('display-alien').innerText=alienCount;
                    }
            }
            var bulletBottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));
            
              //Stops the bullet from moving outside the gamebox
              if (bulletBottom >= 1000) {
                clearInterval(moveBullets);
              }
            bullet.style.left = left + 10 +"px";
            bullet.style.bottom = bulletBottom + 3 + "px";
        });
    }
});



document.getElementById('start').addEventListener('click', function() {
    document.getElementById('message').style.display = "none";
    play=true;
})

var generateAliens = setInterval( ()=>{
    if(play===true&&alienCount>=0) {
        var alien = document.createElement("div");
        alien.classList.add("alien");
        // alienCount--;
        if(alienCount==0) {
            play=false;
            var audio = new Audio('./sound/KidsCheering.mp3');
            audio.play();
            setTimeout(()=>{
                alert("You Won!");
                window.location.reload();
            },4000);
            alienCount--;
        }
        var alienleft = parseInt(window.getComputedStyle(alien).getPropertyValue("left"));
        alien.style.left = Math.floor(Math.random()*(boardWidth-60)) + "px";
        board.appendChild(alien);
    }

},1500);


var moveAlien = setInterval( ()=> {
    var aliens = document.getElementsByClassName('alien');
    if(aliens!=undefined && play===true) {
        for(var i=0;i<aliens.length;i++) {
            var alien = aliens[i];
            var alienTop = parseInt(window.getComputedStyle(alien).getPropertyValue("top"));

            if(alienTop>=boardHeight-60) {
                play=false;
                var gameOver = new Audio('./sound/gameOver.mp3');
                gameOver.play();
                clearInterval(moveAlien);
                setTimeout(()=>{
                    window.alert("Game Over");
                    window.location.reload();
                },5000);
            }
            alien.style.top = alienTop + 20 + "px";
        }
    }
    
},750);

var fireButton = document.getElementById('fire');
var leftButton = document.getElementById('left');
var rightButton = document.getElementById('right');

fireButton.addEventListener('click',()=>{
    if(bulletCounts>0 && play===true && alienCount>0) {
        var left = parseInt(window.getComputedStyle(rocket).getPropertyValue("left"));
        var bullet_sound = new Audio('./sound/alien_end.mp3');
        bullet_sound.play();
        var bullet = document.createElement("div");
        bullet.classList.add("bullets");
        board.appendChild(bullet);
        bulletCounts--;
        document.getElementById('display-bullet').innerText=bulletCounts;
        if(bulletCounts<=0) {
            var gameOver = new Audio('./sound/gameOver.mp3');
            gameOver.play();
            setTimeout(()=>{
                window.alert("No missile left");
                window.location.reload();
            },5000);
        }
        var moveBullets = setInterval( ()=> {
            var aliens = document.getElementsByClassName('alien');
            for(var i=0;i<aliens.length;i++) {
                var alien = aliens[i];
                var alienBound = alien.getBoundingClientRect();
                var bulletBound = bullet.getBoundingClientRect();
    
                if(bulletBound.left>=alienBound.left&&
                    bulletBound.right<=alienBound.right&&
                    bulletBound.top<=alienBound.top&&
                    bulletBound.bottom<=alienBound.bottom) {
                        var alien_end = new Audio('./sound/alien_end.mp3');
                        alien_end.play();
                        alien.parentElement.removeChild(alien);
                        bullet.parentElement.removeChild(bullet);
                        score++;
                        alienCount--;
                        document.getElementById('display-score').innerText=score;
                        document.getElementById('display-alien').innerText=alienCount;
                    }
            }
            var bulletBottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));
            
                //Stops the bullet from moving outside the gamebox
                if (bulletBottom >= 1000) {
                    clearInterval(moveBullets);
                }
            bullet.style.left = left + 10 +"px";
            bullet.style.bottom = bulletBottom + 3 + "px";
        });
    }
    
});

leftButton.addEventListener('click',()=>{
    var left = parseInt(window.getComputedStyle(rocket).getPropertyValue("left"));
    if(left>0) {
        rocket.style.left = left - 15 + "px";
    }
});

rightButton.addEventListener('click',()=>{
    var left = parseInt(window.getComputedStyle(rocket).getPropertyValue("left"));
    if(left<=boardWidth-36) {
        rocket.style.left = left + 15 + "px";
    }
})