# VanillaJS로 JSX 및 diff 알고리즘 + 중앙상태관리를 흉내내본 저장소

## 👀 실행 결과

### JSX 문법

- 일반 태그 및 컴포넌트 적용

```ts
return (
  <div>
    <h2>투두리스트</h2>
    <Todo books={books} addItem={this.addItem} checkItem={this.checkItem} removeItem={this.removeItem} />
  </div>
)
```

<img width="825" alt="스크린샷 2022-05-27 오후 12 32 05" src="https://user-images.githubusercontent.com/53927959/170624148-23085f0d-26b1-41e9-a9b1-64c640118782.png">

</br>

### diff 알고리즘을 사용한 최적화

#### 추가

![추가](https://user-images.githubusercontent.com/53927959/170624334-b03d0fef-c4be-4fef-8795-384ac73bf240.gif)


#### 수정

![수정](https://user-images.githubusercontent.com/53927959/170624517-5e5fd377-fd80-4a22-99b3-ca1d34443b2c.gif)

#### 삭제

![삭제](https://user-images.githubusercontent.com/53927959/170624635-e0324cb2-3ecb-49ed-ab71-a5029a775ca8.gif)


### 중앙 상태 관리
컴포넌트에 종속되는 상태관리가 아닌 컴포넌트 외부에서 상태를 관리하도록 중앙 상태 관리 기능을 추가하였다.




<br>

## ⚙️ 실행 방법

```
// 관련 패키지 설치
$ npm install

// version1 실행
$ npm start

// version2 실행
$ npm run start-v2

// version3 실행
$ npm run start-v3

// version4 실행
$ npm run start-v4
```