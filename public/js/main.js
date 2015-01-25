requirejs.config({
    baseUrl: '/js',
    paths: {
        jquery: 'lib/jquery-2.1.3',
        underscore: 'lib/underscore',
        backbone: 'lib/backbone'
    },
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        }
    }
});

require(['/js/app/router.js'], function(router){
	
});