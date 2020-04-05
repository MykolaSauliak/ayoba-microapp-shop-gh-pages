// import app from 'firebase/app';
import app from 'firebase/app';
import {firebaseConfig } from '../config'

class FirebaseService {

  init(){
    try{
      app.initializeApp(firebaseConfig );
      console.log('firebase app initialized')
    }catch(err){
      console.log('error',err)
    }
  }

}
export default new FirebaseService();