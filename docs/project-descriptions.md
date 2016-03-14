Project Description
=====

## 项目结构

### V0.3:
```
├── angular-components
│   ├── app
│   │   ├── app.js
│   │   ├── components
│   │   │   ├── components.module.js
│   │   │   ├── components.config.js
│   │   │   ├── components.config.lazyload.js
│   │   │   ├── components.routes.js
│   │   │   ├── conow-grid
│   │   │   │   ├── conow-grid.directive.js
│   │   │   │   ├── conow-grid.directive.spec.js
│   │   │   │   ├── conow-grid.service.js
│   │   │   │   ├── conow-grid.service.spec.js
│   │   │   │   ├── conow-grid.filter.js
│   │   │   │   ├── conow-grid.filter.spec.js
│   │   │   │   └── conow-grid.tpl.html
│   │   │   ├── conow-validator
│   │   │   │   ├── conow-validator.directive.js
│   │   │   │   ├── conow-validator.directive.spec.js
│   │   │   │   ├── conow-validator.service.js
│   │   │   │   ├── conow-validator.service.spec.js
│   │   │   │   ├── conow-validator.filter.js
│   │   │   │   ├── conow-validator.filter.spec.js
│   │   │   │   └── conow-validator.tpl.html
│   │   ├── hr
│   │   ├── oa
│   │   ├── fm
│   │   ├── build
│   │   │   ├── app.js
│   │   │   ├── components
│   │   │   │   ├── components.main.js
│   │   │   │   ├── conow-grid.js
│   │   │   │   └── conow-validator.js
│   │   │   ├── hr
│   │   │   │   ├── hr.main.js
│   │   │   ├── oa
│   │   │   │   ├── oa.main.js
│   │   │   ├── fm
│   │   │   │   ├── fm.main.js
```

### V0.2:
```
.
├── angular-components
│   ├── app
│   │   ├── app.js
│   │   ├── components.module.js
│   │   ├── components.config.js
│   │   ├── components.config.lazyload.js
│   │   ├── components.routes.js
│   │   ├── core/common
│   │   │   ├── directives
│   │   │   ├── filters
│   │   │   └── services
│   │   ├── home
│   │   │   ├── controllers
│   │   │   │   ├── first.js
│   │   │   │   ├── first.spec.js
│   │   │   │   └── second.js
│   │   │   ├── directives
│   │   │   │   ├── directive1.js
│   │   │   │   └── directive1.spec.js
│   │   │   ├── filters
│   │   │   │   ├── filter1.js
│   │   │   │   └── filter2.js
│   │   │   └── services
│   │   │       ├── service1.js
│   │   │       └── service2.js
│   │   └── about
│   │       ├── controllers
│   │       │   └──about.js
│   │       ├── directives
│   │       │   ├── directive2.js
│   │       │   └── directive3.js
│   │       ├── filters
│   │       │   └── filter3.js
│   │       └── services
│   │           └── service3.js
│   ├── views
│   ├── lib
│   └── test
```

### V0.1:
```
angular-components
    - app
        + css
        + dist
        + js
        - src
            + scripts
            + styles
        + vendor
        + views
    - bin
        www
    + docs
    + node_modules
    - public
        + images
        + javascripts
        + stylesheets
    - routes
        - app
            services
    - views
        error.ejs
        home.ejs
    .gitignore
    app.js
    package.json
    README.md
```

## 功能列表