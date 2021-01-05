# NestJS

### 설치

```jsx
$ npm install -g @nestjs/cli
$ nest new project-name
```

### 시작하기

```jsx
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### 구조

- src 디렉토리

    controller, spec, module, service, main

- test 디렉토리

### main.ts

- NodeJS는 main.ts 파일을 가져야 함. → 이름을 변경할 수 없음.
- bootstrap 함수
    - AppModule 클래스
        - @Module 함수
            - 데코레이터 → @로 사용
            - 클래스  위의 함수, 클래스를 위해 움직인다.
- main.ts가 모든걸 시작한다.
- 하나의 모듈에서 어플리케이션을 생성한다.
- 앱 모듈을 루트 모듈이다.
- 모듈이란 어플리케이션의 일부. 한 가지 역할을 하는 앱.
- controller
    - 기본적으로 url을 가져오고 함수를 실행하는 역할을 함.
    - express의 router와 같은 역할
    - controller의 @Get 데코레이터는 express의 get 라우터와 같은 역할.
    - express의 app.get()과 같다. → 우리는 라우터 설정을 할 필요가 없다.

    ```jsx
    @Controller()
    export class AppController {
      constructor(private readonly appService: AppService) {}

      @Get()
      getHello(): string {
        return this.appService.getHello();
      }
    	
    	# 이렇게 사용한다. -> localhost:3000/hello로 접속하면 Hello everyone 출력
      @Get('/hello')
      sayHello(): string {
        return 'Hello everyone';
      }
    	
    	# 잘못된 예 -> 데코레이터와 함수 사이에 빈칸을 두지 말 것.
    	@Get('/hello')

      sayHello(): string {
        return 'Hello everyone';
      }
    }
    ```

### 구조와 아키텍처

- NestJS는 콘트롤러를 비지니스 로직이랑 구분 짓고 싶어한다.
- 컨트롤러는 그냥 url를 가져오는 역할일 뿐이다. 그리고 function을 실행하는 정도.
- 나머지 비지니스 로직은 서비스로 구분
- 서비스는 일반적으로 실제로 function을 가지는 부분
- NestJS가 바라는 방법
    - app.controller.ts 파일

    ```jsx
    @Controller()
    export class AppController {
      constructor(private readonly appService: AppService) {}

      @Get()
      getHello(): string {
        return this.appService.getHello();
      }

      @Get('/hello')
      getHi(): string {
        return this.appService.getHi();
      }
    }
    ```

    url을 가져오고 function을 리턴하는 역할

    - app.service.ts

    ```jsx
    @Injectable()
    export class AppService {
      getHello(): string {
        return 'Hello World!';
      }

      getHi(): string {
        return 'Hi Nest';
      }
    }
    ```

    function을 놓는 곳. 비지니스 로직을 실행.

### NestJS cli - generate

```jsx
generate|g [options] <schematic> [name] [path]  Generate a Nest element.
    Available schematics:
      ┌───────────────┬─────────────┬──────────────────────────────────────────────┐
      │ name          │ alias       │ description                                  │
      │ application   │ application │ Generate a new application workspace         │
      │ class         │ cl          │ Generate a new class                         │
      │ configuration │ config      │ Generate a CLI configuration file            │
      │ controller    │ co          │ Generate a controller declaration            │
      │ decorator     │ d           │ Generate a custom decorator                  │
      │ filter        │ f           │ Generate a filter declaration                │
      │ gateway       │ ga          │ Generate a gateway declaration               │
      │ guard         │ gu          │ Generate a guard declaration                 │
      │ interceptor   │ in          │ Generate an interceptor declaration          │
      │ interface     │ interface   │ Generate an interface                        │
      │ middleware    │ mi          │ Generate a middleware declaration            │
      │ module        │ mo          │ Generate a module declaration                │
      │ pipe          │ pi          │ Generate a pipe declaration                  │
      │ provider      │ pr          │ Generate a provider declaration              │
      │ resolver      │ r           │ Generate a GraphQL resolver declaration      │
      │ service       │ s           │ Generate a service declaration               │
      │ library       │ lib         │ Generate a new library within a monorepo     │
      │ sub-app       │ app         │ Generate a new application within a monorepo │
      │ resource      │ res         │ Generate a new CRUD resource                 │
      └───────────────┴─────────────┴──────────────────────────────────────────────┘
```

### 앱 모듈 생성

- controller 생성

    ```jsx
    $ nest g co
    # 앱 모듈 이름 입력
    ```

- nest g co 명령어로 컨트롤러 생성
- controller 파일이 생성된다.
- @Controller() → 기본 라우터
- @Get() → express의 get 라우터

### 예제 : movies 모듈

- app.module.ts 파일

    ```jsx
    import { Module } from '@nestjs/common';
    import { MoviesController } from './movies/movies.controller';

    @Module({
      imports: [],
      controllers: [MoviesController],
      providers: [],
    })
    export class AppModule {}
    ```

- movies.controller.ts 파일

    ```jsx
    import { Controller, Get, Param, Post, Delete, Put, Patch, Body, Query } from '@nestjs/common';

    @Controller('movies')
    export class MoviesController {

        @Get()
        getAll(){
            return 'This will return all movies';
        }

        @Get('search')
        search(@Query("year") searchingYear: string){
            return `We are searching for a movie made after: ${searchingYear}`;
        }

        @Get(':id')
        getOne(@Param('id') movieId: string) {
            return `This will return one movie with the id: ${movieId}`;
        }

        @Post()
        create(@Body() movieData) {
            console.log(movieData);
            return 'This will create a movie';
        }

        @Delete(':id')
        remove(@Param('id') movieId: string) {
            return `This will delete a movie with the id: ${movieId}`;
        }

        @Patch(':id')
        path(@Param('id') movieId: string, @Body() updateData) {
            return {
                updateData: movieId,
                ...updateData,
            };
        }
    }
    ```

### 서비스 생성

- service 생성

    ```jsx
    $ nest g s
    # 서비스 이름 입력
    ```

- app.module.ts 파일

    ```jsx
    import { Module } from '@nestjs/common';
    import { MoviesController } from './movies/movies.controller';
    import { MoviesService } from './movies/movies.service';

    @Module({
      imports: [],
      controllers: [MoviesController],
      providers: [MoviesService],
    })
    export class AppModule {}
    ```

- movies.controller.ts 파일

    ```jsx
    import { Controller, Get, Param, Post, Delete, Put, Patch, Body, Query } from '@nestjs/common';
    import { MoviesService } from './movies.service';
    import { Movie } from './entities/movies.entity';
    import { create } from 'domain';

    @Controller('movies')
    export class MoviesController {
        constructor(private readonly moviesService: MoviesService) {}

        @Get()
        getAll(): Movie[] {
            return this.moviesService.getAll();
        }

        @Get(':id')
        getOne(@Param('id') movieId: string): Movie {
            return this.moviesService.getOne(movieId);
        }

        @Post()
        create(@Body() movieData) {
            return this.moviesService.create(movieData);
        }

        @Delete(':id')
        remove(@Param('id') movieId: string) {
            return this.moviesService.deleteOne(movieId);
        }

        @Patch(':id')
        path(@Param('id') movieId: string, @Body() updateData) {
            return this.moviesService.update(movieId, updateData);
        }
    }
    ```

- movies.service.ts 파일

    ```jsx
    import { Injectable, NotFoundException } from '@nestjs/common';
    import { Movie } from './entities/movies.entity';
    import { findSourceMap } from 'module';

    @Injectable()
    export class MoviesService {
        private movies: Movie[] = [];

        getAll(): Movie[] {
            return this.movies;
        }

        getOne(id: string): Movie {
            const movie = this.movies.find(movie => movie.id === +id);
            if(!movie) {
                throw new NotFoundException(`Movie with ID ${id} not found.`);
            }
            return movie;
        }

        deleteOne(id: string) {
            this.getOne(id);
            this.movies = this.movies.filter(movie => movie.id !== +id);
        }

        create(movieData) {
            this.movies.push({
                id: this.movies.length + 1,
                ...movieData,
            })
        }

        update(id: string, updateData) {
            const movie = this.getOne(id);
            this.deleteOne(id);
            this.movies.push({...movie, ...updateData});
        }
    }
    ```

    ### NestJS DTO

    - 유효성 검사 & 자동 형변환

        ```jsx
        $ npm i class-validator class-transformer
        ```

    - 부분 타입 검사

        ```jsx
        $ npm i @nestjs/mapped-types
        ```

    - main.ts 파일

        ```jsx
        import { NestFactory } from '@nestjs/core';
        import { AppModule } from './app.module';
        import { ValidationPipe } from '@nestjs/common';

        async function bootstrap() {
          const app = await NestFactory.create(AppModule);
          app.useGlobalPipes(
            new ValidationPipe({
              whitelist: true,
              forbidNonWhitelisted: true,
              transform: true,
            }),
          );
          await app.listen(3000);
        }
        bootstrap();
        ```

    - create-movie.dto.ts 파일

        ```jsx
        import { IsString, IsNumber, IsOptional } from 'class-validator';

        export class CreateMovieDto {
            @IsString()
            readonly title: string;

            @IsNumber()
            readonly year: number;
            
            @IsOptional()
            @IsString({ each: true })
            readonly genres: string[];
        }
        ```

    - update-movie.dto.ts 파일

        ```jsx
        import { PartialType } from '@nestjs/mapped-types';
        import { CreateMovieDto } from './create-movie.dto';

        export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
        ```

    - movies.controller.ts 파일

        ```jsx
        import { Controller, Get, Param, Post, Delete, Put, Patch, Body, Query } from '@nestjs/common';
        import { MoviesService } from './movies.service';
        import { Movie } from './entities/movies.entity';
        import { create } from 'domain';
        import { CreateMovieDto } from './dto/create-movie.dto';
        import { UpdateMovieDto } from './dto/update-movie.dto';A

        @Controller('movies')
        export class MoviesController {
            constructor(private readonly moviesService: MoviesService) {}

            @Get()
            getAll(): Movie[] {
                return this.moviesService.getAll();
            }

            @Get(':id')
            getOne(@Param('id') movieId: number): Movie {
                return this.moviesService.getOne(movieId);
            }

            @Post()
            create(@Body() movieData: CreateMovieDto) {
                return this.moviesService.create(movieData);
            }

            @Delete(':id')
            remove(@Param('id') movieId: number) {
                return this.moviesService.deleteOne(movieId);
            }

            @Patch(':id')
            path(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
                return this.moviesService.update(movieId, updateData);
            }
        }
        ```

    - movies.service.ts 파일

        ```jsx
        import { Injectable, NotFoundException } from '@nestjs/common';
        import { Movie } from './entities/movies.entity';
        import { findSourceMap } from 'module';
        import { CreateMovieDto } from './dto/create-movie.dto';
        import { UpdateMovieDto } from './dto/update-movie.dto';

        @Injectable()
        export class MoviesService {
            private movies: Movie[] = [];

            getAll(): Movie[] {
                return this.movies;
            }

            getOne(id: number): Movie {
                const movie = this.movies.find(movie => movie.id === id);
                if(!movie) {
                    throw new NotFoundException(`Movie with ID ${id} not found.`);
                }
                return movie;
            }

            deleteOne(id: number) {
                this.getOne(id);
                this.movies = this.movies.filter(movie => movie.id !== id);
            }

            create(movieData: CreateMovieDto) {
                this.movies.push({
                    id: this.movies.length + 1,
                    ...movieData,
                })
            }

            update(id: number, updateData: UpdateMovieDto) {
                const movie = this.getOne(id);
                this.deleteOne(id);
                this.movies.push({...movie, ...updateData});
            }
        }
        ```