'use strict';

var gulp = require('gulp'),
    expressHelper = require("./start-express.js");


gulp.task("startExpress", function () {
    expressHelper();
});


gulp.task('default', ["startExpress"]);

