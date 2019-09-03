import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Input, Select, Table, Popconfirm, message, Modal } from 'antd';
import {getheader, addheader, deleteheader } from '../axios';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createForm } from 'rc-form';
import './waterheader.css';
import Headers from '../header';

const Option = Select.Option;

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;

class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selectedRowKeys: [],
      powermenu: JSON.parse(localStorage.getItem('menu')),
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  out = () => {
    window.location.href = "/login";
    localStorage.clear();
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(selectedRowKeys.length)
    this.setState({ selectedRowKeys });
  }
  onDelete = (text, key) => {
    console.log(text)
    deleteheader([
      text,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        message.success("信息删除成功");
        const dataSource = [...this.state.datas];
        this.setState({
          num: this.state.num - 1,
          datas: dataSource.filter(item => item.key !== key),
        });
        getheader([
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            this.setState({
              datas: res.data.data,
              num: res.data.data.length,
            });
          }
        });
      }
    });
  }

  equipmentquery = () => {
    const productname = document.getElementById('productid').value;
        getheader([
          productname,
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            this.setState({
              datas: res.data.data,
              num: res.data.data.length,
            });
          }
    });
  }

  componentWillMount = () => {
    console.log(localStorage.getItem('menu'))
    document.title = "表头信息列表";
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

    getheader([
     
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        this.setState({
          datas: res.data.data,
          num: res.data.data.length,
        });
      }
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }


  handleOk = (e) => {
    let headerCode = document.getElementById('headerCode').value;
    let headerRemark = document.getElementById('headerRemark').value;
    let modelType = document.getElementById('modelType').value;
    let batteryType = document.getElementById('batteryType').value;
    if (headerCode === "") {
      message.error('表头代码');
    } else if (headerRemark === "") {
      message.error('请输入表头说明');
    } else if (modelType === "") {
      message.error('请输入模组类型');
    } else if (batteryType === "") {
      message.error('请输入电池型号');
    } else {
      addheader([
        headerCode,
        headerRemark,
        modelType,
        batteryType,
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          message.success("设备添加成功");
          getheader([
          ]).then(res => {
            if (res.data && res.data.message === 'success') {
              console.log(res.data.data)
              this.setState({
                datas: res.data.data,
                num: res.data.data.length,
              });
            }
          });

        }
      });
      this.setState({
        visible: false,
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

    this.columns = [{
      title: '表头代码',
      dataIndex: 'headerCode',
    }, {
      title: '表头说明',
      dataIndex: 'headerRemark',
    }, {
      title: '模组型号',
      dataIndex: 'modelType',
    }, {
      title: '电池型号',
      dataIndex: 'batteryType',
    }, {
      title: '创建时间',
      dataIndex: 'gmtcreate',
    }, {
      title: '操作',
      dataIndex: 'id',
      render: (text, record, index) => {
        return (
          <div>
            <span style={{ marginLeft: '10px' }}>
              <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(text)}>
                <a href="javascript:;">删除</a>
              </Popconfirm>
            </span>
          </div>
        );
      },
    },
    ];
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
          editing: this.isEditing(record),
        }),
      };
    });
    return (
      <div id="productbody" >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div />
            <div className="Layout-left">
              <Menu
                defaultSelectedKeys={['68']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                {/* <img src="http://home.terabits.cn/%E9%92%9B%E6%AF%94logo.png" alt=""  style={{width:'100%'}}/> */}
                <Menu.Item key="1" style={{ background: '#0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
              信息查询 / 表头信息
            </div>
            <div className="tit">
              表头信息
            </div>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>
              表头代码:<Input placeholder="请输入表头代码" style={{ width: '20%', marginLeft: '10px' }} id="productid" />
              <Button type="primary" style={{ marginLeft: '20px' }} onClick={this.equipmentquery}>查询</Button>
              <div style={{ float: "right" }}>

                {/* <Button onClick={this.reset}>重置</Button> */}
                <Button type="primary" style={{ marginLeft: '20px' }} onClick={this.showModal}>添加表头</Button>
              </div>
              <div className="derive">
                <Icon type="info-circle-o" />
                &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                  {hasSelected ? `   ${selectedRowKeys.length}  ` : ''}
                </span>   条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num}</span> 条
                {/* <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button> */}
              </div>
              <div style={{ marginTop: '10px' }}>
                <Modal
                  title="添加表头信息"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  okText="确认"
                  cancelText="取消"
                  mask={false}
                  destroyOnClose
                >
                  表头代码：<Input placeholder="请输入表头代码" style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} id="headerCode" />
                  表头说明：<Input placeholder="请输入表头说明" style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} id="headerRemark" />
                  模组型号：<Input placeholder="请输入模组型号" style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} id="modelType" />
                  电池型号：<Input placeholder="请输入电池型号" style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} id="batteryType" />
                </Modal>
                <Table
                  rowSelection={rowSelection}
                  dataSource={this.state.datas}
                  columns={columns}
                  bordered
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

