var res=0;
in_this=true;
function Choosing_Number_of_Variables(){
	var N=0;
	var canvas=document.getElementById("mycanvas"),
	context=canvas.getContext("2d");
	var height=canvas.height,
	width=canvas.width=window.innerWidth;
	/*var G=context.createLinearGradient(0,0,width,height);
								G.addColorStop(0,"#0000ff");
								G.addColorStop(0.2,"#00ff00");
								G.addColorStop(0.4,"#ff0000");
								G.addColorStop(0.6,"#ffff00");
								G.addColorStop(0.8,"#ff00ff");
								G.addColorStop(1,"#00ffff");*/
	var Saparation_=20,H=70,L=500,XBlock=800,YBlock=250,Block_Height=50,Block_Width=60,j,a,b,k=0;
	var ColoR=["rgba(0,255,0,0.7)","rgba(201,220,200,0.7)","rgba(255,255,0,0.7)","rgba(255,20,100,0.7)","rgba(100,100,200,0.7)","rgba(20,02,100,0.7)"];
	var text_ColoR=["rgba(20,101,100,1)","rgba(100,100,10,1)","rgba(100,100,200,1)","rgba(255,255,0,1)","rgba(200,10,20,1)"];
	class Plate{
	constructor(a,b,c,d,e,t){
		this._x=a;
		this._y=b;
		this.active_Length=L;
		this.mouse_on=false;
		this.text=t;
		this.text_color=c;
		this.big_grad=context.createLinearGradient(this._x,this._y,this._x+L+200,this._y+H);
		this.grad=context.createLinearGradient(this._x,this._y,this._x+L,this._y+H);
		this.grad.addColorStop(0,d);
		this.grad.addColorStop(1,e);
		this.big_grad.addColorStop(0,d);
		this.big_grad.addColorStop(1,e);
	}
	get_Number(){
		if(this.mouse_on)
			return this.text;
		else return 0;
	}
	Print(){
		if(this.mouse_on){
			this.active_Length=L+20;
			context.fillStyle=this.big_grad;
			context.fillRect(this._x,this._y,this.active_Length,H);
			context.fill();
			context.fillStyle=this.text_color;
			context.fillText(this.text+"  -" ,this._x+100,this._y+50);
			for(var m=0;m<this.text;m++){
				context.fillText(VARIABLES[m],this._x+200+50*m,this._y+50);
				if(m<this.text-1)
					context.fillText(" ,",this._x+200+(50*m+20),this._y+50);
			}
		}
		else{
				this.active_Length=L;
				context.fillStyle=this.grad;
				context.fillRect(this._x,this._y,this.active_Length,H);
				context.fill();
				context.fillStyle=this.text_color;
				context.fillText(this.text,this._x+50,this._y+50);
		}
	}
	is_mouse_on(x,y){
		if(x>this._x&&x<this._x+this.active_Length&&y>this._y&&y<this._y+H)
			{
			this.mouse_on=true;
			return true;
		}
		else {
			this.mouse_on=false;
			return false;
		}
	}
}

	var rad=3,ReqID,able=true,x,y,okay=0;
	var VARIABLES=['A','B','C','D','E','F'];
	var P=[];
	for(var i=0;i<4;i++){
							var temp = new Plate(50,100+(H+Saparation_)*i,text_ColoR[i],ColoR[i],ColoR[i+1],i+2);;
							P.push(temp);	
						}

	run();
	function run(){
					N=0;
					context.clearRect(0,0,width,height);
					context.fillStyle="#ff0000";
					context.font="bold 50px Trebuchet MS";
					context.fillText(" Select Number Of Variables:  ",50,50);
					context.fillStyle="#0ff000";
					context.font="30px Comic Sans MS";
					context.strokeStyle="#4af0af";
					context.lineWidth=5;
					context.strokeRect(800,0,500,80);
					context.strokeStyle="#000000";
					context.fillText("Quine–McCluskey Algorithm",850,50);
					context.font = "800 40px Verdana";
				for(i=0;i<4;i++){
						//N=P[i].get_Number();
						P[i].Print();
						if(N<P[i].get_Number())
							N=P[i].get_Number();
						
					}
					if(N)
							{ 
								a=Math.floor(N/2);
							 b=N-a;
							 context.lineWidth=2;
							context.beginPath();
							context.moveTo(XBlock,YBlock);
							context.lineTo(XBlock-50,YBlock-50);
							context.stroke();
							context.fillStyle="rgba(0,200,0,0.8)";
							for(i=0;i<N;i++){
								if(i<a)
									context.fillText(VARIABLES[i],XBlock-60,YBlock+30+45*i-20);
								else
									context.fillText(VARIABLES[i],XBlock+40*(i-a)-20,YBlock-5-30);
							}
							
								
							context.strokeRect(XBlock,YBlock,Block_Width*2*b,Block_Height*2*a);
							for(i=0;i<2*a;i++){
								for(j=0;j<2*b;j++){
								
							context.strokeRect(XBlock+j*Block_Width,YBlock+i*Block_Height,Block_Width,Block_Height);
							
						}
					}}
					ReqID=window.requestAnimationFrame(run);
	}
	function exit(){
		if(k<1){
			context.clearRect(width/2-width*k/2,height/2-height*k/2,width*k,height*k);
			k+=0.1;
			ReqID=window.requestAnimationFrame(exit);
		}
		else
			{
				cancelAnimationFrame(ReqID);
				document.getElementById("mycanvas").style.cursor="default";
				in_this=false;
				Minterm(res);
		}
	}
	window.addEventListener("mousemove",function(event){
		if(in_this){var test=false;
		for(i=0;i<4;i++){
			{if(P[i].is_mouse_on(event.clientX,event.clientY))
				test=true;}
		}				
		if(test){
			document.getElementById("mycanvas").style.cursor="pointer";
		}
		else{
			document.getElementById("mycanvas").style.cursor="default";
		}
	}});
	canvas.addEventListener("mousedown",click);
	function click(){
		if(in_this){ res=P[0].get_Number()||P[1].get_Number()||P[2].get_Number()||P[3].get_Number();
		if(res){
			cancelAnimationFrame(ReqID);
			exit();
		}
	}}	
	return res;
	function create_line(a,b,c,d){
		context.beginPath();
		context.moveTo(a,b);
		context.lineTo(c,d);
		context.stroke();
	}
}