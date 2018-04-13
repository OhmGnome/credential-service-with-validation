## Installation

open eclipse
import an existing maven project
start the server from the boot dashboard (get spring tools plugin for eclipse)
open the browser and navigate to http://localhost:8080/login

valid credentials:
user: user
password: admin123

to test, open command console. navigate to the root folder of the project and type:
npm install
(alternatively, a maven install should install node and run npm install)
then:
ng test

## Caveats

It is always better to do validation on the backend. However, I have made validation in an angular way instead. In a commercial application, I would do both. Validation does not happen until the form is submitted. Afterward, the validation error messages are checked when the user types in the password field. I spent 5 hours on it. I do not know if the deployable jar will work, because the angular app is located in the target dir also, and not the resources package where it would have been included in the jar from.