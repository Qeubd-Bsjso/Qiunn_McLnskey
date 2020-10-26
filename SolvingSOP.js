//SOP(4,[0,0,0,0,0,0,0,0,1,0,1,1,0,0,1,1],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
function SOP(N,Arr,dc){
	//console.log(Arr)
	class Minterm{
		constructor(a,b,n,c,d){
		this.Bin=a;
		this.No_of_one=b;
		this.IsChecked=0;
		this.number=n;
		this.Nums=c;
		this.Nums=this.Nums.concat(d);
		this.X=[];
		}
		sort_X(){
			for(var a=0;a<this.X.length-1;a++)
				for(var b=a;b<this.X.length-1;b++){
					if(this.X[j]>this.X[j+1]){
						var temp=this.X[j];
						 this.X[j]=this.X[j+1];
						 this.X[j+1]=temp;
					}
				}
		}
	};
	var Numbers=[],no_of_minterms=0;
	for(var i=0;i<Math.pow(2,N);i++){
		if(Arr[i]==1||dc[i]==1){
			Numbers.push(i);
			no_of_minterms+=1;
		}
	}
	var Minterms=[];
	for(i=0;i<no_of_minterms;i++){
		var t=Numbers[i],sum=0,temp=[];
		for(var j=0;j<N;j++){
			temp.unshift(t%2);
			sum+=t%2;
			t=Math.floor(t/2);
		}
		var temp2=new Minterm(temp,sum,Numbers[i],[Numbers[i]],[]);
		//temp2.Bin=temp;
		//temp2.No_of_one=sum;
		//temp2.Nums.push(Numbers[i]);
		Minterms.push(temp2)

	}
	//console.log("Minterms:",Minterms);
	var column=[];
	for(i=0;i<=N;i++){
		var group=[];
		for(j=0;j<no_of_minterms;j++){
			if(Minterms[j].No_of_one==i){
				group.push(Minterms[j]);
			}
		}
		column.push(group);
	}
	var chart=[column];
	//console.log(chart);
	//Loops TO Create A Chart
	for(i=0;i<N-1;i++){
		var Col=[];
		for(j=0;j<chart[i].length-1;j++){
			var gp=[];
			for(var k=0;k<chart[i][j].length;k++)
				for(var l=0;l<chart[i][j+1].length;l++){
					
					if(IsEqual(chart[i][j][k].X,chart[i][j+1][l].X)){
						var check=IsPowOfTwo(pos(chart[i][j][k].number-chart[i][j+1][l].number),N);
						if(check!=0){
							var temp3=new Minterm([],chart[i][j][k].No_of_one,chart[i][j][k].number,chart[i][j][k].Nums,chart[i][j+1][l].Nums);
							temp3.Bin=temp3.Bin.concat(chart[i][j][k].Bin);
							temp3.Bin[N-check]=2;
							temp3.X=temp3.X.concat((chart[i][j][k].X));
							temp3.X[temp3.X.length]=(check-1);
							temp3.sort_X();							
							gp.push(temp3);
							chart[i][j][k].IsChecked=1;
							chart[i][j+1][l].IsChecked=1;
						}

					}
				}
				Col.push(gp);
		}
		chart.push(Col);
	}
	//console.log(chart);

	var PI_Index=[],NumberOfPI=0;
	var NumberCounter=[];
	for(i=0;i<Math.pow(2,N);i++){
		NumberCounter.push(0);
	}
	for(i=0;i<chart.length;i++)
		for(j=0;j<chart[i].length;j++)
			for(k=0;k<chart[i][j].length;k++)
				if(chart[i][j][k].IsChecked==0){
					chart[i][j][k].Nums.sort();
					var no=true;
					for(l=0;l<PI_Index.length;l++){
						if(IsEqual(chart[i][j][k].Bin,chart[PI_Index[l][0]][PI_Index[l][1]][PI_Index[l][2]].Bin))
							no=false;
					}
					if(no)
					{
						PI_Index.push([i,j,k]);
						NumberOfPI++;
						for(l=0;l<Math.pow(2,i);l++){
						NumberCounter[chart[i][j][k].Nums[l]]++;
					}
				}
			}
	//console.log(chart[PI_Index[i][0]][PI_Index[i][1]][PI_Index[i][2]]);
	//console.log("NumberCounter",NumberCounter);

	for(i in NumberCounter){
		if(dc[i]==1){
			NumberCounter[i]=0;
		}
	}

	var EPI_Index=[],NumberOfEPI=0;var m,n,p;

	for(i=0;i<Math.pow(2,N);i++){
		if(NumberCounter[i]==1){
			for(j=0;j<NumberOfPI;j++){
				if(chart[PI_Index[j][0]][PI_Index[j][1]][PI_Index[j][2]].Nums.includes(i)){
					EPI_Index.push(PI_Index[j]);
					NumberOfEPI++;
					for(k=0;k<Math.pow(2,PI_Index[j][0]);k++){
						NumberCounter[chart[PI_Index[j][0]][PI_Index[j][1]][PI_Index[j][2]].Nums[k]]=0;
					}
					j=NumberOfPI;
				}
			}
		}
	}
	
		//console.log("EPI:",EPI_Index);

		PI_X=[],PI_Y=[],No_of_remaining_MT=0;
		for(i =0;i<NumberCounter.length;i++){
			if(NumberCounter[i]!=0){
				PI_X.push(i);
				No_of_remaining_MT++;
			}
		}
		while(No_of_remaining_MT){

					for(i in PI_Index){
						if(!EPI_Index.includes(PI_Index[i]))
							PI_Y.push(PI_Index[i]);
					}

					var max=0;
					for(i in PI_Y){
						if( chart[PI_Y[i][0]][PI_Y[i][1]][PI_Y[i][2]].Nums.length>max){
							max=chart[PI_Y[i][0]][PI_Y[i][1]][PI_Y[i][2]].Nums.length;
						}
					}

					for(i=0;i<PI_Y.length;i++){
						if( chart[PI_Y[i][0]][PI_Y[i][1]][PI_Y[i][2]].Nums.length==max){
							EPI_Index.push(PI_Y[i]);
							for(k=0;k<Math.pow(2,PI_Y[i][0]);k++){
									NumberCounter[chart[PI_Y[i][0]][PI_Y[i][1]][PI_Y[i][2]].Nums[k]]=0;}
							i=PI_Y.length;
						
					}
				}
					PI_Y.splice(0,PI_Y.length);
					PI_X.splice(0,No_of_remaining_MT);
					No_of_remaining_MT=0;
					for(i =0;i<NumberCounter.length;i++){
							if(NumberCounter[i]!=0){
								PI_X.push(i);
								No_of_remaining_MT++;
							}
					}	
				
  } 
  //print();	
  	function print(){

						var VARIABLE=['A','B','C','D','E','F','G','H'];
		document.write("Simplified SOP Expression is :");
		for(i=0;i<EPI_Index.length;i++){
			for(j=0;j<N;j++){
				if(chart[EPI_Index[i][0]][EPI_Index[i][1]][EPI_Index[i][2]].Bin[j]==1)
					{document.write(VARIABLE[j]);console.log(VARIABLE[j])}
				else if(chart[EPI_Index[i][0]][EPI_Index[i][1]][EPI_Index[i][2]].Bin[j]==0)
					{document.write(VARIABLE[j]);console.log(VARIABLE[j]);
						document.write("'");console.log("'");}
			}
			if(i<EPI_Index.length-1){
				document.write("+");console.log("+");
			}
		}
	}	

	Circuit(N,EPI_Index,chart);
}

function IsPowOfTwo(Num ,n){
	for(i=0;i<=n;i++){
		if(Math.pow(2,i)==Num)
			return i+1;
	}
	return 0;
}
function IsEqual(a,b){
	if(a.length!=b.length)
		return false;
	else
	{
		for(var i=0;i<a.length;i++)
			if(a[i]!=b[i])
				return false;
	}
	return true;
}
function pos(a){
	if(a>=0)
		return a;
	else
		return -a;
}