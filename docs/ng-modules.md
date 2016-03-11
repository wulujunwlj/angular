angular modules useful tips
=====

## [ocLazyLoad](oclazyload.readme.io)
* 配置
    - debug:Boolean
    - events:Boolean
    - modules:Array of Objects
```
angular.module('app', ['oc.lazyLoad'])
    .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: false,
            modules: [
                {
                    name: 'ngTable',
                    files: [
                        'ng-table/dist/ng-table.css',
                        'ng-table/dist/ng-table.js'
                    ]
                }
            ]
        });
    }])
```

* controller 中使用
```
app.controller('myCtrl', function($ocLazyLoad) {
    $ocLazyLoad.load('test-module.js');
});
```

* 配置模块延迟加载
> $ocLazyLoadProvider.config 中配置 modules

## [ng-table](ng-table.com)