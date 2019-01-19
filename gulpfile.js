


// run these tasks in the order you want them to be performed

// when we say require '', we're pulling the name of the function from our package.json file
var gulp = require("gulp")
// we commented out all of the sass lines when we switched over to postCSS
// var sass = require("gulp-sass")
// sass.compiler = require('node-sass');
var cleanCSS = require('gulp-clean-css')
// post css is similar to css but allows you to do even more, people are generally moving away from sass and towards postcss
var postCSS = require('gulp-postcss')
// sourceMaps maps out our minified css so we can still see what line is going wrong when debugging
var sourceMaps = require('gulp-sourcemaps')
// gh pages allows us to publish directly to a gh-pages branch in our repository with a single command ('gulp deploy') which we specified below
var ghpages = require('gh-pages')
//image minifier, pipes out minified images to dist folder from source files in our src folder
var imageMin = require('gulp-imagemin')
// gulp-concat concatenates our stylesheets, taking multiple from our src folder and outputting a single stylesheet in our dist folder
var concat = require('gulp-concat')




gulp.task('css', function(){
    return gulp.src([
        'src/css/reset.css',
        'src/css/typography.css',
        'src/css/app.css'
    ])
    .pipe(sourceMaps.init())
    .pipe(
        postCSS([
            require('autoprefixer'),
            require('postcss-preset-env')({
                stage: 1,
                browsers: ['IE 11', 'last 2 versions']
            })
        ])
        )
    .pipe(concat('app.css'))
    .pipe(
        cleanCSS(
            {compatibility: 'ie8'})
        )
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('dist'))
})




// we commented out the sass function when we switched to post css
//here we separate out sass as a function so we can run it independently of the rest of the tasks gulp is managing, note that we're also running cleanCSS and sourceMaps in this function 
// gulp.task('sass', function(){
//     return gulp.src('src/css/app.scss')
//     .pipe(sourceMaps.init())
//     .pipe(sass())
//     .pipe(cleanCSS({compatibility: 'ie8'}))
//     .pipe(sourceMaps.write())
//     .pipe(gulp.dest('dist'))
// })


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
    gulp.watch('src/css/*',['css'])
    gulp.watch('src/*.html', ['html'])
    gulp.watch('src/fonts/*', ['fonts'])
    gulp.watch('src/img/*', ['images'])
})



<<<<<<< HEAD
gulp.task('deploy', function(){
    ghpages.publish('dist')
})


=======

// this task allows us to deploy our site to github pages directly from the 'dist' folder- to the gh-pages branch on github, basically the same as a new commit and a push, because we named it deploy, we can write gulp deploy in the command line to run it, note: make sure your netlify and GH pages are both deploying from the gh-pages branch
gulp.task('deploy', function(){
    ghPages.publish('dist')
})



>>>>>>> master
// this specifies what the default gulp command will run, i.e. when you type gulp into the command line what does it do?
gulp.task('default', ['html','css', 'fonts', 'images', 'watch']);







