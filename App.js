import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import BingoSheet from './components/BingoSheet';

// TODO: fix state thing
// TODO: save app state persistent
// TODO: apply styling


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collection: [1],
            text: 'placeholder',
            input: '0',
            activeSheets: [true, false, false, false, false]
        }
    }

    render() {
        return (
          <View style={styles.container}>
            <Text>Sternburg Bingo</Text>
              <Text>Enter a number!</Text>
              <TextInput
                  style={styles.textInput}
                  keyboardType = 'numeric'
                  // onChangeText = {(text) => onChanged(text)}
                  onChange = {onChanged}
                  value = {this.state.input}
              />
              {renderSheets()}
              <Text>Your Collection</Text>
              {renderCollection(this.state.collection)}
          </View>
        );
    }
}

const sheets = [
    [
        [[15, false], [28, false], [67, false], [43, false], [10, false]],
        [[9, false], [32, false], [55, false], [83, false], [99, false]],
        [[76, false], [42, false], [91, false], [17, false], [72, false]],
        [[63, false], [36, false], [48, false], [3, false], [22, false]],
        [[50, false], [88, false], [60, false], [23, false], [87, false]],
    ],
    [
        [[15, false], [28, false], [67, false], [43, false], [10, false]],
        [[9, false], [32, false], [55, false], [83, false], [99, false]],
        [[76, false], [42, false], [91, false], [17, false], [72, false]],
        [[63, false], [36, false], [48, false], [3, false], [22, false]],
        [[50, false], [88, false], [60, false], [23, false], [87, false]],
    ],
    [
        [[15, false], [28, false], [67, false], [43, false], [10, false]],
        [[9, false], [32, false], [55, false], [83, false], [99, false]],
        [[76, false], [42, false], [91, false], [17, false], [72, false]],
        [[63, false], [36, false], [48, false], [3, false], [22, false]],
        [[50, false], [88, false], [60, false], [23, false], [87, false]],
    ],
    [
        [[15, false], [28, false], [67, false], [43, false], [10, false]],
        [[9, false], [32, false], [55, false], [83, false], [99, false]],
        [[76, false], [42, false], [91, false], [17, false], [72, false]],
        [[63, false], [36, false], [48, false], [3, false], [22, false]],
        [[50, false], [88, false], [60, false], [23, false], [87, false]],
    ],
    [
        [[15, false], [28, false], [67, false], [43, false], [10, false]],
        [[9, false], [32, false], [55, false], [83, false], [99, false]],
        [[76, false], [42, false], [91, false], [17, false], [72, false]],
        [[63, false], [36, false], [48, false], [3, false], [22, false]],
        [[50, false], [88, false], [60, false], [23, false], [87, false]],
    ]
];

const onChanged = input => {
    // TODO: add to collection
    const collection = this.state.collection;
    collection.push(input);
    this.setState(collection);

    checkSheets.map((sheet, index) => {
        if (this.state.activeSheets[sheet] === true) {
            sheet.map(row => {
                row.map(cell => {
                   if(cell[0] === input) {
                       cell[1] = true;
                       bingoChecker(index);
                   }
                });
            });
        }
    });
};

const bingoChecker = sheetIndex => {

    const sheet = sheets[sheetIndex];

    // check horizontally
    outerLoop:
        for (let x = 0; x < 5; x++) {
            for (let y = 0; y < 5; y++) {
                if (sheet[x][y][1] === false) {
                    break;
                } else if (y === 4) {
                    bingo('horizontal', x, sheetIndex);
                    break outerLoop;
                }
            }
        }

    // check vertically
    outerLoop:
    for (let y = 0; x < 5; x++) {
        for (let x = 0; x < 5; y++) {
            if (sheet[x][y][1] === false) {
                break;
            } else if (y === 4) {
                bingo('vertical', y, sheetIndex);
                break outerLoop;
            }
        }
     }

     // check diagonally down (top-left to bottom-right)
    for (let x = 0; x < 5; x++) {
        if (sheet[x][x][1] === false) {
            break;
        } else if (x === 4) {
            bingo('diagDown', x, sheetIndex);
            break;
        }
    }

    // check diagonally up (top-right to bottom-left)
    for (let x = 0; x < 5; x++) {
        if (sheet[x][4-x]) {
            break;
        } else if (x === 4) {
            bingo('diagUp', x, sheetIndex);
            break;
        }
    }
};

const bingo = (dir, location, sheet) => {
    let collection = this.state.collection;
    if (dir === 'horizontal') {
        for(let y = 0; y < 5; y++) {
            collection = removeCap(location, y, sheet, collection);
        }
    } else if (dir === 'vertical') {
        for(let x = 0; x < 5; x++) {
            collection = removeCap(x, location, sheet, collection);
            }
        } else if (dir === 'diagDown') {
        for(let i = 0; i < 5; i++) {
            collection = removeCap(i, i, sheet, collection);
        }
    } else if (dir === 'diagUp') {
        for (let i = 0; i < 5; i++) {
            collection = removeCap(i, 4-i, sheet, collection);
        }
    }

    const activeSheets = this.state.activeSheets;
    activeSheets[sheet] = false;
    this.setState(collection, activeSheets);
    // TODO: yeah boi!
};

// get number from sheet, remove it from collection, check if still in collection, set flag in sheet
const removeCap = (x, y, sheet, collection) => {
    collection.splice(collection.findIndex(sheets[sheet][x][y][0]), 1);
    if(collection.findIndex(sheets[sheet][x][y][0]) === -1) {
        sheets[sheet][x][y][1] = false;
    }
    return collection;
};

const renderCollection = collection => {
    return collection.map((cap, index) => {
        console.log(cap);
        return <Text key={'cap-' + index}>{cap}</Text>;
    });
};

const toggleSheet = sheetIndex => {
    const {activeSheets, collection} = this.state;

    activeSheets[sheetIndex] = !activeSheets[sheetIndex];
    if(activeSheets[sheetIndex]) {
        sheets[sheetIndex].map(row => {

            row.map(cell => {
                if (collection.find(cell[0]) === undefined) {
                    sheets[sheetIndex][row][cell][1] = true;
                }
            })
        });
        bingoChecker(sheetIndex);
    }
    this.setState(activeSheets);
};

const renderSheets = () => {
    return sheets.map((sheet, index) => {
        const activeSheets = this.state.activeSheets;
        return <TouchableHighlight key={'touchable-sheet-' + index} onpress={toggleSheet(index)}><BingoSheet key={'sheet-' + index} numbers={sheet} active={activeSheets[index]}/></TouchableHighlight>
    });
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
