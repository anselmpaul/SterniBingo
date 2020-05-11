import {Dimensions, StyleSheet} from "react-native";

export const colors = {
    background: '#DE0000',
    white: '#fff',
    button: '#800000',
    black: '#000'
};

const sizes = {
    buttonHeight: 70
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%'
    },
    main: {
        flex: 1,
        justifyContent: 'space-between',
        height: '100%',
        paddingTop: 50,
        width: '100%',
        alignItems: 'center'
    },
    contentContainer: {
        flexDirection: 'column',
        width: '100%'
    },
    test: {
        width: 200,
        textAlign: 'center',
        backgroundColor: colors.white
    },
    flatList: {
        backgroundColor: colors.button,
        width: '100%'
    },
    flatListContentContainer: {
        flex: 0,
        alignItems: 'center',
        paddingLeft: Dimensions.get('screen').width * 0.025,
        paddingRight: Dimensions.get('screen').width * 0.05
    },
    flatListContainerTest: {
        height: Dimensions.get('screen').width,
        width: '100%'
    },
    sheet: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: colors.black,
        backgroundColor: colors.white,
        aspectRatio: 1
    },
    sheetWrapper: {
        height: 'auto',
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: 10,
        marginLeft: Dimensions.get('screen').width * 0.025,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
        width: Dimensions.get('screen').width * 0.9,
        aspectRatio: 1
    },
    sheetNumber: {
        width: '20%',
        height: '20%',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderColor: colors.black,
        justifyContent: 'center',
        alignItems: 'center'
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
        height: sizes.buttonHeight,
    },
    buttonText: {
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16
    },
    headline: {
        textAlign: 'center',
        color: colors.white,
        fontSize: 30,
        marginBottom: 10
    },
    modal: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 10
    },
    modalInput: {
        fontSize: 30,
        height: 100,
        textAlign: 'center',
        color: colors.white
    },
    inactiveCard: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        top: 10,
        left: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inactiveCardText: {
        color: colors.white
    }
});

export const capsCollection = StyleSheet.create({
    capIcon: {
        width: 30,
        height: 10
    },
    capsCollection: {
        padding: 10
    },
    text: {
        color: colors.white
    },
    capsStacks: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-end',
    },
    capsStack: {
        padding: 3,
        alignItems: 'center'
    }
});
