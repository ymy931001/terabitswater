import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, DatePicker, Modal, Table, LocaleProvider, Pagination, Input, Select } from 'antd';
import { Link } from 'react-router-dom';
import { datalogs } from '../axios';
import { createForm } from 'rc-form';
import './journal.css';
import Headers from '../header';

import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';




var now = new Date();
var date = new Date(now.getTime() - 2*24 * 3600 * 1000);
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();

var date1 = new Date();
var year1 = date1.getFullYear();
var month1 = date1.getMonth() + 1;
var day1 = date1.getDate();
var hour1 = date1.getHours();
var minute1 = date1.getMinutes();
var second1 = date1.getSeconds();


const statustext = {
  "0": "上线包",
  "1": '历史数据',
  "2": "查询",
  "3": '开阀',
  "4": "关阀",
  "5": '时间间隔',
  "6": "霍尔开关",
  "7": '震动开关',
  "8": "预存",
  "10": "ip端口",
  "11": '远程升级',
  "12": "水表编号",
  "13": '修改密钥',
  "255": "注册包",
};





class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      endtime: year1 + '-' + month1 + '-' + day1 + ' ' + hour1 + ':' + minute1 + ':' + second1,
      begintime: year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second,
      powermenu: JSON.parse(localStorage.getItem('menu')),
      jsonlist: [{
        title: '参数名',
        dataIndex: 'name',
      }, {
        title: '参数值',
        dataIndex: 'value',
      }],
      decendinglist: [{
        title: '参数名',
        dataIndex: 'name',
      }, {
        title: '参数值',
        dataIndex: 'value',
      }],
    };
    this.columns = [
      {
        title: '水表编号',
        dataIndex: 'wirelessNum',
      }, {
        title: 'IMEI',
        dataIndex: 'code',
      }, {
        title: '命令标识',
        dataIndex: 'cmd',
        render: (text) => {
          return (
            <div>
              <span>{statustext[text]}</span>
            </div>
          )
        }
      }, {
        title: '下行命令',
        dataIndex: 'decending',
        render: (text, record, index) => {
          if (text === "" || text === null) {
            return (
              <div>
                <span>无</span>
              </div>
            )
          } else {
            return (
              <div>
                <a onClick={() => this.decendingmodel(text, record, index)} style={{ marginRight: '10px' }}
                >详情</a>
              </div>
            )
          }
        }
      }, {
        title: '原始数据',
        dataIndex: 'payload',
        render: (text, record, index) =>
          <div>
            <a onClick={() => this.originaldata(text, record, index)} style={{ marginRight: '10px' }}
            >详情</a>
          </div>
      }, {
        title: 'JSON',
        dataIndex: 'json',
        render: (text, record, index) =>
          <div>
            <a onClick={() => this.jsonmodel(text, record, index)} style={{ marginRight: '10px' }}
            >详情</a>
          </div>
      }, {
        title: '连接方式',
        dataIndex: 'type',
      }, {
        title: '状态',
        dataIndex: 'status',
        render: (text) => {
          if (text === 0) {
            return (
              <div>
                <span style={{ color: 'red' }}>异常</span>
              </div>
            )
          }
          if (text === 1) {
            return (
              <div>
                <span style={{ color: 'green' }}>正常</span>
              </div>
            )
          }
        }
      }, {
        title: '日志时间',
        dataIndex: 'gmtcreate',
        render: (text, record, index) => {
          return (
            <div>
              {text}
            </div>
          );
        }
      }
    ];
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  originaldata = (text, record, index) => {
    this.setState({
      datashow: true,
      datatext: text,
    });
  }

  decendingmodel = (text, record, index) => {
    console.log(JSON.parse(text))
    this.setState({
      decendingmodel: true,
      decendingdata: JSON.parse(text),
    }
      , function () {
        var arr = []
        for (let key in this.state.decendingdata) {
          console.log(key + ":" + this.state.decendingdata[key])
          arr.push({
            name: key,
            value: this.state.decendingdata[key]
          })
        }
        this.setState({
          decendingdatas: arr
        })
      }
    );
  }


  jsonmodel = (text, record, index) => {
    this.setState({
      jsonshow: true,
      jsondata: JSON.parse(text),
    }
      , function () {
        var arr = []
        for (let key in this.state.jsondata) {
          console.log(key + ":" + this.state.jsondata[key])
          arr.push({
            name: key,
            value: this.state.jsondata[key]
          })
        }
        this.setState({
          jsondatas: arr
        })
      }
    );
  }


  handleCancel = (e) => {
    this.setState({
      datashow: false,
      decendingmodel:false,
      jsonshow: false,
    });
  }

  pagechange = (page, num) => {
    console.log(page, num)
    console.log(this.state.endtime)
    this.setState({
      pageNum: page,
      pageNumSize: num,
    }, function () {
      var IMEI = document.getElementById('IMEI').value
      var wirelessNum = document.getElementById('wirelessNum').value
      datalogs([
        this.state.pageNum,
        this.state.pageNumSize,
        wirelessNum,
        IMEI,
        this.state.mltype,
        this.state.begintime,
        this.state.endtime
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          if (res.data.data === null) {
            this.setState({
              data: [],
              total: []
            });
          } else {
            this.setState({
              data: res.data.data.list,
              total: res.data.data.total,
            });
          }
        }
      });
    })
  }





  componentWillMount = () => {
    document.title = "数据日志";

    var powerarr = [];
    var powerarr1 = [];
    var powerarr2 = [];
    var powerarr3 = [];
    var powerarr4 = [];
    var powerarr5 = [];
    var powerarr6 = [];
    var powerarr7 = [];
    var powerarr8 = [];
    var powerarr9 = [];
    for (var i = 0; i < this.state.powermenu.length; i++) {
      if (this.state.powermenu[i].id === 9 || this.state.powermenu[i].id === 10 || this.state.powermenu[i].id === 68 ) {
        powerarr.push(this.state.powermenu[i])
      } else if (this.state.powermenu[i].id === 11 || this.state.powermenu[i].id === 12 || this.state.powermenu[i].id === 13 || this.state.powermenu[i].id === 63) {
        powerarr1.push(this.state.powermenu[i])
      } else if (this.state.powermenu[i].id === 14 || this.state.powermenu[i].id === 15 || this.state.powermenu[i].id === 16) {
        powerarr2.push(this.state.powermenu[i])
      } else if (this.state.powermenu[i].id === 66 || this.state.powermenu[i].id === 67) {
        powerarr3.push(this.state.powermenu[i])
      } else if (this.state.powermenu[i].id === 17 || this.state.powermenu[i].id === 18) {
        powerarr5.push(this.state.powermenu[i])
      } else if (this.state.powermenu[i].id === 20 || this.state.powermenu[i].id === 21) {
        powerarr6.push(this.state.powermenu[i])
      } else if (this.state.powermenu[i].id === 22) {
        powerarr7.push(this.state.powermenu[i])
      } else if (this.state.powermenu[i].id === 27) {
        powerarr8.push(this.state.powermenu[i])
      } else if (this.state.powermenu[i].id === 28 || this.state.powermenu[i].id === 29 ||
        this.state.powermenu[i].id === 30 || this.state.powermenu[i].id === 31 || this.state.powermenu[i].id === 32) {
        powerarr9.push(this.state.powermenu[i])
      }
    }
    this.setState({
      menudata: powerarr,
      data1: powerarr1,
      data2: powerarr2,
      data3: powerarr3,
      data4: powerarr4,
      data5: powerarr5,
      data6: powerarr6,
      data7: powerarr7,
      data8: powerarr8,
      data9: powerarr9,
    });

    datalogs([
      '',
      '',
      '',
      '',
      '',
      this.state.begintime,
      this.state.endtime
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        if (res.data.data === null) {
          this.setState({
            data: [],
          });
        } else {
          this.setState({
            data: res.data.data.list,
            total: res.data.data.total,
          });
        }
      }
    });

  }




  timeonChange = (dates, dateStrings) => {
    this.setState({
      begintime: dateStrings[0],
      endtime: dateStrings[1],
    });
  }

  mltype = (date, dateString) => {
    console.log(date, dateString)
    this.setState({
      mltype: date,
    });
  }

  query = () => {
    var IMEI = document.getElementById('IMEI').value
    var wirelessNum = document.getElementById('wirelessNum').value
    console.log(this.state.begintime)
    datalogs([
      '',
      '',
      wirelessNum,
      IMEI,
      this.state.mltype,
      this.state.begintime,
      this.state.endtime
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        if (res.data.data === null) {
          this.setState({
            data: [],
            total: [],
          });
        } else {
          this.setState({
            data: res.data.data.list,
            total: res.data.data.total,
          });
        }
      }
    });
  }


  wirequery = (e) => {
    if (e.keyCode === 13) {
      var IMEI = document.getElementById('IMEI').value
      var wirelessNum = document.getElementById('wirelessNum').value
      datalogs([
        '',
        '',
        wirelessNum,
        IMEI,
        this.state.mltype,
        this.state.begintime,
        this.state.endtime
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          if (res.data.data === null) {
            this.setState({
              data: [],
              total: [],
            });
          } else {
            this.setState({
              data: res.data.data.list,
              total: res.data.data.total,
            });
          }
        }
      });
    }
  }

  reset = () => {
    document.getElementById('IMEI').value == 1
    document.getElementById('wirelessNum').value == " "
    console.log(this.state.endtime)
    this.setState({
      mltype: '',
      wirelessNum:'',
      IMEINum:'',
    })
    datalogs([
      '',
      '',
      '',
      '',
      '',
      this.state.begintime,
      this.state.endtime
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        if (res.data.data === null) {
          this.setState({
            data: [],
          });
        } else {
          this.setState({
            data: res.data.data.list,
            total: res.data.data.total,
          });
        }
      }
    });
  }

  changeData = (e) => {
    console.log(e.target.value)
    this.setState({
      wirelessNum:e.target.value
    })
  }

  changeDatas = (e) => {
    console.log(e.target.value)
    this.setState({
      IMEINum:e.target.value
    })
  }





  render() {
    const powers = this.state.menudata.map((province, id) => <Menu.Item key={province.id}><Link to={province.code}>{province.name}</Link></Menu.Item>)
    const powers1 = this.state.data1.map((province, id) => <Menu.Item key={province.id}><Link to={province.code}>{province.name}</Link></Menu.Item>)
    const powers2 = this.state.data2.map((province, id) => <Menu.Item key={province.id}><Link to={province.code}>{province.name}</Link></Menu.Item>)
    const powers3 = this.state.data3.map((province, id) => <Menu.Item key={province.id}><Link to={province.code}>{province.name}</Link></Menu.Item>)
    const powers4 = this.state.data4.map((province, id) => <Menu.Item key={province.id}><Link to={province.code}>{province.name}</Link></Menu.Item>)
    const powers5 = this.state.data5.map((province, id) => <Menu.Item key={province.id}><Link to={province.code}>{province.name}</Link></Menu.Item>)
    const powers6 = this.state.data6.map((province, id) => <Menu.Item key={province.id}><Link to={province.code}>{province.name}</Link></Menu.Item>)
    const powers7 = this.state.data7.map((province, id) => <Menu.Item key={province.id}><Link to={province.code}>{province.name}</Link></Menu.Item>)
    const powers8 = this.state.data8.map((province, id) => <Menu.Item key={province.id}><Link to={province.code}>{province.name}</Link></Menu.Item>)
    const powers9 = this.state.data9.map((province, id) => <Menu.Item key={province.id}><Link to={province.code}>{province.name}</Link></Menu.Item>)
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
        }),
      };
    });
    return (
      <LocaleProvider locale={zh_CN}>
        <div id="journalbody" >
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div />
              <div className="Layout-left">
                <Menu
                  defaultSelectedKeys={['17']}
                  defaultOpenKeys={['sub6']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <Menu.Item key="17" style={{ background: ' #0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
                    <Icon type="windows" />
                    <span>水表管理平台</span>
                  </Menu.Item>
                  <Menu.Item>
                    <Icon type="home" /><span>仪表盘</span>
                  </Menu.Item>
                  <SubMenu key="sub1" title={<span><Icon type="file-text" /><span>信息查询</span></span>}>
                    {powers}
                  </SubMenu>
                  <SubMenu key="sub2" title={<span><Icon type="desktop" /><span>设备管理</span></span>}>
                    {powers1}
                  </SubMenu>
                  <SubMenu key="sub3" title={<span><Icon type="user" /><span>用户管理</span></span>}>
                    {powers2}
                  </SubMenu>
                  <SubMenu key="sub4" title={<span><Icon type="bar-chart" /><span>用水管理</span></span>}>
                    {powers3}
                  </SubMenu>
                  <SubMenu key="sub5" title={<span><Icon type="tool" /><span>报警管理</span></span>}>
                    {powers4}
                  </SubMenu>
                  <SubMenu key="sub6" title={<span><Icon type="calendar" /><span>日志管理</span></span>}>
                    {powers5}
                    <SubMenu key="sub7" title={<span>用户日志</span>}>
                      {powers6}
                    </SubMenu>
                  </SubMenu>
                  <SubMenu key="sub8" title={<span><Icon type="sync" /><span>生命周期</span></span>}>
                    {powers7}
                  </SubMenu>
                  <SubMenu key="sub9" title={<span><Icon type="warning" /><span>产品监控</span></span>}>
                    <SubMenu key="sub10" title={<span>产品测试</span>}>
                      {powers8}
                    </SubMenu>
                    {powers9}
                  </SubMenu>
                </Menu>
              </div>
            </Sider>
            <Layout>
              <Header style={{ background: '#fff', padding: 0 }}>
                <Button type="primary" onClick={this.toggle} style={{ marginLeft: "16px", float: 'left', marginTop: '15px' }}>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  />
                </Button>
                <Headers />
              </Header>
              <div className="nav">
                日志管理 / 数据日志
            </div>
              <div className="tit">
                数据日志
            </div>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                <div className='otatop'>
                  水表编号:<Input
                    placeholder="请输入水表编号"
                    onKeyDown={this.wirequery}
                    value={this.state.wirelessNum}
                    onChange={(e) => this.changeData(e)}
                    style={{ width: '150px', marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}
                    id="wirelessNum"
                    autoComplete="off"
                  />
                  IMEI:<Input
                    placeholder="请输入IMEI"
                    onKeyDown={this.wirequery}
                    value={this.state.IMEINum}
                    onChange={(e) => this.changeDatas(e)}
                    style={{ width: '150px', marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}
                    id="IMEI"
                    autoComplete="off"
                  />
                  命令标识:&nbsp;&nbsp;&nbsp;
                  <Select
                    style={{ width: '150px', marginRight: '20px' }}
                    placeholder="请选择命令标识"
                    onChange={this.mltype}
                  >
                    <Option value="0">上线包</Option>
                    <Option value="1">历史数据</Option>
                    <Option value="2">查询</Option>
                    <Option value="3">开阀</Option>
                    <Option value="4">关阀</Option>
                    <Option value="5">时间间隔</Option>
                    <Option value="6">霍尔开关</Option>
                    <Option value="7">震动开关</Option>
                    <Option value="8">预存</Option>
                    <Option value="10">ip端口</Option>
                    <Option value="11">远程升级</Option>
                    <Option value="12">水表编号</Option>
                    <Option value="13">修改密钥</Option>
                    <Option value="255">注册包</Option>
                  </Select>

                  下发时间：
                      <RangePicker
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    style={{ width: "300px" }}
                    defaultValue={[moment(this.state.begintime, dateFormat), moment(this.state.endtime, dateFormat)]}
                    onChange={this.timeonChange}
                  />
                  <div style={{ float: "right" }}>
                    <Button type="primary" style={{ marginRight: '20px' }} onClick={this.query}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                  </div>

                </div>
                <Table
                  id="tables"
                  dataSource={this.state.data}
                  columns={columns}
                  bordered
                  pagination={false}
                />
                <div className="pageone">
                  <Pagination
                    onShowSizeChange={this.onShowSizeChange}
                    defaultCurrent={1}
                    onChange={this.pagechange}
                    total={this.state.total}
                    hideOnSinglePage={true}
                  />
                </div>
                <Modal
                  title="原始数据"
                  visible={this.state.datashow}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  mask={false}
                  okText="确认"
                  width="400px"
                  cancelText="取消"
                  footer={null}
                >
                  <div>
                    {this.state.datatext}
                  </div>
                </Modal>
                <Modal
                  title="JSON数据"
                  visible={this.state.jsonshow}
                  width="850px"
                  onCancel={this.handleCancel}
                  mask={false}
                >
                  <Table
                    dataSource={this.state.jsondatas}
                    columns={this.state.jsonlist}
                    rowClassName="editable-row"
                    style={{ width: '100%' }}
                    bordered
                    footer={false}
                  />
                </Modal>
                <Modal
                  title="下行命令"
                  visible={this.state.decendingmodel}
                  onCancel={this.handleCancel}
                  mask={false}
                >
                  <Table
                    dataSource={this.state.decendingdatas}
                    columns={this.state.decendinglist}
                    rowClassName="editable-row"
                    style={{ width: '100%' }}
                    bordered
                    footer={false}
                  />
                </Modal>
              </Content>
            </Layout>
          </Layout>
        </div>
      </LocaleProvider>
    )
  }
}
export default journal = createForm()(journal);

