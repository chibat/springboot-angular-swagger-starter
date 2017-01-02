# Spring Boot と Angular2 をタイプセーフに繋ぐ

フロントエンドの開発は、TypeScript や flow によりタイプセーフに行えるようになってきています。  
そうなるとバックエンドとフロントエンドの通信もタイプセーフにしたくなってくるはずです。  
[Swagger](http://swagger.io/) を使えばそれが実現できそうです。  
Swagger により Angular2 のクライアントのコードを自動生成できるのです。  
作成してみた Example Code を github で公開してみました。

[https://github.com/chibat/springboot-angular2-swagger-example:embed:cite]

## バックエンド

バックエンドには、Spring Boot を使いました。  
Swagger を使うための [Springfox](http://springfox.github.io/springfox/) というものがありまして、Spring MVC は、Swagger との相性がとても良いです。

### Java

まずはバックエンドのコードです。

/backend/src/main/java/app/Application.java

```java
package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2 // (1)
@RestController
public class Application {

    @GetMapping("/rest/add")
    public Response add(@RequestParam Integer arg1, @RequestParam Integer arg2) {
        return new Response(arg1 + arg2);
    }

    public static class Response {
        public final Integer result;

        public Response(final Integer result) {
            this.result = result;
        }
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

リクエストパラメータで受け取った二つの整数を足してレスポンスするという単純なコードです。  
Spring Boot 側は次のコマンドで起動します。フロントエンドのビルドも走るのでちょっと時間がかかります。

```
$ cd backend
$ ./gradlew bootRun
```

リクエスト・レスポンスは、次のような感じになります。
```
$ curl -s 'http://localhost:8080/rest/add?arg1=1&arg2=2'
{"result":3}
```

(1)で EnableSwagger2 アノテーションを付けることにより、バックエンドの仕様を公開するようになります。  
次のような感じで JSON で仕様が確認できるようになります。

```
$ curl -s 'http://localhost:8080/v2/api-docs'
{"swagger":"2.0","info":{"description":"Api Documentation","version":"1.0","title":"Api Documentation","termsOfService":"urn:tos","contact":{},"license":{"name":"Apache 2.0","url":"http://www.apache.org/licenses/LICENSE-2.0"}},"host":"localhost:8080","basePath":"/","tags":[{"name":"application","description":"Application"},{"name":"basic-error-controller","description":"Basic Error Controller"}],"paths":{"/error":{"get":{"tags":["basic-error-controller"],"summary":"errorHtml","operationId":"errorHtmlUsingGET","consumes":["application/json"],"produces":["text/html"],"responses":{"200":{"description":"OK","schema":{"$ref":"#/definitions/ModelAndView"}},"401":{"description":"Unauthorized"},"403":{"description":"Forbidden"},"404":{"description":"Not Found"}}},"head":{"tags":["basic-error-controller"],"summary":"errorHtml","operationId":"errorHtmlUsingHEAD","consumes":["application/json"],"produces":["text/html"],"responses":{"200":{"description":"OK","schema":{"$ref":"#/definitions/ModelAndView"}},"401":{"description":"Unauthorized"},"204":{"description":"No Content"},"403":{"description":"Forbidden"}}},"post":{"tags":["basic-error-controller"],"summary":"errorHtml","operationId":"errorHtmlUsingPOST","consumes":["application/json"],"produces":["text/html"],"responses":{"200":{"description":"OK","schema":{"$ref":"#/definitions/ModelAndView"}},"201":{"description":"Created"},"401":{"description":"Unauthorized"},"403":{"description":"Forbidden"},"404":{"description":"Not Found"}}},"put":{"tags":["basic-error-controller"],"summary":"errorHtml","operationId":"errorHtmlUsingPUT","consumes":["application/json"],"produces":["text/html"],"responses":{"200":{"description":"OK","schema":{"$ref":"#/definitions/ModelAndView"}},"201":{"description":"Created"},"401":{"description":"Unauthorized"},"403":{"description":"Forbidden"},"404":{"description":"Not Found"}}},"delete":{"tags":["basic-error-controller"],"summary":"errorHtml","operationId":"errorHtmlUsingDELETE","consumes":["application/json"],"produces":["text/html"],"responses":{"200":{"description":"OK","schema":{"$ref":"#/definitions/ModelAndView"}},"401":{"description":"Unauthorized"},"204":{"description":"No Content"},"403":{"description":"Forbidden"}}},"options":{"tags":["basic-error-controller"],"summary":"errorHtml","operationId":"errorHtmlUsingOPTIONS","consumes":["application/json"],"produces":["text/html"],"responses":{"200":{"description":"OK","schema":{"$ref":"#/definitions/ModelAndView"}},"401":{"description":"Unauthorized"},"204":{"description":"No Content"},"403":{"description":"Forbidden"}}},"patch":{"tags":["basic-error-controller"],"summary":"errorHtml","operationId":"errorHtmlUsingPATCH","consumes":["application/json"],"produces":["text/html"],"responses":{"200":{"description":"OK","schema":{"$ref":"#/definitions/ModelAndView"}},"401":{"description":"Unauthorized"},"204":{"description":"No Content"},"403":{"description":"Forbidden"}}}},"/rest/add":{"get":{"tags":["application"],"summary":"add","operationId":"addUsingGET","consumes":["application/json"],"produces":["*/*"],"parameters":[{"name":"arg1","in":"query","description":"arg1","required":true,"type":"integer","format":"int32"},{"name":"arg2","in":"query","description":"arg2","required":true,"type":"integer","format":"int32"}],"responses":{"200":{"description":"OK","schema":{"$ref":"#/definitions/Response"}},"401":{"description":"Unauthorized"},"403":{"description":"Forbidden"},"404":{"description":"Not Found"}}}}},"definitions":{"Response":{"type":"object","properties":{"result":{"type":"integer","format":"int32"}}},"ModelAndView":{"type":"object","properties":{"empty":{"type":"boolean"},"model":{"type":"object"},"modelMap":{"type":"object","additionalProperties":{"type":"object"}},"reference":{"type":"boolean"},"status":{"type":"string","enum":["100","101","102","103","200","201","202","203","204","205","206","207","208","226","300","301","302","303","304","305","307","308","400","401","402","403","404","405","406","407","408","409","410","411","412","413","414","415","416","417","418","419","420","421","422","423","424","426","428","429","431","451","500","501","502","503","504","505","506","507","508","509","510","511"]},"view":{"$ref":"#/definitions/View"},"viewName":{"type":"string"}}},"View":{"type":"object","properties":{"contentType":{"type":"string"}}}}}
```

### build script

ビルドには Gradle を使っています。

/backend/build.gradle

```groovy
buildscript {
    ext {
        springBootVersion = '1.4.3.RELEASE'
    }
    repositories {
        mavenCentral()
    }
    dependencies {
        classpath("org.springframework.boot:spring-boot-gradle-plugin:${springBootVersion}")
    }
}

apply plugin: 'java'
apply plugin: 'eclipse'
apply plugin: 'org.springframework.boot'

jar {
    baseName = 'app'
    version = '0.0.1-SNAPSHOT'
}
sourceCompatibility = 1.8
targetCompatibility = 1.8

repositories {
    mavenCentral()
}


dependencies {
    compile('org.springframework.boot:spring-boot-starter-web')
    compile 'io.springfox:springfox-swagger2:2.6.1'
    testCompile('org.springframework.boot:spring-boot-starter-test')
    testCompile 'io.springfox:springfox-staticdocs:2.6.1'
}

task generateSwaggerSpec(type: Test, dependsOn: testClasses) {
    filter {
        includeTestsMatching "app.SwaggerSpecGenerator"
    }
}

configurations {
    swaggercodegen
}

dependencies {
    swaggercodegen 'io.swagger:swagger-codegen-cli:2.2.1'
}

def SWAGGER_CLIENT_DIR = '../frontend/src/swagger';

task cleanSwaggerCodegen(type: Delete) {
    delete SWAGGER_CLIENT_DIR
}

task swaggerCodegen(type: JavaExec) {
    classpath = configurations.swaggercodegen
    main = 'io.swagger.codegen.SwaggerCodegen'
        args('generate',
        '-l', 'typescript-angular2',
        '-i', 'publications/swagger.json',
        '-o', SWAGGER_CLIENT_DIR)
}

swaggerCodegen.dependsOn cleanSwaggerCodegen
swaggerCodegen.dependsOn generateSwaggerSpec

task compileFrontend(type:Exec) {
    workingDir '../frontend'
    ant.condition(property: "isWindows", value: true) { os(family: "windows") }
    commandLine(ant.properties.isWindows ?
        ['cmd', '/c', 'ng', 'build', '--aot', '--target=production'] :
        ['ng', 'build', '--aot', '--target=production'])
}

jar.dependsOn compileFrontend
bootRun.dependsOn compileFrontend
```

追加した処理は、以下です。
* mock mvc を使ったテストで バックエンドの仕様を表す `swagger.json` の生成
* `swagger.json` から Angular2 のクライアントコードの生成
* gradle から ng コマンドを叩いて フロントエンドのビルドを開始する

Angular2 用のクライアントコードを生成するコマンドは、次になります。

```
$ ./gradlew swaggerCodegen
```

次の位置にファイルが生成されます。  
/frontend/src/swagger/.

## フロントエンド

フロントエンドは、Angular2 を使います。

### TypeScript

/frontend/src/app/app.component.ts

```typescript
import { Component, Input } from '@angular/core';
import {ApplicationApi} from '../swagger/api/ApplicationApi'
import {Http} from '@angular/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  template: `
  <h1>
    <input type="number" [(ngModel)]="arg1" /> +
    <input type="number" [(ngModel)]="arg2" />
    <button (click)="add()">add</button>
    {{result}}
  </h1>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  arg1: number;
  arg2: number;
  result: number;
  constructor(private http: Http) {
  }
  add() {
    if (this.arg1 || this.arg2) {
      new ApplicationApi(this.http, environment.basePath)
        .addUsingGET(this.arg1, this.arg2)
        .subscribe(data=>this.result = data.result);
    }
  }
}
```

Swagger により生成された `ApplicationApi` を利用しています。  
通信部分のコードで補完がきくし、エラーチェックしてくれます。  
そうそう、俺が実現したかったのこれ！  
とても単純な例なので複雑なパターンに対応できるのか分かっていません。。  
まー、Swagger の場合、コード生成する部分を簡単に置き換えられるようにはなっているので少し安心ですが。

フロントエンド開発用のサーバ起動は次になります。

```
$ cd frontend
$ npm start
```

画面は以下。

screenshot

本題に関しましては、以上です。  
以下、おまけ。

## おまけ

### Swagger で生成されたコードが、 VS Code 上でエラーになる

`/frontend/src/swagger/model/ModelAndView.ts` が VS Code 上でエラー表示されます。enum がなんか変。  
次の Swagger のバージョンアップで生成されるコードが変わりそうなため、バージョンアップを待ちます。。

### プロジェクトの雛形作成

プロジェクトのルートに backend, frontend というディレクトリを作って完全にバックエンドのファイルとフロントエンドのファイルを分けて管理するようにしてみました。  
Spring Boot 側の雛形は、 [Spring Initializr](http://start.spring.io/) で、Angular側は、[Angular-CLI](https://cli.angular.io/) で作成しました。

### バックエンド と フロントエンドで使う IDE を分ける

今回、バックエンドは eclipse(STS)、フロントエンドは Visual Studio Code でコーディングしました。  
本当は、 eclipse だけで済ますことができれば良いのですが、フロントエンド開発に eclipse は弱そうです。  
ルートの backend ディレクトリは、 eclipse の プロジェクトとして読み込み、 frontend ディレクトリは VS Code のプロジェクトとして読み込みます。

### フロンエンド開発用サーバへのリクエストをバックエンドのサーバに proxy する

Angular-CLI で作成したプロジェクトの場合、`proxy.conf.json` に proxy の情報を書きます。

/frontend/proxy.conf.json

```json
{
  "/rest": {
    "target": "http://localhost:8080",
    "secure": false
  }
}
```

そして、 package.json の scripts.start 部分も書き換えます。

```json
{
  // 省略
  "scripts": {
    "ng": "ng",
    "start": "ng serve --proxy-config proxy.conf.json",
    "lint": "tslint \"src/**/*.ts\"",
    "test": "ng test",
    "pree2e": "webdriver-manager update --standalone false --gecko false",
    "e2e": "protractor"
  },
  // 省略
}
```

### backend の .gitignore に `.bin` を追加する

Spring Initializr で作成した .gitignore に `.bin` がない。  
追加しないと eclipse でコンパイルしたファイルが commit される。

### swagger で吐き出したコードが、basePath の指定を強制する

相対パスで指定できない。  
enviroments.ts で basePath とか定義して切り分けてるけど、 `location.host` とか利用した方が良いのかな。

### frontend のビルドでファイルの出力先を変更する

frontend でビルドしたファイルを backend 側に出力し、 jar の中に含めるようにしています。  
その設定が、`angular-cli.json` の `apps.outDir` です。

```json
{
  // 省略
  "apps": [
    {
      "root": "src",
      "outDir": "../backend/build/resources/main/static",
  // 省略
```

### Angular2 は、実案件でそろそろ使って良い？

個人的には Angular-CLI や [Visual Studio Code Exetnsion](https://github.com/angular/vscode-ng-language-service/releases) の正式リリースを待ってから実案件で使うのが良いかと思っているところです。

### Angular2 で HTML テンプレートは、どこに書く？

別HTMLに書くか、typescript の Decorator に書くか選択できます。  
コンパイル速度や IDE のコード解析を考えると、Decorator に書いた方が良いかもしれません。

### React とどっちが良い ？

今のところ、 実績のある React かなーと。  
React も swagger で fetch API のクライアントを生成すればタイプセーフな通信もできそうですし、JSX, flow, typescript によるタイプセーフなテンプレートも良い感じですし。  
Angular2 はデフォルトのコンパイルだとテンプレート部分は、単なる文字列であって、AOTやらでどこまで静的解析してくれるのかよく分かっていません。  
React は、ライブラリの組み合わせに悩みそうな感じがあり、フルスタックフレームワーク的な Angular の方はその点悩むこと少なそうと思います。
flow より TypeScript を推したい自分としては、TypeScript 製の Angular2 に期待しているところです。

以上



