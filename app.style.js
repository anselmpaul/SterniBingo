import { StyleSheet, Dimensions } from 'react-native';

export const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export const colors = {
    black: '#1a1917',
    gray: '#bbb',
    white: '#fff',
    background: '#DE0000',
    button: '#800000',
    lightBackground: '#ddd',
};

export default StyleSheet.create({
    container: {
        paddingTop: 30,
        flex: 1,
        backgroundColor: colors.background,
        // fontFamily: 'Verdana',
        justifyContent: 'center',
    },
    appContent: {
        padding: 10,
    },
    touchable: {
    },
    headline : {
        color: colors.white,
        fontSize: 24,
        textAlign: 'center'
    },
    text: {
        color: colors.white
    },
    textDark: {
        color: colors.black
    },
    modal: {
        flex: 1,
        backgroundColor: colors.lightBackground
    },
    sheetContainerActive: {
        flex: 1,
        padding: 5,
        margin: 5,
        backgroundColor: colors.white
    },
    sheetContainerInactive: {
        flex: 1,
        padding: 5,
        margin: 5,
        backgroundColor: colors.gray
    },
    head: {
        height: 40,
    },
    inactiveNote: {
        fontStyle: 'italic',
        margin: 'auto'
    },
    tableBorder: {
        borderWidth: 1,
        borderColor: colors.black
    },
    button: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.button,
        height: 50
    },
    buttonText: {
        color: colors.white,
        fontWeight: '500'
    }
});