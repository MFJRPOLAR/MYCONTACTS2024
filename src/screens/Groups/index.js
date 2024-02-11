import React from 'react';
import styles from './styles';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const GroupScreen = props => {

  return (
    <View style={styles.container}>
        <View style={styles.bottom}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => console.log('Add Group!')}>
                <Text style={styles.buttonText}>Add Group</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default GroupScreen;