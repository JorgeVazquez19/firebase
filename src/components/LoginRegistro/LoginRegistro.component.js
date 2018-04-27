import firebase from 'firebase'

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
        },
        function(err){
          alert("Error en la creacion de cuenta. " + err);
        }
      );
   },
   btnLogin: function (event){
    firebase.auth().createUserWithEmailAndPassword(this.sLoginEmail,this.sLoginPassword).then(
       function(user){
         alert("Te logueastes correctamente " + user);
       },
       function(err){
         alert("Error en el login " + err);
       }
     );
  }
  }
}
