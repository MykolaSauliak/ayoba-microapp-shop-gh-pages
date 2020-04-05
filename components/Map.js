// import React, { Component } from "react";
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
// import {
//     View,
//     Text
// } from 'react-native';

// export class MapContainer extends Component {

//   render() {
//     return (
//         <View style={{flex: 1}}>
//             <Map google={this.props.google} 
//                 zoom={14}>
//                 <Marker 
//                     onClick={this.onMarkerClick}
//                     name={'Current location'} 
//                         />
//                 {/* <InfoWindow onClose={this.onInfoWindowClose}>
//                     <View>
//                     <Text>{this.state.selectedPlace.name}</Text>
//                     </View>
//                 </InfoWindow> */}
//             </Map>
//         </View>
     
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyCex36k9h-uUuMK9UcD0B8LHrxCmEktaBA"
// })(MapContainer)