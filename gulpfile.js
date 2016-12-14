var gulp = require('gulp');
var ts = require('gulp-typescript');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', function() {
    var tsResult = tsProject.src()
        .pipe(tsProject());
 
    return tsResult.js.pipe(gulp.dest('./js'));
});

gulp.task('less', function () {
    return gulp.src(['./app/assets/css/main.less' ])
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/assets/css'))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});


gulp.task('serve', ['less', 'scripts'], function () {
     browserSync.init({
        server: {
            baseDir: "./"
        }
    });
     
	gulp.watch("app/**/*.less").on('change', function(event){
         gulp.src(['./app/assets/css/main.less'])
        .pipe(sourcemaps.init())
        .pipe(less().on('error', function(error){				
				console.log('Erro no arquivo '+  event.path);
				console.log('Verifique a linha ' + error.line +', caractere '+ error.index);
			}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/assets/css'))
        .pipe(browserSync.stream({ match: '**/*.css' }));		
	});



    gulp.watch("app/**/*.html").on('change', browserSync.reload);
    gulp.watch("**/*.ts", ['scripts']);
    gulp.watch("**/*.js").on('change', browserSync.reload);
    
});

gulp.task('default', ['serve']);