import React, { Component } from 'react';
import { Icon, Button, Select, Table, Menu, Input, Layout, Row, Col, Popconfirm, Tabs, Cascader, message, Upload } from 'antd';
import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import { productadd } from '../axios';
import './newadd.css';
import Headers from '../header';


var _val = ""
var accounttype = ['无线单表', '采集器', '普通水表'];
const TabPane = Tabs.TabPane;
const fileList = [];
function callback(key) {
  console.log(key);
}
const dataSource = [];
for (let i = 0; i < 1; i++) {
  dataSource.push({
    type: '',
    model: '',
    networkoperator: '',
    powermenu: JSON.parse(localStorage.getItem('menu')),
    version: '',
  });
}
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;

class newadd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 15,
      collapsed: false,
      size: 'small',
      powermenu: JSON.parse(localStorage.getItem('menu')),
      selectedRowKeys: [],
      dataSource: dataSource,
      usertype: accounttype[0],
      count: 2,
      province: '',
      city: '',
      area: '',
      school: '',
      telchange: '',
      pick: '',
      texture: '',
      specification: '',
      turn: '',
    };
  }

  componentWillMount = () => {
    document.title = "新增设备";


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


  }
  usertypes = (value) => {
    console.log(value)
    this.setState({
      usertype: value,
    });
  }

  telchange = (value) => {
    console.log(value)
    this.setState({
      telchange: value,
    });
  }

  pick = (value) => {
    console.log(value)
    this.setState({
      pick: value,
    });
  }

  texture = (value) => {
    console.log(value)
    this.setState({
      texture: value,
    });
  }

  specification = (value) => {
    console.log(value)
    this.setState({
      specification: value,
    });
  }

  turn = (value) => {
    console.log(value)
    this.setState({
      turn: value,
    });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  out = () => {
    localStorage.clear()
    window.location.href = "/login";
  }



  equipmentsubmit = () => {
    var name = document.getElementById('names').value;
    if (this.state.telchange === "") {
      message.error("请选择通讯方式");
    } else if (this.state.pick === "") {
      message.error("请选择采样方式");
    } else if (this.state.texture === "") {
      message.error("请选择表体材质");
    } else if (this.state.specification === "") {
      message.error("请选择流量规格");
    } else if (this.state.turn === "") {
      message.error("请选择传动方式");
    } else {
      productadd([
        this.state.usertype,
        name,
        this.state.telchange,
        this.state.pick,
        this.state.texture,
        this.state.specification,
        this.state.turn,
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          message.success("设备添加成功");
          setTimeout(() => {
            window.location.href = "/product";
          }, 1000);
        }
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
    const productname = accounttype.map(productnames => <Option key={productnames}>{productnames}</Option>);
    return (
      <div id="newaddbody" >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu
              defaultSelectedKeys={['9']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="9" style={{ background: ' #0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
              信息查询 / 产品信息 / 新增产品
            </div>
            <div className="tit">
              新增产品
            </div>
            <Content style={{ margin: '24px 16px', background: '#fff', minHeight: 280, marginTop: '10px' }}>
              <div className="current">
                <div className="curr">
                  <div className="current_text">
                    <div className='addinput'>
                      <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>产品类别：</span>
                      <Select defaultValue={accounttype[0]} onChange={this.usertypes} style={{ width: '60%' }}>
                        {productname}
                      </Select>
                    </div>
                    <div className='addinput'>
                      <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>产品名称：</span>
                      <Input type="text" placeholder="请输入产品名称" style={{ width: "60%" }} id="names" />
                    </div>
                    <div className='addinput'>
                      <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>通讯方式：</span>
                      <Select
                        className="one"
                        style={{ width: '60%' }}
                        onChange={this.telchange}
                        placeholder="请选择通讯方式"
                      >
                        <Option value="普通表">0-普通表</Option>
                        <Option value="IC卡表">C-IC卡表</Option>
                        <Option value="MBUS表">M-MBUS表</Option>
                        <Option value="LORA表">L-LORA表</Option>
                        <Option value="GPRS表">G-GPRS表</Option>
                        <Option value="NB-IOT表">N-NB-IOT表</Option>
                      </Select>
                    </div>
                    <div className='addinput'>
                      <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>采样方式：</span>
                      <Select
                        className="one"
                        style={{ width: '60%' }}
                        onChange={this.pick}
                        placeholder="请选择采样方式"
                      >
                        <Option value="无">无</Option>
                        <Option value="光电直读">E-光电直读</Option>
                        <Option value="干簧管">P-干簧管</Option>
                        <Option value="霍尔元件">H-霍尔元件</Option>
                        <Option value="电阻式直读">R-电阻式直读</Option>
                        <Option value="电阻式直读">J-霍尔100L</Option>
                      </Select>
                    </div>
                    <div className='addinput'>
                      <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>表体材质：</span>
                      <Select
                        className="one"
                        style={{ width: '60%' }}
                        onChange={this.texture}
                        placeholder="请选择表体材质"
                      >
                        <Option value="铁">S-铁</Option>
                        <Option value="铜">C-铜</Option>
                        <Option value="铝">A-铝</Option>
                      </Select>
                    </div>
                    <div className='addinput'>
                      <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>流量规格：</span>
                      <Select
                        className="one"
                        style={{ width: '60%' }}
                        onChange={this.specification}
                        placeholder="请选择流量规格"
                      >
                        <Option value="G1.6">01-G1.6</Option>
                        <Option value="G2.5">02-G2.5</Option>
                        <Option value="G4.0">04-G4.0</Option>
                        <Option value="G6.0">06-G6.0</Option>
                        <Option value="G10">10-G10</Option>
                        <Option value="G16">16-G16</Option>
                        <Option value="G25">25-G25</Option>
                        <Option value="G40">40-G40</Option>
                        <Option value="DN15">15-DN15</Option>
                        <Option value="DN20">20-DN20</Option>
                        <Option value="DN25">25-DN25</Option>
                        <Option value="DN32">32-DN32</Option>
                        <Option value="DN40">40-DN40</Option>
                      </Select>
                    </div>
                    <div className='addinput'>
                      <span style={{ display: 'inline-block', width: '100px', textAlign: 'right' }}>传动方式：</span>
                      <Select
                        className="one"
                        style={{ width: '60%' }}
                        onChange={this.turn}
                        placeholder="请选择传动方式"
                      >
                        <Option value="磁传动">M-磁传动</Option>
                        <Option value="轴传动">S-轴传动</Option>
                      </Select>
                    </div>
                    <div className="btn">
                      <Button type="primary" style={{ marginRight: '20px' }} onClick={this.equipmentsubmit}>提交</Button>
                      <Button onClick={this.reset}>重置</Button>
                    </div>
                  </div>
                </div>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>

    )
  }
}

export default newadd = createForm()(newadd);

