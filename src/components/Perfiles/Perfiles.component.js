import { EventBus } from '../../Events/Events_bus';
import firebase from 'firebase'

class Perfil{
  constructor(id, datos){
    this.id = id
    this.name = datos.Nombre
    this.lastname =datos.Apellido
    this.year = datos.Edad
    this.date = datos.nacimiento
    console.log("Nombre perfil" +  this.name + this.lastname + this.year + this.date)
  }
}

export default {
  name: 'perfiles',
  components: {},
  props: [],
  data () {
    return {
        perfiles: []
    }
  },
  created: function(){

  },
  computed: {

  },
  mounted () {
    EventBus.$on('loginregister_userstatechanged', blestado => {
      if(blestado){
        this.descargarPerfiles()
      }
    });
  },
  methods: {
    descargarPerfiles: function(){
      var that = this
      /*firebase.firestore().collection("rural").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        that.perfiles.push(new Perfil(doc.id,doc.data()))
    });
});*/
      firebase.firestore().collection("Perfiles").onSnapshot(function(querySnapshot) {
        that.perfiles = []
      querySnapshot.forEach(function(doc) {

        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        that.perfiles.push(new Perfil(doc.id,doc.data()))
      });
      });
    }
  }
}
