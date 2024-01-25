# MVC Tech Blog

  
  ![Badge for GitHub repo top language](https://img.shields.io/github/languages/top/dpprdgls/MVC-Tech-Blog?style=flat&logo=appveyor) ![Badge for GitHub last commit](https://img.shields.io/github/last-commit/dpprdgls/MVC-Tech-Blog?style=flat&logo=appveyor)
  

  ## Description
  This application was developed so that users could create and interact with content created by other users within the tech world. This application allows users to store created content in their dashboards, comment on posts from other users, as well as edit and delete their own posts. This projects goal was to implement the Model View Controller specifications and uses object-relational-mapping via Sequelize to connect the front-end UI to the database with the Express framework routing. The projet also utilizes the Handlebars temping engine which allows data to be transferred from the database to the front-end in a simplified and DRY manner. 



  ## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
    
    ## Installation
    
    *Steps required to install project and how to get the development environment running:*

    1. Clone the repo:
    git clone https://github.com/dpprdgls/MVC-Tech-Blog

    2. Open in VS Code. If you do not have VS code you must install it.

    3. Using the terminal, install node.js v16. If you have homebrew, the command should look like the following (brew install node@16), however this may vary and the documentation should be consulted.

    4. Once node.js v16 is installed, in the terminal, utilize the command npm init -y to initialize and create a package.json where project files will be stored.

    5. Next, use the terminal to run the command npm i to install the dependencies associated with this application (developers may need to install dependencies directly from the command line).

      Commands to install each dependency:

      - Command for sequelize will be npm i sequelize
      - Command for mysql2 will be npm i mysql2
      - Command for express will be npm i express@4.18.2
      - Command for dotenv will be npm i dotenv
      - Command for nodemon will be npm i nodemon
      - Command for bcrypt will be npm i bcrypt
      - Command for bootstrap will be npm i bootstrap
      - Command for connect-session-sequelize will be npm i connect-session-sequelize
      - Command for express-handlebars will be npm i express-handlebars
      - Command for express-session will be npm i express-session
      - Command for jest will be npm i jest

    6. Next, you will need to make sure you have an added .env file within the root directory of your repository, within which you will pass your environmental variables specifying the database name, your MySQL username, and your MySQL password. This will need to be completed before running the application, and will allow the connection.js file to utilize your environmental variables keeping your sensitive information protected.

    7. If you do not have a MySQL account, you will need to create one (see https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/).

    8. Once all dependencies are installed, you will need to create the database. To do this you will need to navigate to the directory db directory containing the schema.sql file. Once there, you will need to open up a MySQL shell using the command mysql -u root -p, where you will then be prompted to enter you password. Once your password is entered you will be in the MySQL shell.

    9. Once in the MySQL shell you will then run the command source schema.sql. This will create the database.

    10. Once the database has been created, you will then need to seed the database (this will also create the model structure for the tables within the database). To do this, navigate to the root directory and run the command npm run seed. This needs to be done from the root directory because the .env file lives within the root.

    11. Once the database has been seeded, you will then be able to run the command npm start from the root directory to spin up the server. With nodemon installed, you will also be able to utilize the command npm run watch to keep the server spun up between code edits.

    12. From there, you can utilize applications such as Insomnia to test the functionality of the routes within the program and make edits to both the front-end and back-end of the code base.



    
    ## Usage

    This intuitive application will be straight forward and highly interactive for the user via the front-end UI. It will feel similar to many of the other applications they already use on the internet. They can signup and login to their new account and start posting and reading content. 
   


    *Instructions and examples for use:*
    


    ## License
    
    This project is covered under the MIT License license.
  ---

  ## Questions? 

  <img src="https://avatars.githubusercontent.com/u/74167696?v=4" alt="dpprdgls" width="40%" />

  For any questions or concerns, feel free to contact me using the information below:
  
  GitHub: [@dpprdgls](https://api.github.com/users/dpprdgls)

  