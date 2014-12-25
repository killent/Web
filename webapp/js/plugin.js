/*************************************************************************************/
//
// 				SIMULATE TRANSACTION 
//
/*************************************************************************************/
var i = 3;

//1. 声明函数
function test()
{ 
	//pull up to load more Txn record
	this.func1 = function (succ, fail) {
		console.log('func1');
		var data = [];
		var rand =  (Math.random()*10).toFixed(2);		
		data = [{cardtype:"loadMore",amount:rand,tradetype:"void sale3",date:"2014-10-17 18:26:15",apprcode:"p"}, 
				{cardtype:"loadMore",amount:(rand*10).toFixed(2),tradetype:"void sale2",date:"2014-10-8 18:26:15",apprcode:"s"}];	
		
		return data;
	};
	
	//Txn step
	this.func2 = function (succ, fail) {
		console.log('func2');
		
		i--;
		
		return i;
	};
	
	//search Txn NO.
	this.func3 = function (succ, fail) {
		console.log('func3');
		var data = {};
		var rand =  parseInt(Math.random()*100);
		data = {cardtype:succ, amount:'3.00', tradetype:rand, date:"2014-10-17 18:26:15", apprcode:"S"};
			
		return data;
	};
	
	//pull down to refresh Txn record	
	this.func4 = function (succ, fail) {
		console.log('func4');
		var data = [];
		var rand =  (Math.random()*10).toFixed(2);
		if(rand>2)
			data = [{cardtype:"RefreshData",amount:rand,tradetype:"void sale3",date:"2014-10-17 18:26:15",apprcode:"p"}, 
					{cardtype:"RefreshData",amount:2.00,tradetype:"void sale2",date:"2014-10-8 18:26:15",apprcode:"s"}, 
					{cardtype:"RefreshData",amount:3.00,tradetype:"void sale2",date:"2014-10-8 18:26:15",apprcode:"s"}, 
					{cardtype:"RefreshData",amount:4.00,tradetype:"void sale2",date:"2014-10-8 18:26:15",apprcode:"s"}, 
					{cardtype:"RefreshData",amount:5.00,tradetype:"void sale2",date:"2014-10-8 18:26:15",apprcode:"s"},	
					{cardtype:"RefreshData",amount:6.00,tradetype:"void sale2",date:"2014-10-8 18:26:15",apprcode:"s"}];
		if(rand<=2)
			data = [{cardtype:"RefreshData",amount:rand,tradetype:"single record",date:"2014-10-17 18:26:15",apprcode:"p"}];
			
		return data;
	};
	
	//get device info
	this.func5 = function (succ, fail) {
		console.log('func5');
		var data = {};
		var rand =  parseInt(Math.random()*100);
		if(rand>70)
			data = {'Batteryinfo':rand, 'Version':rand, 'Firnware':rand, 'Hardware': rand, 'Charginfo':rand, 'Connect':rand, 'Type':rand};	
			
		return data;
	};
	
	//get Txn record	
	this.func6 = function (succ, fail) {
		console.log('func6');
		var data = [];
		data = [{cardtype:"InitData",amount:2.00,tradetype:"void sale3",date:"2014-10-17 18:26:15",apprcode:"p"}, 
				{cardtype:"InitData",amount:2.00,tradetype:"void sale2",date:"2014-10-8 18:26:15",apprcode:"s"},
				{cardtype:"InitData",amount:2.00,tradetype:"void sale3",date:"2014-10-17 18:26:15",apprcode:"p"},
				{cardtype:"InitData",amount:2.00,tradetype:"void sale3",date:"2014-10-17 18:26:15",apprcode:"p"},
				{cardtype:"InitData",amount:2.00,tradetype:"void sale3",date:"2014-10-17 18:26:15",apprcode:"p"}];
		
		return data;
	};
	
}
