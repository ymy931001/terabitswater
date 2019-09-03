import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Cascader, Select, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { addchargewater, getall, addtenement, getcommunity } from '../axios';
import moment from 'moment';
import { createForm } from 'rc-form';
import './addtenement.css';
import Headers from '../header';



const { TextArea } = Input;
const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;



class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      // country: '全国',
      province: '',
      powermenu: JSON.parse(localStorage.getItem('menu')),
      watermanarrs: [],
      communityId: '',
      city: '',
      area: '',
      provinceid: '',
      cityid: '',
      areaid: '',
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  typeChange = (date, dateString) => {
    console.log(date, dateString)
    this.setState({
      communityId: date,
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
        province: '',
        city: '',
        area: '',
      })
    } else {
      if (arr[2] === undefined) {
        this.setState({
          province: arr[1],
          city: '',
          area: '',
          provinceid: dateString[1].id,
        })
      } else {
        if (arr[3] === undefined) {
          this.setState({
            province: arr[1],
            city: arr[2],
            area: '',
            provinceid: dateString[1].id,
            cityid: dateString[2].id,
          })
        } else {
          this.setState({
            province: arr[1],
            city: arr[2],
            area: arr[3],
            provinceid: dateString[1].id,
            cityid: dateString[2].id,
            areaid: dateString[3].id,
          });
        }
      }
    }


  }



  addtenement = () => {
    let doorplate = document.getElementById('doorplate').value;
    let usernumber = document.getElementById('usernumber').value;
    let tenementname = document.getElementById('tenementname').value;
    let tenementphone = document.getElementById('tenementphone').value;
    let tenementwater = document.getElementById('tenementwater').value;
    let remark = document.getElementById('remark').value;
    var telrule = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (doorplate === "") {
      message.error("请输入门牌号");
    } else if (usernumber === "") {
      message.error("请输入住户编号");
    } else if (this.state.communityId === "") {
      message.error("请选择所属小区");
    } else if (tenementname === "") {
      message.error('请输入住户姓名');
    } else if (!telrule.test(tenementphone)) {
      message.error('您输入的手机号码不合法');
    } else {
      addtenement([
        doorplate,
        this.state.communityId,
        tenementname,
        tenementphone,
        tenementwater,
        remark,
        usernumber,
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          message.success("用户添加成功");
          setTimeout(() => {
            window.location.href = "/tenement";
          }, 1000);
        }
        if (res.data.code === 21) {
          message.error("此设备不存在或者已经安装过")
        }
      });
    }
  }





  componentWillMount = () => {
    document.title = "添加小区";


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


    getcommunity([

    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        let arr = []
        for (var i = 0; i < res.data.data.length; i++) {
          arr.push({
            'name': res.data.data[i].communityName,
            'id': res.data.data[i].id,
          })
        }
        this.setState({
          watermanarrs: arr,
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
    const provinceOptions = this.state.watermanarrs.map((province, id) => <Option key={province.id}>{province.name}</Option>);
    return (
      <div id="newaccountbody" >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div />
            <div className="Layout-left">
              <Menu
                defaultSelectedKeys={['67']}
                defaultOpenKeys={['sub4']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                <Menu.Item key="14" style={{ background: '#0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
              用水管理 / 住户管理 / 添加住户
            </div>
            <div className="tit">
              添加住户
            </div>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <div className="current">
                <div className="current_text">
                  <div className="content">
                    <div className='addinput'>
                      <span>住户门牌：</span>
                      <Input placeholder="请输入住户门牌" id="doorplate" style={{ width: '60%' }} autoComplete="off" />
                    </div>
                    <div className='addinput'>
                      <span>住户编号：</span>
                      <Input placeholder="请输入住户编号" id="usernumber" style={{ width: '60%' }} autoComplete="off" />
                    </div>
                    <div className='addinput'>
                      <span>所属小区：</span>
                      <Select
                        className="one"
                        onChange={this.typeChange}
                        style={{ width: '60%' }}
                        defaultValue={provinceOptions[0]}
                        placeholder="请选择小区"
                      >
                        {provinceOptions}
                      </Select>
                    </div>
                    <div className='addinput'>
                      <span>住户姓名：</span>
                      <Input style={{ width: '60%' }}
                        id="tenementname"
                        placeholder="请输入住户姓名"
                      />
                    </div>
                    <div className='addinput'>
                      <span>联系方式：</span>
                      <Input style={{ width: '60%' }}
                        id="tenementphone"
                        placeholder="请输入住户联系方式"
                      />
                    </div>
                    <div className='addinput'>
                      <span>水表编号（选填）：</span>
                      <Input style={{ width: '60%' }}
                        id="tenementwater"
                        placeholder="请输入住户所用水表"
                      />
                    </div>
                    <div className='addtextarea'>
                      <TextArea rows={4} id="remark"
                        placeholder="请输入备注（选填）"
                      />
                    </div>
                    <div className="btn">
                      <Button type="primary" style={{ marginRight: '20px' }} onClick={this.addtenement}>提交</Button>
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

