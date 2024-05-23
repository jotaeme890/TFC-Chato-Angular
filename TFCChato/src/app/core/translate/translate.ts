import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

/**
 * Function to create a loader for translation files.
 * @param {HttpClient} http - HttpClient instance used for loading translation files.
 * @returns {TranslateHttpLoader} TranslateHttpLoader instance for loading translation files.
 */
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
