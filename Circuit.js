function Circuit(n,EPI,Chart){
	var canvas=document.getElementById("mycanvas"),
	context=canvas.getContext("2d");
	var	width=canvas.width=1300,
	height=canvas.height=1500,
	in_this=true,
	END=2*Math.PI;
	var N=n;
	var i,j,k,choice,ReqID,Number_of_EPI=EPI.length;
	var VARIABLES=['A','B','C','D','E'];
	console.log(Number_of_EPI,EPI,Chart);
	class Variable{
		constructor(a,b){
			this.status=0;
			this.posX=a;
			this.posY=b;
		}
		update(a,b){
			if(a>this.posX-5&&a<this.posX+35&&b>this.posY-10&&b<this.posY+20){
					this.status=not(this.status);
			}
		}
		is_in(a,b){
			if(a>this.posX-5&&a<this.posX+35&&b>this.posY-10&&b<this.posY+20)
				return true;
			else
				return false;
		}
		Print(){
			context.fillStyle="rgba("+255*this.status+","+255*this.status+","+200*not(this.status)+",1";
			context.strokeStyle="#000000";
			context.fillRect(this.posX-10,this.posY-15,40,30);
			context.strokeRect(this.posX-10,this.posY-15,40,30);
		}
	}

	var Val=[];
	for(i=0;i<N;i++){
			var temp=new Variable(50+100*i,80);
			Val.push(temp);
		}


	class And_Gate{
		constructor(this_EPI,x,y){
			this.binary_form=Chart[this_EPI[0]][this_EPI[1]][this_EPI[2]].Bin;
			var sum=0;
			//console.log(this.binary_form)
			for( i=0;i<N;i++){
				//console.log(this.binary_form[i])
				if(this.binary_form[i]==1){
						sum+=1;
					}
				else if(this.binary_form[i]==0){
						sum+=1;
					}
			}
			this.length=sum+1;
			//console.log(this.length)
			this.posX=x;
			this.posY=y;
			this.outputX=x+50;
			this.outputY=y+25;
			this.output=1;
			for(i=0;i<N;i++){
				if(this.binary_form[i]==1){
					this.output*=Val[i].status;
				}
				else if(this.binary_form[i]==0){
					this.output*=not(Val[i].status);
				}
			}
			this.temp_len=1;
		}
		Print(){
		context.lineWidth=1;
		context.strokeStyle="#0fdd0d";
		context.fillStyle="#ffffff";
		context.beginPath();
		context.moveTo(this.posX,this.posY);
		context.lineTo(this.posX,this.posY+50);
		context.ellipse(this.posX,this.posY+25,50,25,0,-END/4,END/4,false);
		context.fill();
		context.stroke();
		wire(this.outputX,this.outputY,this.outputX+50,this.outputY,this.output);
		this.temp_len=1;
		for(i=0;i<N;i++){
			if(this.binary_form[i]==1){
					wire(58+100*i,this.posY+(this.temp_len)*50/this.length,this.posX,this.posY+(this.temp_len)*50/this.length,Val[i].status);
					Point(58+100*i,this.posY+(this.temp_len)*50/this.length);
					this.temp_len++;
				}
			else if(this.binary_form[i]==0){
					wire(108+100*i,this.posY+(this.temp_len)*50/this.length,this.posX,this.posY+(this.temp_len)*50/this.length,not(Val[i].status));
					Point(108+100*i,this.posY+(this.temp_len)*50/this.length);
					this.temp_len++;
				}
		}
		this.update();
		}
		update(){
			this.output=1;
			for(i=0;i<N;i++){
				if(this.binary_form[i]==1){
					this.output*=Val[i].status;
				}
				else if(this.binary_form[i]==0){
					this.output*=not(Val[i].status);
				}
			}
		}
	};
	var Anding=[];
	for(var a=0;a<Number_of_EPI;a++){
		var temp=new And_Gate(EPI[a],800,70*(a)+150);
			Anding.push(temp);
		//console.log(a+1);
	}
	class OR_Gate{
		constructor(){
			this.posX=1000;
			this.posY=150+Math.floor(Number_of_EPI/2)*70;
			this.output=0;
			this.outputX=this.posX+50;
			this.outputY=this.posY+25;
		}
		Print(){
			this.update();
			for(i=0;i<Number_of_EPI;i++){
				wire(Anding[i].outputX+50,Anding[i].outputY,this.posX+15,this.posY+25,Anding[i].output);
			}
			context.lineWidth=1;
			context.strokeStyle="#0fdd0d";
			context.fillStyle="#ffffff";
			context.beginPath();
			context.ellipse(this.posX,this.posY+25,50,25,0,-END/4,END/4,false);
			context.lineTo(this.posX+7,this.posY+37);
			context.lineTo(this.posX+10,this.posY+25);
			context.lineTo(this.posX+7,this.posY+13);
			context.lineTo(this.posX,this.posY);
			context.fill();
			context.stroke();
			wire(this.outputX,this.outputY,this.outputX+100,this.outputY,this.output);
			context.fillStyle="rgba("+255*this.output+","+255*this.output+",0,1)";
			context.font="30px Lucida Grande";
			context.fillText("OUTPUT",this.outputX+100,this.outputY+8);
		}
		update(){
			this.output=0;
			for(i=0;i<Number_of_EPI;i++){
				this.output=this.output+Anding[i].output;
			}
			if(this.output)
				this.output=1;
		}
	}
	var or=new OR_Gate;
		
	if(Number_of_EPI)
		run();
	else{

	}

	function run(){
		context.clearRect(0,0,width,height);
		Variables_input();
		Product();
		or.Print();
	}

	function Variables_input(){
		context.font="20px Lucida Grande";
		for(i=0;i<N;i++){
			context.fillStyle="#f000af";
			context.fillText(VARIABLES[i],50+100*i,60);
			Val[i].Print();
			wire(58+100*i,102,58+100*i,150*(Number_of_EPI+1)-100,Val[i].status);
			wire(58+100*i,110,58+100*i+50,110,Val[i].status);
			wire(58+100*i+50,110,58+100*i+50,120,Val[i].status);
			Not_Gate(58+100*i+50,120);
			wire(58+100*i+50,134,58+100*i+50,150*(Number_of_EPI+1)-100,not(Val[i].status));
			Point(58+100*i,110);
			Point(58+100*i+50,110);
			Point(58+100*i,150*(Number_of_EPI+1)-100);
			Point(58+100*i+50,150*(Number_of_EPI+1)-100);
		}
	}
	function Product(){
		for(var t=0;t<Number_of_EPI;t++){
			Anding[t].Print();
		}
	}
	function wire(a,b,c,d,is_on){
		context.strokeStyle="rgba("+255*is_on+","+255*is_on+",0,1)";
		context.lineWidth=2;
		context.beginPath();
		context.moveTo(a,b);
		context.lineTo(c,d);
		context.stroke();
	}
	function Point(a,b){
		context.fillStyle="#000000";
		context.beginPath();
		context.arc(a,b,2,0,END,false);
		context.fill();
	}
	function not(a){
		return (1-a);
	}
	function Not_Gate(a,b){
		context.lineWidth=1;
		context.strokeStyle="#0fdd0d";
		context.beginPath();
		context.moveTo(a-8,b);
		context.lineTo(a+8,b);
		context.lineTo(a,b+10);
		context.lineTo(a-8,b);
		context.arc(a,b+12,2,0,END,false);
		context.stroke();
	}
	window.addEventListener("mousedown",function(event){
		if(in_this){
			for(i=0;i<N;i++)
				{
					Val[i].update(event.clientX,event.clientY);
				}
			for(var t=0;t<Number_of_EPI;t++){
					Anding[t].update();
			}
			ReqID=window.requestAnimationFrame(run);
		}

	});
	window.addEventListener("mousemove",function(event){
		if(in_this){
			choice=false;
			for(i=0;i<N;i++)
				choice=choice||Val[i].is_in(event.clientX,event.clientY);
			if(choice)
				document.getElementById("mycanvas").style.cursor="pointer";
			else
				document.getElementById("mycanvas").style.cursor="default";
		}
	});
}