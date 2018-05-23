import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

class BingoSheet extends React.Component {

    static propTypes = {
        numbers: PropTypes.array,
        active: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={this.props.active ? styles.containerActive : styles.containerInactive}>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>
                    <Rows data={this.props.numbers}  textStyle={styles.text}/>
                </Table>
                {this.props.active?
                    <Text style={styles.inactiveNote}>zum Deaktivieren Karte gedrückt halten</Text>:
                    <Text style={styles.inactiveNote}>zum Aktivieren Karte gedrückt halten</Text>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerActive: { flex: 1, padding: 5, backgroundColor: '#fff' },
    containerInactive: {flex: 1, padding: 5, backgroundColor: '#ddd'},
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 0 },
    inactiveNote: { fontStyle: 'italic', margin: 'auto'}
});

export default BingoSheet;