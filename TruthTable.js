function truthTable(N,min,red){
	var in_this=true;
	var canvas=document.getElementById("mycanvas"),
	context=canvas.getContext("2d");
	if(N==4){
		canvas.height*=2;
	}
	else if(N==5){
		canvas.height*=3;
	}

	var height=canvas.height,
	width=canvas.width;
	var VARIABLES=['A','B','C','D','E','F'];
	context.strokeStyle="#00ff00";

	var P=Math.pow(2,N),i,j,H_Saparation=40,W_Saparation=200;
	
	run();
function run(){
	context.fillStyle="#0f3dfd";
	context.font=" bold 50px Arial Black"
	context.fillText("Truth Table:",100,40);
	context.fillStyle="#f30f54";
	context.font="bold 30px Monaco";
	for(i=0;i<N;i++)
		context.fillText(VARIABLES[i],(i+1)*W_Saparation,100);
	context.fillText("Output",(N+1)*W_Saparation-50,100);	
	for(i=0;i<P;i++){
		context.fillStyle="#f30f54";
		context.fillText(i+".",100,i*H_Saparation+150);
		for(j=0;j<N;j++)
			context.fillText(Math.floor((i%Math.pow(2,N-j))/Math.pow(2,N-j-1)),(j+1)*W_Saparation,150+i*H_Saparation);
		context.fillStyle="#330f00";
		if(red[i]==1)
			context.fillText("X",(j+1)*W_Saparation,150+i*H_Saparation);
		else
			context.fillText(min[i],(j+1)*W_Saparation,150+i*H_Saparation);
	}
	for(i=0;i<P;i++)
		context.strokeRect(170,120+H_Saparation*i,(N+1)*W_Saparation-100,H_Saparation);
	for(i=1;i<=N;i++)
		line(120+i*W_Saparation,120,120+i*W_Saparation,120+H_Saparation*P);

	context.fillStyle="#454544";
	context.font="30px Courier New";
	context.fillText("Press Enter ",1120,20);
	context.strokeStyle="#00ff00";
	context.lineWidth=3;
	line(1120,23,1320,23);
}
function line(a,b,c,d){
	context.beginPath();
	context.moveTo(a,b);
	context.lineTo(c,d);
	context.stroke();
}
function exit(){
	in_this=false;
	context.clearRect(0,0,width,height);
	canvas.height=window.innerHeight-200;
	SOP(N,min,red);
}
window.addEventListener("keydown",function(event){
	//console.log(event.keyCode,in_this);
	if(in_this){
		if(event.keyCode==13){
			exit();
		}
	}
});
};