# Basic Multi Module

### 1. 웹 게임을 만들며 배우는 React 강의의 실습 예제 기반

* [웹 게임을 만들며 배우는 React](https://www.inflearn.com/course/web-game-React/dashboard "웹 게임을 만들며 배우는 React") 참고

### 2. 차이점

* eslint & prettier 설정 추가
* Webpack 설정 변경

### 3. TODO

### 4. Installation

* init  
      ```npm init```

* react & webpack  
    ```npm i react react-dom```  
    ```npm i -D webpack webpack-cli webpack-merge```  
    ```npm i -D @babel-core @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties```  
    ```npm i -D webpack-dev-server react-hot-loader```  

* eslint & prettier  
    ```npm i -D eslint prettier```

    포맷팅만 사용하는 경우  
    config / "extends": ["prettier"]  
    ```npm i -D eslint-config-prettier```

    eslint 와 연결해서 사용하는 경우  
    config + lint / "extends": ["plugin:prettier/recommended"]  
    ```npm i -D eslint-config-prettier eslint-plugin-prettier```
