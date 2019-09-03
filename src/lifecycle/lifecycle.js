import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, LocaleProvider, Select, Table, Input } from 'antd';
import { Link } from 'react-router-dom';
import { getLifecycle } from '../axios';
import { createForm } from 'rc-form';
import './lifecycle.css';
import Headers from '../header';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selectedRowKeys: "",
      cjselectedRowKeys: "",
      sbselectedRowKeys: "",
      powermenu: JSON.parse(localStorage.getItem('menu')),
    };
    this.columns = [{
      title: '产品种类',
      dataIndex: 'deviceId',
      render: (text, record, index) =>
        <div>
          无线单表
      </div>
    }, {
      title: '设备编号',
      dataIndex: 'device_num',
    }, {
      title: '设备状态',
      dataIndex: '设备状态',
      render: (text) => {
        if (text === 1) {
          return (
            <div>
              <span style={{ color: 'green' }}>正常</span>
            </div>
          )
        }
        if (text === 2) {
          return (
            <div>
              <span style={{ color: 'red' }}>异常</span>
            </div>
          )
        }
        if (text === 3) {
          return (
            <div>
              <span style={{ color: 'purple' }}>被替换</span>
            </div>
          )
        }
      }
    }, {
      title: '生产日期',
      dataIndex: '生产时间',
      editable: true,
    }, {
      title: '入库日期',
      dataIndex: '入库时间',
      editable: true,
    }, {
      title: '出库日期',
      dataIndex: '出库时间',
      editable: true,
    }, {
      title: '安装时间',
      dataIndex: '安装时间',
      editable: true,
      render: (text) => {
        if (text === '0') {
          return (
            <div>
              <span style={{ color: 'red' }}>待安装</span>
            </div>
          )
        }
      }
    }];

    this.column = [{
      title: '产品种类',
      dataIndex: '',
      render: (text, record, index) =>
        <div>
          采集器
      </div>
    }, {
      title: '设备编号',
      dataIndex: 'device_num',
      editable: true,
    }, {
      title: '设备状态',
      dataIndex: '设备状态',
      render: (text) => {
        if (text === 1) {
          return (
            <div>
              <span style={{ color: 'green' }}>正常</span>
            </div>
          )
        }
        if (text === 2) {
          return (
            <div>
              <span style={{ color: 'red' }}>异常</span>
            </div>
          )
        }
        if (text === 3) {
          return (
            <div>
              <span style={{ color: 'purple' }}>被替换</span>
            </div>
          )
        }
      }
    }, {
      title: '生产日期',
      dataIndex: '生产时间',
      editable: true,
    }, {
      title: '入库日期',
      dataIndex: '入库时间',
      editable: true,
    }, {
      title: '出库日期',
      dataIndex: '出库时间',
      editable: true,
    }, {
      title: '安装时间',
      dataIndex: '安装时间',
      editable: true,
      render: (text) => {
        if (text === '0') {
          return (
            <div>
              <span style={{ color: 'red' }}>待安装</span>
            </div>
          )
        }
      }
    }];

    this.ptcolumn = [{
      title: '产品种类',
      dataIndex: 'deviceId',
      render: (text, record, index) =>
        <div>
          普通水表
    </div>
    }, {
      title: '设备编号',
      dataIndex: 'device_num',
      editable: true,
    }, {
      title: '设备状态',
      dataIndex: '设备状态',
      render: (text) => {
        if (text === 1) {
          return (
            <div>
              <span style={{ color: 'green' }}>正常</span>
            </div>
          )
        }
        if (text === 2) {
          return (
            <div>
              <span style={{ color: 'red' }}>异常</span>
            </div>
          )
        }
        if (text === 3) {
          return (
            <div>
              <span style={{ color: 'purple' }}>被替换</span>
            </div>
          )
        }
      }
    }, {
      title: '生产日期',
      dataIndex: '生产时间',
      editable: true,
    }, {
      title: '入库日期',
      dataIndex: '入库时间',
      editable: true,
    }, {
      title: '出库日期',
      dataIndex: '出库时间',
      editable: true,
    }, {
      title: '安装时间',
      dataIndex: '安装时间',
      editable: true,
      render: (text) => {
        if (text === '0') {
          return (
            <div>
              <span style={{ color: 'red' }}>待安装</span>
            </div>
          )
        }
      }
    }];


  };


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  dbquery = () => {
    var dbnum = document.getElementById('dbnum').value;
    getLifecycle([
      1,
      dbnum,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].device_num
        }
        console.log(res.data.data)
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
        });
      }
    });
  }

  cjquery = () => {
    var cjqnum = document.getElementById('cjqnum').value;
    getLifecycle([
      2,
      cjqnum,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].device_num
        }
        console.log(res.data.data)
        this.setState({
          dataSource: res.data.data,
          num1: res.data.data.length,
        });
      }
    });
  }

  sbquery = () => {
    var sbnum = document.getElementById('sbnum').value;
    getLifecycle([
      3,
      sbnum,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].device_num
        }
        console.log(res.data.data)
        this.setState({
          dataSources: res.data.data,
          num2: res.data.data.length,
        });
      }
    });
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(selectedRowKeys.length)
    this.setState({
      selectedRowKeys,
      keylist: selectedRowKeys,
    });
  }
  cjSelectChange = (cjselectedRowKeys) => {
    this.setState({
      cjselectedRowKeys,
      keylist: cjselectedRowKeys,
    });
  }
  sbSelectChange = (sbselectedRowKeys) => {
    this.setState({
      sbselectedRowKeys,
      keylist: sbselectedRowKeys,
    });
  }
  componentWillMount = () => {
    document.title = "生命周期";
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




    getLifecycle([
      1,
      '',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].device_num
        }
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
        });



        getLifecycle([
          2,
          null,
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].key = res.data.data[i].device_num
            }
            this.setState({
              dataSource: res.data.data,
              num1: res.data.data.length,
            });
          }
        });

        getLifecycle([
          3,
          null,
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            for (var i = 0; i < res.data.data.length; i++) {
              res.data.data[i].key = res.data.data[i].device_num
            }
            this.setState({
              dataSources: res.data.data,
              num2: res.data.data.length,
            });
          }
        });

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
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const { cjselectedRowKeys } = this.state;
    const cjrowSelection = {
      cjselectedRowKeys,
      onChange: this.cjSelectChange,
    };
    const cjhasSelected = cjselectedRowKeys.length > 0;

    const { sbselectedRowKeys } = this.state;
    const sbrowSelection = {
      sbselectedRowKeys,
      onChange: this.sbSelectChange,
    };
    const sbhasSelected = sbselectedRowKeys.length > 0;
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
    const column = this.column.map((col) => {
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

    const ptcolumn = this.ptcolumn.map((col) => {
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
        <div id="lifecyclebody" >
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div />
              <div className="Layout-left">
                <Menu
                  defaultSelectedKeys={['22']}
                  defaultOpenKeys={['sub8']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <Menu.Item key="22" style={{ background: ' #0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
                生命周期 / 基本信息
            </div>
              <div className="tit">
                基本信息
            </div>
              <Content style={{ margin: '24px 16px', background: '#fff', minHeight: 280 }}>
                <div className="current">
                  <div className="curr">
                    <Tabs onChange={this.tabchange} type="card" style={{ background: 'white' }}>
                      <TabPane tab="无线单表" key="1" style={{ padding: '20px' }}>
                        设备编号:<Input placeholder="请输入无线单表编号" style={{ width: '20%', marginLeft: '10px' }} id="dbnum" />
                        <div style={{ float: "right" }}>
                          <Button type="primary" style={{ marginRight: '20px' }} onClick={this.dbquery}>查询</Button>
                          <Button>重置</Button>
                        </div>
                        <div className="derive">
                          <Icon type="info-circle-o" />
                          &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                            {hasSelected ? `   ${selectedRowKeys.length}  ` : ''}
                          </span>条记录
                          列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num}</span> 条
                          {/* <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button> */}
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <Table
                            rowSelection={rowSelection}
                            dataSource={this.state.data}
                            columns={columns}
                            bordered
                            rowClassName="editable-row"
                          />
                        </div>
                      </TabPane>
                      <TabPane tab="采集器" key="2" style={{ padding: '20px' }}>
                        设备编号:<Input placeholder="请输入采集器编号" style={{ width: '20%', marginLeft: '10px' }} id="cjqnum" />
                        <div style={{ float: "right" }}>
                          <Button type="primary" style={{ marginRight: '20px' }} onClick={this.cjquery}>查询</Button>
                          <Button>重置</Button>
                        </div>
                        <div className="derive">
                          <Icon type="info-circle-o" />
                          &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                            {cjhasSelected ? `   ${cjselectedRowKeys.length}  ` : ''}
                          </span>条记录
                           列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num1}</span> 条
                          <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <Table
                            rowSelection={cjrowSelection}
                            dataSource={this.state.dataSource}
                            columns={column}
                            bordered
                            rowClassName="editable-row"
                          />
                        </div>
                      </TabPane>

                      <TabPane tab="普通水表" key="3" style={{ padding: '20px' }}>
                        设备编号:<Input placeholder="请输入普通水表编号" style={{ width: '20%', marginLeft: '10px' }} id="sbnum" />
                        <div style={{ float: "right" }}>
                          <Button type="primary" style={{ marginRight: '20px' }} onClick={this.sbquery}>查询</Button>
                          <Button>重置</Button>
                        </div>
                        <div className="derive">
                          <Icon type="info-circle-o" />
                          &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                            {sbhasSelected ? `   ${sbselectedRowKeys.length}  ` : ''}
                          </span>条记录
                          列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num2}</span> 条
                          <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <Table
                            rowSelection={sbrowSelection}
                            dataSource={this.state.dataSources}
                            columns={ptcolumn}
                            rowClassName="editable-row"
                          />
                        </div>
                      </TabPane>
                    </Tabs>
                  </div>
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

