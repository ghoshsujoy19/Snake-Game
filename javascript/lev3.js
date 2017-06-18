
var drawModule = (function () { 

  var bodySnake = function(x, y) {
  	if (pfoodtype == 20) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
     }
     else if (pfoodtype==6) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
     }
     else if (pfoodtype==3) {
     	  ctx.fillStyle = 'blue';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
     }
     else {
     	  ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
     }
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
  }

  var pizza2 = function(x, y) {
  		  ctx.fillStyle = 'blue';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, (snakeSize-2), (snakeSize-2));
  }
	
	var pizza1 = function(x, y) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'blue';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }
  var pizza = function(x, y) {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
        ctx.fillStyle = 'red';
        ctx.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);
  }


  var drawSnake = function() {
      var length = 4;
      snake = [];
      for (var i = length-1; i>=0; i--) {
          snake.push({x:i, y:0});
      }  
  }
    
  paint = function(){
      ctx.fillStyle = 'lightgrey';
      ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, 0, w, h);

		
      var snakeX = snake[0].x;
      var snakeY = snake[0].y;

      if (direction == 'right') { 
        snakeX=(snakeX+1)%50; }
      else if (direction == 'left') { 
        snakeX=(snakeX+49)%50; }
      else if (direction == 'up') { 
        snakeY=(snakeY+49)%50; 
      } else if(direction == 'down') { 
        snakeY=(snakeY+1)%50; }

      if (checkCollision(snakeX, snakeY, wall_arrayh) || checkCollision(snakeX,snakeY,snake) || checkCollision(snakeX,snakeY,wall_arrayv)) {
          //restart game
          
			document.getElementById("goback").style.display = "block";
			document.getElementById("maingame").style.display = "none";
			document.getElementById("points").style.display = "none";
			document.getElementById("note").style.display = "none"; 
			document.getElementById("goford").style.display = "none";
         ctx.clearRect(0,0,w,h);
         gameloop = clearInterval(gameloop);
         return;          
        }
        if(score >= toScore)
          {
					document.getElementById("goford").style.display = "block";
					document.getElementById("maingame").style.display = "none";
					document.getElementById("points").style.display = "none";
					document.getElementById("note").style.display = "none";
					document.getElementById("goback").style.display = "none";
          }
        if(snakeX == food.x && snakeY == food.y) {
          var tail = {x: snakeX, y: snakeY}; //Create a new head instead of moving the tail
          if(foodtype==6)
        {
				 score = score + 20;
        }
        if (foodtype==3) { 
        		score = score +15 ;
        	}
        	if (foodtype!= 6 && foodtype!= 3) {
        		score = score + 10;
        	}
          document.getElementById("current_score").innerHTML = "  "+score+"   " ;
          visited = false;
          createFood(); //Create new food
        } else {
          var tail = snake.pop(); //pops out the last cell
          tail.x = snakeX; 
          tail.y = snakeY;
        }
        //The snake can now eat the food.
        snake.unshift(tail); //puts back the tail as the first cell

        for(var i = 0; i < snake.length; i++) {
          bodySnake(snake[i].x, snake[i].y);
        } 
        if(!visited){
        	pfoodtype = foodtype;
        foodtype = Math.round(Math.random()*10);
        visited = true;
     }
        if(foodtype==6)
        {
				 pizza2(food.x, food.y);
        }
        if (foodtype==3) { 
        		pizza1(food.x,food.y);
        	}
        	if (foodtype!= 6 && foodtype!= 3) {
        		pizza(food.x,food.y);
        	}
        	create_wall_horizontal();
        	create_wall_vertical();
  }

  var createFood = function() {
      food = {
        x: Math.floor((Math.random() * 49) + 1),
        y: Math.floor((Math.random() * 49) + 1)
      }
      
		if (food.x==0 && (food.y<16 && food.y>=0)) {food.x++;}         //food shdnt collide with walls
		if (food.x==49 && (food.y<50 && food.y>=35)) {food.x--;}
		if (food.y==0 && (food.x<50 && food.x>=35)) {food.y++;}
		if (food.y==49 && (food.x<16 && food.x>=0)) {food.y--;}
		if (food.x==24 && (food.y<45 && food.y>=25)) {food.x++;}		
		if (food.y==15 && (food.x<36 && food.x>=15)) {food.y++;}
		
		
      for (var i=0; i>snake.length; i++) {
        var snakeX = snake[i].x;
        var snakeY = snake[i].y;
      
        if (food.x===snakeX && food.y === snakeY || food.y === snakeY && food.x===snakeX) {
          food.x = Math.floor((Math.random() * 49) + 1);
          food.y = Math.floor((Math.random() * 49) + 1);
        }
      }
  }

var create_wall_horizontal = function() {
		var length = 15;
		var randomx = 35;
		var randomy = 0;
		ctx.fillStyle = "black";
		ctx.fillRect(randomx*snakeSize,randomy*snakeSize,length*snakeSize,snakeSize);
		if(!hwallvisit){
		for (var i = length - 1; i >= 0; i--)
		{
			wall_arrayh.push({x:randomx + i, y: randomy});
		}}
		length = 15;
		randomx = 0 ;
		randomy = 49 ;
		ctx.fillStyle = "black";
		ctx.fillRect(randomx*snakeSize,randomy*snakeSize,length*snakeSize,snakeSize);
		if (!hwallvisit) {
		for (var i = length - 1; i >= 0; i--)
		{
			wall_arrayh.push({x: randomx + i, y: randomy});
		}}
		length = 20;
		randomx = 15 ;
		randomy = 15 ;
		ctx.fillStyle = "black";
		ctx.fillRect(randomx*snakeSize,randomy*snakeSize,length*snakeSize,snakeSize);
		if (!hwallvisit) {
		for (var i = length - 1; i >= 0; i--)
		{
			wall_arrayh.push({x: randomx + i, y: randomy});
		}}
		hwallvisit = true;
}

var create_wall_vertical = function() {
		var length = 20;
		var randomx = 24;
		var randomy = 25;
		ctx.fillStyle = "black";
		ctx.fillRect(randomx*snakeSize,randomy*snakeSize,snakeSize,length*snakeSize);
		if(!vwallvisit){
		for (var i = length - 1; i >= 0; i--)
		{
			wall_arrayh.push({x:randomx , y: randomy+i});
		}}
		length = 15;
		randomx = 0 ;
		randomy = 0 ;
		ctx.fillStyle = "black";
		ctx.fillRect(randomx*snakeSize,randomy*snakeSize,snakeSize,length*snakeSize);
		if (!vwallvisit) {
		for (var i = length - 1; i >= 0; i--)
		{
			wall_arrayh.push({x: randomx , y: randomy + i});
		}}
		length = 15;
		randomx = 49 ;
		randomy = 35 ;
		ctx.fillStyle = "black";
		ctx.fillRect(randomx*snakeSize,randomy*snakeSize,snakeSize,length*snakeSize);
		if (!vwallvisit) {
		for (var i = length - 1; i >= 0; i--)
		{
			wall_arrayh.push({x: randomx , y: randomy + i});
		}}
		vwallvisit = true;
}

gamePaused	= function() {
		if (!p) {
			gameloop = clearInterval(gameloop);
			p = true;
		}
		else {
			gameloop = setInterval(paint,80);
			p = false;
		}
	}

  var checkCollision = function(x, y, array) {
      for(var i = 0; i < array.length; i++) {
        if(array[i].x === x && array[i].y === y)
        return true;
      } 
      return false;
  }

  var init = function(){
      direction = 'down';
      drawSnake();
      createFood();
      toScore = 200;
      gameloop = setInterval(paint, 80);
  }


    return {
      init : init
    };

    
}());
