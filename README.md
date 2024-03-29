<h1 align="center">Mimic React 🎩</h1>
<p>리액트 라이브러리를 모방한 자바스크립트 프로젝트</p>

### Features

- HTML구문으로 작성된 코드를 DOM으로 변환
- Component를 DOM으로 변환
  <p align="left"><img src="https://github.com/Danji-ya/JS_mimic-react/assets/53927959/faaa916e-1b3f-451d-9490-e6ea7204953d" alt="example code" width='450px'></p>

- Diffing Algorithm으로 Element 생성, 수정, 삭제

  **엘리먼트의 타입이 다른 경우**

  이전 트리를 버리고 완전히 새로운 트리를 구축

  **엘리먼트의 타입이 같은 경우**

  두 엘리먼트의 속성을 확인하여 동일한 내역은 유지하고 변경된 속성들만 갱신

  **같은 타입의 컴포넌트 엘리먼트**

  새로운 엘리먼트의 내용을 반영하기 위해 현재 컴포넌트 인스턴스의 props를 갱신

- 컴포넌트에 종속되는 상태관리가 아닌 컴포넌트 외부에서 상태를 관리하는 중앙 상태관리 기능
  <p align="left"><img src="https://github.com/Danji-ya/JS_mimic-react/assets/53927959/eee63aea-0b96-4fcc-98c7-293f48325fcc" alt="example code" width='450px'></p>

### Getting Started

```
// 실행에 필요한 패키지 설치
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
