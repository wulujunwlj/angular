!function(a){"use strict";a.module("app").config(["$stateProvider","$urlRouterProvider",function(a,b){b.otherwise("app/home"),a.state("app",{"abstract":!0,url:"/app",templateUrl:"app/app.html",resolve:{}}).state("app.home",{url:"/home",templateUrl:"app/home.html"})}])}(angular);