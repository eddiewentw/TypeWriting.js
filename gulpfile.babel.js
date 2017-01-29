import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';

gulp.task('minify', () => 
	gulp.src('./src/typewriting.js')
		.pipe( babel() )
		.pipe( uglify({
			preserveComments: 'license',
		}) )
		.pipe( gulp.dest('./build') )
);

gulp.task('default', [ 'minify' ]);
