# Basic React

### 1. 웹 게임을 만들며 배우는 React 강의 실습 예제 기반

* [웹 게임을 만들며 배우는 React](https://www.inflearn.com/course/web-game-React "웹 게임을 만들며 배우는 React") 참고

### 2. 차이점

* ESLint & Prettier 설정 추가
* webpack 설정 변경

### 3. TODO

*

### 4. Setting

* react & webpack  

    ``` javascript
    npm i react react-dom
    npm i -D webpack webpack-cli webpack-merge webpack-dev-server
    ```

* eslint & prettier
  
    ``` javascript
    npm i -D eslint
    npm i -D eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
    npm i -D prettier eslint-config-prettier eslint-plugin-prettier
    ```

    포맷팅만 사용하는 경우 (에디터 자체에 prettier 설치 필요(?))  
    config / "extends": ["prettier"] / "plugins": ["prettier"]

    ``` javascript
    npm i -D prettier eslint-config-prettier
    ```

    eslint 와 연결해서 사용하는 경우
    config + lint / "extends": ["plugin:prettier/recommended"] / "plugins": ["prettier"]

    ``` javascript
    npm i -D prettier eslint-config-prettier eslint-plugin-prettier
    ```

* babel
  
    ``` javascript
    npm i -D @babel/core @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties
    npm i -D babel-loader babel-eslint
    ```
