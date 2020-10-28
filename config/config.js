const config = {
    default : {
        SECRET : 'q1w2e3',
        DATABASE : 'mongodb://localhost:27017/Users'
    }
}

exports.get = function get (env) {
    return config[env] || config.default
}