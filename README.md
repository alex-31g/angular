# 01. Базовая структура angular приложения [01. basic app]

Минимальная структура приложения:
```js
basic-app/
  node_modules/
  package.json
  angular.json
  tsconfig.json

  src/
    main.ts
    polyfills.ts
    index.html
		
    app/
      app.module.ts
      app.component.html
      app.component.css
      app.component.ts
```
- *node_modules* - установленные npm-модули
- *package.json* - метаинформация и список необходимых npm-модулей
- *angular.json* - описание конфигурации приложения:  
	https://angular.io/guide/workspace-config  
	https://nitayneeman.com/posts/understanding-the-angular-cli-workspace-file/  
	https://metanit.com/web/angular2/1.1.php  
- *tsconfig.json* - конфигурация typescript
- *src* - содержит исходные файлы:

	- *main.ts* - необходим для запуска приложения в режиме разработки. Код внутри инициализирует платформу, которая запускает приложение, и затем использует эту платформу для загрузки AppModule
	- *polyfills.ts* - список модулей, подключаемых для поддержки кроссбраузерности
	- *index.html* - главная страница приложения, в которой определен тег <app-root>, в который будет загружаться приложение
	- *app* - содержит модули, компоненты, сервисы, директивы:

		- *app.module.ts* - корневой модуль, входная точка в приложение