# ecommerce
# Project Description
### Project name: online furniture store “Comfort”
**Purpose:** To create a convenient and functional online furniture store, applying all the acquired and existing knowledge in practice.

**Expected result:** A fully functional online store.
__________
**Stages of project creation:**
__________
  1. Creating and configuring a repository.
  2. Creation :
      - Pages for user authorization.
      - The page for user registration.
      - The main page of the store.
  3. Creation :
      - Catalog pages.
      - Filling the catalog.
      - Store description page.
      - User profile pages.
  4. Creation :
      - Basket pages.
      - Improving the catalog page (if necessary).
      - The "About Us" pages.
__________
**Time to implement the project:**
__________
**Stage 1** : 7 days. (**01.08.23 - 08.08.23**)

**Stage 2** : 14 days. (**08.08.23 - 22.08.23**)

**Stage 3** : 14 days. (**22.08.23 - 05.09.23**)

**Stage 4** : 14 days. (**05.09.23 - 19.09.23**)

__________
Organizational structure of the project.
__________
**[iozefavichus](https://github.com/iozefavichus)**

Team lead\
Developer #1

She is responsible for overall project management, coordination of the work of the\
development team, as well as communication and submission stages of tasks. Heads\
technical decision-making and ensures compliance with deadlines and quality of work.
__________
**[dima92](https://github.com/dima92)**

Developer #2

Responsible for the development and configuration of the backend part of\
the online store, including server logic, database,order processing and payments.
__________
**[mat-kon](https://github.com/mat-kon)**

Developer #3

Responsible for the implementation of the frontend part of the online store,\
including design, development of the user interface and client logic.
__________

> **Addition**
> - If it is necessary to adjust the project, the entire team is notified about the meetup on the specification and the reasons for the adjustment.
> - The organizational structure can be flexible and depends on the specifics of the project and the roles of team members.
> - In the case of a small project, it is possible to combine roles (for example, a developer can also be a tester).
> - Communication and interaction between team members should be open and support a useful exchange of information.
__________
**To assess progress**, a Kanban board is used in the team's office on the Trello platform.\
Also, meetups are agreed upon by the team to track the current progress and identify weaknesses of the project.
__________

> **The stack used:**
>   * Sass
>   * Eslint
>   * Prettier
>   * Typescript
>   * Webpack
>   * Jest
>   * Husky
>   * CommerceTools
__________
# Script Documentation

>**Instructions for use:**
> - Make sure the software or tool is installed on your system. (Need a Node.js 14 and above)
> - Open your system's terminal or command prompt.
>  - Navigate to the directory where you want to use the tool (if applicable). You can use the `cd name_dir` command to change directories.
> - Run command in the terminal or command prompt. Make sure to use the correct syntax and provide any required arguments or options.

> **Script name:** `"start"`;\
> **Usage Description:** The command **"start"** is used to start a development server using webpack and open the application in a web browser. It also specifies the webpack configuration file and sets the environment mode to "development".\
> **Launch Command:** `npm start` or `npm run start`

> **Script name:** `"build:prod"`;\
> **Usage Description:** The command **"build:prod"** is used to run webpack and build your application in production mode. It specifies the webpack configuration file and sets the environment mode to  "production".\
> **Launch Command:** `npm run build`

> **Script name:** `"build:dev"`\
> **Usage Description:** The command **"build:dev"** is used to run webpack and build your application in production mode. It specifies the webpack configuration file and sets the environment mode to  "development".\
> **Launch Command:** `npm run build:dev`

> **Script name:** `"prettier"`\
> **Usage Description:** The command **"prettier"** is used to format files with .ts (TypeScript) and .json extensions using the Prettier tool.\
> **Launch Command:** `npm run prettier`

> **Script name:** `"lint:ts"`\
> **Usage Description:** The command **"lint:ts"** is used to run ESLint, a popular static code analysis tool, on TypeScript files in the current directory and its subdirectories.\
> **Launch Command:** `npm run lint:ts`

> **Script name:** `"lint:ts:fix"`\
> **Usage Description:** The command **"lint:ts:fix"** is used to run ESLint on all JavaScript and TypeScript files within the "src" directory and its subdirectories. Additionally, it applies automatic fixes for fixable issues found in the code.\
> **Launch Command:** `npm run lint:ts:fix`

> **Script name:** `"lint:scss"`\
> **Usage Description:** The command **"lint:scss"** use to run Stylelint, a linter for stylesheets, on all SCSS (Sass) files within the current directory and its subdirectories.\
> **Launch Command:** `npm run lint:scss`

> **Script name:** `"lint:scss:fix"`\
> **Usage Description:** The command "npx style lint **"lint:scss:fix"** is used to run Stylelint on all SCSS (Sass) files within the current directory and its subdirectories, and it also automatically fixes certain linting issues.\
> **Launch Command:** `npm run lint:scss:fix`

> **Script name:** `"test:unit"`\
> **Usage Description:** The command **"test:unit"** runs the Jest test runner\
> **Launch Command:** `npm run test:unit`

> **Script name:** `"prepare"`\
> **Usage Description:** The command **"prepare"** is a command used to set up Husky in a project.\
> **Launch Command:** `npm run prepare`

# Instructions for setting up the project

### Requirements

**Before you start working with the project, make sure that you have the following tools installed:**
1. Node.js (version 14 or higher is recommended).
  - You can install it here [Node.js](https://nodejs.org/ru).
  - To check the version, use the command:
  ```shell
  npm --version
  ```
2. First clone the repository to your local computer and navigate to the project directory.
```shell
git clone <https://github.com/iozefavichus/ecommerce.git>
cd ecommerce/dir-project
```
3. Install all project dependencies:
```shell
npm install
```
4. Create ```.env``` file with constants project.
5. Go to the right branch for development:
```shell
git checkout name-branch
```
6. To develop, you need to create a new branch from the one you will work with.\
  - To create a new branch and go directly to it, use the command:
```shell
git checkout -b name-branch
```
7. Work in your branch.
