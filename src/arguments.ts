import minimist from 'minimist';

const argv = minimist(process.argv.slice(2), {
    alias: {
        command: [ 'c' ],
        username: [ 'u' ],
        password: [ 'p' ],
        message: [ 'm' ]
    }
})

export const {
    command,
    username,
    password,
    message,
    db
} = argv;
