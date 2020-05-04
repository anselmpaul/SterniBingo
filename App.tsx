import React, {useState} from 'react';
import {Button, Modal, StyleSheet, Text, TextInput, View} from 'react-native';
import {styles} from "./app.styles";

export default function App() {
  const myCapsInit = [
    {
      value: 1,
      amount: 2
    },
    {
      value: 7,
      amount: 2
    }
  ];

  const [addCapModalVisible, setAddCapModalVisible] = useState(false);
  const [capsToAdd, setCapsToAdd] = useState<undefined | string>(undefined);
  const [myCaps, setMyCaps] = useState(myCapsInit);

  const sheets = [
    {
      id: 0,
      isActive: true,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    },
    {
      id: 1,
      isActive: false,
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
    }
  ];



  const isChecked = (value) => {
      return Boolean(myCaps.find(cap => cap.value === value && cap.amount > 0));
  };

  const handleButton = () => {
    setAddCapModalVisible(!addCapModalVisible);
  };

  const handleSubmitNewCaps = (newCaps) => {
    const newMyCaps = {
      // @ts-ignore
      value: parseInt(newCaps.nativeEvent.text),
      amount: 1
    };
    console.log(newMyCaps);
    const test = [...myCaps, newMyCaps];
    console.log(test);
    // @ts-ignore
    setMyCaps(test);
    console.log(myCaps);
    setCapsToAdd(undefined);
    setAddCapModalVisible(!addCapModalVisible);
  };


  return (
    <View style={styles.container}>
      <Modal
          animationType="fade"
          transparent={false}
          visible={addCapModalVisible}
      >
        <TextInput
            keyboardType={'numeric'}
            autoFocus={true}
            placeholder={'Gebe eine oder mehrere Zahlen mit , getrennt ein'}
            value={capsToAdd}
            onChangeText={text => setCapsToAdd(text)}
            onSubmitEditing={handleSubmitNewCaps}
        />
      </Modal>

      <View>
        <Text>SterniBingoooo</Text>
        {sheets.map(sheet => {
        return <View style={styles.sheet} key={'sheet' + sheet.id}>
          {sheet.numbers.map(num => <Text key={'number' + sheet.id + num} style={isChecked(num) ? [styles.sheetNumber, styles.sheetNumberChecked] : styles.sheetNumber}>{num}</Text>)}
        </View>
      })}</View>
      <Button title={"Saufen!"} onPress={handleButton}/>
    </View>
  );
}