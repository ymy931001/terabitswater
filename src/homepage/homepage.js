import React, { Component } from 'react';
import { Icon, Button, Select, Table, Menu, Layout, DatePicker, Cascader, Row, Col, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createForm } from 'rc-form';
import { headerdataStatistics } from '../axios';

import { Map, Marker } from 'react-amap';

import './homepage.css';
import Highcharts from 'highcharts/highstock';
import Headers from '../header';

import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util
} from "bizcharts";

const myDate = new Date();
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;

const dateFormat = 'YYYY/MM/DD HH:mm:ss';
function callback(key) {
  console.log(key);
}
const YOUR_AMAP_KEY = '076cb00b4c9014e47f9b19e1da93daca';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;

function onChange(date, dateString) {
  console.log(date, dateString);
}
class journal extends React.Component {

  state = { visible: false }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      powermenu: JSON.parse(localStorage.getItem('menu')),
      num: 15,
      collapsed: false,
      size: 'small',
      time: myDate,
      selectedRowKeys: [],
      count: 2,
      longitude: '120.201316',
      latitude: '30.236285',
    };
    this.columns = [{
      title: '设备编号',
      dataIndex: 'wirelessNum',
    }, {
      title: '所属水务商',
      dataIndex: 'waterMeterDiameter',
      render: (text) => {
        if (text === null) {
          return (
            <div>
              <span>无</span>
            </div>
          )
        } else {
          return (
            <div>
              <span>{text}</span>
            </div>
          )
        }
      }
    }, {
      title: '昨日用水',
      dataIndex: 'readingYesterday',
    }, {
      title: '最近一次上报时间',
      dataIndex: 'onlineDatetime',
    }, {
      title: '最新读数',
      dataIndex: 'readingLatest',
    }, {
      title: '信号强度',
      dataIndex: 'signalIntensity',
    }, {
      title: '激活时间',
      dataIndex: 'gmtcreate',
    }];
  }




  componentWillMount = () => {


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
      if (this.state.powermenu[i].id === 9 || this.state.powermenu[i].id === 10 || this.state.powermenu[i].id === 68) {
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


    headerdataStatistics([

    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        console.log(res.data.data)
        this.setState({
          totaldevice: res.data.data[0].allDevicesCount,
          newdevice: res.data.data[0].MonthNewAddDevice,
          online: res.data.data[0].onLineDevicesCount,
          offline: res.data.data[0].offLineDevicesCount,
          weekReadingRate: res.data.data[0].weekReadingRate,
          monthReadingRate: res.data.data[0].monthReadingRate,
          data: res.data.data[0].oneWeekNotConnect,
          onLineRate: res.data.data[0].onLineRate,
          oneMonthOnLineRate: res.data.data[1].oneMonthOnLineRate,
        }, function () {
          var arr = []
          var arrs = []
          for (var i in this.state.oneMonthOnLineRate) {
            arr.push(parseInt(this.state.oneMonthOnLineRate[i].rate) )
            arrs.push(this.state.oneMonthOnLineRate[i].gmtcreate)
          }
          console.log(arr)
          var chart1 = new Highcharts.Chart({
            chart: {
              renderTo: 'container1',
              type: 'column'
            },
            title: {
              text: '设备近一个月在线率统计'
            },
            credits: {
              enabled: false // 禁用版权信息
            },
            xAxis: {
              categories: arrs,
              crosshair: true,
              type: 'datetime'
            },
            yAxis: {
              title: {
                text: '在线率/%'
              }
            },
            series: [{
              data:arr,
            }]
          });
        })
      }
    });
    document.title = "总体页面展示";
  }

  componentDidMount() {

  }




  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
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
      <div id="homepagebody" >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="" style={{ background: '#0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
                <Icon type="windows" />
                <span>水表管理平台</span>
              </Menu.Item>
              <Menu.Item key="1" >
                                    <Icon type="home" />
                    <span>
                      <Link to="/homepage" style={{ color: 'white' }}>仪表盘</Link>
                    </span>
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
              <Row>
                <Col span={8} >
                  <div className="navhead">
                    <p className="navtitle">设备总数</p>
                    <p className="number"><span style={{ color: 'blue' }}>{this.state.totaldevice}</span>台</p>
                    <p className="beizhu">备注：本月新增设备 <span style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold' }}>{this.state.newdevice}</span>  台</p>
                  </div>
                </Col>
                <Col span={8} style={{ paddingLeft: '12px' }}>
                  <div className="navhead">
                    <p className="navtitle">在线设备数量</p>
                    <p className="number"><span style={{ color: 'red' }}>{this.state.online}</span>台</p>
                    <p className="beizhu">备注： 离线设备 <span style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>{this.state.offline}</span> 台
                    今日在线率： <span style={{ color: 'blue', fontSize: '18px', fontWeight: 'bold' }} > {this.state.onLineRate}</span>
                    </p>
                  </div>
                </Col>
                <Col span={8} style={{ paddingLeft: '12px' }}>
                  <div className="navhead">
                    <p className="navtitle">周抄读率</p>
                    <p className="number"><span style={{ color: 'green' }}>{this.state.weekReadingRate}</span></p>
                    <p className="beizhu">备注：月抄读率 <span style={{ color: 'green', fontSize: '18px', fontWeight: 'bold' }}>{this.state.monthReadingRate}</span> </p>
                  </div>
                </Col>
              </Row>
            </div>
            <Content style={{ margin: '24px 16px', minHeight: 280, marginTop: '10px' }}>
              <div className="diagram">
                {/* <RangePicker 
            style={{marginLeft:'20px',position:'absolute',top:'5px',zIndex:"99"}}  
            defaultValue={[moment().startOf('day'), moment(this.state.time, dateFormat)]}
            format={dateFormat}
            ranges={{ 今天: [moment().startOf('day'), moment().endOf('day')], '本月': [moment().startOf('month'), moment().endOf('month')] }}
            onChange={this.timeonChange}
          />   */}
                <div id="container1" style={{ height: '400px' }}></div>
                {/* <Tabs type="card" onChange={this.tabchange} >
                  <TabPane tab="本日" key="1">

                  </TabPane>
                  <TabPane tab="上周" key="2" forceRender={true}>
                    <div id="container2" style={{ height: '400px' }}></div>
                  </TabPane>
                  <TabPane tab="今年" key="3" forceRender={true}>
                    <div id="container3" style={{ height: '400px' }}></div>
                  </TabPane>
                </Tabs> */}
              </div>
              <div className="tabledata">
                <div className="datatitle">
                  一周未上报设备统计
                </div>
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
    )
  }
}
export default journal = createForm()(journal);

