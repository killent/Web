/*************************************************************************************/
//
// 				SIMULATE TRANSACTION
//
/*************************************************************************************/
var i = 3;

//1. 声明函数
function test()
{
	// this.receiveHookName = 'buid'; 
	this.func1 = function (succ, fail) {
		console.log('func1');
		var data = [];
		var rand =  (Math.random()*10).toFixed(2);		
		data = [{cardtype:"loadMore",amount:rand,tradetype:"void sale3",date:"2014-10-17 18:26:15",apprcode:"p"}, {cardtype:"loadMore",amount:(rand*10).toFixed(2),tradetype:"void sale2",date:"2014-10-8 18:26:15",apprcode:"s"}];
		return data;
	};
	this.func2 = function (succ, fail) {
		console.log('func2');
		i--;
		return i;
	};
	this.func3 = function (succ, fail) {
		console.log('func3');
		var data = {};
		var rand =  parseInt(Math.random()*100);
		if(rand>=50)
			data = {cardtype:succ, amount:'3.00', tradetype:rand, date:"2014-10-17 18:26:15", apprcode:"S"};
			
		return data;
	};
	this.func4 = function (succ, fail) {
		console.log('func4');
		var data = [];
		var rand =  (Math.random()*10).toFixed(2);
		if(rand<3)
			data = [{cardtype:"Visa",amount:rand,tradetype:"void sale3",date:"2014-10-17 18:26:15",apprcode:"p"}, {cardtype:"MasterCard",amount:(rand*10).toFixed(2),tradetype:"void sale2",date:"2014-10-8 18:26:15",apprcode:"s"}];
		if(rand>6)
			data = [{cardtype:"Visa",amount:rand,tradetype:"void sale6",date:"2014-10-17 18:26:15",apprcode:"p"}];
			
		return data;
	};
	this.func5 = function (succ, fail) {
		console.log('func5');
		var data = {};
		var rand =  parseInt(Math.random()*100);
		if(rand>70)
			data = {'Batteryinfo':rand, 'Version':rand, 'Firnware':rand, 'Hardware': rand, 'Charginfo':rand, 'Connect':rand, 'Type':rand};	
			
		return data;
	};
	
	this.func6 = function (succ, fail) {
		console.log('func6');
		var data = [];
		data = [{cardtype:"Visa",amount:2.00,tradetype:"void sale3",date:"2014-10-17 18:26:15",apprcode:"p"}, 
				{cardtype:"MasterCard",amount:2.00,tradetype:"void sale2",date:"2014-10-8 18:26:15",apprcode:"s"},
				{cardtype:"Visa",amount:2.00,tradetype:"void sale3",date:"2014-10-17 18:26:15",apprcode:"p"},
				{cardtype:"Visa",amount:2.00,tradetype:"void sale3",date:"2014-10-17 18:26:15",apprcode:"p"},
				{cardtype:"Visa",amount:2.00,tradetype:"void sale3",date:"2014-10-17 18:26:15",apprcode:"p"}];
		
		return data;
	};
	
}



/*********************************************************************************/

//2. 原型方法
function plugin() { }; 
          
plugin.prototype.func1 = function (succ, fail) {
	console.log('func1');
};

plugin.prototype.func2 = function () {
	console.log('func2');

	i--;
	return i;
};

plugin.prototype.func3 = function () {
	console.log('func3');
	j--;
	return j;
};

plugin.prototype.func4= function () {
	console.log('func4');
};

plugin.prototype.func5 = function () {
	console.log('func5');
};


//3. 对象方法
var  demo =  {
	func1: function (succ, fail) {
		console.log('func1');
	},
	func2 : function (succ, fail) {
		console.log('func2');
		i--;
		return i;
	},
	func3 : function (succ, fail) {
		console.log('func3');
	},
	func4 : function (succ, fail) {
		console.log('func4');
	},
	func5 : function (succ, fail) {
		console.log('func5');
	}	
};