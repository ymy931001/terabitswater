import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Input, Select, Table, Modal, Tooltip, LocaleProvider } from 'antd';
import { wirelessbasic, generalbasic, collectorbasic, getLifecycleDetail, getHistoryReading, getHourReading, simplewater } from '../axios';
import { Link } from 'react-router-dom';

import { createForm } from 'rc-form';
import './basic.css';
import Headers from '../header';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const text = <span>错误码共5个字节，第一个字节的高4位表示4个字轮是否异常（0正常，1异常），低4位对应异常类型（0全零，1全一）；第二和第三两个字节的低10位表示LED灯是否异常，最后两个字节的低10位表示LED灯异常类型（0短路，1断路）</span>;


const TabPane = Tabs.TabPane;


class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      waterMerchantId: '',
      powermenu: JSON.parse(localStorage.getItem('menu')),
      selectedRowKeys: [],
      selectedRowKey: [],
      selectedRows: [],
      watermanarrs: [],
      sbselected: [],
      tabnum: 1,
      lifereport: [{
        title: '设备编号',
        dataIndex: 'deviceNum',
      }, {
        title: '生命周期',
        dataIndex: 'status',
        render: (text) => {
          if (text === 1) {
            return (
              <div>
                <span style={{ color: 'green' }}>设备入库</span>
              </div>
            )
          }
          if (text === 2) {
            return (
              <div>
                <span style={{ color: 'green' }}>设备出库</span>
              </div>
            )
          }
          if (text === 3) {
            return (
              <div>
                <span style={{ color: 'purple' }}>设备安装</span>
              </div>
            )
          }
        }
      }, {
        title: '操作时间',
        dataIndex: 'date',
      }, {
        title: '操作员',
        dataIndex: 'userId',
      }],

      dbreports: [{
        title: '设备编号',
        dataIndex: 'deviceNum',
      }, {
        title: '生命周期',
        dataIndex: 'status',
        render: (text) => {
          if (text === 1) {
            return (
              <div>
                <span style={{ color: 'green' }}>设备入库</span>
              </div>
            )
          }
          if (text === 2) {
            return (
              <div>
                <span style={{ color: 'green' }}>设备出库</span>
              </div>
            )
          }
          if (text === 3) {
            return (
              <div>
                <span style={{ color: 'purple' }}>设备安装</span>
              </div>
            )
          }
        }
      }, {
        title: '操作时间',
        dataIndex: 'date',

      }, {
        title: '操作员',
        dataIndex: 'userId',
      }],


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
      }, {
        title: '信号强度',
        dataIndex: 'signalIntensity',
      }, {
        title: '电压',
        dataIndex: 'voltage',
      }, {
        title: '错误码',
        dataIndex: 'errorCode',
        render: (text) => {
          if (text === "0000000000") {
            return (
              <div>
                <span style={{ color: 'green' }}>正常</span>
              </div>
            )
          }
          if (text === "" || text === null) {
            return (
              <div>
                <span>无</span>
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
      }],
    };

    this.column = [{
      title: '设备编号',
      dataIndex: 'wireless_num',
    }, {
      title: '历史读数',
      dataIndex: 'id',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.showhistory(text, record, index)}
          >详情</a>
        </div>
    }
      , {
      title: '小时读数',
      dataIndex: 'wireless_num',
      render: (text, record, index) => {
        return (
          <div style={{ color: 'white', background: '#0099CB', borderRadius: "5px", padding: '5px' }} onClick={() => this.histext(text, record, index)}>
            <Link to="/hourreading" style={{ color: 'white' }}>查看详情</Link>
          </div>
        )
      }
    }
      , {
      title: '网络运营商',
      dataIndex: '网络运营商',
    }, {
      title: '软件版本号',
      dataIndex: 'software',
    }, {
      title: '硬件版本号',
      dataIndex: 'hardware',
    }, {
      title:
        <div>
          <span style={{ marginRight: '3px' }}>错误码</span>
          <Tooltip placement="topLeft" title={text}>
            <Icon type="question-circle" />
          </Tooltip>
        </div>,
      dataIndex: 'error_code',

    }, {
      title: 'IMEI',
      dataIndex: 'IMEI',
    }, {
      title: 'IMSI',
      dataIndex: 'IMSI',
    }, {
      title: '类型',
      dataIndex: '水表类型',
    }, {
      title: '安装起始读数',
      dataIndex: '起始读数',
    }
      , {
      title: '设备生命周期',
      dataIndex: 'id',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.dblifeshowModal(text, record, index)} style={{ marginRight: '10px' }}
          >详情</a>
          <Modal
            title="生命周期"
            visible={this.state.dblookshow}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
            okText="确认"
            cancelText="取消"
          >
            <Table
              dataSource={this.state.reports}
              columns={this.state.dbreports}
              rowClassName="editable-row"
              bordered
            />

          </Modal>
        </div>
    },
    {
      title: '设备激活时间',
      dataIndex: '设备安装时间',
    }
      // , {
      //   title: '详情',
      //   dataIndex: 'id',
      //   render: (text, record, index) =>
      //     <div>
      //       <a onClick={() => this.showModal(text)}
      //       >详情</a>
      //       <Modal
      //         title="无线单表其他信息"
      //         visible={this.state.visible}
      //         onOk={this.handleOk}
      //         onCancel={this.handleCancel}
      //         mask={false}
      //       >
      //         <p>水表版本:{this.state.sbbb}</p>
      //         <p>电路板号:{this.state.dlbh}</p>
      //         <p>处部编号:{this.state.cbbh}</p>
      //         <p>正面编号:{this.state.zmbh}</p>
      //         <p>程序版本:{this.state.cxbb}</p>
      //         <p>IMEI号:{this.state.imei}</p>
      //         <p>ICCID:{this.state.iccid}</p>
      //       </Modal>
      //     </div>
      // }
    ];

    this.sbcolumn = [{
      title: '水表编号',
      dataIndex: 'general_num',
    }, {
      title: '水表门牌号',
      dataIndex: '水表门牌号',
    }, {
      title: '软件版本',
      dataIndex: '软件版本',
    }, {
      title: '所属采集器号',
      dataIndex: '所属采集器号',
    }, {
      title: '所属发货单号',
      dataIndex: '所属发货单号',
    }];


    this.columns = [{
      title: '设备编号',
      dataIndex: 'collector_num',
    }, {
      title: 'IMEI',
      dataIndex: 'IMEI',
    }, {
      title: '版本号',
      dataIndex: '版本号',
    }, {
      title: '集中器类型',
      dataIndex: '集中器类型',
    }, {
      title: '电压',
      dataIndex: '电压',
    },
    {
      title: 'ICCID',
      dataIndex: 'ICCID',
    }, {
      title: '所属客户地区',
      dataIndex: '所属客户地区',
    },
    {
      title: '设备生命周期',
      dataIndex: 'id',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.lifeshowModal(text)} style={{ marginRight: '10px' }}
          >详情</a>
          <Modal
            title="生命周期"
            visible={this.state.lookshow}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
            okText="确认"
            cancelText="取消"
          >
            <Table
              dataSource={this.state.report}
              columns={this.state.lifereport}
              rowClassName="editable-row"
            />

          </Modal>
        </div>
    },
    {
      title: '设备安装时间',
      dataIndex: '设备安装时间',
    }, {
      title: '所属发货单号',
      dataIndex: '所属发货单号',
    },
    ];
  }


  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
      lookshow: false,
      dblookshow: false,
      historyvisible: false,
    });
  }

  histext(text, record, index) {
    localStorage.setItem('histext', text)
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      lookshow: false,
      dblookshow: false,
      historyvisible: false,
    });
  }
  tabchange = (e) => {
    this.setState({
      tabnum: e,
    });
  }
  state = { visible: false }
  // showModal = (text) => {
  //   getDeviceDetail([
  //     text,
  //     1,
  //   ]).then(res => {
  //     if (res.data && res.data.message === 'success') {
  //       this.setState({
  //         visible: true,
  //         sbbb: res.data.data.ipPort,
  //         dlbh: res.data.data.ipPort,
  //         cbbh: res.data.data.ipPort,
  //         zmbh: res.data.data.ipPort,
  //         cxbb: res.data.data.reportingInterval,
  //         imei: res.data.data.imei,
  //         iccid: res.data.data.iccid,
  //       });
  //     }
  //   });
  // }
  state = { lookshow: false }
  lifeshowModal = (text) => {
    getLifecycleDetail([
      text,
      this.state.tabnum,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          report: res.data.data,
          lookshow: true,
        });
      }
    });
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id === text) {
        this.setState({
          lookshow: true,
          name: this.state.data[i].linkman,
          phone: this.state.data[i].phone,
          email: this.state.data[i].email,
        });
      }
    }
  }
  state = { dblookshow: false }
  dblifeshowModal = (text, record, index) => {
    getLifecycleDetail([
      record.wireless_num,
      this.state.tabnum,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          reports: res.data.data,
          dblookshow: true,
        });
      }
    });
    for (var i = 0; i < this.state.dbdata.length; i++) {
      if (this.state.dbdata[i].id === text) {
        this.setState({
          dblookshow: true,
          name: this.state.dbdata[i].linkman,
          phone: this.state.dbdata[i].phone,
          email: this.state.dbdata[i].email,
        });
      }
    }
  }
  //获取历史读数（无线单表）
  state = { historyvisible: false }
  showhistory = (text, record, index) => {
    getHistoryReading([
      record.wireless_num,
      this.state.tabnum,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          readout: res.data.data,
          historyvisible: true,
        });
      }
    });
    for (var i = 0; i < this.state.dbdata.length; i++) {
      if (this.state.dbdata[i].id === text) {
        this.setState({
          name: this.state.dbdata[i].linkman,
          phone: this.state.dbdata[i].phone,
          email: this.state.dbdata[i].email,
        });
      }
    }
  }


  onSelectChange = (selectedRowKey) => {
    console.log(selectedRowKey)
    this.setState({
      selectedRowKey,
      keylist: selectedRowKey,
    });
  }



  onSelectChanges = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
      keylist: selectedRowKeys,
    });
  }

  onSelect = (sbselected) => {
    this.setState({
      sbselected,
      keylist: sbselected,
    });
  }

  reset = () => {
    document.getElementById('collectorsid').value = ""
    collectorbasic([
      '',
      '',
      '',
      '',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
        });
      }
    });
  }


  generalreset = () => {
    document.getElementById('generalid').value = ""
    document.getElementById('belongcollector').value = ""
    generalbasic([
      '',
      '',
      '',
      '',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        this.setState({
          dataSource: res.data.data,
          num2: res.data.data.length,
        });
      }
    });
  }


  wirelessreset = () => {
    document.getElementById('wirelessid').value = ""
    wirelessbasic([
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        this.setState({
          dbdata: res.data.data,
          num1: res.data.data.length,
        });
      }
    });
  }



  typeChange = (date, dateString) => {
    console.log(date, dateString)
    this.setState({
      waterMerchantId: date,
    });
  }


  wirelessquery = () => {
    var wirelessid = document.getElementById('wirelessid').value
    wirelessbasic([
      this.state.waterMerchantId,
      wirelessid,
      '',
      '',
      '',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        console.log(res.data.data)
        this.setState({
          dbdata: res.data.data,
          num1: res.data.data.length,
        });
      }
    });
  }

  wirequery = (e) => {
    var wirelessid = document.getElementById('wirelessid').value
    if (e.keyCode === 13) {
      wirelessbasic([
        this.state.waterMerchantId,
        wirelessid,
        '',
        '',
        '',
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          console.log(res.data.data)
          this.setState({
            dbdata: res.data.data,
            num1: res.data.data.length,
          });
        }
      });
    }

  }

  collectorsquery = () => {
    var collectorsid = document.getElementById('collectorsid').value
    collectorbasic([
      this.state.waterMerchantId,
      collectorsid,
      '',
      '',
      '',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        console.log(res.data.data)
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
        });
      }
    });
  }


  generalquery = () => {
    var generalid = document.getElementById('generalid').value
    var belongcollector = document.getElementById('belongcollector').value
    generalbasic([
      '',
      generalid,
      belongcollector,
      '',
      '',
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        console.log(res.data.data)
        this.setState({
          dataSource: res.data.data,
          num2: res.data.data.length,
        });
      }
    });
  }



  componentWillMount = () => {
    document.title = "设备基本信息";


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




    if (localStorage.getItem('devicedid') != '') {
      wirelessbasic([
        '',
        localStorage.getItem('devicedid')
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].key = res.data.data[i].id
          }
          this.setState({
            dbdata: res.data.data,
            num1: res.data.data.length,
          });
        }
      });
      localStorage.setItem('devicedid','')
    } else {
      wirelessbasic([
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].key = res.data.data[i].id
          }
          this.setState({
            dbdata: res.data.data,
            num1: res.data.data.length,
          });
        }
      });
    }



    collectorbasic([

    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
        });
      }
    });


    generalbasic([

    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        this.setState({
          dataSource: res.data.data,
          num2: res.data.data.length,
        });
      }
    });




    // simplewater([]).then(res => {
    //   if (res.data && res.data.message === 'success') {
    //     let arr = []
    //     for (var i = 0; i < res.data.data.length; i++) {
    //       arr.push(res.data.data[i])
    //     }
    //     this.setState({
    //       watermanarrs: arr,
    //     });
    //   }
    // });



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
    const { selectedRowKeys } = this.state;
    const rowSelections = {
      selectedRowKeys,
      onChange: this.onSelectChanges,
    };

    const hasSelecteds = selectedRowKeys.length > 0;
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

    const { selectedRowKey } = this.state;
    const rowSelection = {
      selectedRowKey,
      onChange: this.onSelectChange,
      // selections: [
      //   {
      //     key: "all-data",
      //     text: "选择所有设备",
      //     onSelect: () => {
      //       this.setState({
      //         selectedRowKey: this.state.dbdata.map((data, i) => data.key),
      //       },function(){
      //         console.log(this.state.selectedRowKey)
      //       });
      //     }
      //   },
      //   {
      //     key: "all-close",
      //     text: "清空所有选择",
      //     onSelect: () => {
      //       this.setState({
      //         selectedRowKey: [],
      //       },function(){
      //         console.log(this.state.selectedRowKey)
      //       });
      //     }
      //   }
      // ]
    };

    const hasSelected = selectedRowKey.length > 0;
    const column = this.column.map((col) => {
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



    const { sbselected } = this.state;
    const sbrowSelect = {
      sbselected,
      onChange: this.onSelect,
    };

    const sbhasSelected = sbselected.length > 0;
    const sbcolumn = this.sbcolumn.map((col) => {
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
      <LocaleProvider locale={zh_CN}>
        <div id="basicbody" >
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div />
              <div className="Layout-left">
                <Menu
                  defaultSelectedKeys={['12']}
                  defaultOpenKeys={['sub2']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <Menu.Item key="12" style={{ background: ' #0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
                当前位置：设备管理 / 基本信息
              </div>
              <Content style={{ margin: '24px 16px', background: '#fff', minHeight: 280 }}>
                <div className="current">
                  <div className="curr">
                    <Tabs onChange={this.tabchange} type="card" style={{ background: 'white' }}>
                      <TabPane tab="无线单表" key="1" style={{ padding: '20px' }}>
                        无线单表编号:<Input placeholder="请输入无线单表编号" style={{ width: '20%', marginLeft: '10px' }} id="wirelessid" onKeyDown={this.wirequery} />
                        <Button type="primary" style={{ marginLeft: '20px',marginRight:'20px' }} onClick={this.wirelessquery}>查询</Button>
                        <Button onClick={this.wirelessreset}>重置</Button>
                        <div className="derive">
                          <Icon type="info-circle-o" />
                          &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                            {hasSelected ? `   ${selectedRowKey.length}  ` : ''}
                          </span>条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num1}</span> 条
                {/* <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button> */}
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <Table
                            rowSelection={rowSelection}
                            dataSource={this.state.dbdata}
                            columns={column}
                            bordered
                            rowClassName="editable-row"
                          />
                        </div>
                      </TabPane>
                      <TabPane tab="采集器" key="2" style={{ padding: '20px' }}>
                        采集器编号:<Input placeholder="请输入采集器编号" style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="collectorsid" />
                        所属水务商:
                      <Select
                          className="one"
                          onChange={this.typeChange}
                          style={{ width: '25%', marginLeft: '10px' }}
                          placeholder="请选择水务商"
                        >
                          {provinceOptions}
                        </Select>

                        <Button type="primary" style={{ marginLeft: '20px' }} onClick={this.collectorsquery}>查询</Button>

                        <div className="derive">
                          <Icon type="info-circle-o" />
                          &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                            {hasSelecteds ? `   ${selectedRowKeys.length}  ` : ''}
                          </span>条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num}</span> 条
                {/* <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button> */}
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <Table
                            rowSelection={rowSelections}
                            dataSource={this.state.data}
                            columns={columns}
                            bordered
                            rowClassName="editable-row"
                          />
                        </div>
                      </TabPane>

                      <TabPane tab="普通水表" key="3" style={{ padding: '20px' }}>
                        普通水表编号:<Input placeholder="请输入普通水表编号" style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="generalid" />
                        采集器编号:<Input placeholder="请输入采集器编号" style={{ width: '20%', marginLeft: '10px' }} id="belongcollector" />
                        <Button type="primary" style={{ marginLeft: '20px' }} onClick={this.generalquery}>查询</Button>
                        <div className="derive">
                          <Icon type="info-circle-o" />
                          &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                            {sbhasSelected ? `   ${sbselected.length}  ` : ''}
                          </span>条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num2}</span> 条
                {/* <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button> */}
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <Table
                            rowSelection={sbrowSelect}
                            dataSource={this.state.dataSource}
                            columns={sbcolumn}
                            bordered
                            rowClassName="editable-row"
                          />
                        </div>
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
                <Modal
                  title="历史读数"
                  width='760px'
                  destroyOnClose
                  // maskStyle={{ background: "black", opacity: '0.1' }}
                  visible={this.state.historyvisible}
                  onOk={this.handleOk}
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
              </Content>
            </Layout>
          </Layout>
        </div>
      </LocaleProvider>
    )
  }
}
export default journal = createForm()(journal);

