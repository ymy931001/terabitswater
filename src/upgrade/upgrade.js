import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Form, message, Modal, Table, Checkbox, Input, Row, Upload, LocaleProvider } from 'antd';
import { Link } from 'react-router-dom';
import { wireless, sendorder, finalversion } from '../axios';
import { createForm } from 'rc-form';
import './upgrade.css';
import Headers from '../header';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const props = {
  name: 'file',
  action: "http://47.110.136.32:9333/upload",
  beforeUpload: file => {
    const fileName = file.name.split(".");
    const isBin = fileName[1] === "bin";
    if (!isBin) {
      message.error("只能上传bin文件");
    }
    // const isTrue = /^00_0[1-2][0-9]{2}$/.test(fileName[0]);
    // if (!isTrue) {
    //   message.error("文件名不合规范");
    // }
    // return isBin && isTrue;
    return isBin
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 升级文件上传成功`);
      finalversion([

      ]).then(res => {
        this.setState({
          vision: res.data
        });
      })
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 升级文件上传失败`);
    }
  },
}


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
      selectedRowKeys: '',
      checked: '',
      color: "",
      listnum: '',
      command: '',
      times: 'none',
      data: [],
      shakes: '',
      huoers: '',
    };
    this.columns = [{
      title: '设备编号',
      dataIndex: 'wirelessNum',
      sorter: (a, b) => a.wirelessNum.slice(-5) - b.wirelessNum.slice(-5),
      // filtered: true,
      // filters: [
      //   { text: "0-100", value: [0, 100] },
      //   { text: "100-200", value: [100, 200] },
      //   { text: "200-300", value: [200, 300] },
      // ],
      // onFilter: (value, record) => record.wirelessNum.slice(-4) <= value[1] && value[0] <= record.wirelessNum.slice(-4),
    },
    {
      title: '软件版本',
      dataIndex: 'software',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.software - b.software,
    }, {
      title: '信号强度',
      dataIndex: "signalIntensity",
    },
    {
      title: '模组开启前电压',
      dataIndex: 'voltage'
    }, {
      title: '模组开启后电压',
      dataIndex: 'voltage2',
    }, {
      title: '阀门状态',
      dataIndex: 'valve',
      filtered: true,
      filters: [
        { text: "开阀", value: "0" },
        { text: "关阀", value: "1" },
        { text: "半悬", value: "2" },
        { text: "非阀控", value: "3" },
      ],
      onFilter: (value, record) => record.valve.includes(value),
      render: (text) => {
        if (text === '0') {
          return (
            <div>
              <span style={{ color: 'green' }}>开阀</span>
            </div>
          )
        }
        if (text === '1') {
          return (
            <div>
              <span style={{ color: 'red' }}>关阀</span>
            </div>
          )
        }
        if (text === '2') {
          return (
            <div>
              <span style={{ color: 'purple' }}>半悬</span>
            </div>
          )
        }
        if (text === '3') {
          return (
            <div>
              <span style={{ color: 'black' }}>非阀控</span>
            </div>
          )
        }
      }
    }
      // , {
      //   title: '升级进度',
      //   dataIndex: 'valve',
      //   render: (text) => {
      //     return (
      //       <div>
      //         <Progress percent={30} />
      //         {/* <Progress percent={50} status="active" /> */}
      //       </div>
      //     )
      //   }
      // }
      , {
      title: '最新上报时间',
      dataIndex: 'reportedDatetime',
    }
    ];
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }



  onSelect = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(selectedRowKeys.join(','))
    this.setState({
      listnum: selectedRowKeys.length,
      selectedRowKeys,
      keylist: selectedRowKeys.join(','),
    });
  }

  handleOk = () => {
    const upgradename = document.getElementById('upgradename').value;
    sendorder([
      this.state.keylist,
      upgradename,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        message.success('升级指令下发成功')
        this.setState({
          equvisible: false,
        });
      }
    })
  }





  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      equvisible: false,
    });
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  showequiement = () => {
    this.setState({
      equvisible: true,
    });
  }

  equipmentquery = () => {
    var nbtest = document.getElementById('nbtest').value
    var min = document.getElementById('min').value
    var max = document.getElementById('max').value
    if ((min === '' && max === "") || (min != '' && max != "")) {
      wireless([
        nbtest,
        '',
        '',
        '',
        '',
        '',
        '',
        min,
        max,
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].key = res.data.data[i].wirelessNum
          }
          console.log(res.data.data)
          this.setState({
            data: res.data.data,
            datas: res.data.data,
            num: res.data.data.length,
          });
        }
      })
    } else {
      message.error("请输入正确搜索范围")
    }

  }

  wirequery = (e) => {
    var nbtest = document.getElementById('nbtest').value
    if (e.keyCode === 13) {
      wireless([
        nbtest
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].key = res.data.data[i].wirelessNum
          }
          this.setState({
            data: res.data.data,
            datas: res.data.data,
            num: res.data.data.length,
          });
        }

      })
    }

  }


  componentWillMount = () => {
    document.title = "设备升级";
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
          datas: res.data.data,
          num: res.data.data.length,
        });
      }

    })

    finalversion([

    ]).then(res => {
      this.setState({
        vision: res.data
      });
    })

  }

  onSelectAll = () => {
    if (this.state.selectedRowKeys.length === 0) {
      this.setState({
        selectedRowKeys: this.state.datas.map((data, i) => data.key),
      },function(){
        console.log(this.state.selectedRowKeys)
      });
    } else {
      this.setState({
        selectedRowKeys: [],
      });
    }
  }


  listonChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter);
    console.log(extra)
    this.setState({
      num: extra.currentDataSource.length,
      datas: extra.currentDataSource,
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
    const { selectedRowKeys} = this.state;
    const rowSelect = {
      selectedRowKeys,
      onChange: this.onSelect,
      onSelectAll: this.onSelectAll,
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
                  defaultSelectedKeys={['63']}
                  defaultOpenKeys={['sub2',]}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <Menu.Item key="23" style={{ background: '#0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
                设备管理 /  设备升级
            </div>
              <div className="tit">
                设备升级
            </div>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>
                <div style={{ marginTop: '10px' }}>
                  水表编号:<Input placeholder="请输入水表编号" onKeyDown={this.wirequery} style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="nbtest" autoComplete="off" />
                  <Input placeholder="最小值" style={{ width: '100px', marginLeft: '10px', marginRight: '10px' }} id="min" autoComplete="off" />~
                  <Input placeholder="最大值" style={{ width: '100px', marginLeft: '10px', marginRight: '10px' }} id="max" autoComplete="off" />
                  <Button type="primary" onClick={this.equipmentquery} style={{ marginRight: '20px' }}>查询</Button>
                  <div style={{ float: "right" }}>
                    <Button
                      type="primary"
                      style={{ background: 'red', border: 'none', marginRight: '20px' }}
                      icon="arrow-up"
                      onClick={this.showequiement}>
                      设备升级
                    </Button>
                    <Modal
                      title="设备升级"
                      width="400px"
                      visible={this.state.equvisible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      okText="确认"
                    >
                      <div>共选中 <span style={{ color: 'rgb(73, 169, 238)' }}>{hasSelected ? `   ${selectedRowKeys.length}  ` : '0'}</span> 台设备</div>
                      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <span style={{ color: 'red', marginRight: '5px' }}>*</span>
                        <span>升级名称：</span>
                      </div>
                      <Input placeholder="请输入升级名称" style={{ width: '100%', marginBottom: '10px' }} id="upgradename" autoComplete="off" />
                    </Modal>
                    <Button type="primary" style={{ background: 'green', border: 'none', marginRight: '20px' }}>
                      <Link to="/upgradehistory">升级历史记录</Link>
                    </Button>
                    <Upload {...props}>
                      <Button>
                        <Icon type="upload" /> 上传升级文件
                        </Button>
                    </Upload>
                  </div>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <div style={{ marginBottom: '10px' }}>
                    查询结果：共
                    <span style={{ color: 'rgb(73, 169, 238)', marginLeft: '10px' }}>{this.state.num}
                    </span> 台设备 当前选中： <span style={{ color: 'rgb(73, 169, 238)' }}>{hasSelected ? `   ${selectedRowKeys.length}  ` : ''}</span> 台设备&nbsp;&nbsp;&nbsp;
                     最新版本：   <span style={{ color: 'rgb(73, 169, 238)' }}>{this.state.vision}</span>
                  </div>
                  <Table
                    bordered
                    rowSelection={rowSelect}
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    onChange={this.listonChange}
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

