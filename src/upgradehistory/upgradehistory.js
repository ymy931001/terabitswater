import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Modal, Select, Table, DatePicker, Input, LocaleProvider, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';

import { otalist } from '../axios';
import { createForm } from 'rc-form';
import './upgradehistory.css';
import Headers from '../header';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const RangePicker = DatePicker.RangePicker;
const typetext = {
  0: '等待下发',
  1: "待响应",
  2: '响应超时',
  3: 'OTA中',
  4: "升级失败",
  5: "升级成功"
};

const typenum = {
  '等待下发': 0,
  "待响应": 1,
  '响应超时': 2,
  'OTA中': 3,
  "升级失败": 4,
  "升级成功": 5,
  '全部': null
};

const myDate = new Date();

const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      time: myDate,
      randomnum: '',
      inputValue: '',
      currentTime: null,
      length: '',
      watermanarrs: [],
      selectedRowKeys: [],
      data: '',
      powermenu: JSON.parse(localStorage.getItem('menu')),
    };
    this.columns = [{
      title: '设备编号',
      dataIndex: 'meternum',
    }, {
      title: 'IMEI',
      dataIndex: 'imei',
    }, {
      title: '目标版本',
      dataIndex: 'postversion',
    }, {
      title: '当前版本',
      dataIndex: 'preversion',
      // defaultSortOrder: 'descend',/
      sorter: (a, b) => a.preversion - b.preversion,
    }, {
      title: 'OTA状态',
      dataIndex: 'status',
      render: (text) => {
        if (text === 0) {
          return (
            <div>
              <span style={{ color: 'black' }}>等待下发</span>
            </div>
          )
        }
        if (text === 1) {
          return (
            <div>
              <span style={{ color: 'green' }}>待响应</span>
            </div>
          )
        }
        if (text === 2) {
          return (
            <div>
              <span style={{ color: 'red' }}>响应超时</span>
            </div>
          )
        }
        if (text === 3) {
          return (
            <div>
              <span style={{ color: 'orange' }}>OTA中</span>
            </div>
          )
        }
        if (text === 4) {
          return (
            <div>
              <span style={{ color: 'red' }}>升级失败</span>
            </div>
          )
        }
        if (text === 5) {
          return (
            <div>
              <span style={{ color: 'green' }}>升级成功</span>
            </div>
          )
        }
      }
    }, {
      title: '下发时间',
      dataIndex: 'gmtcreate',
    }, {
      title: '修改时间',
      dataIndex: 'gmtmodified',

      render: (text) => {
        if (text === '' || text === null || text === undefined) {
          return (
            <div>
              <span style={{ color: 'black' }}>暂无修改</span>
            </div>
          )
        } else {
          return (
            <div>
              <span style={{ color: 'black' }}>{text}</span>
            </div>
          )
        }
      }
    }
    , {
      title: '备注信息',
      dataIndex: 'remark',
    }
    ];
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  timeonChange = (dates, dateStrings) => {
    this.setState({
      beginTime: dateStrings[0],
      endTime: dateStrings[1],
    });
  }


  typeChanges = (date, dateString) => {
    var imei = document.getElementById('imei').value
    var nbtest = document.getElementById('nbtest').value
    var remark = document.getElementById('remark').value
    console.log(date)
    this.setState({
      status: typenum[date],
    }, function () {
      let obj = {
        meterNum: nbtest,
        imei: imei,
        remark: remark,
        beginTime: this.state.beginTime,
        endTime: this.state.endTime,
        status: this.state.status,
      }
      otalist(obj).then(res => {
        console.log(res.data)
        this.setState({
          data: res.data,
          num: res.data.length,
        });
      });
    });
  }

  componentWillMount = () => {
    document.title = "OTA升级历史记录";

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




    otalist([

    ]).then(res => {
      console.log(res.data)
      this.setState({
        data: res.data,
        num: res.data.length,
      });
    });





  }


  equipmentquery = () => {
    var imei = document.getElementById('imei').value
    var nbtest = document.getElementById('nbtest').value
    var remark = document.getElementById('remark').value
    let obj = {
      meterNum: nbtest,
      imei: imei,
      remark: remark,
      beginTime: this.state.beginTime,
      endTime: this.state.endTime,
      status: this.state.status,
    }
    otalist(obj).then(res => {
      console.log(res.data)
      this.setState({
        data: res.data,
        num: res.data.length,
      });
    });
  }


  wirequery = (e) => {
    var imei = document.getElementById('imei').value
    var nbtest = document.getElementById('nbtest').value
    var remark = document.getElementById('remark').value
    if (e.keyCode === 13) {
      let obj = {
        meterNum: nbtest,
        imei: imei,
        remark: remark,
        beginTime: this.state.beginTime,
        endTime: this.state.endTime,
        status: this.state.status,
      }
      otalist(obj).then(res => {
        console.log(res.data)
        this.setState({
          data: res.data,
          num: res.data.length,
        });
      });
    }
  }

  imeiquery = (e) => {
    var imei = document.getElementById('imei').value
    var nbtest = document.getElementById('nbtest').value
    var remark = document.getElementById('remark').value
    if (e.keyCode === 13) {
      let obj = {
        meterNum: nbtest,
        imei: imei,
        remark: remark,
        beginTime: this.state.beginTime,
        endTime: this.state.endTime,
        status: this.state.status,
      }
      otalist(obj).then(res => {
        console.log(res.data)
        this.setState({
          data: res.data,
          num: res.data.length,
        });
      });
    }
  }

  remarkquery = (e) => {
    var imei = document.getElementById('imei').value
    var nbtest = document.getElementById('nbtest').value
    var remark = document.getElementById('remark').value
    if (e.keyCode === 13) {
      let obj = {
        meterNum: nbtest,
        imei: imei,
        remark: remark,
        beginTime: this.state.beginTime,
        endTime: this.state.endTime,
        status: this.state.status,
      }
      otalist(obj).then(res => {
        console.log(res.data)
        this.setState({
          data: res.data,
          num: res.data.length,
        });
      });
    }
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

    const provinceOptions = this.state.watermanarrs.map((province, id) => <Option key={province.id}>{province.name}</Option>);

    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
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
        <div id="historytbody" >
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            // style={{
            //   overflowY: 'scroll',
            //   height: '100vh',

            //   left: 0,
            // }}
            >
              <div />
              <div className="Layout-left">
                <Menu
                  defaultSelectedKeys={['63']}
                  defaultOpenKeys={['sub2',]}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <Menu.Item key="19" style={{ background: '#0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
                设备管理 /  <Link to="/upgrade" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>设备升级</Link>   / OTA升级历史记录
            </div>
              <div className="tit">
                OTA升级历史记录
            </div>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>

                <div style={{ marginTop: '10px', }}>
                  <div className='otatop'>
                    <div>
                      水表编号:<Input
                        placeholder="请输入水表编号"
                        onKeyDown={this.wirequery}
                        style={{ width: '300px', marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}
                        id="nbtest"
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      IMEI号:<Input
                        placeholder="请输入IMEI号"
                        onKeyDown={this.imeiquery}
                        style={{ width: '300px', marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}
                        id="imei"
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      备注:<Input
                        placeholder="请输入备注信息"
                        onKeyDown={this.remarkquery}
                        style={{ width: '300px', marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}
                        id="remark"
                        autoComplete="off"
                      />
                    </div>
                  </div>
                  <div className="otamid">
                    <div>
                      下发时间：
                      <RangePicker
                        showTime
                        format="YYYY-MM-DD HH:mm:ss"
                        style={{ width: "300px" }}
                        onChange={this.timeonChange}
                      />
                    </div>
                    <div>
                      设备状态:<Select onChange={this.typeChanges} style={{ width: '200px', marginRight: "20px", marginLeft: '10px', }} placeholder="请选择设备状态">
                        <Option value="全部">全部</Option>
                        <Option value="等待下发">等待下发</Option>
                        <Option value="待响应">待响应</Option>
                        <Option value="响应超时">响应超时</Option>
                        <Option value="OTA中">OTA中</Option>
                        <Option value="升级失败">升级失败</Option>
                        <Option value="升级成功">升级成功</Option>
                      </Select>
                      <Button type="primary" onClick={this.equipmentquery} style={{ marginRight: '20px' }}>查询</Button>
                    </div>
                    <div style={{ width: "340px", textAlign: 'left' }}>

                    </div>
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    查询结果：共
                    <span style={{ color: 'rgb(73, 169, 238)', marginLeft: '10px' }}>{this.state.num}
                    </span> 条记录 
                  </div>
                  <Table
                    // rowSelection={rowSelection}
                    dataSource={this.state.data}
                    columns={columns}
                    bordered
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

