*Group contact information:

Brady Gehrman
Phone: (502) 321-6776
Email: btgehr01@louisville.edu

Raymond Lawrence
Phone: (502) 338-8733
Email: rllawr04@louisville.edu

David Antosh 
Phone (270)-205-1876
Email: djanto01@louisville.edu

*Prerequisite Downloads: 

Use this video to guide you through the download processes or follow the steps outlined below:

"React JS Setup, Installation and First React Project Creation" by kudvenkat at https://youtu.be/0twjvW0c1r0

1. Download nodejs and npm (LTS version) via https://nodejs.org/en/ 
2. Download Visual Studio Code via https://code.visualstudio.com/download

*Creation Process:

This React-based web application was created by running the command "npx create-react-app sports_saftey" within a terminal

via instruction from https://reactjs.org/docs/create-a-new-react-app.html

*How to Start the web application:

Open Visual Studio Code, Click File, Open Folder, select the project's base folder (sports_saftey)

Open a terminal within VSCode by clicking Terminal, New terminal 

run "npm install" to install all dependencies, if this fails, delete the node_modules folder and run "npm install"

The Project can be hosted locally on http://localhost:3000/

To start the project, change directories (cd) into the project's base folder via the terminal (sports_saftey),
then run the command "npm start", this should spawn a browser tab that shows the application running within the browser.
The project's code can be updated and recompiled in realtime when it is saved within VSCode.

*Browser inspector console:

To pull up your browser dev console right click your screen and select inspect,
this powerful tool is very useful for debugging and viewing compile and runtime errors

*Adding packages to your project:

Use npm install (package name) to add packages to your project (seen within the node_modules folder and listed inside of package.json folder) 

Happy developing :)

AWS Setup
This project uses AWS components for EAP file storage. In order to use these features for
local setup, these steps must be taken. 
1. Create a free AWS account (Running the project should incur no cost)
2. Install the AWS CLI on your machine. I used pip install awscli but there are other means
3. Setup your credentials. This can be done by going to your AWS account, security credentials
and creating an access key. Make sure to save this info. Once retreived, put ~/.aws/credentials
into your command prompt/IDE and follow the steps.
4. After this setup you should be able to create the cloudformation stack. This can be done
via the Makefile. Using make create for stack creation and make delete for stack deletion.
5. In order to make any changes. Refer to the bucket.yaml and follow AWS documentation for developing 
cloudformation stack templates as there are many resources for assisting you on this. 
6. You should also setup local environment variables using set for windows machines and export for Mac 
    ex: set AWS_SECRET_ACCESS_KEY=******

Project Structure:

React Bootstrap components:
https://react-bootstrap.github.io/components/alerts


