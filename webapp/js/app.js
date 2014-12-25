angular.module('airpos', ['ionic', 'airpos.controllers'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

     .state('tabs', {
		  url: "/tab",
		  abstract: true,
		  templateUrl: "templates/tabs.html"
		})
	//home page
	  .state('tabs.home', {
		url: '/home',
		views: {
			'home-tab': {
			templateUrl: "templates/home.html",
			controller: 'SideMenusCtrl'
			}
		}
	  })
	  
	   .state('tabs.PreAuth', {
		url: '/PreAuth',
		views: {
			'home-tab': {
			templateUrl: "templates/PreAuth.html",
			controller: 'SideMenusCtrl'
			}
		}
	  })

	   .state('tabs.Refund', {
		url: '/Refund',
		views: {
			'home-tab': {
			templateUrl: "templates/Refund.html",
			controller: 'SideMenusCtrl'
			}
		}
	  })
	   
	    .state('tabs.Void', {
			url: '/Void',
			views: {
				'home-tab': {
				templateUrl: "templates/Void.html",
				controller: 'SideMenusCtrl'
				}
			}
	  })
	  
	.state('tabs.OfflineSale', {
	url: '/OfflineSale',
	views: {
		'home-tab': {
		templateUrl: "templates/OfflineSale.html",
		controller: 'SideMenusCtrl'
		}
	}
	})
	     
	  
	  
	.state('InsertCard', {
      url: "/InsertCard/:TxnType",
      templateUrl: "templates/InsertCard.html",	  
	  controller: 'InsertCtrl'
    })
	 
	.state('UseBankCard', {
	url: "/UseBankCard/{id}",
	templateUrl: "templates/UseBankCard.html",
	controller: 'BankCardCtrl', 
	})
	 
	.state('Total', {
      url: "/Total",
      templateUrl: "templates/Total.html",
	  controller: 'TotalCtrl'
    })
	.state('Signature', {
      url: "/Signature",
      templateUrl: "templates/Signature.html", 
      controller: 'BmpCtrl'
    })
	 
	 //history page
	  .state('tabs.history', {
		url: '/history',
		views: {
			'history-tab': {
			templateUrl: 'templates/history.html',
			//controller: 'History'
			}
		}		
	  })
	  
	.state('TransactionDetail', {
	  url: "/TransactionDetail/:cardtype/:amount/:tradetype/:date",
	  templateUrl: "templates/TransactionDetail.html",
	  controller: 'TxnDetail'
	})
	
	//merchant page
	.state('tabs.merchant', {
		url: '/merchant',
		views: {
			'merchant-tab': {
			templateUrl: 'templates/merchant.html',
			controller: 'PopupCtrl'
			}
		}
	})
	
	.state('MerchantManagment', {
      url: "/MerchantManagment",
      templateUrl: "templates/MerchantManagment.html", 
      controller: 'RangeCtrl'
    })
	.state('about', {
		url: "/about",
		templateUrl: "templates/about.html", 
    })
	.state('MLoginpassword', {
		url: "/MLoginpassword",
		templateUrl: "templates/MLoginpassword.html", 
    })
	.state('MSuperpassword', {
		url: "/MSuperpassword",
		templateUrl: "templates/MSuperpassword.html", 
    })
	
	//setting page
	.state('tabs.setting', {
		url: '/setting',
		views: {
			'setting-tab': {
			templateUrl: 'templates/setting.html',
			controller: 'Setting'
			}
		}
	})
	
	.state('DeviceInfo', {
		url: "/DeviceInfo",
		templateUrl: "templates/DeviceInfo.html"
    })
	  
	//default webpag
	$urlRouterProvider.otherwise("/tab/home");
	})

 




