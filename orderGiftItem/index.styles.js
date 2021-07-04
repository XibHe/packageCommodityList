import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        height: 62
    },
    giftSourceView: {
        // flex: 1,
        // flexDirection: 'row',
        // paddingTop: 10,
        marginTop: 10,
        backgroundColor: '#FFB700',
        borderRadius: 2.5,
        paddingHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
        height: 16
        // paddingLeft: 14
    },
    giftSourceText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 10,
    },
    nameTitle: {
        marginTop: 10,
        paddingLeft: 6,
        fontSize: 12,
        fontWeight: 'bold'
    },
    vendorNameView: {
        marginTop: 10,
        borderRadius: 2,
        borderStyle: 'solid',
        borderColor: '#899FEE',
        borderWidth: 0.5,
        // paddingLeft: 14,
        alignItems: 'center',
        justifyContent: 'center',
    },
    vendorName: {
        fontSize: 12,
        color: '#899FEE'
    },
    formatNum: {
        color: '#9F9F9F',
        fontSize: 12,
        paddingTop: 4
    }
})

export default styles
