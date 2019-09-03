import http from './tools';
// import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';

// const url='http://112.124.6.31:9090';
// const url = 'http://172.16.23.23:8040/resourcemanager';
const url = 'http://47.110.136.32:8040/resourcemanager';
// const url = 'http://192.168.31.180:9090';



// //1.1登录界面
// export const login = (params) => http.getlogin('http://47.99.206.94:8040/auth/login?username=' + params[0] + '&password=' + params[1] + '&type=user&grant_type=password', {
// });



//2.1 产品信息
//2.1.0 获取省->市->区->单位级联菜单数据
export const gets = (params) => http.get(url + '/site/all1', {
	access_token: localStorage.getItem('access_token'),
});


//2.1.0 获取所有省->市->区->单位级联菜单数据
export const getall = (params) => http.get(url + '/site/all', {
	access_token: localStorage.getItem('access_token'),
});



//2.1.1 获取单位
export const site = (params) => http.get(url + '/site/' + params[0], {
	access_token: localStorage.getItem('access_token'),
});

//2.1.1 查询产品
export const product = (params) => http.get(url + '/information/product/view', {
	access_token: localStorage.getItem('access_token'),
	name: params[0],
	version: params[1],
	model: params[2],
	serial: params[3],
	networkoperator: params[4],
	remark: params[5],
});

//2.1.2 删除产品
export const productdelete = (params) => http.post(url + '/information/product/delete', {
	access_token: localStorage.getItem('access_token'),
	id: params[0],
});
//2.1.3 获取产品详情
export const productdetail = (params) => http.post(url + '/information/product/detail', {
	access_token: localStorage.getItem('access_token'),
	id: params[0],
});


//2.2 新增产品
export const productadd = (params) => http.post(url + '/information/product/add', {
	access_token: localStorage.getItem('access_token'),
	type: params[0],
	name: params[1],
	communication: params[2],
	sampling: params[3],
	texture: params[4],
	specification: params[5],
	transmission: params[6],
});

//2.3 接口信息
export const getWaterMerchantAPI = (params) => http.get(url + '/information/getWaterMerchantAPI/view', {
	access_token: localStorage.getItem('access_token'),
});




//3.1 采集器设备状态
export const collector = (params) => http.get(url + '/device/state/collector', {
	access_token: localStorage.getItem('access_token'),
	collectorNum: params[0],
	signalIntensity: params[1],
	deviceStatus: params[2],
	districtId: params[3],
	districtSite: params[4],
});

//3.1.1 获取产品生命周期
export const getLifecycleDetail = (params) => http.get(url + '/lifecycle/basic/getLifecycleDetail', {
	access_token: localStorage.getItem('access_token'),
	deviceNum: params[0],
	type: params[1],
});

//3.2 普通水表设备状态
export const general = (params) => http.get(url + '/device/state/general', {
	access_token: localStorage.getItem('access_token'),
	generalNum: params[0],
	valve: params[1],
	printWheel: params[2],
	districtId: params[3],
	districtSite: params[4],
});

//3.3 无线单表设备状态
export const wireless = (params) => http.get(url + '/device/state/wireless', {
	access_token: localStorage.getItem('access_token'),
	wirelessNum: params[0],
	signalIntensity: params[1],
	printWheel: params[2],
	valve: params[3],
	onlineStatus: params[4],
	districtId: params[5],
	districtSite: params[6],
	min:params[7],
	max: params[8],
});

//3.4 无线单表基本信息
export const wirelessbasic = (params) => http.get(url + '/device/basic/wireless', {
	access_token: localStorage.getItem('access_token'),
	waterMerchantId: params[0],
	wirelessNum: params[1],
	type: params[2],
	districtId: params[3],
	districtSite: params[4],
});
//3.4.1 无线单表详情
export const getDeviceDetail = (params) => http.get(url + '/device/basic/getDeviceDetail', {
	access_token: localStorage.getItem('access_token'),
	id: params[0],
	type: params[1],
});

//3.5 普通水表基本信息
export const generalbasic = (params) => http.get(url + '/device/basic/general', {
	access_token: localStorage.getItem('access_token'),
	waterMerchantId: params[0],
	generalNum: params[1],
	collectorNum: params[2],
	districtId: params[3],
	districtSite: params[4],
});

//3.6 采集器基本信息
export const collectorbasic = (params) => http.get(url + '/device/basic/collector', {
	access_token: localStorage.getItem('access_token'),
	waterMerchantId: params[0],
	collectorNum: params[1],
	type: params[2],
	districtId: params[3],
	districtSite: params[4],
});

//3.6.1 设备参数配置查询
export const setparameter = (params) => http.get(url + '/device/setting/view', {
	access_token: localStorage.getItem('access_token'),
	deviceNum: params[0],
	type: params[1],
});

//3.6.2 无线单表参数设置
export const wirelessedit = (params) => http.post(url + '/device/setting/editValveW', {
	access_token: localStorage.getItem('access_token'),
	deviceNum: params[0],
	vavle: params[1],
	reportingInterval: params[2],
});

//3.6.3 普通水表参数设置
export const editValveG = (params) => http.post(url + '/device/setting/editValveG', {
	access_token: localStorage.getItem('access_token'),
	deviceNum: params[0],
	vavle: params[1],
});

//3.7 获取历史读数
export const getHistoryReading = (params) => http.get(url + '/device/basic/getHistoryReading', {
	access_token: localStorage.getItem('access_token'),
	deviceNum: params[0],
	type: params[1],
});

//3.7 获取小时读数
export const getHourReading = (params) => http.get('http://47.110.136.32:9090/device/basic/getReading', {
	deviceNum: params[0],
	beginTime: params[1],
	endTime: params[2],
});





//4.用户管理

//4.1 获取水务商详情

export const waterMerchant = (params) => http.get(url + '/userManage/waterMerchant/view', {
	access_token: localStorage.getItem('access_token'),
	name: params[0],
	linkman: params[1],
	phone: params[2],
	server: params[3],
});

//4.1.1 新增水务商 
export const addwaterMerchant = (params) => http.post(url + '/userManage/waterMerchant/add', {
	access_token: localStorage.getItem('access_token'),
	name: params[0],
	provinceId: params[1],
	cityId: params[2],
	districtId: params[3],
	districtDetail: params[4],
	linkman: params[5],
	phone: params[6],
	server: params[7],
	email: params[8],
});

//4.1.2 新增区域主管 
export const addchargewater = (params) => http.post(url + '/userManage/waterMerchant/account/add', {
	access_token: localStorage.getItem('access_token'),
	username: params[0],
	password: params[1],
	name: params[2],
	phone: params[3],
	email: params[4],
	currentUsername: params[5],
	provinceId: params[6],
	cityId: params[7],
	districtId: params[8],
	waterMerchantId: params[9],
});

//4.1.2.1  查看区域主管 
export const showchargewater = (params) => http.get(url + '/userManage/waterMerchant/account/view', {
	access_token: localStorage.getItem('access_token'),
	waterMerchantId: params[0],
});


//4.1.3 简洁水务商 
export const simplewater = (params) => http.get(url + '/userManage/waterMerchant/simple', {
	access_token: localStorage.getItem('access_token'),
	id: params[0]
});

//4.1.4 删除水务商 
export const waterdelete = (params) => http.post(url + '/userManage/waterMerchant/delete', {
	access_token: localStorage.getItem('access_token'),
	id: params[0]
});

//4.2 账户管理
export const accountview = (params) => http.get(url + '/userManage/account/view', {
	access_token: localStorage.getItem('access_token'),
	username: params[0]
});

//4.2.1 用户添加
export const useradd = (params) => http.post(url + '/userManage/account/add', {
	access_token: localStorage.getItem('access_token'),
	username: params[0],
	password: params[1],
	name: params[2],
	phone: params[3],
	email: params[4],
	rids: params[5],
});
//4.2.2 修改用户使用权限
export const editStatus = (params) => http.post(url + '/userManage/account/editStatus', {
	access_token: localStorage.getItem('access_token'),
	id: params[0],
	status: params[1]
});

//4.3 角色管理
//4.3.1 角色列表
export const rolelist = (params) => http.get(url + '/userManage/roleManege/role/view', {
	access_token: localStorage.getItem('access_token'),
	name: params[0],
});

//4.3.2 角色列表
export const rolelists = (params) => http.get(url + '/userManage/roleManege/role/view', {
	access_token: localStorage.getItem('access_token'),
});

//4.3.3 新增角色
export const roleadd = (params) => http.post(url + '/userManage/roleManege/role/add', {
	access_token: localStorage.getItem('access_token'),
	name: params[0],
	value: params[1]
});

//4.3.3.1 简洁角色
export const simpleuser = (params) => http.get(url + '/userManage/roleManege/role/simple', {
	access_token: localStorage.getItem('access_token'),
	id: params[0],
});

//4.3.4 删除角色
export const roledelete = (params) => http.get(url + '/userManage/roleManege/role/delete', {
	access_token: localStorage.getItem('access_token'),
	id: params[0],
});
//4.3.5 角色分配
export const userrole = (params) => http.get(url + '/userManage/roleManege/user_role/view', {
	access_token: localStorage.getItem('access_token'),
});

//4.3.5.1 角色分配修改
export const userroleedit = (params) => http.post(url + '/userManage/roleManege/user_role/edit', params);

//4.3.6 权限列表  
export const powerlist = (params) => http.get(url + '/userManage/roleManege/menu/view', {
	access_token: localStorage.getItem('access_token'),
});


//4.3.7 权限分配
export const rolemenu = (params) => http.get(url + '/userManage/roleManege/role_menu/view', {
	access_token: localStorage.getItem('access_token'),
});

//4.3.5.1 权限分配修改
export const rolemenuedit = (params) => http.post(url + '/userManage/roleManege/role_menu/edit', params);


//5.日志管理
//5.1 数据日志管理
export const datalogs = (params) => http.get(url + '/logging/data/view', {
	access_token: localStorage.getItem('access_token'),
	pageNum: params[0],
	pageNumSize: params[1],
	wirelessNum:params[2],
	code:params[3],
	cmd:params[4],
	beginTime:params[5],
	endTime:params[6],
});

//5.2 设备日志管理
export const devicelogs = (params) => http.get(url + '/logging/device/view', {
	access_token: localStorage.getItem('access_token'),
	deviceNum: params[0],
	minDate: params[1],
	maxDate: params[2]
});

//5.3 用户日志
//5.3.1 用户登录登出日志管理
export const loginAndLogout = (params) => http.get(url + '/logging/consumer/loginAndLogout/view', {
	access_token: localStorage.getItem('access_token'),
	username: params[0],
	minDate: params[1],
	maxDate: params[2]
});
//5.3.2 用户其他日志管理
export const otherlogs = (params) => http.get(url + '/logging/consumer/other/view', {
	access_token: localStorage.getItem('access_token'),
	username: params[0],
	minDate: params[1],
	maxDate: params[2]
});


//6.生命周期
export const getLifecycle = (params) => http.get(url + '/lifecycle/basic/getLifecycle', {
	access_token: localStorage.getItem('access_token'),
	type: params[0],
	deviceNum: params[1],
});


//7.产品检测
//7.1.1 产品出库→产品规格
export const standard = (params) => http.get(url + '/productMonitoring/putOutStorage/standard/view', {
	access_token: localStorage.getItem('access_token'),
});


//7.1.2 产品出库→车间员编号
export const StockOutAssistant = (params) => http.get(url + '/productMonitoring/putOutStorage/StockOutAssistant/view', {
	access_token: localStorage.getItem('access_token'),
});

//7.1.3 产品出库
export const productadds = (params) => http.post(url + '/productMonitoring/putOutStorage/add', {
	access_token: localStorage.getItem('access_token'),
	// userId: params[0],
	// standard: params[1],
	// isConformity: params[2],
	encasementNum: params[0],
	deviceCount: params[1],
	consigneeName: params[2],
	consigneePhone: params[3],
	waterMerchantId: params[4],
	deviceNums: params[5],
});


//7.2 固定挂载水表号
export const generalTest = (params) => http.get(url + '/productMonitoring/outboundTest/collectorTest/generalTestNum/view', {
	access_token: localStorage.getItem('access_token'),
});

//7.2.1 采集器测试
export const collectorTest = (params) => http.post(url + '/productMonitoring/outboundTest/collectorTest/join', {
	access_token: localStorage.getItem('access_token'),
	cllnum: params[0],
	meterNum1: params[1],
});



//7.2.2 采集器测试结果查询
export const joinResult1 = (params) => http.get(url + '/productMonitoring/outboundTest/collectorTest/joinResult', {
	access_token: localStorage.getItem('access_token'),
	meterNum: params[0],
});

export const joinResult = (params) => http.get(url + '/productMonitoring/outboundTest/collectorTest/joinResult1', {
	access_token: localStorage.getItem('access_token'),
	meterNums: params[0],
});

//7.2.3 采集器挂载初始化
export const initialize = (params) => http.get(url + '/productMonitoring/outboundTest/collectorTest/initialize', {
	access_token: localStorage.getItem('access_token'),
	cllnum: params[0],
});




//7.2.4 采集器挂载初始化结果查询
export const initializeResult = (params) => http.get(url + '/productMonitoring/outboundTest/collectorTest/initializeResult', {
	access_token: localStorage.getItem('access_token'),
	meterNum: params[0],
});


//7.2.5 采集器批量挂载
export const joinBatch = (params) => http.post(url + '/productMonitoring/outboundTest/collectorTest/joinBatch', {
	access_token: localStorage.getItem('access_token'),
	meterNums: params[0],
	cllum: params[1],
});


//7.3 NB单表测试查询
export const getNB = (params) => http.get(url + '/productMonitoring/outboundTest/NBTest/getNB', {
	access_token: localStorage.getItem('access_token'),
	deviceNum: params[0],
	open: params[1],
	close: params[2]
});


//7.3.1 NB单表测试
export const NBTest = (params) => http.post(url + '/productMonitoring/outboundTest/NBTest/command', {
	access_token: localStorage.getItem('access_token'),
	deviceNum: params[0],
	open: params[1],
	close: params[2],
	reportingInterval: params[3]
});

//7.3.1 NB单表测试结果
export const commandResult = (params) => http.get(url + '/productMonitoring/outboundTest/NBTest/commandResult', {
	access_token: localStorage.getItem('access_token'),
	deviceNum: params[0],
	open: params[1],
	close: params[2],
	reportingInterval: params[3],
});


//7.4 添加订单
export const orderadd = (params) => http.post(url + '/productMonitoring/sendOut/order/add', {
	access_token: localStorage.getItem('access_token'),
	orderNum: params[0],
	deliveryTime: params[1],
	orderContent: params[2],
	waterMerchantId: params[3],
	deviceNums: params[4]
});

//7.4.1 订单查询
export const orderview = (params) => http.get(url + '/productMonitoring/sendOut/order/view', {
	access_token: localStorage.getItem('access_token'),
	orderNum: params[0],
	receiverStatus: params[1],
	minDate: params[2],
	maxDate: params[3]
});

//7.4.2 修改订单状态
export const orderedit = (params) => http.post(url + '/productMonitoring/deliveryReceiver/edit', {
	access_token: localStorage.getItem('access_token'),
	orderNum: params[0],
	deliveryReceiver: params[1],
});


//7.4.2 发货设备
export const deviceview = (params) => http.get(url + '/productMonitoring/sendOut/order/deviceview', {
	access_token: localStorage.getItem('access_token'),
	waterMerchantId: params[0],
});


//7.4.2 设备维修
export const maintenance = (params) => http.get(url + '/productMonitoring/maintenance/view', {
	access_token: localStorage.getItem('access_token'),
	deviceNum: params[0],
	minDate: params[1],
	maxDate: params[2],
});


//8.1 树形权限
export const permission = (params) => http.get(url + '/sys/menu/view', {
	access_token: localStorage.getItem('access_token'),
});

//8.1 测试
export const tbDevice = (params) => http.get('http://47.110.136.32:9083/message/tbDevice', {
	msg: params[0],
	code: params[1],
	type: params[2]
});

//8.1 无线单表出库测试

export const commandPlus = (params) => http.post(url + '/productMonitoring/outboundTest/NBTest/commandPlus', params);


//9.1 批量下发
export const commandPlusBatch = (params) => http.post(url + '/productMonitoring/outboundTest/NBTest/commandPlusBatch', {
	access_token: localStorage.getItem('access_token'),
	deviceNums: params[0],
	commondsJson: params[1],
	remark: params[2],
});


//9.2 历史记录
export const testHistory = (params) => http.get(url + '/productMonitoring/outboundTest/NBTest/testHistory', {
	access_token: localStorage.getItem('access_token'),
	// deviceNums: params[0],
	// type: params[1],
	// param: params[2],
	// remark:params[3],
});

//10.1 工单管理
export const getworkorder = (params) => http.get(url + '/productMonitoring/workorder/get', {
	access_token: localStorage.getItem('access_token'),
	id: params[0],
	water_id: params[1],
	type: params[2],

});

//10.2 新增工单
export const addworkorder = (params) => http.post(url + '/productMonitoring/workorder/add', {
	access_token: localStorage.getItem('access_token'),
	meter_mix: params[0],
	meter_max: params[1],
	meter_quantity: params[2],
	type: params[3],
	water_id: params[4],
	remark: params[5],

});

//10.2 工单详情
export const getworkorders = (params) => http.get(url + '/productMonitoring/workorder/info/get', {
	access_token: localStorage.getItem('access_token'),
	id: params[0],
	meterNum: params[1],
});


//10.3 设备升级
export const sendorder = (params) => http.post('http://47.110.136.32:9333/ota/sendorder', {
	access_token: localStorage.getItem('access_token'),
	meterNum: params[0],
	remark: params[1],
});


//10.4 OTA升级历史记录
export const otalist = (params) => http.post('http://47.110.136.32:9333/ota/otahistory', params);

//10.5最新版本 
export const finalversion = (params) => http.post('http://47.110.136.32:9333/ota/finalversion', {
	access_token: localStorage.getItem('access_token'),
});

//11.1查询小区 
export const getcommunity = (params) => http.get(url + '/water/manage/community/get', {
	access_token: localStorage.getItem('access_token'),
	communityName: params[0],
	address: params[1],
});

//11.2 添加小区
export const addcommunity = (params) => http.post(url + '/water/manage/community/add', {
	access_token: localStorage.getItem('access_token'),
	communityName: params[0],
	address: params[1],
});

//11.3 删除小区
export const deletecommunity = (params) => http.post(url + '/water/manage/community/delete', {
	access_token: localStorage.getItem('access_token'),
	id: params[0],
});


//11.4 修改小区
export const updatecommunity = (params) => http.post(url + '/water/manage/community/update', {
	access_token: localStorage.getItem('access_token'),
	id: params[0],
	communityName: params[1],
	address: params[2],
});




//12.1查询住户 
export const gettenement = (params) => http.get(url + '/water/manage/tenement/get', {
	access_token: localStorage.getItem('access_token'),
	houseAddress: params[0],
	communityId: params[1],
	houseNum: params[2],
});

//12.2 添加住户
export const addtenement = (params) => http.post(url + '/water/manage/tenement/add', {
	access_token: localStorage.getItem('access_token'),
	houseAddress: params[0],
	communityId: params[1],
	ownerName: params[2],
	phone: params[3],
	deviceNum: params[4],
	remark: params[5],
	houseNum:params[6],
});

//12.3 删除住户
export const deletetenement = (params) => http.post(url + '/water/manage/tenement/delete', {
	access_token: localStorage.getItem('access_token'),
	id: params[0],
});


//12.4 修改住户
export const updatetenement = (params) => http.post(url + '/water/manage/tenement/update', {
	access_token: localStorage.getItem('access_token'),
	id: params[0],
	communityName: params[1],
	address: params[2],
	deviceNum: params[3],
});

//12.5水表重复判断  
export const getdeviceWireless = (params) => http.post(url + '/water/manage/tenement/getDevice', {
	access_token: localStorage.getItem('access_token'),
	deviceNum: params[0],
});

//13. 数据导出
export const exportstate = (params) => http.get(url + '/device/state/export', {
	access_token: localStorage.getItem('access_token'),
	deviceNum: params[0],
});


//14.1 获取表头信息
export const getheader = (params) => http.get(url + '/information/header/get', {
	access_token: localStorage.getItem('access_token'),
	headerCode: params[0],
});

//14.2添加表头信息
export const addheader = (params) => http.post(url + '/information/header/add', {
	access_token: localStorage.getItem('access_token'),
	headerCode: params[0],
	headerRemark: params[1],
	modelType: params[2],
	batteryType: params[3],
});

//14.3 删除表头信息
export const deleteheader = (params) => http.post(url + '/information/header/delete', {
	access_token: localStorage.getItem('access_token'),
	headerId: params[0],
});


//15.3 仪表盘
export const headerdataStatistics = (params) => http.get(url + '/information/header/dataStatistics', {
	access_token: localStorage.getItem('access_token'),
});




// //10.3 设备升级
// export const getReading = (params) => http.post(url + '/device/basic/getReading', {
// 	access_token: localStorage.getItem('access_token'),
// 	deviceNum: params[0],
// 	beginTime: params[1],
// 	endTime: params[2],
// });








async function myapi(url, param) {
	const res = await http.post(url, param);
	if (res.data.status === 0) {
		// return <Redirect to={"/login"}/>
		// window.location.href = "/login";
	}
	else return res;
	// return http.post(url,param);	
}