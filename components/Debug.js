import React, { Component } from 'react'
import { 
    View,
    Text ,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { Ayoba } from '../services';
import { getAyoba } from '../libs/microapp';

const styles = StyleSheet.create({

})

const Debug = ({
  
} ) => {
    // console.log('window',window)
    // console.log('global',global)
    let phone = '...'
    try{
        phone = Ayoba.getUserPhone()
        
    }catch(err){
        phone = ' maybe you need to close and re-open this microapp'
    }
    let userAgent = '...'
    try{
         userAgent = global?.navigator?.userAgent || global?.navigator?.vendor || window?.opera ||  global?.opera || navigator?.userAgent || navigator?.vendor;
         userAgent = JSON.stringify(userAgent)    
    }catch(err){

    }
    let AyobaComponent = '...'
    try{
        AyobaComponent = Android || global.Android || window.Android
        AyobaComponent = JSON.stringify(AyobaComponent)
    }catch(err){

    }

    // let window = ''
    // let global = ''
    // try{
    //     window = JSON.stringify(Object.keys(window))
    //     global = JSON.stringify(global)
    // }catch(err){

    // }

    return (
        <>
        <Text>Your phone - {phone}</Text>
        {/* <Text>userAgent - {userAgent}</Text> */}
        {/* <Text>AyobaComponent - {AyobaComponent}</Text> */}
            {/* <Text>window - {window}</Text>
            <Text>global - {global}</Text> */}
        </>
    );
};

export default Debug;