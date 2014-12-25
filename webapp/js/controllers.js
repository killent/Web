angular.module('airpos.controllers', [])
.controller('SideMenusCtrl', function ($scope, $state, $ionicPopup, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function () {
		$ionicSideMenuDelegate.toggleLeft();
	};

	//battery status
	BATTERY = parseInt(Math.random() * 100);
	if (BATTERY >= 75)
		$scope.bat = 'icon ion-battery-full';
	else if (50 <= BATTERY && BATTERY < 75)
		$scope.bat = 'icon ion-battery-half';
	else if (25 <= BATTERY && BATTERY < 50)
		$scope.bat = 'icon ion-battery-low';
	else
		$scope.bat = 'icon ion-battery-empty';

	//tips limit
	if (!localStorage.getItem("limit")) {
		localStorage.setItem("limit", 50);
	}

	var tipsLimit = localStorage.getItem("limit");

	$scope.Insert = function (txn) {
		console.log(txn);
		AMOUNT = document.getElementById('amount').value;
		TIPS = document.getElementById('tips').value;
		if (!TIPS)
			TIPS = '0.00';

		if (AMOUNT) {
			$state.go('InsertCard', {
				TxnType : txn
			});
		} else {
			//alert dialog
			$scope.showAlert = function () {
				var alertPopup = $ionicPopup.alert({
						title : 'AirPos',
						template : '<p style="color:red;text-align:center"><strong>Please Input Amount !<strong></p>',
						buttons : [{
								text : '<b>OK</b>',
								type : 'button-dark'
							}
						]
					});
				alertPopup.then(function (res) {
					console.log('alert dialog');
				});
			}
			(); // IIFE
		}

	};
})

.controller('InsertCtrl', function ($scope, $state, $ionicPopup) {
	var timer = setInterval(EmvCallback, 1000);
	function EmvCallback() {
		app = new test();
		var ret = app.func2();
		if (ret == 2) {
			msg.innerHTML = 'Please Selest Application!';
		} else if (ret === 1) {
			clearInterval(timer);
			$scope.showPopup();
		}
	}

	$scope.showPopup = function () {
		var card = "MasterCard,PayWave";
		$scope.data = {};
		$scope.appList = [];

		var cardSet = card.split(',');
		for (var i in cardSet)
			$scope.appList.push({
				text : cardSet[i],
				value : cardSet[i]
			});

		var myPopup = $ionicPopup.show({
				title : 'AirPos',
				template : '<ion-radio ng-repeat="item in appList" ng-value="item.value" ng-model="data.app" >{{ item.text }}</ion-radio>',
				scope : $scope,
				buttons : [{
						text : '<b>OK</b>',
						type : 'button-dark',
						onTap : function (e) {
							if (!$scope.data.app) {
								e.preventDefault();
							} else {
								return $scope.data.app;
							}
						}
					}, {
						text : 'Cancel',
						type : 'button-dark'
					}
				]
			});
		myPopup.then(function (res) {
			console.log('Select: ', res);
			if (res) {
				$state.go('UseBankCard');
			}
		});
	};
})

//for merchant page
.controller('PopupCtrl', function ($scope, $ionicPopup, $timeout) {
	$scope.showPopup = function () {
		$scope.data = {}
		var myPopup = $ionicPopup.show({
				template : '<input type="password" ng-model="data.wifi">',
				title : 'AirPos',
				subTitle : 'Please Input super Password',
				scope : $scope,
				buttons : [{
						text : '<b>Sumit</b>',
						type : 'button-dark',
						onTap : function (e) {
							if (!$scope.data.wifi) {
								e.preventDefault();
							} else {
								return $scope.data.wifi;
							}
						}
					}, {
						text : 'Cancel',
						type : 'button-dark'
					},
				]
			});
	};

	//battery status
	if (window.BATTERY) {
		if (BATTERY >= 75)
			$scope.bat = 'icon ion-battery-full';
		else if (50 <= BATTERY && BATTERY < 75)
			$scope.bat = 'icon ion-battery-half';
		else if (25 <= BATTERY && BATTERY < 50)
			$scope.bat = 'icon ion-battery-low';
		else
			$scope.bat = 'icon ion-battery-empty';
	}
})

//for MerchantManagment page
.controller('RangeCtrl', function ($scope) {
	//update tips status
	if (!localStorage.getItem("check"))
		localStorage.setItem("check", 1);

	var tipschk = localStorage.getItem("check");
	$scope.check = Boolean(parseInt(tipschk));

	var tipslimit = localStorage.getItem("limit");
	$scope.data = {
		'volume' : tipslimit
	};

	$scope.chkLimit = function (check) {
		if (!check) {
			$scope.data = {
				'volume' : 0
			};
			localStorage.setItem("limit", 0);
			localStorage.setItem("check", 0);
		} else
			localStorage.setItem("check", 1);
	}

	$scope.onLimit = function () {
		//set tips limit
		localStorage.setItem("limit", $scope.data.volume);
	}
})

.controller('BmpCtrl', function ($scope, $ionicPopup) {
	paint();
	imgurl.onclick = function () {
		setTimeout(CB, 2000);
		function CB() {
			createBMP(scaleCanvas(canvas, 128, 64));
		}
	};

	$scope.showPopup = function () {
		var card = "MasterCard,PayWave";
		$scope.data = {};
		$scope.appList = [];

		var cardSet = card.split(',');
		for (var i in cardSet)
			$scope.appList.push({
				text : cardSet[i],
				value : cardSet[i]
			});

		var myPopup = $ionicPopup.show({
				title : 'Please Select Paired Bluetooth',
				template : '<ion-radio ng-repeat="item in appList" ng-value="item.value" ng-model="data.app" >{{ item.text }}</ion-radio>',
				scope : $scope,
				buttons : [{
						text : '<b>OK</b>',
						type : 'button-dark',
						onTap : function (e) {
							if (!$scope.data.app) {
								e.preventDefault();
							} else {
								return $scope.data.app;
							}
						}
					}, {
						text : 'Cancel',
						type : 'button-dark'
					}
				]
			});
		myPopup.then(function (res) {
			console.log('Select: ', res);
			if (res) {
				//$state.go('UseBankCard');
			}
		});
	};
})

.controller('BankCardCtrl', function ($scope, $state) {
	setTimeout(function () {
		$state.go('Total');
	}, 2000);
	msg.innerHTML = Date();
})

.controller('TotalCtrl', function ($scope) {
	var total = (+AMOUNT + +TIPS).toFixed(2);
	$scope.data = {
		'total' : 'RM ' + total,
		'amount' : 'RM ' + AMOUNT,
		'tips' : 'RM ' + TIPS,
		'time' : 'Terminal: ' + Date()
	};
})

//	for history page
.controller('History', function ($scope, $state, $timeout) {
	app = new test();
	var ret = app.func6(); //init data
	$scope.items = ret;
	$scope.noMoreItemsAvailable = false;

	$scope.doRefresh = function () {
		alert("doRefresh");
		console.log('Refreshing!');
		$timeout(function () {
			$scope.items = []; //refresh data
			var ret = app.func4();
			for (var i in ret) {
				$scope.items.push({
					cardtype : ret[i].cardtype,
					amount : ret[i].amount,
					tradetype : ret[i].tradetype,
					date : ret[i].date,
					apprcode : ret[i].apprcode
				});
			}
			$scope.$broadcast('scroll.refreshComplete');
		}, 2000);
	};

	$scope.loadMore = function () {
		console.log('loadMore');
		setTimeout(Load, 2000);
		function Load() {
			alert("loadMore");
			var ret = app.func1();
			for (var i in ret) {
				$scope.items.push({
					cardtype : ret[i].cardtype,
					amount : ret[i].amount,
					tradetype : ret[i].tradetype,
					date : ret[i].date,
					apprcode : ret[i].apprcode
				});
			}
			console.log($scope.items.length);
			if ($scope.items.length >= 19) {
				$scope.noMoreItemsAvailable = true;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}

		//$scope.items.push({ id: $scope.items.length});
		// console.log($scope.items.length);
		// if ( $scope.items.length > 20 ) {
		// $scope.noMoreItemsAvailable = true;
		// }
		// $scope.$broadcast('scroll.infiniteScrollComplete');
	}

	$scope.goDetail = function (item) {
		$state.go('TransactionDetail', {
			cardtype : item.cardtype,
			amount : item.amount,
			tradetype : item.tradetype,
			date : item.date
		});
	};

	$scope.doSearch = function () {
		app = new test();
		var ret = app.func3($scope.searchItem); //search data
		$scope.items = [];
		$scope.searchItem = ''; //clear search text
		if (ret.cardtype) {
			$scope.items.push(ret);
		}
	}

	if (window.BATTERY) {
		if (BATTERY >= 75)
			$scope.bat = 'icon ion-battery-full';
		else if (50 <= BATTERY && BATTERY < 75)
			$scope.bat = 'icon ion-battery-half';
		else if (25 <= BATTERY && BATTERY < 50)
			$scope.bat = 'icon ion-battery-low';
		else
			$scope.bat = 'icon ion-battery-empty';
	}

})

.controller('TxnDetail', function ($scope, $stateParams) {
	$scope.data = {
		'cardtype' : $stateParams.cardtype,
		'amount' : $stateParams.amount,
		'tradetype' : $stateParams.tradetype,
		'date' : $stateParams.date
	};
})

.controller('DeviceInfo', function ($scope, $state) {
	var cnt = 2; //loop 2 times for get device info
	setTimeout(EmvCallback(), 1000);

	function EmvCallback() {
		app = new test();
		var ret = app.func5();
		if (ret.Batteryinfo) { //check device info
			$scope.Device = ret;
			$scope.Status = 'Device is connected';
		} else {
			if (cnt-- > 0) {
				setTimeout(EmvCallback(), 1000);
			}
		}
	}
})

//battery status
.controller('Setting', function ($scope) {
	if (window.BATTERY) {
		if (BATTERY >= 75)
			$scope.bat = 'icon ion-battery-full';
		else if (50 <= BATTERY && BATTERY < 75)
			$scope.bat = 'icon ion-battery-half';
		else if (25 <= BATTERY && BATTERY < 50)
			$scope.bat = 'icon ion-battery-low';
		else
			$scope.bat = 'icon ion-battery-empty';
	}
})

.controller('MLoginpassword', function ($scope) {
	$scope.changePsw = function () {
		console.log($scope.psw.oldpsw, $scope.psw.repsw);
		location.href = 'Login.html';
	}
})
