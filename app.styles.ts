import {StyleSheet} from "react-native";

const colors = {
    background: '#DE0000',
    white: '#fff',
    button: '#800000',
    black: '#000'
};

const sizes = {
    buttonHeight: 50
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sheet: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.black,
        backgroundColor: colors.white
    },
    sheetWrapper: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 10,
        margin: 10,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    sheetNumber: {
        width: '20%',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: colors.black,
        textAlign: 'center',
        paddingTop: 9,
        paddingBottom: 9
    },
    sheetNumberChecked: {
        backgroundColor: '#DE0000'
    },
    addCapsButton: {
        display: 'flex',
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.button,
        height: sizes.buttonHeight
    },
    buttonText: {
        color: colors.white,
        fontWeight: '500',
        fontSize: 16
    },
    headline: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 30
    }
});
