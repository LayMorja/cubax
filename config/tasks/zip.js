import { deleteAsync } from "del";
import GulpZip from "gulp-zip";

export function zip() {
   deleteAsync(`${app.path.rootFolder}/*.zip`);
   return app.gulp.src(process.argv.includes("--full") ? [`${app.path.buildFolder}/**/*.*`, `!${app.path.build.js}/*.txt`] : [`${app.path.buildFolder}/**/*.*`, `!${app.path.buildFolder}/phpmailer/*.*`, `!${app.path.buildFolder}/*.php`, `!${app.path.build.js}/*.txt`])
      .pipe(app.plugins.plumber(
         app.plugins.notify.onError({
            title: "ZIP",
            message: "Error: <%= error.message %>"
         }))
      )
      .pipe(GulpZip(`${app.path.rootFolder}.zip`))
      .pipe(app.gulp.dest("./"))
}