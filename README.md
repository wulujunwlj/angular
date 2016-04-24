angular-components
=====

## useful Angular plugins
* angular-route
* [oclazyload](https://oclazyload.readme.io/)
* [ng-table](http://ng-table.com/)

## Q&A
* 菜单路由动态配置和依赖脚本的动态加载：[如何使用angularjs处理动态菜单？](https://www.zhihu.com/question/33251004)
* Angular 实现一个双向选择器：[求助，用angularJs实现下图功能?](https://www.zhihu.com/question/39885603)
* [angular中控制器之间的传值该怎么实现?](https://www.zhihu.com/question/34977234)
* [Angular 为什么突然火爆起来？](https://www.zhihu.com/question/25143616)

> 我来说几点吧：
一揽子解决方案。除了 MVVM 的东西以外：基于 jQLite 提供了 DOM，这样就不必自己再弄个 DOM 库；基于 q 提供了 Promise；独具一格的依赖注入，这样就不用弄个 RequireJS 或者 SeaJS 一类的东西；当然还有 routing 和 XMLHttpRequest 的封装。这样的话用了 Angular 就基本全套搞定了，并且各个部分之间相处非常愉快。自己使用各种 library 来分别提供这些功能的话，对于新手来说还是挺头疼的，毕竟各自为战。
据我观察，Angular 在非前端开发者中甚至比在前端开发者中还要受欢迎。一方面是 Angular 的 MVVM 非常方便，对 JavaScript DOM 不熟悉的人完全不用自己处理那些细节。另一方面是 JavaScript 语法太灵活混乱，而 Angular 提供了非常明确的 code style 来遵守，这样第三方的代码也容易看懂。
极度适合写相对简单的 webapp，而复杂一点的也好办。强大的框架和漂亮整洁的 API 导致的结果就是，只要稍熟悉 Angular，改改模板，加上几个 provider，就可以到处用。就像当年用 WordPress 一天建 10 个站那样的效率。
Play well with jQuery。我个人并不喜欢 jQuery，但是不可否认 jQuery 就是太流行了。于是像 Angular 这样不去做很多与 jQuery 重复的功能，并且 API 和 jQuery 一致的库，确实更容易让人接受。
Google 的后台。这个有不少人提到，但是其实这并不是充分条件；Google Closure Library 就并没有很流行。

>但是如果是已经习惯传统的 JavaScript 开发的开发者，可能会觉得 Angular 的模式有些奇怪和拘谨，所以不一定会很快接受。这也是 Angular 在 09 年就面世却最近两年才大红大紫的原因之一。

>当然 Angular 还是存在不少问题的。一些非常 dynamic 的东西，使用模板很难优雅地做到；对于中级开发者来说，digest loop 的很多局限性很难弄清楚；MVVM 设计所带来的性能问题在 2.0 中似乎也没法被有效地缓解。

> 作者：kmxz
链接：https://www.zhihu.com/question/25143616/answer/34313404
来源：知乎
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

* [angular中，controller、directive和factory分别该在何时使用？](https://www.zhihu.com/question/27836513)
* [Angular 2.0与1.3版本相比，有哪些方面的改进呢？](https://www.zhihu.com/question/26722922)
* [A modern JavaScript router in 100 lines](http://krasimirtsonev.com/blog/article/A-modern-JavaScript-router-in-100-lines-history-api-pushState-hash-url)
* [AngularJS中的依赖注入实际应用场景？](https://www.zhihu.com/question/28097646)
* [AngularJS的数据双向绑定是怎么实现的？](https://www.zhihu.com/question/23275373)
* [angularjs项目需要从一个页面跳转到另一个页面，同时需要传递一个参数。请问大神该通过什么实现？](https://www.zhihu.com/question/33565135)
* [淘宝首页性能优化实践](http://web.jobbole.com/85551/)
* 