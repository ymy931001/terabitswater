import React from 'react';
import { Icon, Menu, Layout, Button, Tabs, Table, Modal, Input, LocaleProvider, message } from 'antd';
import { Link } from 'react-router-dom';
import { collector, general, wireless, site, exportstate } from '../axios';
import { createForm } from 'rc-form';
import './status.css';
import Headers from '../header';

import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;


class journal extends React.Component {

  state = {
    filteredInfo: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selectedRowKeys: '',
      filteredInfo: null,
      powermenu: JSON.parse(localStorage.getItem('menu')),
      selected: '',
      export1: '#',
      selectedRowKey: '',
    };
    this.columns = [{
      title: '设备编号',
      dataIndex: 'collectorNum',
    }, {
      title: '信号强度',
      dataIndex: 'signalIntensity',
    }, {
      title: '基站信息',
      dataIndex: 'baseStation',
    }, {
      title: '在线状态',
      dataIndex: 'onlineStatus',
      render: (text) => {
        if (text === '') {
          return (
            <div>
              <span style={{ color: 'red' }}>离线</span>
            </div>
          )
        }
        if (text === '0') {
          return (
            <div>
              <span style={{ color: 'red' }}>离线</span>
            </div>
          )
        }
        if (text === '1') {
          return (
            <div>
              <span style={{ color: 'green' }}>在线</span>
            </div>
          )
        }
      }
    }, {
      title: '连网IP及端口',
      dataIndex: 'ipPort',
    }, {
      title: '挂表数',
      dataIndex: 'generalQuantity',
    }, {
      title: '操作员',
      dataIndex: 'id',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.showModal(record.key)}
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
      title: '上报间隔时间',
      dataIndex: 'signalIntensity',
    }];
    this.sbcolumn = [
      {
        title: '设备编号',
        dataIndex: 'generalNum',

      }, {
        title: '水表阀门状态',
        dataIndex: 'valve',
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
                <span style={{ color: 'purple' }}>被替换</span>
              </div>
            )
          }
        }
      }, {
        title: '水表字轮',
        dataIndex: 'printWheel',
      }, {
        title: '水表所在通道号',
        dataIndex: 'chanelnum',
      }, {
        title: '设备生命周期',
        dataIndex: 'siteName',
      }, {
        title: '操作员',
        dataIndex: 'id',
        render: (text, record, index) =>
          <div>
            <a onClick={() => this.showModalsb(record.key)}
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
        title: '设备安装时间',
        dataIndex: 'setupDatetime',
        render: (text) => {
          if (text === '') {
            return (
              <div>
                <span style={{ color: 'red' }}>待安装</span>
              </div>
            )
          } else {
            return (
              <div>
                {text}
              </div>
            );
          }
        },
      }];

  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  showModal = (key) => {
    for (var i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].key === key) {
        this.setState({
          visible: true,
          name: this.state.data[i].operator,
          phone: this.state.data[i].phone,
          email: this.state.data[i].email,
        });
      }
    }
  }
  showModaldb = (key) => {
    for (var i = 0; i < this.state.dbdata.length; i++) {
      if (this.state.dbdata[i].key === key) {
        this.setState({
          visible: true,
          name: this.state.dbdata[i].operator,
          phone: this.state.dbdata[i].phone,
          email: this.state.dbdata[i].email,
        });
      }
    }
  }

  showothers = (text, record, index) => {
    console.log(record)
    this.setState({
      visibles: true,
      voltage2: record.voltage2,
      ur: record.ur,
      cellId: record.cellId,
    });
  }


  showModalsb = (key) => {
    for (var i = 0; i < this.state.ptdata.length; i++) {
      if (this.state.ptdata[i].key === key) {
        this.setState({
          visible: true,
          name: this.state.ptdata[i].operator,
          phone: this.state.ptdata[i].phone,
          email: this.state.ptdata[i].email,
        });
      }
    }
  }
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  // onSelectChange = (selectedRowKey) => {
  //   console.log('selectedRowKeys changed: ', selectedRowKey);
  //   console.log(selectedRowKey.length)
  //   this.setState({
  //     selectedRowKey,
  //     keylist: selectedRowKey,
  //   });
  // }

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
          export1: 'http://47.110.136.32:8040/resourcemanager/device/state/export?access_token=' + localStorage.getItem('access_token') + "&deviceNum=" + this.state.selectedRowKeys.join(',')
        }, function () {
          console.log(this.state.export1)
        })
      }
    });
  };

  onSelectAll = () => {
    if (this.state.selectedRowKeys.length === 0) {
      this.setState({
        selectedRowKeys: this.state.dbdatalist.map((data, i) => data.key),
      }, function () {
        this.setState({
          export1: 'http://47.110.136.32:8040/resourcemanager/device/state/export?access_token=' + localStorage.getItem('access_token') + "&deviceNum=" + this.state.selectedRowKeys.join(',')
        })
      });
    } else {
      this.setState({
        selectedRowKeys: [],
        selectedRows: []
      });
    }
  }



  onSelectChanges = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(selectedRowKeys.length)
    this.setState({
      selectedRowKeys,
      keylist: selectedRowKeys,
    });
  }
  collectorsquery = (e) => {
    var collectorsid = document.getElementById('collectorsid').value
    collector([
      collectorsid,
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

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      visibles: false,
    });
  }

  collectorreset = () => {
    document.getElementById('collectorsid').value = '',
      collector([
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



  wirequery = (e) => {
    var wirelessid = document.getElementById('wirelessid').value
    if (e.keyCode === 13) {
      wireless([
        wirelessid,
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].key = res.data.data[i].id
          }
          console.log(res.data.data)
          this.setState({
            dbdata: res.data.data,
            dbdatalist: res.data.data,
            num1: res.data.data.length,
          });
        }
      });
    }
  }

  wirelessquery = (e) => {
    var wirelessid = document.getElementById('wirelessid').value
    wireless([
      wirelessid,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        console.log(res.data.data)
        this.setState({
          dbdata: res.data.data,
          dbdatalist: res.data.data,
          num1: res.data.data.length,
        });
      }
    });
  }

  wirelessreset = () => {
    document.getElementById('wirelessid').value = '',
      wireless([
        '',
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

  generalquery = (e) => {
    var generalid = document.getElementById('generalid').value
    general([
      generalid,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        console.log(res.data.data)
        this.setState({
          ptdata: res.data.data,
          num2: res.data.data.length,
        });
      }
    });
  }

  generalreset = () => {
    document.getElementById('generalid').value = '',
      general([
        '',
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].key = res.data.data[i].id
          }
          this.setState({
            ptdata: res.data.data,
            num2: res.data.data.length,
          });
        }
      });
  }

  tabchange = (e) => {
    this.setState({
      tabnum: e,
    });
  }


  componentWillMount = () => {
    document.title = "设备状态";


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


    site([
      1,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          area: res.data.data,
        });
      }
    });

    collector([
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


    wireless([
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        console.log(res.data.data)
        this.setState({
          dbdata: res.data.data,
          dbdatalist: res.data.data,
          num1: res.data.data.length,
        });
      }
    });
    general([
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        this.setState({
          ptdata: res.data.data,
          num2: res.data.data.length,
        });
      }
    });

  }


  dataout = () => {
    if (this.state.export1 === "#") {
      message.error("请选择要导出的数据");
    }
  }


  datum = (text, record, index) => {
    localStorage.setItem('devicedid', text)
  }


  listonChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter);
    console.log(extra)
    this.setState({
      num1: extra.currentDataSource.length,
      dbdatalist: extra.currentDataSource,
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

    let { filteredInfo } = this.state;
    filteredInfo = filteredInfo || {};
    const column = [{
      title: '设备编号',
      dataIndex: 'wirelessNum',
      render: (text, record, index) => {
        return (
          <div>
            <span onClick={() => this.datum(text, record, index)}
            >
              <Link to="/basic" style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{text}</Link>
            </span>
          </div>
        )
      }
    }, {
      title: '所属水务商',
      dataIndex: 'name',
      render: (text) => {
        if (text === null) {
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
    }, {
      title: '信号',
      dataIndex: 'signalIntensity',
    }, {
      title: '阀门',
      dataIndex: 'valve',
      key: 'valve',
      filters: [
        { text: "开阀", value: "0" },
        { text: "关阀", value: "1" },
        { text: "半悬", value: "2" },
        { text: "非阀控", value: "3" },
      ],
      onFilter: (value, record) => record.valve.indexOf(value) === 0,
      // onFilter: (value, record) => record.valve.includes(value),
      // filteredValue: filteredInfo.valve || null,
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
    }, {
      title: '当前电压',
      dataIndex: 'voltage',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.voltage - b.voltage,
    }, {
      title: '最新读数',
      dataIndex: 'readingLatest',
    }, {
      title: '昨日用水(t)',
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
      title: '上线周期(小时)',
      dataIndex: 'reportingInterval',
    }, {
      title: '状态',
      dataIndex: 'onlineStatus',
      filters: [
        { text: "离线", value: "0" },
        { text: "在线", value: "1" },
      ],
      onFilter: (value, record) => record.onlineStatus.includes(value),
      render: (text) => {
        if (text === '') {
          return (
            <div>
              <span style={{ color: 'red' }}>离线</span>
            </div>
          )
        }
        if (text === '0') {
          return (
            <div>
              <span style={{ color: 'red' }}>离线</span>
            </div>
          )
        }
        if (text === '1') {
          return (
            <div>
              <span style={{ color: 'green' }}>在线</span>
            </div>
          )
        }
      }
    }, {
      title: '最新上报时间',
      dataIndex: 'reportedDatetime',

    }, {
      title: '操作员',
      dataIndex: 'lastConnectTime',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.showModaldb(record.key)}
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
      title: '其他信息',
      dataIndex: 'lastConnectTime',
      render: (text, record, index) =>
        <div>
          <a onClick={() => this.showothers(text, record, index)}
          >详情</a>
          <Modal
            title="联系方式"
            visible={this.state.visibles}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            mask={false}
          >
            <p>基站信息:&nbsp;&nbsp;{this.state.cellId}</p>
            <p>电池电压2:&nbsp;&nbsp;{this.state.voltage2}</p>
            <p>上报触发原因:&nbsp;&nbsp;{this.state.ur}</p>
          </Modal>
        </div>
    }];



    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelectAll: this.onSelectAll,
      // selections:
      //   [
      //     {
      //       key: "all-data",
      //       text: "选择所有设备",
      //       onSelect: () => {
      //         this.setState({
      //           selectedRowKeys: this.state.dbdata.map((data, i) => data.key),
      //           selectedRows: this.state.dbdata.map((data, i) => data)
      //         }, function () {
      //           this.setState({
      //             export1: 'http://47.110.136.32:8040/resourcemanager/device/state/export?access_token=' + localStorage.getItem('access_token') + "&deviceNum=" + this.state.selectedRowKeys.join(',')
      //           })
      //         });
      //       }
      //     },
      //     {
      //       key: "all-close",
      //       text: "清空所有选择",
      //       onSelect: () => {
      //         this.setState({
      //           selectedRowKeys: [],
      //           selectedRows: []
      //         });
      //       }
      //     }
      //   ]
    };



    // const { selectedRowKeys } = this.state;
    // const rowSelections = {
    //   selectedRowKeys,
    //   onChange: this.onSelectChanges,
    // };
    // const hasSelecteds = selectedRowKeys.length > 0;


    // const { selectedRowKey } = this.state;
    // const rowSelection = {
    //   selectedRowKey,
    //   onChange: this.onSelectChange,
    // };
    // const hasSelected = selectedRowKey.length > 0;



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
        <div id="statusbody" >
          <Layout>
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
            >
              <div />
              <div className="Layout-left">
                <Menu
                  defaultSelectedKeys={['11']}
                  defaultOpenKeys={['sub2']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <Menu.Item key="11" style={{ background: '#0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
                设备管理 / 设备状态
            </div>
              <div className="tit">
                设备状态
            </div>
              <Content style={{ margin: '24px 16px', background: '#fff', minHeight: 280 }}>
                <div className="current">
                  <div className="curr">
                    <Tabs type="card" style={{ background: 'white' }} onChange={this.tabchange}>
                      <TabPane tab="无线单表" key="1" style={{ padding: '20px' }}>
                        无线单表编号:<Input placeholder="请输入无线单表编号" style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="wirelessid" onKeyDown={this.wirequery} />
                        <div style={{ float: "right" }}>
                          <Button type="primary" style={{ marginRight: '20px' }} onClick={this.wirelessquery}>查询</Button>
                          <Button onClick={this.wirelessreset}>重置</Button>
                        </div>
                        <div className="derive">
                          <Icon type="info-circle-o" />
                          &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                            {this.state.selectedRowKeys.length} &nbsp; &nbsp;
                          </span>条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num1}</span> 条
                          <Button type="primary" style={{ float: 'right', marginTop: '3px' }} onClick={this.dataout}>
                            <a href={this.state.export1} style={{ display: 'inline-block' }}>
                              数据导出
                          </a>
                          </Button>
                        </div>
                        <div style={{ marginTop: '10px' }}>
                          <Table
                            rowSelection={rowSelection}
                            dataSource={this.state.dbdata}
                            columns={column}
                            bordered
                            onChange={this.listonChange}
                          />
                        </div>
                      </TabPane>
                      <TabPane tab="采集器" key="2" style={{ padding: '20px' }}>
                        采集器编号:<Input placeholder="请输入采集器编号" style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="collectorsid" />
                        <div style={{ float: "right" }}>
                          <Button type="primary" style={{ marginRight: '20px' }} onClick={this.collectorsquery}>查询</Button>
                          <Button onClick={this.collectorreset}>重置</Button>
                        </div>
                        {/* <div className="derive">
                          <Icon type="info-circle-o" />
                          &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                            {hasSelecteds ? `   ${selectedRowKeys.length}  ` : ''}
                          </span>条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num}</span> 条
                <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button>
                        </div> */}
                        <div style={{ marginTop: '10px' }}>
                          <Table
                            // rowSelection={rowSelections}
                            // dataSource={this.state.data}
                            columns={columns}
                            bordered
                            rowClassName="editable-row"
                          />
                        </div>
                      </TabPane>

                      <TabPane tab="普通水表" key="3" style={{ padding: '20px' }}>
                        普通水表编号:<Input placeholder="请输入普通水表编号" style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="generalid" />
                        <div style={{ float: "right" }}>
                          <Button type="primary" style={{ marginRight: '20px' }} onClick={this.generalquery}>查询</Button>
                          <Button onClick={this.generalreset}>重置</Button>
                        </div>
                        {/* <div className="derive">
                          <Icon type="info-circle-o" />
                          &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                            {hasSelected ? `   ${selectedRowKey.length}  ` : ''}
                          </span>条记录
                          列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num2}</span> 条
                          <Button type="primary" style={{ float: 'right', marginTop: '3px' }} >数据导出</Button>
                        </div> */}
                        <div style={{ marginTop: '10px' }}>
                          <Table
                            // rowSelection={rowSelection}
                            // dataSource={this.state.ptdata}
                            columns={sbcolumn}
                            bordered
                            rowClassName="editable-row"
                          />
                        </div>
                      </TabPane>
                    </Tabs>
                  </div>
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

