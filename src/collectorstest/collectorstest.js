import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, message, Tooltip, Table, DatePicker, Input, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import { collectorTest, generalTest, joinResult, initialize, initializeResult, joinBatch } from '../axios';
import './collectorstest.css';
import Headers from '../header';

const valvestatus = {
  0: "开阀",
  1: '关阀',
  2: '半悬',
};

const myDate = new Date();
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      time: myDate,
      display11: 'block',
      data1: '',
      data2: '',
      data3: '',
      data4: '',
      numlist: 0,
      numlist1: 0,
      numlist2: 0,
      numlist3: 0,
      disabled1: false,
      disabled2: false,
      disabled3: false,
      initializedisabled: false,
      disabled4: false,
      powermenu: JSON.parse(localStorage.getItem('menu')),
    };

    this.watercolumns = [{
      title: '水表编号',
      dataIndex: 'general_num',
      width: '33%',
    }, {
      title: '测试结果',
      dataIndex: 'statusMsg',
      width: '34%',
      render: (text, record) => {
        if (record.statusMsg === "成功") {
          return (
            <div style={{ color: 'green' }} >
              <Tooltip placement="topLeft" title={"电压:" + JSON.parse(record.detail).valvestate + "V" + ",用水量:" + JSON.parse(record.detail).water + "t"}>
                {text}
              </Tooltip>
            </div >
          )

        } if (record.statusMsg === "错误") {
          return (
            <div style={{ color: 'red' }}>
              <Tooltip placement="topLeft" title={"水表读取失败"}>
                {text}
              </Tooltip>
            </div >
          )
        }
        if (record.statusMsg === undefined) {
          return (
            <div style={{ color: 'red' }}>
              <Tooltip placement="topLeft" title={"没有找到对应数据"}>
                失败
              </Tooltip>
            </div >
          )
        }
        else {
          return (
            <div style={{ color: '#333' }}>
              {text}
            </div>
          )
        }

      }
    }, {
      title: '操作',
      dataIndex: 'id',
      width: '33%',
      render: (text, record) => {
        if (record.statusMsg === "错误" || record.statusMsg === "超时" || record.statusMsg === "未响应") {
          return (
            <div >
              <Popconfirm title="确定要重新开始挂载吗" onConfirm={() => this.restart(text, record)} disabled={true}>
                <div style={{ color: 'blue', display: this.state.display11 }} disabled={true}>重新挂载</div>
              </Popconfirm>
            </div>
          )
        } else {
          return (
            <div>

            </div>
          )
        }

      }
    }
    ];
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  restart = (text, record) => {
    var collectorsnum = document.getElementById('collectorsnum').value;
    joinBatch([
      record.general_num,
      collectorsnum,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        message.success('下发成功')
        // record.statusMsg==="等待中"
      } else {
        message.error('下发失败')
      }
    });
  }

  // reset1 = (text, record) => {
  //   joinResult([
  //     record.general_num
  //   ]).then(res => {
  //     if (res.data.message === 'success') {
  //       if (res.data.data.status === 0 || res.data.data.status === 3 || res.data.data.status === 4 || res.data.data.status === 5) {
  //         if (res.data.data.status === 3) {
  //           record.result =
  //             res.data.data.statusMsg + ':' + '用水量:' +
  //             JSON.parse(res.data.data.detail).water + 't,' + '阀门状态:' +
  //             valvestatus[JSON.parse(res.data.data.detail).valvestate],
  //             this.setState({
  //               disabled1: false,
  //               disabled11: false,
  //               disabled2: false,
  //               disabled22: false,
  //               disabled3: false,
  //               disabled33: false,
  //               initializedisabled: false,
  //               disabled4: false,
  //               disabled44: false,
  //               display11: 'block',
  //             });
  //         } else {
  //           clearInterval(this.reset2)
  //           record.result = res.data.data.statusMsg
  //           this.setState({
  //             data1: this.state.data1,
  //             data2: this.state.data2,
  //             data3: this.state.data3,
  //             data4: this.state.data4,
  //             display11: 'block',
  //             disabled1: false,
  //             disabled11: false,
  //             disabled2: false,
  //             disabled22: false,
  //             disabled3: false,
  //             disabled33: false,
  //             initializedisabled: false,
  //             disabled4: false,
  //             disabled44: false,
  //           });
  //         }

  //       } else {
  //         record.result = "等待中"
  //         clearInterval(this.reset2)
  //         this.reset2 = setInterval(() => this.reset1(text, record), 5000);
  //         this.setState({
  //           data1: this.state.data1,
  //           data2: this.state.data2,
  //           data3: this.state.data3,
  //           data4: this.state.data4,
  //         });
  //       }
  //     } else {
  //       clearInterval(this.reset2)
  //       record.result = "错误"
  //       this.setState({
  //         data1: this.state.data1,
  //         data2: this.state.data2,
  //         data3: this.state.data3,
  //         data4: this.state.data4,
  //         display11: 'block',
  //         disabled1: false,
  //         disabled11: false,
  //         disabled2: false,
  //         disabled22: false,
  //         disabled3: false,
  //         disabled33: false,
  //         initializedisabled: false,
  //         disabled4: false,
  //         disabled44: false,
  //       });
  //     }
  //   })
  // }



  tick() {
    var arrr1 = []
    for (var i = 0; i < this.state.data1.length; i++) {
      arrr1.push(this.state.data1[i].general_num)
    }
    joinResult([
      arrr1.join(',')
    ]).then(res => {
      if (res.data.message === 'success') {
        this.setState({
          data1: res.data.data,
        })
      } else {

      }
    })
  }




  tick2() {
    var arrr2 = []
    for (var i = 0; i < this.state.data2.length; i++) {
      arrr2.push(this.state.data2[i].general_num)
    }
    joinResult([
      arrr2.join(',')
    ]).then(res => {
      if (res.data.message === 'success') {
        this.setState({
          data2: res.data.data,
        })
      } else {

      }
    })
  }




  tick3() {
    var arrr3 = []
    for (var i = 0; i < this.state.data3.length; i++) {
      arrr3.push(this.state.data3[i].general_num)
    }
    joinResult([
      arrr3.join(',')
    ]).then(res => {
      if (res.data.message === 'success') {
        console.log(res.data.data[0])
        this.setState({
          data3: res.data.data,
        })
      } else {

      }
    })
  }

  tick4() {
    var arrr4 = []
    for (var i = 0; i < this.state.data4.length; i++) {
      arrr4.push(this.state.data4[i].general_num)
    }
    joinResult([
      arrr4.join(',')
    ]).then(res => {
      if (res.data.message === 'success') {
        this.setState({
          data4: res.data.data,
        })
      } else {

      }
    })
  }


  initialize1() {
    var collectorsnum = document.getElementById('collectorsnum').value;
    initializeResult([
      collectorsnum
    ]).then(res => {
      if (res.data.message === 'success') {
        message.success('初始化成功')
        generalTest().then(res => {
          if (res.data && res.data.message === 'success') {
            for (var i = 0; i < res.data.length; i++) {
              res.data.data[i].statusMsg = ""
            }
            let arr1 = [];
            for (var i = 0; i < 60; i++) {
              arr1.push(res.data.data[i])
            }
            this.setState({
              data1: arr1,
            });
            let arr2 = [];
            for (var i = 60; i < 120; i++) {
              arr2.push(res.data.data[i])
            }
            this.setState({
              data2: arr2,
            });
            let arr3 = [];
            for (var i = 120; i < 180; i++) {
              arr3.push(res.data.data[i])
            }
            this.setState({
              data3: arr3,
            });
            let arr4 = [];
            for (var i = 180; i < 240; i++) {
              arr4.push(res.data.data[i])
            }
            this.setState({
              data4: arr4,
            });
          }
        });
        this.setState({
          disabled1: false,
          disabled11: false,
          disabled2: false,
          disabled22: false,
          disabled3: false,
          disabled33: false,
          initializedisabled: false,
          disabled4: false,
          disabled44: false,
          display11: 'inline-block',
          numlist: 0,
          numlist1: 0,
          numlist2: 0,
          numlist3: 0,
        });
        clearInterval(this.initialize)
      } else {
        this.initialize = setInterval(() => this.initialize1(), 5000);
      }
    })
  }




  initialize = () => {
    var collectorsnum = document.getElementById('collectorsnum').value;
    initialize([
      collectorsnum
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        message.success('初始化下发中');
        this.setState({
          disabled1: true,
          disabled11: true,
          disabled2: true,
          disabled22: true,
          disabled3: true,
          disabled33: true,
          initializedisabled: true,
          disabled4: true,
          disabled44: true,
          display11: 'none',
        });
        this.initialize = setInterval(() => this.initialize1(), 5000);
      } else {
        message.error(res.data.message);
      }
    });
  }


  mountresult1 = () => {
    this.tick()
  }

  mountresult2 = () => {
    this.tick2()
  }

  mountresult3 = () => {
    this.tick3()
  }

  mountresult4 = () => {
    this.tick4()
  }

  mount1 = () => {
    this.setState({
      numlist: 0,
    });
    generalTest().then(res => {
      if (res.data && res.data.message === 'success') {
        let arr1 = [];
        let arr1num = [];
        for (var i = 0; i < 60; i++) {
          arr1.push(res.data.data[i])
          arr1num.push(res.data.data[i].general_num)
        }
        this.setState({
          data1: arr1,
        }, function () {
          var collectorsnum = document.getElementById('collectorsnum').value;
          joinBatch([
            arr1num.join(','),
            collectorsnum,
          ]).then(res => {
            if (res.data.message === 'success') {
              message.success('下发中，结果请点击查询按钮')
            } else {
              message.error("挂载失败:" + res.data.message)
            }
          });
        });
      }
    });
  }



  mount2 = () => {
    this.setState({
      numlist1: 0,
    });
    generalTest().then(res => {
      if (res.data && res.data.message === 'success') {
        let arr2 = [];
        let arr2num = [];
        for (var i = 60; i < 120; i++) {
          arr2.push(res.data.data[i])
        }
        for (var i = 0; i < 60; i++) {
          arr2num.push(arr2[i].general_num)
        }
        this.setState({
          data2: arr2,
        }, function () {
          var collectorsnum = document.getElementById('collectorsnum').value;
          joinBatch([
            arr2num.join(','),
            collectorsnum,
          ]).then(res => {
            if (res.data.message === 'success') {
              message.success('下发中，结果请点击查询按钮')
            } else {
              message.error("挂载失败:" + res.data.message)
            }
          });
        });
      }
    });
  }



  mount3 = () => {
    this.setState({
      numlist2: 0,
    });
    generalTest().then(res => {
      if (res.data && res.data.message === 'success') {
        let arr3 = [];
        let arr3num = [];
        for (var i = 120; i < 180; i++) {
          arr3.push(res.data.data[i])
        }
        for (var i = 0; i < 60; i++) {
          arr3num.push(arr3[i].general_num)
        }
        this.setState({
          data3: arr3,
        }, function () {
          var collectorsnum = document.getElementById('collectorsnum').value;
          joinBatch([
            arr3num.join(','),
            collectorsnum,
          ]).then(res => {
            if (res.data.message === 'success') {
              message.success('下发中，结果请点击查询按钮')
            } else {
              message.error("挂载失败:" + res.data.message)
            }
          });
        });
      }
    });
  }



  mount4 = () => {
    this.setState({
      numlist3: 0,
    });
    generalTest().then(res => {
      if (res.data && res.data.message === 'success') {
        let arr4 = [];
        let arr4num = [];
        for (var i = 180; i < 240; i++) {
          arr4.push(res.data.data[i])
        }
        for (var i = 0; i < 60; i++) {
          arr4num.push(arr4[i].general_num)
        }
        this.setState({
          data4: arr4,
        }, function () {
          var collectorsnum = document.getElementById('collectorsnum').value;
          joinBatch([
            arr4num.join(','),
            collectorsnum,
          ]).then(res => {
            if (res.data.message === 'success') {
              message.success('下发中，结果请点击查询按钮')
            } else {
              message.error("挂载失败:" + res.data.message)
            }
          });
        });
      }
    });
  }
  componentWillMount = () => {
    document.title = "采集器测试";

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



    generalTest().then(res => {
      if (res.data && res.data.message === 'success') {
        let arr1 = [];
        for (var i = 0; i < 60; i++) {
          arr1.push(res.data.data[i])
        }
        this.setState({
          data1: arr1,
        });
        let arr2 = [];
        for (var i = 60; i < 120; i++) {
          arr2.push(res.data.data[i])
        }
        this.setState({
          data2: arr2,
        });
        let arr3 = [];
        for (var i = 120; i < 180; i++) {
          arr3.push(res.data.data[i])
        }
        this.setState({
          data3: arr3,
        });
        let arr4 = [];
        for (var i = 180; i < 240; i++) {
          arr4.push(res.data.data[i])
        }
        this.setState({
          data4: arr4,
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

    const watercolumns = this.watercolumns.map((col) => {
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
                defaultSelectedKeys={['26']}
                defaultOpenKeys={['sub8', 'sub9']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                <Menu.Item key="26" style={{ background: ' #0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
              产品监控 / 产品测试 / 采集器测试
            </div>
            <div className="tit">
              采集器测试
            </div>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>
              <div style={{ marginTop: '10px' }}>
                采集器编号:<Input placeholder="请输入采集器编号" style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="collectorsnum" />
                <Popconfirm title="请确认是否需要初始化" onConfirm={this.initialize}>
                  <Button type="danger" style={{ color: 'white', background: 'red', border: 'none' }} disabled={this.state.initializedisabled} >
                    初始化
                    </Button>
                </Popconfirm>
              </div>
              <div style={{ marginTop: '10px', width: '24%', float: 'left', marginRight: '1%' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <Popconfirm title="确定要重新开始挂载吗" onConfirm={this.mount1}>
                    <Button type="primary" style={{ marginBottom: '10px', marginRight: '20px' }} disabled={this.state.disabled1}>挂载一</Button>
                  </Popconfirm>
                  <Button type="primary" onClick={this.mountresult1} style={{ marginBottom: '10px', background: 'green', border: 'none' }}
                    disabled={this.state.disabled11}>结果查询</Button>
                </div>
                <Table
                  className="testable"
                  dataSource={this.state.data1}
                  columns={watercolumns}
                  rowClassName="editable-row"
                  scroll={{ y: 500 }}
                  pagination={false}
                />
              </div>
              <div style={{ marginTop: '10px', width: '24%', float: 'left', marginRight: '1%' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <Popconfirm title="确定要重新开始挂载吗" onConfirm={this.mount2}>
                    <Button type="primary" style={{ marginBottom: '10px', marginRight: '20px' }} disabled={this.state.disabled2}>挂载二</Button>
                  </Popconfirm>
                  <Button type="primary" onClick={this.mountresult2} style={{ marginBottom: '10px', background: 'green', border: 'none' }}
                    disabled={this.state.disabled22}>结果查询</Button>
                </div>
                <Table
                  className="testable"
                  dataSource={this.state.data2}
                  columns={watercolumns}
                  rowClassName="editable-row"
                  scroll={{ y: 500 }}
                  pagination={false}
                />
              </div>
              <div style={{ marginTop: '10px', width: '24%', float: 'left', marginRight: '1%' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <Popconfirm title="确定要重新开始挂载吗" onConfirm={this.mount3}>
                    <Button type="primary" style={{ marginBottom: '10px', marginRight: '20px' }} disabled={this.state.disabled3}>挂载三</Button>
                  </Popconfirm>
                  <Button type="primary" onClick={this.mountresult3} style={{ marginBottom: '10px', background: 'green', border: 'none' }}
                    disabled={this.state.disabled33}>结果查询</Button>
                </div>
                <Table
                  className="testable"
                  dataSource={this.state.data3}
                  columns={watercolumns}
                  rowClassName="editable-row"
                  scroll={{ y: 500 }}
                  pagination={false}
                />
              </div>
              <div style={{ marginTop: '10px', width: '25%', float: 'left' }}>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <Popconfirm title="确定要重新开始挂载吗" onConfirm={this.mount4}>
                    <Button type="primary" style={{ marginBottom: '10px', marginRight: '20px' }} disabled={this.state.disabled4}>挂载四</Button>
                  </Popconfirm>
                  <Button type="primary" onClick={this.mountresult4} style={{ marginBottom: '10px', background: 'green', border: 'none' }}
                    disabled={this.state.disabled44}>结果查询</Button>
                </div>
                <Table
                  className="testable"
                  dataSource={this.state.data4}
                  columns={watercolumns}
                  rowClassName="editable-row"
                  scroll={{ y: 500 }}
                  pagination={false}
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

