import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 6
    },
    vendorNameView: {
        // marginTop: 10,
        borderRadius: 2,
        borderStyle: 'solid',
        borderColor: '#899FEE',
        padding: 3,
        borderWidth: 0.5,
        // paddingLeft: 14,
        alignItems: 'center',
        justifyContent: 'center'
    },
    vendorName: {
        fontSize: 10,
        color: '#899FEE'
    },
    orderSSUText: {
        // marginTop: 6,
        color: '#9F9F9F',
        fontSize: 12,
        textAlign: 'center',
        paddingLeft: 2
    },
})

export default styles
