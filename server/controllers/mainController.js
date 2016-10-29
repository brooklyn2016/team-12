var path = require('path');

module.exports.getIndex = function(request, response) {
    response.render('index', { greeting: 'HOW ARE YOU' });
};
