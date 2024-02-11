import React, {useState, useEffect} from 'react';
import styles from './styles';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Contact from '../../components/Contact';

import { openDatabase } from 'react-native-sqlite-storage'

const myContactsDB = openDatabase({name: 'MyContacts.db'});

const contactsTableName = 'contacts';


const ContactsScreen = props => {

  const navigation = useNavigation();  

  const [contacts, setcontacts] = useState([]);

  useEffect(() => {
    const listener = navigation.addListener('focus', () => {
      // declare empty array that will store results of SELECT
      let results = [];
      // declare transaction that will execute SELECT
      myContactsDB.transaction(txn => {
        
        // execute SELECT
        txn.executeSql(
          `SELECT * FROM ${contactsTableName}`, 
          [],
          //callback function to handle results from SELECT
          (_, res) => {
            // get the number of rows selected
            let len = res.rows.length;
            console.log('Number of rows: ' + len);
            // if more than one row of data was selected 
            if (len > 0){
              // loop through the rows of data
              for (let i = 0; i < len; i++){
                // push a row of data at a time onto results array 
                let item = res.rows.item(i);
                results.push({
                  id: item.id,
                  fullname: item.fullname,
                  phone: item.phone,
                  email: item.email
                });
              }
              // assign results array to lists state variables
              setcontacts(results);
            } else {
              // if no rows of data were selected 
              // assign empty array to lists state variables
              setcontacts([]);
            }
          },
          error => {
            console.log('Error getting lists' + error.message);
          },
        )
      });
    });
      return listener;
  });
  

  return (
    <View style={styles.container}>
        <View>
            <FlatList 
                data={contacts}
                renderItem={({item}) => <Contact post={item}/>}
            />
        </View>
        <View style={styles.bottom}>
            <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Add Contacts')}>
                <Text style={styles.buttonText}>Add Contacts</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ContactsScreen;