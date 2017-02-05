import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import sourcemap from 'gulp-sourcemaps';

gulp.task('minify', () => 
	gulp.src('./src/typewriting.js')
		.pipe( sourcemap.init() )
		.pipe( babel() )
		.pipe( uglify({
			preserveComments: 'license',
		}) )
		.pipe( rename('typewriting.min.js') )
		.pipe( sourcemap.write('.') )
		.pipe( gulp.dest('./dist') )
);

gulp.task('default', [ 'minify' ]);
