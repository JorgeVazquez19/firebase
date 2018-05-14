// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import props from './mixins/props'
import firestore from 'firebase/firestore'

Vue.config.productionTip = false

  var config = {
    apiKey: 'AIzaSyBr10yMuAGB0AFzRUdqYFwNdk6XgRxMx5E',
    authDomain: 'llms-5296b.firebaseapp.com',
    databaseURL: 'https://llms-5296b.firebaseio.com',
    projectId: 'llms-5296b',
    storageBucket: 'llms-5296b.appspot.com',
    messagingSenderId: '67307121196'
  };
  firebase.initializeApp(config);

  Vue.use(firebase)
  Vue.use(firestore)
  Vue.mixin(props)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
