https://webdraftt.com/tutorial   
https://metanit.com/web/angular2   
https://xsltdev.ru/angular/   
https://nnmclub.to/forum/viewforum.php?f=463     

# Базовая структура angular приложения [01. basic app]
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
```js
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
```
В коде выше, происходит импорт модуля platformBrowserDynamic (строка 1), с помощью которого выполняется загрузка корневого модуля AppModule (строка 4), импорт которого был выполнен во 2-й строке.    
После этого начинает работать логика, которая заложена в модуле AppModule.  
В самом же AppModule нужно указать, какой компонент будет использоваться в качестве основного при загрузке:
```js
@NgModule({
    bootstrap: [ AppComponent ]
})
```

## Модули 
https://angular.io/api/core/NgModule                 
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
**Только корневой модуль может определять свойство bootstrap и импортировать BrowserModule.**     

Импорты:
- BrowserModule - модуль, необходимый для работы с браузером
- NgModule - декоратор NgModule, с помощью которого создаются модули
- AppComponent - функциональность корневого компонента приложения

## Модули - CoreModule и SharedModule
*CoreModule* - общепринятое название для модуля, используемого исключительно для поставки сервисов. Он не содержит в себе компонентов, директив и фильтров.

*SharedModule* - общепринятое название для Angular модуля, служащим единым хранилищем для компонентов, директив и фильтров, которыми пользуются другие модули.

https://webdraftt.com/tutorial/angular-modules 

## Компонент
https://angular.io/api/core/Component                       
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

## Жизненные циклы компонентов [02. lifecycle]
https://xsltdev.ru/angular/tutorial/component-lifecycle/   
Компонент имеет жизненный цикл (component lifecycle), этапы которого можно описать примерно так:
- Создание компонента
- Рендеринг данных компонента
- Рендеринг данных дочерних компонентов
- Проверка данных на изменение 
- Удаление из DOM          

На каждом из этих этапов, Angular предоставляет возможность вмешиваться в работу компонента, предоставляя для этого специальные методы (hooks). Например, нужно загрузить данные до вывода страницы на экран - сделать это можно в методе ngOnInit(). Или в определённый момент работы с приложением нужно отключиться от базы данных - сделать это можно в методе ngOnDestroy().    

Описание хуков смотреть в `02. lifecycle/src/app/components/child/*.ts`

## Change Detection [03. change detection]     
https://www.telerik.com/blogs/simplifying-angular-change-detection      
Когда происходит изменение хотя бы в одном из компонентов приложения, Angular запускает `процесс обнаружения изменений - change detection` по всем компонентам.        
Этот процесс происходит с помощью **change detector**, который содержится в каждом компоненте.     
***change detector* - часть структуры Angular, которая обеспечивает синхронизацию view (DOM) и данных модели и происходит перерисовка DOM в соответствии с моделью**.   
В процессе роста приложения, частый запуск процесса обнаружения изменений может негативно сказываться на производительности приложения.      
Чтобы запуск процесса обнаружения изменений не выполнялся при любом изменении в приложении, Angular имеет две стратегии - **change detection strategies**: 
- Default (значение по умолчанию, которое не нужно явно указывать)
- onPush (задается с помощью параметра `changeDetection` внутри @Component)          

В **Default** стратегии, при изменении каких-либо данных в приложении, Angular запускает change detector для обновления представления.     
В **onPush** стратегии, Angular запускает change detector только тогда, когда меняется ссылка на объект @Input-свойства (см. метод changeName2 в app.component.ts), а если происходит изменение в свойстве объекта - отслеживаний изменений не будет происходить (см. метод changeName1 в app.component.ts)    

Пример установки **onPush** стратегии:
```js
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
```
**Важная информация**: даже если для компонента задано значение onPush и ему не передается новая ссылка, Angular по-прежнему будет запускать для него change detector, если произойдет одно из следующих изменений внутри компонента:
- событие, например click или submit
- XHR запрос
- asynchronous JavaScript function - setTimeOut(), setInterval() 

## Change Detection - ChangeDetectorRef [04. change detection 2]  
В библиотеке @angular/core есть сервис `ChangeDetectorRef` - он предоставляет доступ к `процесс обнаружения изменений - change detection` конкретного компонента.          
Основные методы:             
- detach() - полностью отключает механизм ChangeDetection;
- detectChanges() - принудительно запускает механизм отслеживания изменений;
- reattach() - используется после вызова detach() для активации механизма ChangeDetection.            

Действие всех трех методов распространяется только на тот компонент, в пределах которого вызываются эти методы.     

Подключение ChangeDetectorRef:     
```js
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
export class ChildComponent implements OnChanges, DoCheck {
	constructor(private cd: ChangeDetectorRef) {}
}
```
https://habr.com/ru/company/infopulse/blog/358860/
https://habr.com/ru/post/327004/

## Сервис
В отличие от компонентов и директив, сервисы не работают с представлениями (html), они выполняют строго определенную и узкую задачу:
- Предоставление данных приложению - сервис может хранить данные в памяти, либо обращаться к какому-нибудь источнику данных
- Сервис может представлять канал взаимодействия между отдельными компонентами
- Сервис может инкапсулировать бизнес-логику, различные вычислительные задачи, задачи по логгированию
