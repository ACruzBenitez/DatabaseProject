exports.home = function(req, res, next) {
    res.render('index', { title: 'Home' });
}

exports.projects = function(req, res, next) {
    res.render('index', { title: 'Projects' });
}

exports.services = function(req, res, next) {
    res.render('index', { title: 'Services' });
}