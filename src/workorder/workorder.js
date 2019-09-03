import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, message, Select, Modal, Table, Input, LocaleProvider } from 'antd';
import { Link } from 'react-router-dom';
import { getworkorder, simplewater, addworkorder } from '../axios';
import { createForm } from 'rc-form';
import './workorder.css';
import Headers from '../header';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
const { TextArea } = Input;
class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selectedRowKeys: [],
      watermanarrs: [],
      powermenu: JSON.parse(localStorage.getItem('menu')),
    };
    this.columns = [{
      title: '工单号',
      dataIndex: 'id',
    }, {
      title: '水务商',
      dataIndex: 'water',
    }, {
      title: '类型',
      dataIndex: 'type',
    }, {
      title: '表号范围',
      dataIndex: 'delivery_time',
      render: (text, record, index) => {
        return (
          <div>
            {record.meter_mix}~{record.meter_max}
          </div>
        )
      }
    }, {
      title: '时间',
      dataIndex: 'gmtcreate',
    }, {
      title: '数量',
      dataIndex: 'meter_quantity',
    }, {
      title: '备注',
      dataIndex: 'remark',
    }, {
      title: '工单详情',
      dataIndex: 'id',
      render: (text, record, index) => {
        return (
          <div>
            <Button type="primary" style={{ marginRight: '10px' }} onClick={() => this.datum(text, record, index)} >
              <Link to="/orderdetails">详情</Link>
            </Button>
          </div>
        )
      }
    }
      , {
      title: '水表测试',
      dataIndex: 'id',
      render: (text, record, index) => {
        return (
          <div>
            <Link to="/testdetails" onClick={() => this.datum(text, record, index)}>测试</Link>
          </div>
        )
      }
    }
    ];
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  equipmentquery = () => {
    var orderid = document.getElementById('orderid').value;
    getworkorder([
      orderid,
      this.state.waterMerchantId,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
        });
      }
    });
  }

  reset = () => {
    document.getElementById('orderid').value = '';
    getworkorder([
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
        });
      }
    });
  }


  datum(text, record, index) {
    localStorage.setItem('orderid', text)
    localStorage.setItem('orderids', record.id)
    if (record.meter_mix === null && record.meter_max != null) {
      localStorage.setItem('testrange', '' + "~" + record.meter_max)
    } else if (record.meter_max === null && record.meter_mix != null) {
      localStorage.setItem('testrange', record.meter_mix + "~" + '')
    } else if (record.meter_max === null && record.meter_mix === null) {
      localStorage.setItem('testrange', '')
    } else {
      localStorage.setItem('testrange', record.meter_mix + "~" + record.meter_max)
    }

  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(selectedRowKeys.length)
    this.setState({
      selectedRowKeys,
      keylist: selectedRowKeys,
    });
  }

  showModal = (text) => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }


  typeChange = (date, dateString) => {
    this.setState({
      waterMerchantId: date,
    });

  }


  handleOk = (e) => {
    var metermix = document.getElementById('metermix').value;
    var metermax = document.getElementById('metermax').value;
    var meterquantity = document.getElementById('meterquantity').value;
    var type = document.getElementById('type').value;
    var remark = document.getElementById('remark').value;

    if (metermix === "" || metermix === null) {
      message.error('请输入表号范围')
    } else if (metermax === "" || metermax === null) {
      message.error('请输入表号范围')
    } else if (meterquantity === "" || meterquantity === null) {
      message.error('请输入表数量')
    } else if (type === "" || type === null) {
      message.error('请输入表类型')
    } else if (this.state.waterMerchantId === "" || this.state.waterMerchantId === null) {
      message.error('请选择水务商')
    } else {
      addworkorder([
        metermix,
        metermax,
        meterquantity,
        type,
        this.state.waterMerchantId,
        remark,
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          message.success('添加工单成功')
          getworkorder([
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

          this.setState({
            visible: false,
          });
        }
      });
    }

  }




  componentWillMount = () => {
    document.title = "工单管理";
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
        }, function () {
          this.setState({
            waterman: this.state.watermanarrs[0].name,
            waterMerchantId: this.state.watermanarrs[0].id,
          });
        });
      }
    })




    getworkorder([
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
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
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
                  defaultSelectedKeys={['32']}
                  defaultOpenKeys={['sub9']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <Menu.Item key="30" style={{ background: ' #0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
                产品监控 / 工单管理
            </div>
              <div className="tit">
                工单管理
            </div>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>
                <div style={{ marginTop: '10px' }}>
                  单号查询:<Input placeholder="请输入产品名称" style={{ width: '20%', marginRight: '10px', marginLeft: '10px' }} id="orderid" />
                  水务商:
              <Select
                    className="one"
                    onChange={this.typeChange}
                    style={{ width: '20%', marginLeft: '10px' }}
                    value={this.state.waterman}
                    placeholder="请选择水务商"
                  >
                    {provinceOptions}
                  </Select>


                  <div style={{ float: "right" }}>
                    <Button type="primary" style={{ marginRight: '20px', zIndex: 99, }} onClick={this.equipmentquery}>查询</Button>
                    <Button style={{ zIndex: 99, }} onClick={this.reset}>重置</Button>

                    <Button type="danger" style={{ marginLeft: '20px', color: 'white', background: 'red', border: 'none' }} onClick={() => this.showModal()}>添加工单</Button>
                    <Modal
                      title="添加订单"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      mask={false}
                      okText="确认"

                    >
                      <p style={{ marginTop: '5px', marginBottom: '5px' }}>表号范围:</p>
                      <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                        <Input type="text" placeholder="请输入最小值" style={{ width: "45%" }} id="metermix" />~
                      <Input type="text" placeholder="请输入最大值" style={{ width: "45%" }} id="metermax" />
                      </div>

                      <p style={{ marginTop: '5px', marginBottom: '5px' }}>水表数量:</p>
                      <Input type="text" placeholder="请输入水表数量" style={{ width: "100%" }} id="meterquantity" />
                      <p style={{ marginTop: '5px', marginBottom: '5px' }}>表类型:</p>
                      <Input type="text" placeholder="请输入表类型" style={{ width: "100%" }} id="type" />
                      <p style={{ marginTop: '5px', marginBottom: '5px' }}>水务商:</p>
                      <Select
                        className="one"
                        onChange={this.typeChange}
                        style={{ width: '100%' }}
                        value={this.state.waterman}
                        placeholder="请选择水务商"
                      >
                        {provinceOptions}
                      </Select>
                      <p style={{ marginTop: '5px', marginBottom: '5px' }}>备注信息:</p>
                      <TextArea rows={4} style={{ width: "100%" }} id="remark"
                        placeholder="请输入备注（选填）"
                      />
                    </Modal>
                  </div>
                </div>

                <div className="derive">
                  <Icon type="info-circle-o" />
                  &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                    {hasSelected ? `   ${selectedRowKeys.length}  ` : ''}
                  </span>条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num}</span> 条
                {/* <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button> */}
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Table
                    rowSelection={rowSelection}
                    dataSource={this.state.data}
                    columns={columns}
                    bordered
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

