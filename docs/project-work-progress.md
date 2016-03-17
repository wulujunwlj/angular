grunt 相关插件使用
=====

## 插件列表
* grunt
* grunt-contrib-uglify
* grunt-contrib-copy
* grunt-contrib-clean
* grunt-contrib-concat
* grunt-contrib-jshint
* load-grunt-tasks
* time-grunt
* grunt-contrib-yuidoc
* grunt-jsdoc
* grunt-contrib-cssmin
* grunt-usemin
* grunt-cachebuster
* grunt-contrib-less
* grunt-contrib-watch
* grunt-ng-annotate (@20160314 - 注解)
* grunt-jscs (@20160314 - js code style )


`svn 同步 grunt 插件`

## todo
* 基础功能(20160309)：JS 语法，JS 压缩、合并，LESS 编译，CSS 合并，文件复制，文件清除，加载插件
    - grunt 结构
    - grunt-contrib-uglify
    - grunt-contrib-concat
    - grunt-contrib-jshint
    - grunt-contrib-less
    - grunt-contrib-cssmin
    - grunt-contrib-copy
    - grunt-contrib-clean
    - load-grunt-tasks
* 自动化操作(?)：监控文件修改，自动执行基础功能，自动刷新页面
    - grunt-contrib-watch
    - grunt-contrib-livereload
* 文档生成(?):生成接口文档
    - grunt-contrib-yuidoc/grunt-jsdoc
* 自动化测试1(?)：单元测试
* 自动化测试2(?)：E2E 测试
* mock 接口数据(?)

## problems
* 20160309:grunt 执行时指定对应的源文件和目标文件
* 20160314:考虑把 controller 的代码移出到 service

## schedules
* 20160315:项目文件结构、js copy、clean
* 20160316:less 编译、cssmin、js concat + js uglify(dev/prod 分别对应不同的配置)
* 20160317:js hint、watch、livereload
* 20160318:ng-annotate、jscs、cachebuster

* 20160321 - 20160323:unit test
* jsdoc/yuidoc:待定

    > grunt 需要整合的功能列表以及进度如上所示，按照这个进度来看，到这一环节，组件开发的入口已经基本完成，17号(本周四)左右可以出来组件开发的配置信息，需要安排时间给大家讲解一下。

    > 组件自动化测试的环节初步定在下周，但是可能不会包含在基础配置里面，需要在conow-grid的开发过程中加进来，(现在的21-23号的进度安排只是临时的)



