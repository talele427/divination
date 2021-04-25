var w = window.innerWidth;
var h = window.innerHeight;

console.log("left,right,up,down");

var side = 50;
var n = 13;

var mover=0;

var playing;

var houses = [
    [0,0,0,0,3,3,3,3,3,6,6,6,6],
    [0,0,0,0,3,3,3,3,3,6,6,6,6],
    [0,0,0,0,3,3,3,3,3,6,6,6,6],
    [0,0,0,0,3,3,3,3,3,6,6,6,6],
    [1,1,1,1,4,4,4,4,4,7,7,7,7],
    [1,1,1,1,4,4,4,4,4,7,7,7,7],
    [1,1,1,1,4,4,4,4,4,7,7,7,7],
    [1,1,1,1,4,4,4,4,4,7,7,7,7],
    [1,1,1,1,4,4,4,4,4,7,7,7,7],
    [2,2,2,2,5,5,5,5,5,8,8,8,8],
    [2,2,2,2,5,5,5,5,5,8,8,8,8],
    [2,2,2,2,5,5,5,5,5,8,8,8,8],
    [2,2,2,2,5,5,5,5,5,8,8,8,8],
]

var players = [
    {
        x : 6,
        y: 0,
        level: 1,
        index: 0,
        name: "Wealth",
        house: 1,
        attract: ["Greed","Rage"],
        repel: [],
        wall:[],
        group : [],
        type : "desire",
        is_playing: true,
        col_r: 0,
        col_g: 255,
        col_b: 0
    },
    {
        x : 4,
        y: 3,
        level: 1,
        index: 1,
        name: "Greed",
        house : 1,
        attract: [],
        repel: [],
        wall:[],
        group :[],
        type : "emotion", 
	    parent : "Wealth",
        is_playing: true,
        col_r: 255,
        col_g: 255,
        col_b: 0,
    },
    {
        x : 8,
        y: 3,
        level: 1,
        index: 2,
        house :1, 
        name: "Rage",
        attract: [],
        repel: [],
        wall:[],
        group :[],
        type : "emotion",
	    parent : "Wealth",
        is_playing: true,
        col_r: 255,
        col_g: 0,
        col_b: 0
    },
    {
        x : 0,
        y: 6,
        level: 1,
        index: 3,
        name: "Power",
        type : "desire",
        house: 3,
        attract: ["Rage","Fear"],
        repel: [],
        group :[],
        type : "desire",
        is_playing: true,
        col_r: 255,
        col_g: 0,
        col_b: 0
    },
    {
        x : 3,
        y: 4,
        level: 1,
        index: 4,
        name: "Rage",
        house : 3,
        attract: [],
        repel: [],
        wall:[],
        group :[],
        type : "emotion",
	    parent : "Power",
        is_playing: true,
        col_r: 255,
        col_g: 0,
        col_b:0
    },
    {
        x : 3,
        y: 8,
        level: 1,
        index: 5,
        house :3, 
        name: "Fear",
        attract: [],
        repel: [],
        wall:[],
        group :[],
        type : "emotion",
	    parent : "Power",
        is_playing: true,
        col_r: 0,
        col_g:0,
        col_b:0,
    },
    {
        x : 6,
        y: 12,
        level: 1,
        index: 6,
        name: "Love",
        house: 7,
        attract: ["Envy","Lust"],
        repel: [],
        wall:[],
        group :[],
        type : "desire",
        is_playing: true,
        col_r: 255,
        col_g: 0,
        col_b: 255,
    },
    {
        x : 4,
        y: 9,
        level: 1,
        index: 7,
        name: "Envy",
        house : 7,
        attract: [],
        repel: [],
        wall:[],
        group: [],
        type : "emotion",
	    parent : "Love",
        is_playing: true,
        col_r: 34,
        col_g: 176,
        col_b:4,
    },
    {
        x : 8,
        y: 9,
        level: 1,
        index: 8,
        house :7, 
        name: "Lust",
        attract: [],
        repel: [],
        wall:[],
        group :[],
        type : "emotion",
	    parent : "Love",
        is_playing: true,
        col_r: 255,
        col_g: 0,
        col_b: 0
    },
    {
        x : 12,
        y: 6,
        level: 2,
        index: 9,
        name: "Knowledge",
        house: 5,
        attract: [],
        repel: ["Fear","Dishonesty"],
        wall:[],
        group :[],
        type : "desire",
        is_playing: true,
        col_r: 255,
        col_g: 153,
        col_b: 0
    },
    {
        x : 9,
        y: 4,
        level: 1,
        index: 10,
        name: "Dishonesty",
        house : 5,
        attract: [],
        repel: [],
        wall:[],
        group :[],
        type : "emotion",
	    parent : "Knowledge",
        is_playing: true,
        col_r: 255,
        col_g:255,
        col_b:0
    },
    {
        x : 9,
        y: 8,
        level: 1,
        index: 12,
        house : 5, 
        name: "Fear",
        attract: [],
        repel: [],
        wall:[],
        group :[],
        type : "emotion",
	    parent : "Knowledge",
        is_playing: true,
        col_r: 0,
        col_g: 0,
        col_b:0
    }
];

function setup() {
    createCanvas(w,h);
    frameRate(5);
}

function draw() {
    var r=0,g=0,b=0;

    var x=100,y=100;
    var w=side, h=(n)*side;

    background(255);
    for(var i=0; i<n; i++) {
        if(i<=3) {
            r=255;
            g=255;
            b=0;
        }
        else if(i<=8){
            r=255;
            g=0;
            b=0;
        }
        else if(i<n){
            r=0;
            g=0;
            b=255;
        }
        stroke(r,g,b,30);
        fill(r,g,b,30);
        rect(x,y,w,h);
        rect(y,x,h,w);
        x+=side;
    }
    fill(0,150,200);

    for(var i=0; i<players.length; i++) {
        player = players[i];
        if(i==mover) fill(player.col_r,player.col_g,player.col_b);
	
        else fill(player.col_r,player.col_g,player.col_b);
        if(players[i].group.length > 0) fill(player.col_r,player.col_g,player.col_b);
        if(player.type == "desire") rect(100+player.x*side+2,100+player.y*side+2,side-4,side-4);
        else circle(100+player.x*side+side/2,100+player.y*side+side/2,side-20);
    }

}

function mousePressed() {
    for(var t=0; t < 6;t++){   //simulation speed
        if(players[mover].is_playing) move(players[mover]);
        mover = (mover+1)%(players.length)
    }
}

function interactions(x,y) {
    console.log(players[x].name + " meets " + players[y].name)
    if(x==y) return
    if(players[x].x != players[y].x | players[x].y != players[y].y) return //assert same spot
    if(players[x].type == players[y].type) return // emotions do not interact among themselves
    else {
        players[x].group.push(y)
        players[y].group.push(x)
        if(players[y].type == "emotion") players[y].is_playing = false;
        else if(players[x].type == "emotion") players[x].is_playing = false
        console.log(players[x].name + " and " + players[y].name + " are now a group.")
    }
    
}

function findDesireIndex(name){
	var a=99;
	for(var i=0; i<players.length;i++){
		
		if(name==players[i].name) a = i
	}
	return a;
}

function move(p){
	
	if(p.type == "desire"){
		console.log(p.name+":") 
		var left=5,right=5,up=5,down=5;
		if(p.x == 0) left = 0 //walls
		else if(p.x == n-1) right = 0;
		if(p.y==0) up = 0;
		else if(p.y==n-1) down = 0;
	
		if(p.level == 1){

			if(left > 0 && p.house != houses[p.x-1][p.y]) left -=3 //house walls
			if(right >0 && p.house != houses[p.x+1][p.y]) right -=3
			if(up>0 && p.house != houses[p.x][p.y-1]) up-=3
			if(down>0 && p.house != houses[p.x][p.y+1]) down-=3

		}
		else if(p.level == 2){
			if(left > 0 && p.house != houses[p.x-1][p.y]) left +=3 //house walls
			if(right >0 && p.house != houses[p.x+1][p.y]) right +=3
			if(up>0 && p.house != houses[p.x][p.y-1]) up+=3
			if(down>0 && p.house != houses[p.x][p.y+1]) down+=3

		}
		
		for(var i=0;i<players.length;i++) {
			if(i==p.index) continue
         		if(p.attract.includes(players[i].name) && p.name==players[i].parent){ //attracts
				if(Math.abs(p.x - players[i].x) <= 2 && Math.abs(p.y - players[i].y) <=2){
					if(p.x > players[i].x) left += 2
					else if(p.x < players[i].x) right +=2
					if(p.y > players[i].y) up += 2
					else if(p.y < players[i].y) down += 2
				}
			}
			else if(p.repel.includes(players[i].name) && p.name==players[i].parent){ //repels
				if(Math.abs(p.x - players[i].x) <= 2 && Math.abs(p.y - players[i].y) <=2){
					if(p.x > players[i].x) left -= 2
					else if(p.x < players[i].x) right -=2
					if(p.y > players[i].y) up -= 2
					else if(p.y < players[i].y) down -= 2
				}
			}	
		}
		
		console.log(left,right,up,down);
		

	var x = []
	for(var i=0;i<left;i++) x.push(0)
	for(var i=0;i<right;i++) x.push(1)
	for(var i=0;i<up;i++) x.push(2)
	for(var i=0;i<down;i++) x.push(3)
	var move = random(x)
	switch(move) {
		case 0: p.x -= 1; console.log(p.name+" moves LEFT")
	        break
	        case 1: p.x += 1; console.log(p.name+" moves RIGHT")
        	break
        	case 2: p.y -= 1; console.log(p.name+" moves UP")
        	break
        	case 3: p.y += 1; console.log(p.name+" moves DOWN")	
        	break
    	}
	if(p.group.length > 0) {
	        for(var j=0;j<p.group.length;j++) {
	            players[p.group[j]].x = p.x
	            players[p.group[j]].y = p.y
	        }
	}
	for(var i=0;i<players.length;i++) {
		if(p.index != i && !(i in p.group) && p.x==players[i].x && p.y == players[i].y) {
	        interactions(mover,i)
	        break
        		}
		}
			
	}

	else if(p.type=="emotion"){
		console.log(p.name+":") 
		var left=5,right=5,up=5,down=5;
		if(p.x == 0) left = 0 //walls
		else if(p.x == n-1) right = 0;
		if(p.y==0) up = 0;
		else if(p.y==n-1) down = 0;
		
		if(p.level == 1){

            if(left!=0 && p.house != houses[p.x-1][p.y]) left=0 //house walls
            if(right != 0 && p.house != houses[p.x+1][p.y]) right=0
            if(up>0 && p.house != houses[p.x][p.y-1]) up=0
            if(down>0 && p.house != houses[p.x][p.y+1]) down=0
            
            if(left==0 && down==0) right=5,up=5 //wall corners
            if(left==0 && up==0) right=5,down=5
            if(right==0 && down==0) left=5, up=5
            if(right==0 && up==0) left=5, down=5
            
            if(left==0 && down!=0 && up !=0) right=0 //wall philia
            if(right==0 && down!=0 && up!=0) left=0
            if(down==0 && left!=0 && right!=0) up=0
            if(up==0 && left!=0 && right!=0) down=0

            if(left!=0 && p.house != houses[p.x-1][p.y]) left=0 //house walls
            if(right != 0 && p.house != houses[p.x+1][p.y]) right=0
            if(up>0 && p.house != houses[p.x][p.y-1]) up=0
            if(down>0 && p.house != houses[p.x][p.y+1]) down=0

			if(p.parent=="Knowledge"){ //knowledge exception
				var a = findDesireIndex("Knowledge");
				if(players[a].x > p.x) right +=7
				else if(players[a].x < p.x) left +=7
				if(players[a].y > p.y) down +=7
				else if(players[a].y < p.y) up +=7
			}
		}
		else if(p.level == 2){
			if(left > 0 && p.house != houses[p.x-1][p.y]) left +=3 //house walls
			if(right >0 && p.house != houses[p.x+1][p.y]) right +=3
			if(up>0 && p.house != houses[p.x][p.y-1]) up+=3
			if(down>0 && p.house != houses[p.x][p.y+1]) down+=3

			
		}
		
	
		console.log(left,right,up,down);

	var x = []
	for(var i=0;i<left;i++) x.push(0)
	for(var i=0;i<right;i++) x.push(1)
	for(var i=0;i<up;i++) x.push(2)
	for(var i=0;i<down;i++) x.push(3)
	var move = random(x)
	switch(move) {
		case 0: p.x -= 1; console.log(p.name+" moves LEFT")
	        break
	        case 1: p.x += 1; console.log(p.name+" moves RIGHT")
        	break
        	case 2: p.y -= 1; console.log(p.name+" moves UP")
        	break
        	case 3: p.y += 1; console.log(p.name+" moves DOWN")	
        	break
    	}
	if(p.group.length > 0) {
	        for(var j=0;j<p.group.length;j++) {
	            players[p.group[j]].x = p.x
	            players[p.group[j]].y = p.y
	        }
	}
	for(var i=0;i<players.length;i++) {
		if(p.index != i && !(i in p.group) && p.x==players[i].x && p.y == players[i].y) {
	        interactions(mover,i)
	        break
        		}
		}
			
	}

}

/*function move(player) {
    console.log(player.name+":")
    var left=5,right=5,up=5,down=5;
    //  walls
    if(player.x == 0) left = 0
    else if(player.x == n-1) right = 0;
    if(player.y==0) up = 0;
    else if(player.y==n-1) down = 0;

    if(player.type == "desire") { //for desires only
        
        for(var i=0;i<players.length;i++) {
            if(i==player.index) continue
            if(player.x==players[i].x){ //tends to move towards other players to the left or right
                if(left != 0 && player.y-players[i].y == 1) {
                    left += 2;
 //                   console.log(players[i].name+" to the left. ",left)
                }
                else if(right!= 0 && player.y-players[i].y == -1) {
                    right += 2;
 //                   console.log(players[i].name+" to the right. ",right)
            }
        }
            else if(player.y==players[i].y) { //tends to moves towards other players above or below
                if(up != 0 && player.x-players[i].x == -1) {
                    up += 2;
//                    console.log(players[i].name+" above. ",up)
                }
                else if(down != 0 && player.y-players[i].y == -1){
                    down += 2;
//                    console.log(players[i].name+" below. ",down)
                }             }
        }
        if(player.level==1){
            if(left!=0 && houses[player.x-1][player.y] != player.house) {
                left -= 2
//                console.log("house boundary to the left")
            }
            if(right!=0 && houses[player.x+1][player.y] != player.house){ right -= 2
//            console.log("house boundary to the right")
        } 
            if(up!=0 && houses[player.x][player.y-1] != player.house){ up -= 2
//            console.log("house boundary above")
        }
            if(down!=0 && houses[player.x][player.y+1] != player.house) {down -= 2
//            console.log("house boundary below")
        }
        }
    }
    else if(player.level==1){
        if(left!=0 && houses[player.x-1][player.y] != player.house) left =0
        if(right!=0 && houses[player.x+1][player.y] != player.house) right = 0 
        if(up!=0 && houses[player.x][player.y-1] != player.house) up = 0
        if(down!=0 && houses[player.x][player.y+1] != player.house) down = 0
    }


    console.log(houses[player.x][player.y])
    
    var x = []
    for(var i=0;i<left;i++) x.push(0)
    for(var i=0;i<right;i++) x.push(1)
    for(var i=0;i<up;i++) x.push(2)
    for(var i=0;i<down;i++) x.push(3)
    console.log(left,up,right,down)
    var move = random(x)
    switch(move) {
        case 0: player.x -= 1; console.log(player.name+" moves LEFT")
        break
        case 1: player.x += 1; console.log(player.name+" moves RIGHT")
        break
        case 2: player.y -= 1; console.log(player.name+" moves UP")
        break
        case 3: player.y += 1; console.log(player.name+" moves DOWN")
        break
    }
    if(player.group.length > 0) {
        for(var j=0;j<player.group.length;j++) {
            players[player.group[j]].x = player.x
            players[player.group[j]].y = player.y
        }
    }
    for(var i=0;i<players.length;i++) {
        if(player.index != i && !(i in player.group) && player.x==players[i].x && player.y == players[i].y) {
            interactions(mover,i)
            break
        }
    }
}
*/


