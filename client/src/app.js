import angular from 'angular';

import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-ui-router';

import AppConstants from './config/app.constants';
import AppConfig from './config/app.config';
import AppRun from './config/app.run';

import './layout';
import './modules/home';
import './modules/login';

const requires = [
  'ui.router',
  'ngMaterial',
  'app.layout',
  'app.home',
  'app.login',
];

angular
  .module('app', requires)
  .constant('AppConstants', AppConstants)
  .config(AppConfig)
  .run(AppRun);

angular.bootstrap(document, ['app'], {
  strictDi: true
});