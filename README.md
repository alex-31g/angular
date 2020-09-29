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
Когда происходит изменение хотя бы в одном из компонентов приложения, Angular запускает **механизм обнаружения изменений - change detection** по всем компонентам.        
Этот процесс происходит с помощью **change detector**, который содержится в каждом компоненте.     
***change detector* - часть структуры Angular, которая обеспечивает синхронизацию view (DOM) и данных модели и происходит обновление DOM в соответствии с моделью**.   
В процессе роста приложения, частый запуск механизма обнаружения изменений может негативно сказываться на производительности приложения.      
Чтобы запуск механизма обнаружения изменений не выполнялся при любом изменении в приложении, Angular имеет две стратегии - **change detection strategies**: 
- Default (значение по умолчанию, которое не нужно явно указывать)
- onPush (задается с помощью параметра `changeDetection` внутри @Component)          

В **Default** стратегии, при изменении каких-либо данных в приложении, Angular запускает change detector для обновления представления.     
В **onPush** стратегии, Angular запускает change detector только тогда, когда меняется ссылка на объект @Input-свойства (см. метод changeName2 в app.component.ts), а если происходит изменение в свойстве объекта - отслеживаний изменений не будет происходить (см. метод changeName1 в app.component.ts)    

Пример установки **onPush** стратегии:
```js
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
```
**!!! Даже если для компонента задано значение onPush и в @Input-свойство НЕ ПЕРЕДАЕТСЯ новая ссылка:**
1. Angular по-прежнему будет запускать для него change detector и обновлять DOM, если произойдет одно из следующих изменений внутри самого компонента:
  - event, например click или submit
  - XHR запрос
  - asynchronous JavaScript function - setTimeOut(), setInterval()    
2. Обращение к lifecycle hooks по-прежнему можно выполнять и внутри которых можно производить обращение к @Input-свойству, при этом перерисовки DOM не будет, но её можно выполнить с помощью ChangeDetectorRef.

## Change Detection - ChangeDetectorRef [04. change detection 2]           
В библиотеке @angular/core есть сервис `ChangeDetectorRef` - он предоставляет доступ к `механизму обнаружения изменений - change detection` конкретного компонента.          
Основные методы:  
- detach - отключает механизм change detection для текущего компонента и всех его потомков (DOM не будет обновляться)
- reattach - используется после вызова detach для включения механизма change detection для текущего компонента и всех его потомков
- markForCheck - включает механизм change detection для текущего компонента и всех его родителей
- detectChanges - включает механизм change detection для текущего компонента и всех его потомков только один раз
- checkNoChanges - включает механизм change detection для текущего компонента и всех его потомков и выбрасывает ошибку, если обнаруживаются какие-либо изменения (использовать в режиме разработки)     
   
Подключение ChangeDetectorRef:     
```js
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
export class ChildComponent implements OnChanges, DoCheck {
	constructor(private cd: ChangeDetectorRef) {}
}
```
 
## Библиотека immutable.js [05. immutable]  
`Здесь рассмотрена часть возможностей immutable.js`     

При работе с **onPush** стратегией, необходимо для @Input-свойств использовать immutable типы данных, которые могут предоставить специальные библиотеки.          
Установка библиотеки immutable.js в проект:           
`npm i immutable`

**Методы immutable.js**:        
   
- **Map** [immutable-map.component.ts] - делает из обычного объекта - immutable объект. *Не работает с вложенными объектами*
- **set** - добавить/изменить свойство для immutable объекта, созданного с помощью метода Map   
- **merge** - добавить/изменить несколько свойств для immutable объекта, созданного с помощью Map    
- **get** - получить значения из immutable объекта

- **fromJS** [from-js.component.ts] - делает из обычного объекта - immutable объект. *Работает с вложенными объектами*
- **setIn** - добавить/изменить вложенное свойство для immutable объекта, созданного с помощью метода fromJS    

- **List** [immutable-list.component.ts] - делает из обычного массива - immutable массив
- **push** - возвращает новый массив с добавленным значением

## HttpClientModule | HttpClient [06. httpclient] 
Для взаимодействия с сервером и отправки запросов по протоколу http применяется класс **HttpClient**, который предоставляет методы для отправки различного рода запросов: GET, POST, PUT, DELETE. Для его использования необходимо: 

1. Выполнить импорт HttpClientModule [src/app/app.module.ts]:
```js
import { HttpClientModule } from '@angular/common/http';
@NgModule({ 
	imports: [HttpClientModule], 
})
```

2. Создать сервис [src/app/services/http.service.ts] в котором выполнить импорт HttpClient:
```js
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(public httpClient: HttpClient) {}
}
```   
К классу сервиса был применен декоратор *@Injectable({ providedIn: 'root' })*, который говорит, что данный сервис может использоваться в других сервисах или компонентах корневого модуля AppModule (или root-модуля).

3. Далее подключаем сервис в нужных компонентах:
```js
import { HttpService } from './services/http.service';
export class AppComponent implements OnInit {
  constructor(public httpService: HttpService) {}
}
```
и можем использовать (смотри app.component.ts).

## HttpInterceptor [06. httpclient]
**HttpInterceptor** - класс, который позволяет перехватывать HTTP-запросы перед их отправкой и вносить в них изменения.  
Применение - отправка авторизационных данных, логирование и обработка серверных ошибок.    

**Создание сервиса интерсептора**:
1. [*interceptor.service.ts*] Класс должен иметь наследование от HttpInterceptor и реализовывать метод intercept():
```js
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
	// intercept() модифицирует исходный запрос и возвращает объект Observable события HttpEvent<any>, 
	// который в свою очередь возвращает метод next() объекта типа HttpRequest
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Оригинальный запрос req нельзя изменять.
    // Сперва его нужно клонировать с помощью метода clone().
		// clone() получает параметром объект, с помощью которого мы можем модифицировать запрос
		const cloned = req.clone({ ... });
		
		// В качестве аргумента next() принимает модифицированный объект запроса
    return next.handle(cloned);
  }
}
```
2. [*app.module.ts*] HttpInterceptor должен быть добавлен в поле providers декоратора @NgModule:
```js
import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './services/interceptor.service';

const INTERCEPTOR_PROVIDER: Provider = {
	// injection-токен HTTP_INTERCEPTORS
	provide: HTTP_INTERCEPTORS, 

	// имя класса, который является HttpInterceptor
	useClass: InterceptorService,    

	// параметр {multi: true} говорит, что injection-токен HTTP_INTERCEPTORS      
	// внедряет не одно значение, а массив значений.      
	// Такой механизм позволяет создавать в приложении Angular      
	// неограниченное количество HTTP Interceptor-ов.      
	multi: true,
};

@NgModule({
  providers: [INTERCEPTOR_PROVIDER],
})
export class AppModule {}
```

## Реактивное программирование RxJS
Реактивное программирование - программирование с использованием асинхронных потоков.     
Асинхронный поток - последовательность событий упорядоченных по
времени.        
Все может быть асинхронным потоком - событие click, массив значений, ответ, который вернул сервер.
С помощью набора инструментов можно
создавать , комбинировать и
фильтровать потоки.

## Сервис
В отличие от компонентов и директив, сервисы не работают с представлениями (html), они выполняют строго определенную и узкую задачу:
- Предоставление данных приложению - сервис может хранить данные в памяти, либо обращаться к какому-нибудь источнику данных
- Сервис может представлять канал взаимодействия между отдельными компонентами
- Сервис может инкапсулировать бизнес-логику, различные вычислительные задачи, задачи по логгированию
