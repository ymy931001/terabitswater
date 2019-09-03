import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Cascader, Select, Table, message, Input } from 'antd';
import { Link } from 'react-router-dom';
import { standard, StockOutAssistant, simplewater, productadds } from '../axios';
import { createForm } from 'rc-form';
import './instorage.css';
import Headers from '../header';


const myDate = new Date();



var time = new Date();
var year = time.getFullYear();
var month = time.getMonth() + 1;
var day = time.getDate();

const Option = Select.Option;
const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      watermanarrs: [],
      time: myDate,
      consignee: '',
      phone: '',
      begintime: year + '-' + month + '-' + day,
      address: "",
      userid: [],
      powermenu: JSON.parse(localStorage.getItem('menu')),
      userids: "",
      standard: [],
      standards: '',
      productnum: ''
    };
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  focus = (key) => {
    console.log(key)
  }
  focusNextInput = (e) => {
    var inputs = document.getElementsByClassName("productid");
    if (e.keyCode === 13) {
      if (parseInt(document.activeElement.id) === 0) {
        inputs[1].focus();
      }
      else if (parseInt(document.activeElement.id) === 1) {
        inputs[2].focus();
      }
      else if (parseInt(document.activeElement.id) === 2) {
        inputs[3].focus();
      }
      else if (parseInt(document.activeElement.id) === 3) {
        inputs[4].focus();
      }
      else if (parseInt(document.activeElement.id) === 4) {
        inputs[5].focus();
      }
      else if (parseInt(document.activeElement.id) === 5) {
        inputs[6].focus();
      }
      else if (parseInt(document.activeElement.id) === 6) {
        inputs[7].focus();
      }
      else if (parseInt(document.activeElement.id) === 7) {
        inputs[8].focus();
      }
      else if (parseInt(document.activeElement.id) === 8) {
        inputs[9].focus();
      }
      else if (parseInt(document.activeElement.id) === 9) {
        inputs[10].focus();
      }
      else if (parseInt(document.activeElement.id) === 10) {
        inputs[11].focus();
      }
      else if (parseInt(document.activeElement.id) === 11) {
        inputs[11].blur();
      }
    }
  }
  // print = () => {
  //   if (this.state.userids === "") {
  //     message.error('请选择检验员编号')
  //   } else if (this.state.standards === "") {
  //     message.error('请选择规格型号')
  //   } else if (this.state.isConformity === "") {
  //     message.error('请选择检测结果')
  //   } else if (this.state.box === "") {
  //     message.error('请输入箱号')
  //   } else if (this.state.consignee === "") {
  //     message.error('请输入收货人姓名')
  //   } else if (this.state.phone === "") {
  //     message.error('请输入收货人电话')
  //   } else if (this.state.phone === "") {
  //     message.error('请选择收货地址')
  //   } else if (this.state.newarrs === "") {
  //     message.error('请输入设备编号')
  //   } else {
  //     document.querySelector('#print2').style.display = 'none'
  //     document.querySelector('#main1').style.display = 'block'
  //     document.querySelector('#main').style.display = 'block'
  //     window.print()
  //     document.querySelector('#print2').style.display = 'block'
  //     document.querySelector('#main').style.display = 'none'
  //     document.querySelector('#main1').style.display = 'none'
  //   }
  // }

  // prints = () => {
  //   document.querySelector('#print2').style.display = 'none'
  //   document.querySelector('#main').style.display = 'none'
  //   document.querySelector('#main1').style.display = 'block'
  //   window.print()
  //   document.querySelector('#print2').style.display = 'block'
  //   document.querySelector('#main').style.display = 'none'
  //   document.querySelector('#main1').style.display = 'none'
  // }



  product = (e) => {
    var productid = document.getElementsByClassName('productid');
    console.log(productid)
    console.log(e.target.value)
    var productnums = 0;
    var newarr = [];
    for (var i = 0; i < productid.length; i++) {
      if (productid[i].value != null && productid[i].value != "") {
        productnums = productnums + 1;
        newarr.push(productid[i].value + '')
      }
    }
    console.log(productnums, newarr)
    this.setState({
      productnum: productnums,
      newarrs: newarr,
    });
  }

  typeChange = (date, dateString) => {
    console.log(dateString.props.children)
    this.setState({
      watermanename: dateString.props.children,
      waterMerchantId: date,
    });
  }

  standardChange = (date, dateString) => {
    console.log(date, dateString)
    this.setState({
      standards: date,
    });
  }

  useridChange = (date, dateString) => {
    console.log(date, dateString)
    this.setState({
      userids: date,
    });
  }

  usernamechange = (e) => {
    this.setState({
      consignee: e.target.value,
    });
  }

  blurs = () => {
    var inputs = document.getElementsByClassName("productid");
    inputs[0].blur();
    inputs[1].blur();
    inputs[2].blur();
    inputs[3].blur();
    inputs[4].blur();
    inputs[5].blur();
    inputs[6].blur();
    inputs[7].blur();
    inputs[8].blur();
    inputs[9].blur();
    inputs[10].blur();
    inputs[11].blur();
  }

  passchange = (date, dateString) => {
    console.log(date, dateString)
    this.setState({
      isConformity: date,
    });
  }
  phonechange = (e) => {
    this.setState({
      phone: e.target.value,
    });
  }

  equipmentquery = (e) => {

    if (this.state.box === "") {
      message.error('请输入箱号')
    } else if (this.state.consignee === "") {
      message.error('请输入收货人姓名')
    } else if (this.state.phone === "") {
      message.error('请输入收货人电话')
    } else if (this.state.phone === "") {
      message.error('请选择收货地址')
    } else if (this.state.newarrs === "") {
      message.error('请输入设备编号')
    } else {
      this.setState({
        disabled:true
      })
      productadds([
        this.state.box,
        this.state.productnum,
        this.state.consignee,
        this.state.phone,
        this.state.waterMerchantId,
        this.state.newarrs.join(','),
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          message.success('出库完成')
          setTimeout(() => {
            window.location.href = '/instorage';
          }, 1000);
        }
      });
    }
  }


  boxchange = (e) => {
    this.setState({
      box: e.target.value,
    });
  }

  telblur = () => {
    var telrule = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!telrule.test(this.state.phone)) {
      message.error('请输入正确的电话号码')
      // document.getElementById('telfocus').focus();
    }

  }
  nameblur = () => {
    var namerule = /^[\u4E00-\u9FA5A-Za-z]+$/;
    if (!namerule.test(this.state.consignee)) {
      message.error('请输入正确的中文姓名')
      // document.getElementById('namefocus').focus();
    }


  }



  componentWillMount = () => {
    document.title = "产品出库";

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




    simplewater([]).then(res => {
      if (res.data && res.data.message === 'success') {
        let arr = []
        for (var i = 0; i < res.data.data.length; i++) {
          arr.push(res.data.data[i])
        }
        this.setState({
          watermanarrs: arr,
        });
      }
    });




    standard([
      '',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        let newarr = []
        for (var i = 0; i < res.data.data.length; i++) {
          newarr.push(res.data.data[i])
        }
        this.setState({
          standard: newarr,
        });
      }
    });


    StockOutAssistant([
      '',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        let arr = []
        for (var i = 0; i < res.data.data.length; i++) {
          arr.push(res.data.data[i])
        }
        this.setState({
          userid: arr,
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
    const userids = this.state.userid.map((province, id) => <Option key={province.user_id}>{province.user_id}</Option>);
    // const standards = this.state.standard.map((province, id) => <Option key={province.model}>{province.model}</Option>);
    const provinceOptions = this.state.watermanarrs.map((province, id) => <Option key={province.id}>{province.name}</Option>);
    return (
      <div id="historytbody" >
        <div style={{ position: 'fixed', left: '400px', zIndex: '99', textAlign: 'center', top: "0px", fontSize: '15px', width: '110px', height: '75px', display: "none", background: 'white', border: '1px solid black' }} id="main1">
          <div style={{ width: '25px', float: 'left', fontWeight: 'bold' }}>
            <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>合</span>
            <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>格</span>
            <span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>证</span>
          </div>
          <div style={{ fontSize: '12px', textAlign: 'left' }}>
            <div style={{ height: '18px' }}>{this.state.standards}</div>
            <div style={{ height: '18px' }}>{this.state.box}</div>
            <div style={{ height: '18px' }}>{this.state.begintime}</div>
            <div style={{ height: '18px' }}>检验员：{this.state.userids}</div>
          </div>
        </div>
        <div style={{ position: 'fixed', left: '0px', zIndex: '-1', textAlign: 'center', top: "0px", fontSize: '15px', display: "none" }} id="main">
          <span style={{ fontSize: '19px', fontWeight: 'bold', width: "360px", textAlign: 'center', display: 'inline-block' }}>装箱发货单</span>
          <div style={{ width: '360px', height: '300px' }}>
            <table border="1" align="center">
              <tr>
                <td width="80px" height="35px" style={{ textAlign: 'center' }}>规格型号</td>
                <td width="100px" style={{ textAlign: 'center' }}>{this.state.standards}</td>
                <td width="80px" style={{ textAlign: 'center' }}>检验员</td>
                <td width="100px" style={{ textAlign: 'center' }}>{this.state.userids}</td>
              </tr>
              <tr>
                <td colSpan="4" height="100px">
                  <div style={{ float: 'left', height: "100px", width: '50px', textAlign: 'center' }}>表号</div> {this.state.newarrs}
                </td>
              </tr>
              <tr>
                <td colSpan="4" height="60px">
                  <div style={{ width: '100%', textAlign: 'left' }}>
                    &nbsp;&nbsp;配件（每只表含）
                </div>
                  <div style={{ textAlign: 'center' }}>
                    接管&nbsp;&nbsp;&nbsp;2只&nbsp;&nbsp;&nbsp;螺母&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2只
                </div>
                  <div style={{ textAlign: 'center' }}>
                    胶垫&nbsp;&nbsp;&nbsp;2只&nbsp;&nbsp;&nbsp;说明书&nbsp;&nbsp; 1份
                </div>
                </td>
              </tr>
              <tr>
                <td height="35px" style={{ textAlign: 'center' }}>收货人</td>
                <td colSpan="3" style={{ textAlign: 'center' }}>{this.state.consignee}&nbsp;&nbsp;&nbsp;{this.state.phone}</td>
              </tr>
              <tr>
                <td height="35px" style={{ textAlign: 'center' }}>目的地</td>
                <td colSpan="3" style={{ textAlign: 'center' }}>{this.state.watermanename}</td>
              </tr>
              <tr>
                <td height="35px" style={{ textAlign: 'center' }}>总件数</td>
                <td style={{ textAlign: 'center' }}>{this.state.productnum}</td>
                <td style={{ textAlign: 'center' }}>日期</td>
                <td style={{ textAlign: 'center' }}>{this.state.begintime}</td>
              </tr>
            </table>
            <div style={{ fontSize: "15px" }}>
              <span style={{ float: 'left' }}>箱号：</span> {this.state.box}  <span style={{ float: 'right' }}>扬州恒信仪表有限公司</span>
            </div>
          </div>
        </div>
        <div id="print2">
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div />
              <div className="Layout-left">
                <Menu
                  defaultSelectedKeys={['28']}
                  defaultOpenKeys={['sub9']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <Menu.Item key="17" style={{ background: ' #0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
                产品监控 / 产品出库
            </div>
              <div className="tit">
                产品出库
            </div>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }} >

                <div style={{ width: "100%", textAlign: 'center', fontWeight: 'bold', fontSize: '20px', color: 'black' }}>扫码信息</div>
                <div style={{ width: '100%', minHeight: '400px', margin: '0 auto', marginTop: '20px' }}>
                  {/* <div style={{ width: '80%', margin: '0 auto' }}>
                    <span>规格型号：</span>
                    <Select
                      className="one"
                      onChange={this.standardChange}
                      style={{ width: '20%', marginRight: '20px' }}
                      placeholder="请选择规格型号"
                    >
                      {standards}
                    </Select>
                    <span>检验员编号：</span>
                    <Select
                      className="one"
                      onChange={this.useridChange}
                      style={{ width: '20%', marginRight: '20px' }}
                      placeholder="请选择检验员"
                    >
                      {userids}
                    </Select>
                    <Select
                      className="one"
                      onChange={this.passchange}
                      style={{ width: '20%' }}
                      placeholder="请选择检测结果"
                    >
                      <Option value="合格">合格</Option>
                      <Option value="不合格">不合格</Option>
                    </Select>
                  </div> */}
                  <table border="1" style={{ width: '80%', margin: '0 auto', marginTop: "20px" }}>
                    <tr>
                      <td>
                        <Input type="text" style={{ border: 'none', outline: 'none' }} className="productid" onChange={this.product} id='0'
                          onKeyDown={this.focusNextInput}
                        />
                      </td>
                      <td>
                        <Input type="text" id='1' style={{ border: 'none', outline: 'none' }} className="productid" onChange={this.product} onKeyDown={this.focusNextInput} />
                      </td>
                      <td>
                        <Input type="text" style={{ border: 'none', outline: 'none' }} className="productid" onChange={this.product} onKeyDown={this.focusNextInput} id='2' />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Input type="text" style={{ border: 'none', outline: 'none' }} className="productid" onChange={this.product} id='3' onKeyDown={this.focusNextInput} />
                      </td>
                      <td>
                        <Input type="text" style={{ border: 'none', outline: 'none' }} className="productid" onChange={this.product} id='4' onKeyDown={this.focusNextInput} />
                      </td>
                      <td>
                        <Input type="text" style={{ border: 'none', outline: 'none' }} className="productid" onChange={this.product} id='5' onKeyDown={this.focusNextInput} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Input type="text" style={{ border: 'none', outline: 'none' }} className="productid" onChange={this.product} id='6' onKeyDown={this.focusNextInput} />
                      </td>
                      <td>
                        <Input type="text" style={{ border: 'none', outline: 'none' }} className="productid" onChange={this.product} id='7' onKeyDown={this.focusNextInput} />
                      </td>
                      <td>
                        <Input type="text" style={{ border: 'none', outline: 'none' }} className="productid" onChange={this.product} id='8' onKeyDown={this.focusNextInput} />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Input type="text" style={{ border: 'none', outline: 'none' }} className="productid" onChange={this.product} id='9' onKeyDown={this.focusNextInput} />
                      </td>
                      <td>
                        <Input type="text" style={{ border: 'none', outline: 'none' }} className="productid" onChange={this.product} id='10' onKeyDown={this.focusNextInput} />
                      </td>
                      <td>
                        <Input type="text" style={{ border: 'none', outline: 'none' }} className="productid" onChange={this.product} id='11' onKeyDown={this.focusNextInput} />
                      </td>
                    </tr>
                  </table>
                  <div>
                    <span style={{ display: 'inline-block', width: '20%', textAlign: 'right' }}>收货人姓名：</span>
                    <Input type="text" style={{ width: '25%', marginTop: '20px', marginBottom: '20px' }} onChange={this.usernamechange} onBlur={this.nameblur} id="namefocus" />
                    <span style={{ display: 'inline-block', width: '20%', textAlign: 'right' }}>总件数：</span>
                    <Input type="text" style={{ width: '25%', marginBottom: '20px' }} value={this.state.productnum} />
                  </div>
                  <div>
                    <span style={{ display: 'inline-block', width: '20%', textAlign: 'right' }}>收货人电话：</span>
                    <Input type="text" style={{ width: '25%', marginBottom: '20px' }} onChange={this.phonechange} onBlur={this.telblur} id="telfocus" />
                    <span style={{ display: 'inline-block', width: '20%', textAlign: 'right' }}>箱号：</span>
                    <Input type="text" style={{ width: '25%', marginBottom: '20px' }} onChange={this.boxchange} />
                  </div>
                  <div>
                    <span style={{ display: 'inline-block', width: '20%', textAlign: 'right' }}>收货地址：</span>
                    <Select
                      className="one"
                      onChange={this.typeChange}
                      style={{ width: '25%' }}
                      placeholder="请选择水务商"
                    >
                      {provinceOptions}
                    </Select>
                  </div>
                </div>
                {/* <div style={{ width: '90%', textAlign: 'right' }}>
                  <Button type="primary" style={{ marginRight: '20px', marginTop: '20px' }} onClick={this.prints} id="prints">打印合格证</Button>
                  <Button type="primary" style={{ marginRight: '20px', marginTop: '20px' }} onClick={this.print} id="print">打印临时</Button>
                  <Button type="primary" style={{ marginTop: '20px', background: 'red', border: 'none' }} onClick={this.blurs}>停止检测</Button>
                </div> */}

                <div style={{ width: '80%', margin: '0 auto' }}>
                  <Button type="primary" style={{ float: 'right', marginTop: '20px' }}  disabled={this.state.disabled}  onClick={this.equipmentquery}>提交</Button>
                </div>

              </Content>
            </Layout>
          </Layout>
        </div>
      </div>
    )
  }
}
export default journal = createForm()(journal);

