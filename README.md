# Project  Setup Command
- Choose your working directory 
- npm/yarn/pnpm/bun
  - intsall any one 
    - npm i yarn -g
- create react project 
  - yarn create vite
    - This command will ask you for different steps to complete your project
  - cd <foldername>
  - yarn    // to install the packages required to run your react project
  - yarn run dev


## SPA 
- Single Page Application 

## DOM Manipulation 
- 2 Types of DOM 

a. Real DOM 
- sent From Server 
- This is required to do SEO 

b. Virtual DOM 
- DOM Elements created and Rendered at client 


### Tailwind setup 
- yarn add tailwindcss postcss autoprefixer --save-dev
- npx tailwindcss init -p
  - this will seupt tailwind.config.js, postcss.config.js
- edit tailwind.config.js with: 
  ```{```

  ``` content: [```
  
  ``` './src/**/*.{js,jsx,ts,tsx,html}' ```
  
  ```]```
  
  ``` ...```
  
  ```}```
  
  - add tailwind to your main css

    ```@tailwind base;```
  
    ```@tailwind components;```
  
    ```@tailwind utilities;```
  
  - Rebuild your FE


## Web Hooks
- special functions present on react that gives us certatin value,effect, memoization or any functionality in react components.
- hooks can only be used in functional components
- all hook functions start with ```use``` key 
- hooks can never be overlapped 

- Major react hooks 
  - State hook
    - useState()
    - Whenever a value of a state variable changes, the component gets reloaded

  - Effect hook 
    - useEffect()
  - Performance Hook 
    - useMemo(), useCallback()
  - Dispatch hook 
    - useDispatch()
  - Ref Hook 
    - useRef()
  - Context hook 
    - useContext()

### SOLID Property 
- S = Single Responsiblity Principle (SRP)
- O = Open/Closed Principle (OCP)
- L = Liskov Substitution Principle (LSP)
- I = Interface Segrigation Principle (ISP)
- D = Dependency Inversion Principle (DIP)

