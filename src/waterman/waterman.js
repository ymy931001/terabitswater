import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Input, Select, Table, Popconfirm, message, Modal } from 'antd';
import { waterMerchant, getall } from '../axios';
import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import './waterman.css';
import Headers from '../header';

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      keylist: "",
      provinceid: '',
      cityid: '',
      areaid: '',
      selectedRowKeys: [],
      powermenu: JSON.parse(localStorage.getItem('menu')),

    };
    this.columns = [{
      title: '水务商名称',
      dataIndex: 'name',
    }, {
      title: '详细地址',
      dataIndex: 'district_detail',
    }, {
      title: '设备总数量(台)',
      dataIndex: '设备总数量',
    }, {
      title: '已安装设备数量(台)',
      dataIndex: '已安装设备数量',
    }, {
      title: '负责人信息',
      dataIndex: 'id',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.showModal(text)}
          >详情</a>
          <Modal
            title="联系方式"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
          >
            <p>姓名:&nbsp;&nbsp;{this.state.name}</p>
            <p>电话:&nbsp;&nbsp;{this.state.phone}</p>
            <p>邮箱:&nbsp;&nbsp;{this.state.email}</p>
          </Modal>
        </div>
    }, {
      title: '服务器信息',
      dataIndex: 'server',
    },
    ];
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  onChange = (date, dateString) => {
    console.log(dateString)
    let arr = [];
    for (var i in dateString) {
      arr.push(dateString[i].label);
    }
    if (arr[1] === undefined) {
      this.setState({
        province: arr[0],
        city: '',
        area: '',
        provinceid: dateString[0].id,
      })
    } else {
      if (arr[2] === undefined) {
        this.setState({
          province: arr[0],
          city: arr[1],
          area: '',
          provinceid: dateString[0].id,
          cityid: dateString[1].id,
        })
      } else {
        if (arr[3] === undefined) {
          this.setState({
            province: arr[0],
            city: arr[1],
            area: arr[2],
            provinceid: dateString[0].id,
            cityid: dateString[1].id,
            areaid: dateString[2].id,
          });
        };
      }
    }

  }


  handleOk = (e) => {
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
  showModal = (text) => {
    for (var i = 0; i < this.state.dataSource.length; i++) {
      if (this.state.dataSource[i].id === text) {
        this.setState({
          visible: true,
          name: this.state.dataSource[i].linkman,
          phone: this.state.dataSource[i].phone,
          email: this.state.dataSource[i].email,
        });
      }
    }
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(selectedRowKeys.length)
    this.setState({
      selectedRowKeys,
      keylist: selectedRowKeys,
    });
  }

  watermanquery = () => {
    var watername = document.getElementById('watername').value;
    waterMerchant([
      watername,
      '',
      '',
      '',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          dataSource: res.data.data,
          num: res.data.data.length,
        });
      }
    });
  }

  watermanreset = () => {
    document.getElementById('watername').value = '',
      waterMerchant([
        ''
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].key = res.data.data[i].id
          }
          this.setState({
            dataSource: res.data.data,
            num: res.data.data.length,
          });
        }
      });
  }
  componentWillMount = () => {
    document.title = "水务商";


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

    getall([

    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          allarea: res.data.data,
        });
      }
    });

    waterMerchant([
      '',
      '',
      '',
      '',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        console.log(res.data.data)
        this.setState({
          dataSource: res.data.data,
          num: res.data.data.length,
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
      <div id="watermanbody" >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div />
            <div className="Layout-left">
              <Menu
                defaultSelectedKeys={['14']}
                defaultOpenKeys={['sub3']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                <Menu.Item key="6" style={{ background: '#0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
                  <Icon type="windows" />
                  <span>水表管理平台</span>
                  </Menu.Item>
                  <Menu.Item>
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
              用户管理 / 水务商
            </div>
            <div className="tit">
              水务商
            </div>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>
              {/* 位置选择：
              <Cascader
                value={[this.state.province, this.state.city, this.state.area, this.state.school]}
                changeOnSelect options={options} onChange={this.onChange}
                style={{ display: 'inline-block', width: '30%', textAlign: 'left' }}
              /> */}
              水务商名称：<Input placeholder="输入水务商名称：" style={{ width: '20%', marginLeft: '10px', marginRight: '40px' }} id="watername" />
              <div style={{ float: "right" }}>
                <Button type="primary" style={{ marginRight: '20px' }} onClick={this.watermanquery}>查询</Button>
                <Button onClick={this.watermanreset}>重置</Button>
                <Button type="primary" style={{ marginLeft: '20px' }}><Link to="/lookchargeman">查看区域主管</Link></Button>
                <Button type="primary" style={{ marginLeft: '20px' }}><Link to="/addwaterman">添加水务商</Link></Button>
                <Button type="danger" style={{ marginLeft: '20px', color: 'white', background: 'red', border: 'none' }}><Link to="/addchargeman">添加区域主管</Link></Button>
              </div>
              <div className="derive">
                <Icon type="info-circle-o" />
                &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                  {hasSelected ? `${selectedRowKeys.length}` : ''}
                </span> 条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num}</span> 条
                {/* <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button> */}
              </div>
              <div style={{ marginTop: '10px' }}>
                <Table
                  rowSelection={rowSelection}
                  dataSource={this.state.dataSource}
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

