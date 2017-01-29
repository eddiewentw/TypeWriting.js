import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';

gulp.task('minify', () => 
	gulp.src('./src/typewriting.js')
		.pipe( babel() )
		.pipe( uglify({
			preserveComments: 'license',
		}) )
		.pipe( rename('typewriting.min.js') )
		.pipe( gulp.dest('./dist') )
);

gulp.task('default', [ 'minify' ]);
