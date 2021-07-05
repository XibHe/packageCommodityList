import { NativeModules } from 'react-native'
import { MCWeakSocket } from '@mcrn/bridge'
import Logger from '@/utils/Logger'
import Tracer from '@/analytics'
import ENV_CONFIG from '#/useful.json'

const native = {
	serverEnv: 'production',
	passportId: '',
	companyId: '',
	headParams: {},
	commonParams: {},

	init: function () {
		Logger.log('native init初始化')
		NativeModules.NativeNetModule.getParams().then(data => {
			Logger.log('native init数据返回', data)
			this.updataBaseParam(data)
		})
	},

	updataBaseParam: function (data) {
		try {
			// 更新公参
			const params = JSON.parse(data)
			this.serverEnv = params?.env || 'production'
			this.headParams = params?.headParams || {}
			this.commonParams = params?.commonParams || {}
			this.passportId = params?.passportId || ''
			this.companyId = params?.companyId || ''

			// 更新全局环境变量
			global.__SERVER_ENV__ = this.serverEnv || ENV_CONFIG.serverEnv || 'production'
			Tracer.updataAllConfig()
		} catch (error) {
			Logger.log(error)
		}
	},

	getServerEnv: function () { return this.serverEnv },
	getPassportId: function () { return this.passportId },
	getCompanyId: function () { return this.companyId },
	getHeadParams: function () { return this.headParams },
	getCommonParams: function () { return this.commonParams }
}

// 监听来自原生的消息
MCWeakSocket.onmessage('MCRN_MSG_UPDATE_PARAMS', (data) => {
	native.updataBaseParam(data.params)
})

export default native
