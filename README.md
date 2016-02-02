# canoe-beton

## To Start Working

- Make sure Node is installed

- Install bower and gulp ```npm install -g bower gulp```  

- Clone the repo

- Run ```npm install``` at the root directory of the project

- Run ```bower install``` at the root directory of the project

## Available gulp Tasks

- ```gulp build``` run all tasks and package the site in the dist folder
- ```gulp serve``` open the app in your browser and make it refresh automatically on file saves
- ```gulp lint``` (included in build task) check your source for errors (mainly for javascript)
- ```gulp clean``` clean the dist and temp folder
- ```gulp serve:dist``` same as serve task, but with the files in the dist folder
- ```gulp wiredep``` inject bower components
