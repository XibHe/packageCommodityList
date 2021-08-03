import { StyleSheet } from 'react-native'
import styleMixin from '@/assets/styles/mixin.style'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        ...styleMixin.padding(8, 12, 12, 8),
        backgroundColor: '#FFFFFF'
    },
    goodsImage: {
        width: 72,
        height: 72,
        ...styleMixin.border(0.5, 'solid', '#F5F5F5', 4),
        overflow: 'hidden'
    },
    goodsInfoView: {
        flex: 1,
        marginLeft: 8,
    },
    maskContentStyle: {
        width: 56,
        ...styleMixin.padding(3, 3),
        ...styleMixin.flex('row', 'center', 'center'),
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 2
    },
    maskTextStyle: {
        ...styleMixin.text(10, '#fff'),
    }
})

export default styles
