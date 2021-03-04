import axios from '@/config/httpConfig'
/*
 *master变量
 *iosAndroid为原生端实现 window.master = 'iosAndroid'
 *编号version参数，北京局和国际公司，信息公司numberVersion
 *H5为web端实现 window.master = 'H5'
 */
/*****************太原局测试环境**************/
// window.master = 'iosAndroid'
const baseOaUrl = 'http://192.168.65.94:8098/carsoa-log-work-dmz'
const documentURL = 'http://192.168.65.94:8078/carsoa-base-dmz'
const login = 'http://192.168.65.94:8078/carsoa-base-dmz'
/*****************太原局正式环境**************/
// window.master = 'iosAndroid'
// const baseOaUrl = 'http://10.72.8.226:18098/carsoa-log-work-dmz'
// const documentURL = 'http://192.168.65.94:8078/carsoa-base-dmz'
// const login = 'http://10.72.8.226:18078/carsoa-base-dmz'

/*****************信息公司正式环境************/
// window.master = 'H5'
// const documentURL = 'http://10.3.176.212:8001/carsoa-base-dmz';
// const baseOaUrl = 'http://10.3.175.218:8001/carsoa-document-dmz';

export var viewUrl = baseOaUrl;
// 待办条数
export function getOaDocumentTotle(params) {
    return axios.get(baseOaUrl + '/document/getOaDocumentTotle', params)
}
// 选择领导
export function choiceLeader(params) {
    return axios.get(baseOaUrl + '/quarter/choiceLeader', params)
}
// //获取基本信息
// export function findByUsername(params) {
//     return axios.get( documentURL +'/findByUsername', params)
// }
//日写实
//查找日报列表
export function findAllDay(params) {
    return axios.get( baseOaUrl +'/logday/findAllDay', params)
}
//新建返回及时还是补报状态
export function logDayState(params) {
    return axios.get( baseOaUrl +'/logday/logDayState', params)
}

//判断新建按钮
export function getList(params) {
    return axios.get( baseOaUrl+'/setup/getList', params)
}
//保存更新日写实
export function saveOrUpdateRi(params) {
    return axios.get( baseOaUrl+'/logday/saveOrUpdate', params)
}
//删除日写实
export function remove(params) {
    return axios.get( baseOaUrl+'/logday/remove', params)
}
//上传图片
export function uploadFileDfs(params) {
    return axios.post( baseOaUrl +'/fileDfs/v1/uploadFileDfs', params)
}
//获取图片

export const picUrl=documentURL+'/application/getPicture'
//日写实
//特殊情况
//提交
export function specialSaveOrUpdate(params) {
    return axios.get( baseOaUrl+'/special/saveOrUpdate', params)
}
//查询历史列表
export function specialFind(params) {
    return axios.get( baseOaUrl+'/special/find', params)
}
//查询是否撤销
export function specialFindOne(params) {
    return axios.get( baseOaUrl+'/special/findOne', params)
}
//特殊情况
// 新增/修改/提交季度总结
export function saveOrUpdate(params) {
    return axios.get( baseOaUrl +'/quarter/saveOrUpdate', params)
}
export function findQuarterListSubmit(params) {
    return axios.get( baseOaUrl +'/quarter/findQuarterListSubmit', params)
}
export function recallSubmit(params) {
    return axios.get( baseOaUrl +'/quarter/recallSubmit', params)
}
export function draft(params) {
    return axios.get( baseOaUrl +'/quarter/draft', params)
}
export function detailsToBeDone(params) {
    return axios.get( baseOaUrl +'/comment/detailsToBeDone', params)
}
export function selectLogQuarterById(params) {
    return axios.get( baseOaUrl +'/quarter/selectLogQuarterById', params)
}
//综合查询接口
export function getDeptAndUserList(params) {
    return axios.get( baseOaUrl +'/logDept/getDeptAndUserList', params)
}
//综合查询接口

export function commentsaveOrUpdate(params) {
    return axios.get( baseOaUrl +'/comment/saveOrUpdate', params)
}
export function toDoNumberComment(params) {
    return axios.get( baseOaUrl +'/comment/toDoNumberComment', params)
}
export function getHistoryComment(params) {
    return axios.get( baseOaUrl +'/comment/getHistoryComment', params)
}
export function getoatoken1(params) {
    return axios.post( login +'/getoatoken1', params)
}


// 年
// 新增/修改/提交年度报告
 
export function yearsaveOrUpdate(params) {
    return axios.get( baseOaUrl +'/year/saveOrUpdate', params)
}
export function findYearListSubmit(params) {
    return axios.get( baseOaUrl +'/year/findYearListSubmit', params)
}
export function yearrecallSubmit(params) {
    console.log(4)
    return axios.get( baseOaUrl +'/year/recallSubmit', params)
}
export function yeardraft(params) {
    return axios.get( baseOaUrl +'/year/draft', params)
}
export function yeardetailsToBeDone(params) {
    return axios.get( baseOaUrl +'/comment/detailsToBeDone', params)
}
export function  selectLogYearById(params) {
    return axios.get( baseOaUrl +'/year/selectLogYearById', params)
}
export function  detailsToBeDoneYear(params) {
    return axios.get( baseOaUrl +'/comment/detailsToBeDoneYear', params)
}
export function  getHistoryCommentYear(params) {
    return axios.get( baseOaUrl +'/comment/getHistoryCommentYear', params)
}