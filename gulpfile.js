


// run these tasks in the order you want them to be performed

// when we say require '', we're pulling the name of the function from our package.json file
var gulp = require("gulp")
var sass = require("gulp-sass")
var cleanCSS = require('gulp-clean-css')
// sourceMaps maps out our minified css so we can still see what line is going wrong when debugging
var sourceMaps = require('gulp-sourcemaps')
var ghPages = require('gh-pages')

var imageMin = require('gulp-imagemin')








sass.compiler = require('node-sass');


//here we separate out sass as a function so we can run it independently of the rest of the tasks gulp is managing, note that we're also running cleanCSS and sourceMaps in this function 
gulp.task('sass', function(){
    return gulp.src('src/css/app.scss')
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('dist'))
})


//it's common in development to set up a src folder for working and a dist folder for final, here we take the files we need from working and push them forward to the final "dist" folder
// this function takes the index.html file in our src file and copies it to our dist file
gulp.task('html', function(){
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
})

// here we send all of our fonts to the final dist folder like we did above with the html, we're doing the same with the images function below it
gulp.task('fonts', function(){
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('dist/fonts'))
})

// here we run the same task of piping our image files from the source folder to the dist folder, but we're also running an image minifier on them in the process to shrink size for web, this way our image files will be full res in the src folder and web size in the dist folder
gulp.task('images', function(){
    return gulp.src('src/img/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'))
})



// here we set up our watch function so that we don't have to re-run gulp in the command line every time we make a change, type gulp watch to run, although we also added it below to the default command so simply typing gulp in the command line will run watch as well
// note that we added watch to any changes in the html and any updates in our fonts folder
gulp.task('watch', function(){
    gulp.watch('src/css/app.scss',['sass'])
    gulp.watch('src/*.html', ['html'])
    gulp.watch('src/fonts/*', ['fonts'])
    gulp.watch('src/img/*', ['images'])
})




// this task allows us to deploy our site to github pages directly from the 'dist' folder, basically the same as a new commit and a push, because we named it deploy, we can write gulp deploy in the command line to run it
gulp.task('deploy', function(){
    ghPages.publish('dist')
})



// this specifies what the default gulp command will run, i.e. when you type gulp into the command line what does it do?
gulp.task('default', ['html','sass', 'fonts', 'images', 'watch']);







