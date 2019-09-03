import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Form, message, Modal, Table, Checkbox, Input, Row, Col, LocaleProvider } from 'antd';
import { Link } from 'react-router-dom';
import { wireless, commandPlusBatch } from '../axios';
import { createForm } from 'rc-form';
import './wirelesstest.css';
import Headers from '../header';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');



const myDate = new Date();
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      powermenu: JSON.parse(localStorage.getItem('menu')),
      time: myDate,
      enterprisetype: '',
      selected: '',
      selectedRowKey: '',
      checked: '',
      color: "",
      listnum: '',
      command: '',
      infdisabled: true,
      number: true,
      password: true,
      timeinterval: true,
      shake: true,
      huoer: true,
      times: 'none',
      data: [],
      shakes: '',
      huoers: '',
    };
    this.columns = [{
      title: '设备编号',
      dataIndex: 'wirelessNum',
    }, {
      title: '硬件版本',
      dataIndex: 'hardware',
    }, {
      title: '软件版本',
      dataIndex: 'software',
    }, {
      title: '当前电压',
      dataIndex: 'voltage'
    }, {
      title: '当前电压2',
      dataIndex: 'voltage2',
    }, {
      title: '设备状态',
      dataIndex: 'valve',
    }, {
      title: '信号强度',
      dataIndex: 'signalIntensity',
    }, {
      title: '最新上报时间',
      dataIndex: 'reportedDatetime',
    }, {
      title: '上传时间间隔（小时）',
      dataIndex: 'reportingInterval',
    }
    ];
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  onChange = (checkedValues) => {
    this.setState({
      command: checkedValues
    })

    var result1 = checkedValues.some(function (x) {
      return x === '4'
    })
    var result2 = checkedValues.some(function (x) {
      return x === '5'
    })
    var result3 = checkedValues.some(function (x) {
      return x === '6'
    })
    var result4 = checkedValues.some(function (x) {
      return x === '11'
    })
    var result5 = checkedValues.some(function (x) {
      return x === '2'
    })
    var result6 = checkedValues.some(function (x) {
      return x === '3'
    })
    if (result1 === true) {
      this.setState({
        infdisabled: false
      })
    }
    if (result1 === false) {
      this.setState({
        infdisabled: true
      })
    }

    if (result2 === true) {
      this.setState({
        number: false
      })
    }
    if (result2 === false) {
      this.setState({
        number: true
      })
    }

    if (result3 === true) {
      this.setState({
        password: false
      })
    }
    if (result3 === false) {
      this.setState({
        password: true
      })
    }

    if (result4 === true) {
      this.setState({
        timeinterval: false
      })
    }
    if (result4 === false) {
      this.setState({
        timeinterval: true
      })
    }

    if (result5 === true) {
      this.setState({
        shake: false
      })
    }
    if (result5 === false) {
      this.setState({
        shake: true
      })
    }

    if (result6 === true) {
      this.setState({
        huoer: false
      })
    }
    if (result6 === false) {
      this.setState({
        huoer: true
      })
    }
  }



  onChange1 = (checkedValues) => {
    console.log(checkedValues)
    this.setState({
      shakes: checkedValues.join(',')
    })
  }

  onChange2 = (checkedValues) => {
    console.log(checkedValues)
    this.setState({
      huoers: checkedValues.join(',')
    })
  }



  onSelect = (selectedRowKey) => {
    console.log('selectedRowKey changed: ', selectedRowKey);
    console.log(selectedRowKey.join(','))
    this.setState({
      listnum: selectedRowKey.length,
      selectedRowKey,
      keylist: selectedRowKey.join(','),
    });
  }





  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  }


  handleOk = (e) => {
    let remark = document.getElementById('remark').value;
    let infdisabled = document.getElementById('infdisabled').value;
    let password = document.getElementById('password').value;
    let number = document.getElementById('number').value;
    let timeinterval = document.getElementById('timeinterval').value;
    console.log(this.state.command)
    var json = [];
    var obj = {};
    let error = true;
    for (var i = 0; i < this.state.command.length; i++) {
      let obj = {
        type: this.state.command[i],
        param: '',
      }
      json.push(obj)
      if (json[i].type === '2') {
        json[i].param = this.state.shakes
        if (this.state.shakes === "") {
          message.error('请选择震动开关操作')
          error = false;
          break;
        }
      } else
        if (json[i].type === '3') {
          json[i].param = this.state.huoers
          if (this.state.huoers === "") {
            message.error('请选择霍尔开关操作')
            error = false;
            break;
          }
        }
        else
          if (json[i].type === '4') {
            json[i].param = infdisabled;
            if (infdisabled === "") {
              message.error('请输入要修改的预存信息')
              error = false;
              break;
            }
          }
          else
            if (json[i].type === '5') {
              json[i].param = number
              if (number === "") {
                message.error('请输入要修改的表号')
                error = false;
                break;
              }
            }
            else
              if (json[i].type === '6') {
                json[i].param = password
                if (password === "") {
                  message.error('请输入要修改的密钥')
                  error = false;
                  break;
                }
              }
              else
                if (json[i].type === '11') {
                  json[i].param = timeinterval
                  if (timeinterval === "") {
                    message.error('请输入要修改的时间间隔')
                    error = false;
                    break;
                  }
                }
    }
    if (error) {
      if (this.state.listnum === '') {
        message.error('请选择要下发命令的设备')
      } else {
        commandPlusBatch([
          this.state.keylist,
          JSON.stringify(json),
          remark,
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            message.success("命令下发成功");
            this.setState({
              visible: false,
            });
            wireless([

            ]).then(res => {
              if (res.data && res.data.message === 'success') {
                for (var i = 0; i < res.data.data.length; i++) {
                  res.data.data[i].key = res.data.data[i].wirelessNum
                }
                this.setState({
                  data: res.data.data,
                  num: res.data.data.length,
                });
              }
            })
          }
        })


      }
    }


  }

  componentWillMount = () => {
    document.title = "无线单表测试";
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



    wireless([

    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].wirelessNum
        }
        console.log(res.data.data)
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
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
    const { selectedRowKey } = this.state;
    const rowSelect = {
      selectedRowKey,
      onChange: this.onSelect,
    };

    const hasSelected = selectedRowKey.length > 0;

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
          editing: this.isEditing(record)
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
            >
              <div />
              <div className="Layout-left">
                <Menu
                  defaultSelectedKeys={['27']}
                  defaultOpenKeys={['sub9', 'sub10']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <Menu.Item key="23" style={{ background: '#0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
                产品监控 / 产品测试 / 无线单表测试
            </div>
              <div className="tit">
                无线单表测试
            </div>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>
                <div style={{ marginTop: '10px' }}>
                  水表编号:<Input placeholder="请输入水表编号" style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="nbtest" autoComplete="off" />
                  <div style={{ float: "right" }}>
                    <Button type="primary" onClick={this.equipmentquery} style={{ marginRight: '20px' }}>查询单表</Button>
                    <Button type="primary" onClick={this.showModal} style={{ background: 'red', border: 'none', marginRight: '20px' }}>下发命令</Button>
                    <Modal
                      title="下发命令"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      okText="确认"
                    >
                      <div>共选中 <span style={{ color: 'rgb(73, 169, 238)' }}>{hasSelected ? `   ${selectedRowKey.length}  ` : ''}</span> 台设备</div>
                      <div style={{ marginTop: "20px" }}>
                        <span style={{ color: 'red' }}>*</span>

                        下发命令：
                        <Checkbox.Group style={{ width: '100%', lineHeight: '40px' }} onChange={this.onChange} defaultValue="1">
                          <Row>
                            <Col span={24}><Checkbox value="1" checked >查询设备所有信息</Checkbox></Col>
                            <Col span={10}>
                              <Checkbox value="2"  >震动开关：</Checkbox>
                            </Col>
                            <Col span={14}>
                              <Checkbox.Group style={{ width: '100%', lineHeight: '40px' }} onChange={this.onChange1} disabled={this.state.shake}>
                                <Col span={12}>
                                  开<Checkbox value="1" style={{ marginLeft: "20px" }} ></Checkbox>
                                </Col>
                                <Col span={12}>
                                  关<Checkbox value="2" style={{ marginLeft: "20px" }} ></Checkbox>
                                </Col>
                              </Checkbox.Group>
                            </Col>
                            <Col span={10}>
                              <Checkbox value="3"  >霍尔开关：</Checkbox>
                            </Col>
                            <Col span={14}>
                              <Checkbox.Group style={{ width: '100%', lineHeight: '40px' }} onChange={this.onChange2} disabled={this.state.huoer}>
                                <Col span={12}>
                                  开<Checkbox value="1" style={{ marginLeft: "20px" }} ></Checkbox>
                                </Col>
                                <Col span={12}>
                                  关<Checkbox value="2" style={{ marginLeft: "20px" }} ></Checkbox>
                                </Col>
                              </Checkbox.Group>
                            </Col>
                            <Col span={8}><Checkbox value="4">更改预存信息</Checkbox></Col>
                            <Col span={16}>
                              <Input placeholder="请输入预存信息" style={{ width: '100%', marginLeft: '10px', marginRight: '10px', }} id="infdisabled" autoComplete="off" disabled={this.state.infdisabled} />
                            </Col>
                            <Col span={8}><Checkbox value="5">更改表号</Checkbox></Col>
                            <Col span={16}>
                              <Input placeholder="请输入表号" style={{ width: '100%', marginLeft: '10px', marginRight: '10px', }} id="number" autoComplete="off" disabled={this.state.number} />
                            </Col>
                            <Col span={8}><Checkbox value="6">更改密钥</Checkbox></Col>
                            <Col span={16}>
                              <Input placeholder="请输入密钥" style={{ width: '100%', marginLeft: '10px', marginRight: '10px', }} id="password" autoComplete="off" disabled={this.state.password} />
                            </Col>
                            <Col span={24}><Checkbox value="9">开阀</Checkbox></Col>
                            <Col span={24}><Checkbox value="10">关阀</Checkbox></Col>
                            <Col span={8}>
                              <Checkbox value="11">修改时间间隔</Checkbox>
                            </Col>
                            <Col span={16}>
                              <Input placeholder="请输入时间间隔（小时）" style={{ width: '100%', marginLeft: '10px', marginRight: '10px' }} id="timeinterval" autoComplete="off" disabled={this.state.timeinterval} />
                            </Col>
                          </Row>
                        </Checkbox.Group>
                        备注信息：
                        <Input placeholder="请输入备注信息" style={{ width: '100%', marginTop: '10px' }} id="remark" autoComplete="off" />
                      </div>
                    </Modal>
                    <Button type="primary" style={{ background: 'green', border: 'none' }}>
                      <Link to="/testhistory">历史记录</Link>
                    </Button>
                  </div>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <div>
                    查询结果：共
                    <span style={{ color: 'rgb(73, 169, 238)', marginLeft: '10px' }}>{this.state.num}
                    </span> 台设备 当前选中： <span style={{ color: 'rgb(73, 169, 238)' }}>{hasSelected ? `   ${selectedRowKey.length}  ` : ''}</span> 台设备
                  </div>
                  <Table
                    bordered
                    rowSelection={rowSelect}
                    dataSource={this.state.data}
                    columns={columns}
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

