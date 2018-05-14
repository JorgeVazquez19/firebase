import firebase from 'firebase'
import { EventBus } from '../../Events/Events_bus';

export default {
  name: 'login-registro',
  components: {},
  props: [],
  data () {
    return {
      bLoginVisible:true,
      sEmailRegister: '',
      sPasswordRegister: '',
      sLoginEmail:'',
      sLoginPassword:''


    }
  },
  created: function(){
    firebase.auth().onAuthStateChanged((user) => {
      this.props_objUser = user
      if(user){
        this.props_blIsLoggedIn = true
        console.log(user.uid + "|||")
        var docRef = firebase.firestore().collection("Perfiles").doc(user.uid+"");
        docRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
       this.setPerfil(doc.id, doc.data())
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

      }else{
        this.props_blIsLoggedIn = false
      }
      EventBus.$emit('loginregister_userstatechanged', this.props_blIsLoggedIn)

    });
  },
  computed: {

  },
  mounted () {

  },
  methods: {
    clickDeBotonRegistrarse: function (event){
      this.bLoginVisible=false
    },
    btnCancelar: function (event){
      this.bLoginVisible=true
    },
    btnResgistrarse: function (event){
     firebase.auth().createUserWithEmailAndPassword(this.sEmailRegister,this.sPasswordRegister).then(
        function(user){
          alert("Tu cuenta fue creada. " + user.name);
          var docRef = firebase.firestore().collection("perfiles")
          docRef.doc(user.uid+"").set({Nombre:"Elena", Apellido: "Sanz", Edad:30})
          firebase.auth().currentUser.sendEmailVerification().then(function() {
            alert("Email enviado");
          }, function(error) {
            alert("Error " + err);
          });
        },
        function(err){
          alert("Error en la creacion de cuenta. " + err);
        }
      );
   },
   btnLogin: function (event){
    firebase.auth().signInWithEmailAndPassword(this.sLoginEmail,this.sLoginPassword).then(
       function(user){

         alert("Te logueastes correctamente " + user);
       },
       function(err){
         alert("Error en el login " + err);
       }
     );
  },
  btnGoogle: function (event){
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;
  var user = result.user;
}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});
 },
 btnFacebook: function (event){
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
 var token = result.credential.accessToken;
 var user = result.user;
}).catch(function(error) {
 var errorCode = error.code;
 var errorMessage = error.message;
 var email = error.email;
 var credential = error.credential;
});
},
btnGithub: function (event){
 var provider = new firebase.auth.GithubAuthProvider();
 firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;
  var user = result.user;
}).catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});
},

  logout: function(event){
    firebase.auth().signOut()
  }
  }
}
