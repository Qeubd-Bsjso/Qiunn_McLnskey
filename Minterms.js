function Minterm(N){
var in_this=true;
var canvas=document.getElementById("mycanvas"),
	context=canvas.getContext("2d"),
	width=canvas.width,
	height=canvas.height=588;
	/*if(N==4){
		canvas.height*=1.6;
	}
	else if(N==5){
		canvas.height*=2.2;
	}*/
	class Button_{
	constructor(x,y){
		this._x=x;
		this._y=y;
		this.is_checked=false;
		this.is_minterm=false;
		this._is_redundant=false;
		this.mouse_on1=false;
		this.mouse_on2=false;
	}
	Print(){
		if(this.mouse_on1)
			context.fillStyle="#ffff00";
		else	
			{
				if(this.is_checked)
					context.fillStyle="#d3d3d3";
				else
					context.fillStyle="#ffffff";
			}
		Circle(this._x,this._y,8,true);
		if(this.mouse_on2)
			context.fillStyle="#ffff00";
		else	
			{
				if(this.is_checked)
					context.fillStyle="#d3d3d3";
				else
					context.fillStyle="#ffffff";
			}
		Circle(this._x+60,this._y,8,true);
		context.strokeStyle="#000000";
		Circle(this._x,this._y,8,false);
		Circle(this._x+60,this._y,8,false);
		if(this.is_minterm){
			context.fillStyle="#0000ff";
			Circle(this._x,this._y,4,true);
		}
		else if(this._is_redundant){
			context.fillStyle="#0000ff";
			Circle(this._x+60,this._y,4,true)
		}
	}
	update(x,y,click){
		if(x>this._x&&x<this._x+16&&y>this._y-5&&y<this._y+12)
			{
				this.mouse_on1=true;
				if(click){
					this.is_checked=!this.is_checked;
					if(!this._is_redundant)
					this.is_minterm=!this.is_minterm;
				}
			}
		else if(x>this._x+60&&x<this._x+16+60&&y>this._y-5&&y<this._y+12)
			{
				this.mouse_on2=true;
				if(click){
					this.is_checked=!this.is_checked;
					if(!this.is_minterm)
					this._is_redundant=!this._is_redundant;
				}
			}
		else{
			this.mouse_on1=false;
			this.mouse_on2=false;
		}
	}

}
	var X=100,Y=30,ReqID,submit=false,pow=Math.pow(2,N),point;
	var B=[];
	for(var j=0;j<Math.pow(2,N);j++){
		var temp=new Button_(350*(j%3)+20+80,50*Math.floor(j/3)+60+15);
		B.push(temp);
	}
run();
		function run(){
					point=false;
					context.font = "30px Comic Sans MS";
					context.fillText("Choose Apropriate",1000,50);
					context.fillText("Minterms or",1000,100);
					context.fillText("Redundant terms:",1000,150);
					context.fillStyle="#df0000";
					context.font = "25px Impact";
					for(j=0;j<3;j++)
						{
							context.fillText("min",80+350*j,50);
							context.fillText("red",80+350*j+65,50);
						}	
					for(j=0;j<Math.pow(2,N);j++)
						{
							if(B[j].mouse_on1||B[j].mouse_on2)
								point=true;
							B[j].Print();}
					for(j=0;j<pow;j++){
						context.fillStyle="#0fff00";
						context.fillRect(350*(j%3)+20,50*Math.floor(j/3)+60,40,30)
						context.strokeRect(350*(j%3)+20,50*Math.floor(j/3)+60,40,30);
						context.fillStyle="#f400ff";
						context.fillText(j,350*(j%3)+20+10,50*Math.floor(j/3)+60+25)
					}
					context.fillStyle="#000000";
					context.font = "bold 20px  monospace";
					context.fillText("Press Enter TO Submit",1000,500+30);
					if(point)
						document.getElementById("mycanvas").style.cursor="pointer";
					else
					document.getElementById("mycanvas").style.cursor="default";
					ReqID=window.requestAnimationFrame(run);
	}

	function exit(){
		in_this=false;
		context.fillStyle=document.body.style.backgroundColor;
		context.clearRect(0,0,width,height);
		var Min=[],ReD=[];
		for(j=0;j<pow;j++){
			if(B[j].is_minterm)
				Min.push(1);
			else
				Min.push(0);
			if(B[j]._is_redundant)
				ReD.push(1);
			else
				ReD.push(0);
		}
		document.getElementById("mycanvas").style.cursor="default";
		//console.log(Min,ReD);
		truthTable(N,Min,ReD);
	}
	function Circle(x,y,r,fi_st){
		context.beginPath();
		context.arc(x,y,r,0,2*Math.PI,false);
		if(fi_st)
			context.fill();
		else
			context.stroke();
	}
	document.getElementById("mycanvas").addEventListener("mousemove",function(event){
		if(in_this){
		if(event.clientX>=1100&&event.clientX<=1100+100&&event.clientY>=500&&event.clientY<=500+40){
			document.getElementById("mycanvas").style.cursor="pointer";
			submit=true;
		}
		
		else
		{
			document.getElementById("mycanvas").style.cursor="default";
			submit=false;
		}
			for(j=0;j<Math.pow(2,N);j++){
				B[j].update(event.clientX,event.clientY,false);
			}}
	});
	window.addEventListener("mousedown",function(event){
		if(in_this){
			for(j=0;j<Math.pow(2,N);j++){
				B[j].update(event.clientX,event.clientY,true);
			}
		}
	});
	window.addEventListener("keydown",function(event){
		if(in_this){
			if(event.keyCode==13){
				window.cancelAnimationFrame(ReqID);
				exit();
			}
		}
	})	
}