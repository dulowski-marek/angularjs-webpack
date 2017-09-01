import { appModule } from './app.module';

// Import components
import { component as SomeComponent } from './components/some/some.component';
import { component as AnotherComponent } from './components/another/another.component';

appModule
.component('someComponent', SomeComponent)
.component('anotherComponent', AnotherComponent);