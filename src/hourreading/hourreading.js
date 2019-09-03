import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Form, message, Modal, Table, Checkbox, DatePicker, Row, Progress, LocaleProvider } from 'antd';
import { Link } from 'react-router-dom';
import { wireless, getHourReading } from '../axios';
import { createForm } from 'rc-form';
import './hourreading.css';
import Headers from '../header';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const dateFormat = 'YYYY/MM/DD';
const { RangePicker } = DatePicker;


const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

const myDate = new Date();
var now = new Date();
var date = new Date(now.getTime() - 2 * 24 * 3600 * 1000);
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day =  date.getDate() > 9 ? date.getDate() : '0' + date.getDate();;


var date1 = new Date(now.getTime() - 1 * 24 * 3600 * 1000);
var year1 = date1.getFullYear();
var month1 = date1.getMonth() + 1;
var day1 =  date1.getDate() > 9 ? date1.getDate() : '0' + date1.getDate();;

function disabledDate(current) {
  // Can not select days before today and today
  return current && current > new Date(now.getTime() - 1 * 24 * 3600 * 1000);
}



class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      powermenu: JSON.parse(localStorage.getItem('menu')),
      time: myDate,
      enterprisetype: '',
      selected: '',
      selectedRowKey: '',
      endtime: year1 + '-0' + month1 + '-' + day1,
      begintime: year + '-0' + month + '-' + day,
      data: [],
      shakes: '',
      huoers: '',
    };
    this.columns = [{
      title: '采集日期',
      dataIndex: 'date',
    }, {
      title: '设备编号',
      dataIndex: 'devicenum',
    }, {
      title: '采集时刻',
      dataIndex: 'hour',
    }, {
      title: '采集数值',
      dataIndex: 'data',
    }
    ];
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }






  onSelect = (selectedRowKey) => {
    console.log('selectedRowKey changed: ', selectedRowKey);
    console.log(selectedRowKey.join(','))
    this.setState({
      listnum: selectedRowKey.length,
      selectedRowKey,
      keylist: selectedRowKey.join(','),
    });
  }

  timeonChange = (data, dateString) => {
    console.log(dateString[0].split('/').join('-'))
    this.setState({
      begintime: dateString[0].split('/').join('-'),
      endtime: dateString[1].split('/').join('-'),
    });
  }


  generalquery = () => {
    getHourReading([
      localStorage.getItem('histext'),
      this.state.begintime,
      this.state.endtime,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        console.log(res.data.data[0])
        if (res.data.data[0] === null) {
          // message.error('所选日期暂无数据，请重新选择')
          this.setState({
            data: [],
          });
        } else {
          this.setState({
            data: res.data.data,
            num: res.data.data.length,
          });
        }
      }

    })
  }



  componentWillMount = () => {
    document.title = "小时读数";
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



    getHourReading([
      localStorage.getItem('histext'),
      this.state.begintime,
      this.state.endtime,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
       
        if (res.data.data[0] === null) {
          // message.error('所选日期暂无数据，请重新选择')
          this.setState({
            data: [],
          });
        } else {
          this.setState({
            data: res.data.data,
            num: res.data.data.length,
          });
        }
      }

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
    const { selectedRowKey } = this.state;
    const rowSelect = {
      selectedRowKey,
      onChange: this.onSelect,
    };

    const hasSelected = selectedRowKey.length > 0;

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
                  defaultSelectedKeys={['12']}
                  defaultOpenKeys={['sub2']}
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
                设备管理 / 设备基本信息 / 小时读数
            </div>
              <div className="tit">
                小时读数
            </div>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>
                <div style={{ marginTop: '10px' }}>
                  时间选择:<RangePicker
                   disabledDate={disabledDate}
                    style={{ marginLeft: '20px', marginBottom: '20px' }}
                    defaultValue={[moment(this.state.begintime, dateFormat), moment(this.state.endtime, dateFormat)]}
                    format={dateFormat}
                    ranges={{ 今天: [moment().startOf('day'), moment().endOf('day')], '本月': [moment().startOf('month'), moment().endOf('month')] }}
                    onChange={this.timeonChange}
                  />
                  <Button type="primary" style={{ marginLeft: '20px' }} onClick={this.generalquery}>查询</Button>
                </div>
                <div style={{ marginTop: '10px' }}>
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

