import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {connectHighlight} from 'react-instantsearch-native';
import {NavigationService} from '../services';
import AntDesign from '@expo/vector-icons/AntDesign';
import {ListItem} from 'react-native-elements';

const Highlight = ({attribute, hit, highlight}) => {
  const highlights = highlight({
    highlightProperty: '_highlightResult',
    attribute,
    hit,
  });
  //
  // console.log('hit',hit)
  return (
    <ListItem
      leftAvatar={{source: {uri: hit.photoURL}}}
      title={hit.displayName}
      subtitle={hit.uid}
      onPress={() =>
        NavigationService.navigateToCustomUserProfile({
          user_id: hit.uid || hit.objectID,
          fromSearch: true,
        })
      }
    />
    // <TouchableOpacity
    //     style={{flexDirection:'row',alignItems:'center'}}
    //     onPress={() => NavigationService.NavigateToUserProfile({user_id : hit.objectID, fromSearch : true})}
    //     >
    //     <AntDesign name="search1" size={25} style={{paddingHorizontal: 10}} />
    //     <Text style={{color:'black'}}>
    //         {highlights.map(({ value, isHighlighted }, index) => {
    //             const style = {
    //               backgroundColor: isHighlighted ? 'yellow' : 'transparent',
    //             };
    //             return (
    //                 <Text key={index} style={style}>
    //                     {value}
    //                 </Text>
    //             );
    //         })}
    //         {/* {hit.company ? ` - ${hit.company}` : ``} */}
    //     </Text>
    // </TouchableOpacity>
  );
};

Highlight.propTypes = {
  attribute: PropTypes.string.isRequired,
  hit: PropTypes.object.isRequired,
  highlight: PropTypes.func.isRequired,
};

export default connectHighlight(Highlight);
