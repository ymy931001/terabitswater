import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Form, Select, Modal, Table, Checkbox, Input, message, LocaleProvider, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { testHistory } from '../axios';
import { createForm } from 'rc-form';
import './testhistory.css';
import Headers from '../header';
import moment from 'moment';

import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');



var now = new Date();
var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();
var hour = date.getHours();
var minute = date.getMinutes();
var second = date.getSeconds();


var time = new Date();
var year1 = time.getFullYear();
var month1 = time.getMonth() + 1;
var day1 = time.getDate();
var hour1 = time.getHours();
var minute1 = time.getMinutes();
var second1 = time.getSeconds();

const dateFormat = 'YYYY/MM/DD HH:mm:ss';
const plainOptions = ['开阀', '关阀'];
const CheckboxGroup = Checkbox.Group;
const Option = Select.Option;
const myDate = new Date();
const { RangePicker } = DatePicker;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      powermenu: JSON.parse(localStorage.getItem('menu')),
      time: myDate,
      enterprisetype: '',
      checked: '',
      color: "",
      data: [],
      begintime: year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second,
      endtime: year1 + '-' + month1 + '-' + day1 + ' ' + hour1 + ':' + minute1 + ':' + second1,
    };
    this.columns = [{
      title: '水表类型',
      dataIndex: 'type',
    }, {
      title: '水表编号',
      dataIndex: 'wirelessNum',
    }, {
      title: '用水量',
      dataIndex: 'waternum',
    }, {
      title: '阀门状态',
      dataIndex: 'valve',
      render: (text) => {
        if (text === null) {
          return (
            <div>
              <CheckboxGroup options={plainOptions} onChange={this.onChanges} />
            </div>
          )
        }
        if (text === '0') {
          return (
            <div>
              <CheckboxGroup options={plainOptions} defaultValue={['开阀']} onChange={this.onChanges} />
            </div>
          )
        }
        if (text === '1') {
          return (
            <div>
              <CheckboxGroup options={plainOptions} defaultValue={['关阀']} onChange={this.onChanges} />
            </div>
          )
        }
        else {
          return (
            <div>
              <CheckboxGroup options={plainOptions} onChange={this.onChanges} />
            </div>
          )
        }
      }
    }, {
      title: '上传时间间隔(小时)',
      dataIndex: 'reportingInterval',
      width: '15%',
      render: (text, record) => {
        return (
          <div>
            <Input style={{ marginLeft: '10px' }} value={this.state.interval} onChange={this.timechange} />
          </div>
        )
      },
    }, {
      title: '电压',
      dataIndex: 'voltage',
      render: (text, record) => {
        return (
          <div>
            {Number(text).toFixed(3)}
          </div>
        )
      },
    }, {
      title: '信号强度',
      dataIndex: 'signalIntensity',

    }
      , {
      title: '修改IP地址',
      dataIndex: 'signalIntensity',
      render: (text, record) => {
        return (
          <div>
            <a onClick={() => this.showModal(text)}
            >修改</a>
            <Modal
              title="修改IP地址"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              mask={false}
            >
              <div>IP地址：
              <Input placeholder="" style={{ width: '15%', marginRight: '2px' }} id="ip1" autoComplete="off" maxlength="3" onChange={this.ip1} value={this.state.ipvalue1} />.
            <Input placeholder="" style={{ width: '15%', marginLeft: '2px', marginRight: '2px' }} id="ip2" autoComplete="off" maxlength="3" onChange={this.ip2} value={this.state.ipvalue2} />.
            <Input placeholder="" style={{ width: '15%', marginLeft: '2px', marginRight: '2px' }} id="ip3" autoComplete="off" maxlength="3" onChange={this.ip3} value={this.state.ipvalue3} />.
            <Input placeholder="" style={{ width: '15%', marginLeft: '2px', marginRight: '2px' }} id="ip4" autoComplete="off" maxlength="3" onChange={this.ip4} value={this.state.ipvalue4} />:
            <Input placeholder="" style={{ width: '15%', marginLeft: '2px', marginRight: '2px' }} id="ip5" autoComplete="off" maxlength="5" onChange={this.ip5} value={this.state.ipvalue5} />
              </div>
              <div style={{ marginTop: "20px" }}> 连接方式：
              <Select onChange={this.usersChange} style={{ width: "30%" }} value={this.state.enterprisetype}>
                  <Option value="0">MQTT</Option>
                  <Option value="1">TCP</Option>
                  <Option value="2">UDP</Option>
                </Select>
              </div>
            </Modal>
          </div>
        )
      },
    }
    ];
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }


  timeonChange = (value, dateString) => {
    this.setState({
      begintime: dateString[0],
      endtime: dateString[1],
    });
  }


  showModal = (text) => {
    this.setState({
      visible: true,
    });
  }

  usersChange = (date, dateString) => {
    console.log(date)
    this.setState({
      enterprisetype: date,
      //   typetext: date,
    });
  }



  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }










  componentWillMount = () => {
    document.title = "无线单表测试";
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


    testHistory([

    ]).then(res => {
        if (res.data && res.data.message === 'success') {
            // this.setState({
            //     data: res.data.data,
            // });
        }
    });
    

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
    const { selectedRowKeys } = this.state;
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
          editing: this.isEditing(record)
        }),
      };
    });
    return (
      <LocaleProvider locale={zh_CN}>
        <div id="historytbody" >
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div />
              <div className="Layout-left">
                <Menu
                  defaultSelectedKeys={['27']}
                  defaultOpenKeys={['sub8', 'sub9']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <Menu.Item key="23" style={{ background: '#0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
                产品监控 / 产品测试 / 历史记录查询
            </div>
              <div className="tit">
                历史记录查询
            </div>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>
                <div style={{ marginTop: '10px' }}>
                  水表编号:<Input placeholder="请输入水表编号" style={{ width: '200px', marginLeft: '10px', marginRight: '10px',marginBottom:'20px' }} id="nbtest" autoComplete="off" />
                  OTA历史标识:<Input placeholder="请输入OTA历史标识" style={{ width: '200px', marginLeft: '10px', marginRight: '10px' }} id="nbtest" autoComplete="off" />
                  下发结果：
                  <Select placeholder="请选择" className="one" onChange={this.typeChange} style={{ width: '200px' }} disabled={false} >
                    <Option value="正常">正常</Option>
                    <Option value="异常">异常</Option>
                    <Option value="警告">警告</Option>
                  </Select>
                </div>
                <div style={{ marginTop: '10px',marginBottom:'20px'  }}>
                  下发时间:
                  <RangePicker
                    style={{ marginLeft: '10px', marginRight: '10px' }}
                    defaultValue={[moment(this.state.begintime, dateFormat), moment(this.state.endtime, dateFormat)]}
                    format={dateFormat}
                    ranges={{ 今天: [moment().startOf('day'), moment().endOf('day')], '本月': [moment().startOf('month'), moment().endOf('month')] }}
                    onChange={this.timeonChange}
                  />
                  水表编号:<Input placeholder="请输入水表编号" style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="nbtest" autoComplete="off" />
                </div>
                <div style={{ marginTop: '10px' }}>
                  查询结果:总共{this.state.nums}条记录
                  <Table
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                  />
                </div>
              </Content>
            </Layout>
          </Layout>
        </div>
      </LocaleProvider>
    )
  }
}
export default journal = createForm()(journal);

