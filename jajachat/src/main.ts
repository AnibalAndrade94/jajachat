import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Amplify } from 'aws-amplify';
import amplifyConfig from './amplify_outputs.json'; // Asegúrate que el archivo esté en src/

Amplify.configure(amplifyConfig);
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
