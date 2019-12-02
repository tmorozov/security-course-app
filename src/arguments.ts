import minimist from 'minimist';

const argv = minimist(process.argv.slice(2), {
    alias: {
        command: [ 'c' ],
        username: [ 'u' ],
        password: [ 'p' ]
    }
})

export const {
    command,
    username,
    password,
    db
} = argv;
