# security-course-app

Prerequisites: NodeJS v10+

Install
`git clone https://github.com/tmorozov/security-course-app.git`
`cd security-course-app`
`npm ci`

Create new credentials (signup)
`npx ts-node src/index.ts -c signup -u <username> -p <password>`

Check credentials (login)
`npx ts-node src/index.ts -c login -u <username> -p <password>`
