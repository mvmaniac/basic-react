# Basic React

### 1. 강의 실습 예제 기반

- [웹 게임을 만들며 배우는 React](https://www.inflearn.com/course/web-game-React "웹 게임을 만들며 배우는 React") 참고
- [웹 게임을 만들며 배우는 React에 TypeScript 적용하기](https://www.inflearn.com/course/react-typescript-webgame "웹 게임을 만들며 배우는 React에 TypeScript 적용하기") 참고

### 2. 차이점

- EditorConfig 설정 추가
- ESLint & Prettier 설정 추가
- webpack 설정 변경

### 3. TODO

-

### 4. Setting

- react

  ```javascript
  npm i react react-dom
  ```

- react router

  ```javascript
  npm i react-router react-router-dom
  ```

- react refresh

  ```javascript
  npm i -D react-refresh
  ```

- react refresh with webpack5

  ```javascript
  npm i -D react-refresh @pmmmwh/react-refresh-webpack-plugin
  ```

- react refresh with webpack5, typescript

  ```javascript
  npm i -D react-refresh @pmmmwh/react-refresh-webpack-plugin react-refresh-typescript
  ```

- webpack5

  ```javascript
  npm i -D webpack webpack-cli webpack-merge webpack-dev-server
  npm i -D clean-webpack-plugin eslint-webpack-plugin
  ```

- webpack5 with typescript

  ```javascript
  npm i -D webpack webpack-cli webpack-merge webpack-dev-server
  npm i -D clean-webpack-plugin fork-ts-checker-webpack-plugin
  ```

- eslint with react

  ```javascript
  npm i -D eslint
  npm i -D eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
  ```

- eslint with react, typescript

  ```javascript
  npm i -D eslint
  npm i -D eslint-config-airbnb-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
  ```

- prettier

  포맷팅만 사용하는 경우 (에디터 자체에 prettier 설치 필요)

  ```javascript
  npm i -D prettier eslint-config-prettier
  ```

  ```javascript
  "extends": ["prettier"]
  ```

  eslint 와 연결해서 사용하는 경우

  ```javascript
  npm i -D prettier eslint-config-prettier eslint-plugin-prettier
  ```

  ```javascript
  "extends": ["plugin:prettier/recommended"]
  "plugins": ["prettier"]
  ```

- babel

  babel-eslint가 @babel/eslint-parser로 변경 되었고
  그러면서 별도의 babel config 파일이 필요한데
  현재 예제 상 babel-eslint가 필요한 부분이 클래스 컴포넌트에서
  화살표 함수로 속성을 사용한 경우라서 그냥 넘어감

  ```javascript
  npm i -D @babel/core @babel/preset-env @babel/preset-react
  npm i -D @babel/plugin-proposal-class-properties
  npm i -D babel-loader
  npm i -D babel-eslint
  ```

- typescript

  ```javascript
  npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
  npm i -D ts-loader
  ```

- types

  ```javascript
    npm i -D @types/react @types/react-dom
    npm i -D @types/react-router @types/react-router-dom
  ```
