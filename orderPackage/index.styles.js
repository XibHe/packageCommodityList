import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        height: 62
    },
    iconImage: {
        width: 35,
        height: 18,
        paddingLeft: 14,
        paddingTop: 6
    },
    nameTitle: {
        paddingLeft: 6,
        fontSize: 12,
        fontWeight: 'bold',
        // flex: 1 // 不设置弹性
    },
    packMsg: {
        color: '#CCCCCC',
        fontSize: 12,
        paddingLeft: 4,
        flex: 1 // 设置弹性
    },
    contentText: {
        fontSize: 12,
        color: '#9F9F9F',
        paddingTop: 10,
        paddingLeft: 14
    },
    iconImageText: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 6,
        alignItems: 'center'
    },
    orderNumAmount: {
        color: '#9F9F9F',
        fontSize: 12,
        paddingLeft: 3,
        paddingRight: 6
    }
})

export default styles
