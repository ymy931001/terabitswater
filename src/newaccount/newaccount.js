import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, message, Select, Input } from 'antd';
import { Link } from 'react-router-dom';
import { simpleuser, useradd } from '../axios';
import moment from 'moment';
import { createForm } from 'rc-form';
import './newaccount.css';
import Headers from '../header';





const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      usertype: '',
      accounttype: [],
      size: 'default',
      powermenu: JSON.parse(localStorage.getItem('menu')),
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleChange = (value) => {
    console.log(`Selected: ${value}`);
    this.setState({
      usertype: value.join(','),
    }, function () {
      console.log(this.state.usertype)
    });

  }

  submit = () => {
    let phone = document.getElementById('phone_num').value;
    let nameval = document.getElementById('name_val').value;
    let useremail = document.getElementById('useremail').value;
    let username = document.getElementById('username').value;
    let userpassword = document.getElementById('userpassword').value;
    var telrule = /^[1][3,4,5,7,8][0-9]{9}$/;
    var namerule = /^[\u4E00-\u9FA5A-Za-z]+$/;
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    this.props.form.validateFields({ force: true }, (error, fieldsValue) => {
      if (!namerule.test(nameval)) {
        message.error('请输入您的真实姓名');
        return;
      } else if (!telrule.test(phone)) {
        message.error('您输入的手机号码不合法');
        return;
      } else if (!filter.test(useremail)) {
        message.error('请输入正确的邮箱格式');
        return;
      } else if (username === "") {
        message.error('请输入用户名');
        return;
      } else if (userpassword === "") {
        message.error('请输入用户密码');
        return;
      } else if (!error) {
        useradd([
          username,
          userpassword,
          nameval,
          phone,
          useremail,
          this.state.usertype
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            message.success('账号创建成功');
            setTimeout(() => {
              window.location.href = "/account";
            }, 1000);
          } else {
            message.error('账号创建失败');
          }
        });
      } else {
        message.error('账号创建失败');
      }
    });
  }


  componentWillMount = () => {
    document.title = "添加账户";



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


    simpleuser([]).then(res => {
      if (res.data && res.data.message === 'success') {
        let arr = []
        for (var i = 0; i < res.data.data.length; i++) {
          arr.push(res.data.data[i])
        }
        this.setState({
          accounttype: arr,
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
    const { size } = this.state;
    console.log(this.state.accounttype)
    const account = this.state.accounttype.map((province) => <Option key={province.id}>{province.name}</Option>);
    // const account =[{ name: "管理员", id: 1 },{ name: "超级管理员", id: 2 },{ name: "用户", id: 3 },{ name: "程序员", id: 31 },{ name: "仓库管理员", id: 36 }].map(accounts => <Option key={accounts.id}>{accounts.name}</Option>);
    return (
      <div id="newaccounts" >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div />
            <div className="Layout-left">
              <Menu
                defaultSelectedKeys={['15']}
                defaultOpenKeys={['sub3']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                <Menu.Item key="15" style={{ background: ' #0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
              用户管理 / 账户管理 / 添加账户
            </div>
            <div className="tit">
              添加账户
            </div>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <div className="current">
                <div className="current_text">
                  <div className="explain">
                    <div>
                      <span style={{ color: '#000000' }}>尊敬的 </span>
                      <span style={{ color: "#1890FF" }}> {localStorage.getItem('name')}</span>
                      <span style={{ color: "#000000" }}> 你好，依据平台设定，您具有以下账号管理权限：</span>
                    </div>
                    <div className='explaintext'>
                      1.创建水表厂 <span style={{ color: "#1890FF" }}>管理员</span> ，以添加他们获得设备基本信息、设备状态信息，设备生命周期。
                  他们将具有登录平台使用完整的<span style={{ color: "#1890FF" }}> 信息查询</span> 模块、
                  完整的 <span style={{ color: "#1890FF" }}>设备管理</span> 模块、完整的 <span style={{ color: "#1890FF" }}>用户管理</span> 模块、部分的
                  <span style={{ color: "#1890FF" }}>产品监控</span> 模块的权限，
                  产品监控员可以使用产品监控的 <span style={{ color: "#1890FF" }}>出厂测试</span> 功能、
                  <span style={{ color: "#1890FF" }}>出库，发货</span> 功能，超级管理员与产品监控员在平台上的所有操作将计入 <span style={{ color: "#1890FF" }}>系统日志</span>。
                  </div>
                  </div>
                  <div className="content">
                    <div className='addinput'>
                      <span>账户类型：</span>
                      <Select
                        mode="tags"
                        size={size}
                        style={{ width: '60%' }}
                        placeholder="请选择账户类型"
                        onChange={this.handleChange}
                      // onChange={this.usertypes}
                      >
                        {account}
                      </Select>
                    </div>
                    <div className='addinput'>
                      <span>姓名：</span>
                      <Input placeholder="张三" id="name_val"
                        placeholder="请输入姓名"
                        style={{ width: '60%' }}
                      />
                    </div>
                    <div className='addinput'>
                      <span>手机：</span>
                      <Input placeholder="123745758" style={{ width: '60%' }}
                        id="phone_num"
                        placeholder="请输入您的手机号"
                      />
                    </div>
                    <div className='addinput'>
                      <span>邮箱：</span>
                      <Input placeholder="1234567890@qq.com"
                        id="useremail"
                        placeholder="请输入邮箱"
                        style={{ width: '60%' }}
                      />
                    </div>
                    <div className='addinput'>
                      <span>用户名：</span>
                      <Input placeholder="aaa"
                        placeholder="请输入用户名"
                        id="username"
                        style={{ width: '60%' }}
                      />
                    </div>
                    <div className='addinput'>
                      <span>初始密码：</span>
                      <Input placeholder="123456"
                        id="userpassword"
                        placeholder="请输入密码"
                        style={{ width: '60%' }}
                      />
                    </div>
                    {/* <div className='addtextarea'>
                      备注：
                        <TextArea rows={4} style={{ marginTop: '20px' }} id="remake"
                        placeholder="请输入备注（选填）"
                      />
                    </div> */}
                    <div className="btn">
                      <Button type="primary" style={{ marginRight: '20px' }} onClick={this.submit}>提交</Button>
                      <Button><a href="">重置</a></Button>
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
export default journal = createForm()(journal);

