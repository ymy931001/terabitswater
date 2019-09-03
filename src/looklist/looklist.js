import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Modal, Select, Table, DatePicker, Input, message, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { simplewater, orderadd, orderview, orderedit } from '../axios';
import { createForm } from 'rc-form';
import './looklist.css';
import Headers from '../header';



var now = new Date();
var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
var year = date.getFullYear();
var month = date.getMonth() + 1;
var day = date.getDate();


var time = new Date();
var year1 = time.getFullYear();
var month1 = time.getMonth() + 1;
var day1 = time.getDate();


const dateFormat = 'YYYY/MM/DD';
const myDate = new Date();
const { RangePicker } = DatePicker;
const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      begintime: year + '-' + month + '-' + day + ' ',
      endtime: year1 + '-' + month1 + '-' + day1 + ' ',
      time: myDate,
      randomnum: '',
      inputValue: '',
      watermanarrs: [],
      data: '',
      powermenu: JSON.parse(localStorage.getItem('menu')),
    };
    this.columns = [{
      title: '单号',
      dataIndex: 'order_num',
    }, {
      title: '订单内容',
      dataIndex: 'order_content',
      render: (text, record) => {
        return (
          <div>
            <span style={{ color: 'red', fontWeight: 'bold' }}>{text}</span>&nbsp;&nbsp;&nbsp;台设备
          </div>
        )
      }
    }, {
      title: '发货时间',
      dataIndex: 'delivery_time',
      render: (text, record) => {
        return (
          <div>
            {text.substring(0, 10)}
          </div>
        )
      }

    }, {
      title: '发货地址',
      dataIndex: 'delivery_address',
    }, {
      title: '订单状态',
      dataIndex: 'delivery_status',
      render: (text, record, index) => {
        if (text === '0') {
          return (
            <div>
              <span style={{ color: 'red' }}>
                <Popconfirm title="请确认订单信息" onConfirm={() => this.statuschange(text, record, index)}>
                  待发货
                </Popconfirm>
              </span>
            </div>
          );
        }
        if (text === '1') {
          return (
            <div>
              <span style={{ color: 'green' }}>
                已发货
              </span>
            </div>
          );
        }
      }
    }
    ];
  }
  handleOk = (e) => {
    orderadd([
      this.state.randomnum,
      this.state.sendtime,
      this.state.inputValue,
      this.state.waterMerchantId,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        message.success('添加成功')
        orderview([
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            this.setState({
              data: res.data.data,
            });
          }
        });
      }
    });
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


  statuschange = (text, record, index) => {
    var ordernum = record.order_num
    orderedit([
      ordernum,
      0,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        orderview([
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            this.setState({
              data: res.data.data,
            });
          }
        });
      }
    });
  }

  equipmentquery = () => {
    var order = document.getElementById('order').value;
    if (order === "") {
      order = null
    }
    orderview([
      order,
      null,
      this.state.begintime,
      this.state.endtime,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
        });
      }
    });
  }

  reset = () => {
    document.getElementById('order').value = "";
    orderview([
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
        });
      }
    });
  }


  timeonChange = (value, dateString) => {
    this.setState({
      begintime: dateString[0],
      endtime: dateString[1],
    });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  showModal = (text) => {
    this.setState({
      randomnum: '',
      visible: true,
    });
  }
  componentWillMount = () => {
    document.title = "查看订单";

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


    orderview([
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          data: res.data.data,
        });
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
                defaultSelectedKeys={['29']}
                defaultOpenKeys={['sub9']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                <Menu.Item key="19" style={{ background: ' #0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
              产品监控 / 查看订单
            </div>
            <div className="tit">
              查看订单
            </div>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>
              <div style={{ marginTop: '10px' }}>
                时间:
                  <RangePicker
                  style={{ marginLeft: '10px', marginRight: '10px' }}
                  defaultValue={[moment(this.state.begintime, dateFormat), moment(this.state.endtime, dateFormat)]}
                  format={dateFormat}
                  ranges={{ 今天: [moment().startOf('day'), moment().endOf('day')], '本月': [moment().startOf('month'), moment().endOf('month')] }}
                  onChange={this.timeonChange}
                />
                单号查询:<Input placeholder="请输入单号" style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="order" />
                <div style={{ float: "right" }}>
                  <Button type="primary" style={{ marginRight: '20px', zIndex: 99, }} onClick={this.equipmentquery}>查询</Button>
                  <Button style={{ zIndex: 99, }} onClick={this.reset}>重置</Button>
                </div>
              </div>
              <div style={{ marginTop: '10px' }}>
                <Table
                  dataSource={this.state.data}
                  columns={columns}
                  rowClassName="editable-row"
                  bordered
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

