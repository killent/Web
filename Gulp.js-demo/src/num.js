function demo(obj,pra)
{	
	if(document.getElementById('check').checked==true){
		getKey(obj,pra,'tips');
	}else{
		getKey(obj,pra,'amount');
	}

}

function getKey(obj,pra,id)
{
	switch(pra)
	{
		case 1:
			var con=document.getElementById(id).value;
			if(document.getElementById(id).value.length>8) return 0;
			var val = obj.value/100;
			document.getElementById(id).value = (con*10 + val).toFixed(2);
			break;
		case 2:
			if(document.getElementById(id).value.length<=4)
			{
				var con = document.getElementById(id).value.replace(/\./, '').slice(0,-1);  //正则去点-->退位
				if(con<=0.01)
					document.getElementById(id).value='0.00';
				else
					document.getElementById(id).value =  (con/100).toFixed(2);			
			}
			else
			{
				var con = document.getElementById(id).value.replace(/\./, '').slice(0,-1);
				document.getElementById(id).value = con.slice(0,-2) + '.' + con.slice(con.length-2,con.length); //拼凑金额
			}		
			break;
		case 3:
			if(document.getElementById(id).value.length>=8) return 0;
			var con=document.getElementById(id).value*100;
			var val = obj.value/100;
			document.getElementById(id).value = (con + val).toFixed(2);
			break;
	}
}

