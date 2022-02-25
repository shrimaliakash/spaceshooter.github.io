var jet = document.getElementById("jet");
var board = document.getElementById("board");

window.addEventListener("keydown",(e)=>{
	var left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
	if(e.key == "ArrowLeft" && left > 0) {
		jet.style.left = left - 10 + "px";
	} else if(e.key == "ArrowRight" && left <= 460) {
		jet.style.left = left + 10 + "px";
	}
	if(e.key == "ArrowUp" || e.keyCode == 32) {
		var bullet = document.createElement("div");
		bullet.classList.add("bullets");
		board.appendChild(bullet);

		var moveBullet = setInterval(() => {
			var rockets = document.getElementsByClassName("rocket");
			for(var i=0; i<rockets.length; i++) {
				var rocket = rockets[i];

				var rocketBound = rocket.getBoundingClientRect();
				var bulletBound = bullet.getBoundingClientRect();

				if(bulletBound.left >= rocketBound.left && bulletBound.right <= rocketBound.right && 
				   bulletBound.top <= rocketBound.top && bulletBound.bottom <= rocketBound.bottom) {
					rocket.parentElement.removeChild(rocket);
					document.getElementById("points").innerHTML = parseInt(document.getElementById("points").innerHTML) + 1;
				}
			}
			var bulletBottom = parseInt(window.getComputedStyle(bullet).getPropertyValue("bottom"));
			if(bulletBottom >= 500) {
				clearInterval(moveBullet);
			}
			bullet.style.left = left + "px";
			bullet.style.bottom = bulletBottom + 3 + "px";
		});
	}
});

var generateRockets = setInterval(() => {
	var rocket = document.createElement("div");
	rocket.classList.add("rocket");
	var rocketLeft = parseInt(window.getComputedStyle(rocket).getPropertyValue("left"));
	rocket.style.left = Math.floor(Math.random() * 450) + "px";
	board.appendChild(rocket);
}, 1500);

var moveRockets = setInterval(() => {
	var rockets = document.getElementsByClassName("rocket");
	if(rockets!=undefined) {
		for(var i=0; i<rockets.length; i++) {
			var rocket = rockets[i];
			var rocketTop = parseInt(window.getComputedStyle(rocket).getPropertyValue("top"));
			if(rocketTop >= 475) {
				var game_over = document.getElementById('game_over');
				game_over.style.display = 'inline';
				clearInterval(moveRockets);
				setInterval(() => {
					window.location.reload();
				}, 500);
			}
			rocket.style.top = rocketTop + 20 + "px";
		}
	}
}, 450);