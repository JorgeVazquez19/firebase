class Perfil{
  constructor(id, datos){
    this.id = id
    this.name = datos.Pueblos
    console.log("Nombre perfil" +  this.name)
  }
}

export default{
  computed:{
    setPerfil(datosPerfil){
      this.props_objperfil = new Perfil(id, datosPerfil)
    }
  },
  data(){
    return {
      props_blIsLoggedIn: false,
      props_objperfil: {}
    }
  }
}
