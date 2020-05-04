import {StyleSheet} from "react-native";

const colors = {
    background: '#DE0000',
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sheet: {
        margin: 10,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: 'grey',
        backgroundColor: '#fff',
        opacity: 0.8
    },
    sheetNumber: {
        width: '20%',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: 'grey',
        textAlign: 'center',
    },
    sheetNumberChecked: {
        backgroundColor: 'red'
    }
});
