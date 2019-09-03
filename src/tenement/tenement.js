import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, message, Popconfirm, Select, Table, LocaleProvider, Input, Form, InputNumber, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { gettenement, getcommunity, deletetenement, getHistoryReading, getdeviceWireless, updatetenement } from '../axios';
import { createForm } from 'rc-form';
import './tenement.css';
import Headers from '../header';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Option = Select.Option;

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;




class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selectedRowKeys: [],
      selectedRows: [],
      communityId: "",
      powermenu: JSON.parse(localStorage.getItem('menu')),
      watermanarrs: [],
      readouts: [{
        title: '设备编号',
        dataIndex: 'deviceNum',
      }, {
        title: '时间',
        dataIndex: 'date',
      }, {
        title: '读数',
        dataIndex: 'reading',
      }, {
        title: '上报原因',
        dataIndex: 'upr',
      }],

    };

  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }



  equipmentquery = () => {
    var order = document.getElementById('order').value;
    var usernumber = document.getElementById('usernumber').value;

    gettenement([
      order,
      this.state.communityId,
      usernumber
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
        });
      }
    });
  }

  handleCancel = () => {
    this.setState({
      watervisible: false,
      historyvisible: false,
    });
  }


  //获取历史读数（无线单表）
  state = { historyvisible: false }
  showhistory = (text, record, index) => {
    getHistoryReading([
      text,
      '1',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          readout: res.data.data,
          historyvisible: true,
        });
      }
    });
  }

  //修改水表
  state = { watervisible: false }
  changewater = (text, record, index) => {
    if (record.deviceNum === null || record.deviceNum === "") {
      this.setState({
        original: '暂无',
        chanegresult: "",
        watervisible: true,
        deviceNumid: record.id,
        communityName: record.id,
        address: record.address,
      });
    } else {
      this.setState({
        original: record.deviceNum,
        watervisible: true,
        chanegresult: "",
        deviceNumid: record.id,
        communityName: record.id,
        address: record.address,
      });
    }
  }

  changeOk = () => {

    var watermeter = document.getElementById('watermeter').value;
    if (watermeter === "") {
      message.error('请输入水表号')
    } else {
      updatetenement([
        this.state.deviceNumid,
        this.state.communityName,
        this.state.address,
        watermeter
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          message.success('水表修改成功')
          this.setState({
            watervisible: false,
          })
          gettenement([
          ]).then(res => {
            if (res.data && res.data.message === 'success') {
              this.setState({
                data: res.data.data,
                num: res.data.data.length,
              });
            }
          });
        }
      });
    }
  }

  waterblur = () => {
    var watermeter = document.getElementById('watermeter').value;
    getdeviceWireless([
      watermeter
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          chanegresult: '√ 水表可添加',
          color: 'green',
          results: false,
        });
      } else {
        if (res.data && res.data.message === '水表不存在') {
          this.setState({
            chanegresult: '× 水表不存在',
            color: 'red',
            results: true,
          });
        }
        if (res.data && res.data.message === '水表已被使用') {
          this.setState({
            chanegresult: '× 水表已被使用',
            color: 'red',
            results: true,
          });
        }
      }

    });
  }


  reset = () => {
    document.getElementById('order').value = '';
    gettenement([
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
        });
      }
    });
  }








  componentWillMount = () => {
    document.title = "住户管理";
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



    gettenement([
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        if (res.data.data === "查询住户基本信息为空") {
          this.setState({
            data: [],
            num: 0,
          });
        } else {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].key = res.data.data[i].id
          }
          this.setState({
            data: res.data.data,
            num: res.data.data.length,
          });
        }
      }
    });

    getcommunity([

    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        if (res.data.data === "查询小区基本信息为空") {
          this.setState({
            data: [],
            num: 0,
          });
        } else {
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

      }
    });
  }


  onDelete = (text, record, index) => {
    console.log(record.id)
    deletetenement([
      record.id,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        message.success("用户删除成功");
        const dataSource = [...this.state.data];
        this.setState({
          data: dataSource.filter(item => item.id !== record.id),
        }, function () {
          this.setState({
            num: this.state.data.length,
          })
        });
      }
    });
  }

  isEditing = (record) => {
    return record.id === this.state.editingKey

  };
  edit(key, text) {
    this.setState({
      editingKey: text
    });
  }

  cancel = () => {
    this.setState({ editingKey: '' });
  };



  onSelectAll = () => {
    if (this.state.selectedRowKeys.length === 0) {
      this.setState({
        selectedRowKeys: this.state.data.map((data, i) => data.key),
        selectedRows: this.state.data.map((data, i) => data)
      }, function () {
        console.log(this.state.selectedRowKeys)
        this.setState({
          export1: 'http://47.110.136.32:8040/resourcemanager/water/manage/tenement/export?access_token=' + localStorage.getItem('access_token') + "&ids=" + this.state.selectedRowKeys.join(',')
        })
      });
    } else {
      this.setState({
        selectedRowKeys: [],
        selectedRows: []
      });
    }
  }



  onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({
      selectedRowKeys,
      selectedRows,
    }, function () {
      console.log()
      if (this.state.selectedRowKeys.join(',') === '') {
        this.setState({
          export1: '#'
        })
      } else {
        this.setState({
          export1: 'http://47.110.136.32:8040/resourcemanager/water/manage/tenement/export?access_token=' + localStorage.getItem('access_token') + "&ids=" + this.state.selectedRowKeys.join(',')
        })
      }
    });
  };
  typeChange = (date, dateString) => {
    console.log(date, dateString)
    this.setState({
      communityId: date,
    });
  }

  dataout = () => {
    if (this.state.export1 === "#") {
      message.error("请选择要导出的数据");
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
    const provinceOptions = this.state.watermanarrs.map((province, id) => <Option key={province.id}>{province.name}</Option>);


    const columns = [{
      title: '小区名',
      dataIndex: 'communityName',
      editable: true,
    }, {
      title: '住户门牌号',
      dataIndex: 'houseAddress',
      editable: true,
    }, {
      title: '住户编号',
      dataIndex: 'houseNum',
      editable: true,
    }, {
      title: '住户姓名',
      dataIndex: 'ownerName',
    }, {
      title: '联系方式',
      dataIndex: 'phone',
    }, {
      title: '水表编号',
      dataIndex: 'deviceNum',
      editable: true,
      render: (text) => {
        if (text === '') {
          return (
            <div>
              <span style={{ color: 'red' }}>暂无水表</span>
            </div>
          )
        } else {
          return (
            <div>
              {text}
            </div>
          )
        }
      }
    }, {
      title: '最新读数',
      dataIndex: 'readingLatest',
      render: (text) => {
        if (text === '' || text === null) {
          return (
            <div>
              <span style={{ color: 'red' }}>暂无</span>
            </div>
          )
        } else {
          return (
            <div>
              {text}
            </div>
          )
        }
      }
    }, {
      title: '昨日用水',
      dataIndex: 'readingYesterday',
      sorter: (a, b) => a.readingYesterday - b.readingYesterday,
      render: (text) => {
        if (text === '' || text === undefined || text === null || text === '0.0') {
          return (
            <div>
              <span >0.00</span>
            </div>
          )
        } else {
          return (
            <div>
              <span>{text}</span>
            </div>
          )
        }
      }
    }, {
      title: '本月用水',
      dataIndex: 'monthSupply',
      sorter: (a, b) => a.readingYesterday - b.readingYesterday,
    }, {
      title: '历史读数',
      dataIndex: 'deviceNum',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.showhistory(text, record, index)}
          >详情</a>
        </div>
    }, {
      title: '备注信息',
      dataIndex: 'remark',
    }, {
      title: '修改水表',
      dataIndex: 'deviceNum',
      render: (text, record, index) => {
        return (
          <div>
            <a onClick={() => this.changewater(text, record, index)}
            >添加/修改</a>
          </div>
        )
      }
    }, {
      title: '添加时间',
      dataIndex: 'gmtcreate',
    }, {
      title: '操作',
      dataIndex: 'id',
      render: (text, record, index) => {
        return (
          <div>
            <span style={{ marginLeft: '10px' }}>
              <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(text, record, index)}>
                <a>删除</a>
              </Popconfirm>
            </span>
          </div>
        );
      }
    }
    ];


    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelectAll: this.onSelectAll,
      // selections: [
      //   {
      //     key: "all-data",
      //     text: "选择所有设备",
      //     onSelect: () => {
      //       console.log(this.state.data)
      //       this.setState({
      //         selectedRowKeys: this.state.data.map((data, i) => data.key),
      //         selectedRows: this.state.data.map((data, i) => data)
      //       }, function () {
      //         console.log(this.state.selectedRowKeys)
      //         this.setState({
      //           export1: 'http://47.110.136.32:8040/resourcemanager/water/manage/tenement/export?access_token=' + localStorage.getItem('access_token') + "&ids=" + this.state.selectedRowKeys.join(',')
      //         })
      //       });
      //     }
      //   },
      //   {
      //     key: "all-close",
      //     text: "清空所有选择",
      //     onSelect: () => {
      //       this.setState({
      //         selectedRowKeys: [],
      //         selectedRows: []
      //       });
      //     }
      //   }
      // ]
    };



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
                  defaultSelectedKeys={['67']}
                  defaultOpenKeys={['sub4']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <Menu.Item key="30" style={{ background: ' #0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
                用水管理 / 住户管理
            </div>
              <div className="tit">
                住户管理
            </div>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>
                <div style={{ marginTop: '10px' }}>
                  住户门牌号:<Input placeholder="请输入住户门牌号" style={{ width: '200px', marginLeft: '10px', marginRight: '10px' }} id="order" />
                  所属小区&nbsp;: &nbsp;&nbsp;
                  <Select
                    className="one"
                    onChange={this.typeChange}
                    style={{ width: '200px', marginRight: "10px" }}
                    placeholder="请选择小区"
                  >
                    {provinceOptions}
                  </Select>
                  住户编号:<Input placeholder="请输入住户编号" style={{ width: '200px', marginLeft: '10px', marginRight: '10px' }} id="usernumber" />
                  <Button type="primary" style={{ marginRight: '20px', marginLeft: "20px" }} onClick={this.equipmentquery}>查询</Button>
                  <Button style={{ zIndex: 99, }} onClick={this.reset}>重置</Button>
                  <div style={{ float: "right" }}>
                    <Button type="danger" style={{ marginLeft: '20px', color: 'white', background: 'red', border: 'none' }} onClick={this.showModal}>
                      <Link to="/addtenement">
                        新增住户
                        </Link>
                    </Button>
                  </div>
                </div>
                <div className="derive">
                  <Icon type="info-circle-o" />&nbsp; &nbsp;
                  &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                    {selectedRowKeys.length}
                  </span>&nbsp; &nbsp;条记录
                  列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num}</span> 条
                  <Button type="primary" style={{ float: 'right', marginTop: '3px' }} onClick={this.dataout}>
                    <a href={this.state.export1} style={{ display: 'inline-block' }}>
                      数据导出
                          </a>
                  </Button>
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Table
                    dataSource={this.state.data}
                    columns={columns}
                    rowSelection={rowSelection}
                    bordered
                  />
                  <Modal
                    title="修改水表"
                    width='400px'
                    destroyOnClose
                    visible={this.state.watervisible}
                    onOk={this.changeOk}
                    onCancel={this.handleCancel}
                    mask={false}
                  >
                    <div>
                      <span>原有水表号：</span>
                      <Input style={{ width: '100%', marginBottom: "10px", marginTop: '10px' }}
                        placeholder="请输入水表号"
                        value={this.state.original}
                      />
                      <span>新水表号：</span>
                      <Input
                        placeholder="请输入新水表号"
                        id="watermeter"
                        style={{ width: '100%', marginBottom: "10px", marginTop: '10px' }}
                        onBlur={this.waterblur}
                        autoComplete="off"
                      />
                      <span style={{ color: this.state.color }}>{this.state.chanegresult}</span>
                    </div>
                  </Modal>
                  <Modal
                    title="历史读数"
                    width='570px'
                    destroyOnClose
                    // maskStyle={{ background: "black", opacity: '0.1' }}
                    visible={this.state.historyvisible}
                    centered
                    footer={null}
                    onCancel={this.handleCancel}
                    mask={false}
                  >
                    <Table
                      bordered
                      dataSource={this.state.readout}
                      columns={this.state.readouts}
                      rowClassName="editable-row"
                    />
                  </Modal>
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

