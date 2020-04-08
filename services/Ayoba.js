import {getAyoba} from '../libs/microapp'
import {Alert} from 'react-native'
import {setUser as saveUserToStore} from '../features/user/actions';
import * as firebase from 'firebase';
import 'firebase/firestore';
import _ from 'lodash';

class Ayoba {

    static ayoba = null

    init = async (store) =>{
        let AyobaComponent = getAyoba()
        this.ayoba = AyobaComponent
        // Alert.alert(JSON.stringify(AyobaComponent))
        if (!this.store) {
            this.store = store;
        }
        
        window.onProfileChanged = async (nickname, avatarPath) => {
                let phone = this.getUserPhone()
                let email;
                let name = nickname;
                let last_name;
                let bio;
                let avatar = avatarPath;
                let documentSnapshot;
                try {
                    documentSnapshot = await firebase.firestore().collection('users').doc(phone).get();
                    if (documentSnapshot.exists) {
                        const data = documentSnapshot.data();
                        name = data.name;
                        email = data.email;
                        last_name = data.last_name;
                        bio = data.bio;
                        avatar = data.avatar;
                        await documentSnapshot.ref.update({
                            last_active: Date.now(),
                        });
                    }
                    else{
                        await documentSnapshot.ref.set({
                            name: nickname,
                            avatar : avatarPath,
                            phone: phone,
                            uid: phone,
                            last_active: Date.now(),
                        }, {
                            merge: true
                        });
                    }
                } catch (err) {}
                this.store.dispatch(
                    saveUserToStore({
                        name,
                        last_name,
                        avatar,
                        bio,
                        email,
                        uid: phone,
                        phone,
                    }),
                );
        }

        window.onPresenceChanged  = async (presence) => {
            if(presence){
                let phone = this.getUserPhone()
                let email;
                let name ;
                let last_name;
                let bio;
                let avatar;
                let documentSnapshot;
                try {
                    documentSnapshot = await firebase.firestore().collection('users').doc(phone).get();
                    if (documentSnapshot.exists) {
                        const data = documentSnapshot.data();
                        name = data.name;
                        email = data.email;
                        last_name = data.last_name;
                        bio = data.bio;
                        avatar = data.avatar;
                        await documentSnapshot.ref.update({
                            last_active: Date.now(),
                        });
                    }
                } catch (err) {}
                this.store.dispatch(
                    saveUserToStore({
                        name,
                        last_name,
                        avatar,
                        bio,
                        email,
                        uid: phone,
                        phone,
                    })
                )
            }
        }

        window.onLocationChanged = async (lat, lon) => {
            
        }

        window.onLocationSentResponse = async (response) => {

        }

        let phone = this.getUserPhone()
        if (phone) {
            let email;
            let name;
            let last_name;
            let bio;
            let avatar = constants.DEFAULT_AVATAR;
            let documentSnapshot;
            try {
                documentSnapshot = await firebase.firestore().collection('users').doc(phone).get();
                if (documentSnapshot.exists) {
                    const data = documentSnapshot.data();
                    name = data.name;
                    email = data.email;
                    last_name = data.last_name;
                    bio = data.bio;
                    avatar = data.avatar;
                    await documentSnapshot.ref.update({
                        last_active: Date.now(),
                    });
                }
            } catch (err) {}
            this.store.dispatch(
                saveUserToStore({
                    name,
                    last_name,
                    avatar,
                    bio,
                    email,
                    uid: phone,
                    phone,
                }),
            );
        } else {
            this.store.dispatch(saveUserToStore(null));
        }

    }

    composeMessage(message){
        this.ayoba?.composeMessage(message)
    }

    checkLogin = async () => {
        let phone = this.getUserPhone()
        if (phone) {
            let email;
            let name;
            let last_name;
            let bio;
            let avatar = constants.DEFAULT_AVATAR;
            let documentSnapshot;
            try {
                documentSnapshot = await firebase.firestore().collection('users').doc(phone).get();
                if (documentSnapshot.exists) {
                    const data = documentSnapshot.data();
                    name = data.name;
                    email = data.email;
                    last_name = data.last_name;
                    bio = data.bio;
                    avatar = data.avatar;
                    await documentSnapshot.ref.update({
                        last_active: Date.now(),
                    });
                }
            } catch (err) {}
            this.store.dispatch(
                saveUserToStore({
                    name,
                    last_name,
                    avatar,
                    bio,
                    email,
                    uid: phone,
                    phone,
                }),
            );
        } 
        // else {
            // this.store.dispatch(saveUserToStore(null));
        // }
    }

    /**
     * @returns String: user’s ISO-3166 country code. Example: AF
     */
    getCountry = () => {
        return this.ayoba  && this.ayoba.getCountry()
    }

    getUserPhone = () => {
        if(!this.ayoba){
            return getAyoba().getMsisdn()
        }
        return this.ayoba.getMsisdn()
    }

    sendMedia(url, mimeType){
        this.ayoba?.sendMedia(url, mimeType)
    }
    /**
     * @desc Sends a chat message directly without 
     * putting the text on the compose bar 
     * of the chat screen
     * @params message
     */
    sendMessage = (message) => {
        this.ayoba?.sendMessage(message)
    }

    getUserId(){
        function getURLParameter(sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) {
                    return sParameterName[1];
                }
            }
        }
        var selfJid = getURLParameter("jid")
        document.getElementById("inputText").value = selfJid
        console.log('selfJid',selfJid)
        return selfJid
    }
}

export default new Ayoba()