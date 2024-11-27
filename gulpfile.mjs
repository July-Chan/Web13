import gulp from 'gulp'; 
import * as sass from 'sass';
import gulpSass from 'gulp-sass';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import cssnano from 'gulp-cssnano';
import imagemin from 'gulp-imagemin';
import del from 'del';

const sassCompiler = gulpSass(sass);

// Завдання для компіляції SASS в CSS
gulp.task('sass', () => {
  return gulp.src('src/styles/style.scss')
    .pipe(sassCompiler().on('error', sassCompiler.logError))
    .pipe(gulp.dest('base/css'));
});

// Завдання для мініфікації CSS
gulp.task('css', () => {
  return gulp.src('dist/styles/*.css')  // Потрібно змінити шлях на правильний
    .pipe(concat('styles.min.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
});

// Завдання для оптимізації зображень
gulp.task('imagemin', () => {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
});

// Завдання для мініфікації JavaScript
gulp.task('js', () => {
  return gulp.src('src/js/*.js')
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Завдання для очищення папки dist
gulp.task('clean', () => {
  return del(['dist']);
});

// Завдання за замовчуванням
gulp.task('default', gulp.series('clean', 'sass', 'css', 'js', 'imagemin'));
