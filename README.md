# security-course-app

Prerequisites: NodeJS v10+

Install

`git clone https://github.com/tmorozov/security-course-app.git`

`cd security-course-app`

`npm ci`

`npm run build`


Create new credentials (signup)

`npm start -- -c signup -u <username> -p <password>`


Check credentials (login)

`npm start -- -c login -u <username> -p <password>`


Store message (use quotes "" for message with spaces)

`npm start -- -c save -u <username> -p <password> -m <message>`


Load message

`npm start -- -c load -u <username> -p <password>`
