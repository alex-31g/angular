https://webdraftt.com/tutorial   
https://metanit.com/web/angular2   
https://xsltdev.ru/angular/tutorial/   

# Базовая структура angular приложения [файл: 01. basic app]
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
- *angular.json* - описание конфигурации приложения
	Детально о *angular.json*:  
	https://angular.io/guide/workspace-config  
	https://nitayneeman.com/posts/understanding-the-angular-cli-workspace-file/  
	https://metanit.com/web/angular2/1.1.php  
- *tsconfig.json* - конфигурация typescript
- *src* - содержит исходные файлы приложения:

	- *main.ts* - необходим для запуска приложения
	- *polyfills.ts* - список модулей, подключаемых для поддержки кроссбраузерности
	- *index.html* - главная страница приложения, в которой определен тег app-root, в который будет загружаться приложение
	- *app* - содержит модули, компоненты, сервисы, директивы:

		- *app.module.ts* - корневой модуль, входная точка в приложение

# Архитекрура angular
Библиотека @angular имеет модульную архитектуру, каждый модуль которой содержит определенный функционал:
- BrowserModule;
- CommonModule;
- FormsModule;
- ReactiveFormsModule;
- HttpClientModule;
- RouterModule и др.
Не все библиотеки обязательны для использования в приложении, часть подключается по мере необходимости, например, FormsModule или HttpModule.

## main.ts
При запуске приложения первым выполняется код файла main.ts:
```javascript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
```
В коде выше, происходит импорт модуля platformBrowserDynamic (строка 1), с помощью которого выполняется загрузка корневого модуля AppModule (строка 5), импорт которого был выполнен во 2-й строке.    
После этого начинает работать логика, которая заложена в модуле AppModule.  
В самом же AppModule нужно указать, какой компонент будет использоваться в качестве основного при загрузке:
```js
@NgModule({
    bootstrap: [ AppComponent ]
})
```

## Модули 
`https://angular.io/api/core/NgModule`
Модуль - это класс с декоратором **@NgModule()**.   
Для разделения приложения на логические части используются модули.   
Модуль — это контейнер для компонентов, директив, фильтров и сервисов, которые объеденены общей логикой и которые реализовывают общий функционал.  
  
Angular приложение имеет модульную архитектуру и состоит из одного корневого модуля AppModule, а все остальные - относятся к второстепенным.  

При создании модуля используется декоратор @NgModule(), который принимает конфигурационный объект со свойствами:
- imports - массив, где указывается список импортируемых модулей;
- exports - массив компонентов, директив и фильтров, которыми пользуются другие модули, если они импортируют текущий;
- declarations - массив компонентов, директив и фильтров;
- entryComponents - массив создаваемых динамически компонентов;
- bootstrap - массив, в котором указывается корневой компонент AppComponent, который вызывается при загрузке приложения (только корневой модуль может определять свойство bootstrap);
- providers - массив сервисов.

По назначению модули можно классифицировать следующим образом:
- корневой;
- функциональный;
- маршрутизации -  нужен для определения иерархии маршрутов;
- для поставки сервисов - создается с использованием статического метода forRoot()

## Модули - корневой модуль AppModule
Angular-приложение имеет один корневой модуль - AppModule.  
Для работы AppModule необходимо подключить ряд angular-библиотек. Имя каждой библиотеки Angular начинается с префикса @angular.
Базовый код корневого модуля *app.module.ts*:
```js
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```
Только корневой модуль может определять свойство bootstrap и импортировать BrowserModule.
Импорты:
- BrowserModule - модуль, необходимый для работы с браузером
- NgModule - декоратор NgModule, с помощью которого создаются модули
- AppComponent - функциональность корневого компонента приложения

## Модули - CoreModule и SharedModule
*CoreModule* - общепринятое название для модуля, используемого исключительно для поставки сервисов. Он не содержит в себе компонентов, директив и фильтров.

*SharedModule* - общепринятое название для Angular модуля, служащим единым хранилищем для компонентов, директив и фильтров, которыми пользуются другие модули.

https://webdraftt.com/tutorial/angular-modules 

## Компонент
`https://angular.io/api/core/Component`
Компонент - это класс с декоратором **@Component()**.
Компонент - изолированная часть функционала со своей логикой, HTML-шаблоном и CSS-стилями.
При создании компонента используется декоратор @Component(), который принимает конфигурационный объект со свойствами:
- selector - название компонента
- template (или templateUrl) - HTML-шаблон в виде строки (или путь к HTML-файлу)
- providers - список сервисов, поставляющих данные для компонента
- styles - массив путей к CSS-файлам данного компонента
```js
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'first app';
}
```

## Сервис
В отличие от компонентов и директив, сервисы не работают с представлениями (html), они выполняют строго определенную и узкую задачу:
- Предоставление данных приложению - сервис может хранить данные в памяти, либо обращаться к какому-нибудь источнику данных
- Сервис может представлять канал взаимодействия между отдельными компонентами
- Сервис может инкапсулировать бизнес-логику, различные вычислительные задачи, задачи по логгированию

Создание сервиса `src/app/data.service.ts`: