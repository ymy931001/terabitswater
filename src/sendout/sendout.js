import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Modal, Select, Table, DatePicker, Input, message, LocaleProvider } from 'antd';
import { Link } from 'react-router-dom';
import { simplewater, orderadd, orderview, orderedit, deviceview } from '../axios';
import { createForm } from 'rc-form';
import './sendout.css';
import Headers from '../header';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');






const myDate = new Date();

const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      time: myDate,
      randomnum: '',
      inputValue: '',
      currentTime: null,
      length: '',
      watermanarrs: [],
      selectedRowKeys: [],
      data: '',
      powermenu: JSON.parse(localStorage.getItem('menu')),
    };
    this.columns = [{
      title: '设备编号',
      dataIndex: 'device_num',
    }, {
      title: '发货地址',
      dataIndex: 'consignee_address',
    }
    ];
  }
  handleOk = (e) => {

    if (this.state.randomnum === "" || this.state.randomnum === null) {
      message.error('请先生成订单号')
    } else if (this.state.length === "" || this.state.length === null) {
      message.error('请选择发货数量')
    } else if (this.state.sendtime === "" || this.state.sendtime === null) {
      message.error('请输入订单发货时间')
    } else if (this.state.waterMerchantId === "" || this.state.waterMerchantId === null) {
      message.error('请选择水务商')
    } else {
      orderadd([
        this.state.randomnum,
        this.state.sendtime,
        this.state.length,
        this.state.waterMerchantId,
        this.state.list.join(','),
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          message.success('添加订单成功')
          orderview([
            this.state.waterMerchantId,
          ]).then(res => {
            if (res.data && res.data.message === 'success') {
              this.setState({
                data: res.data.data,
                num: res.data.data.length,
                selectedRowKeys: [],
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
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  disabledEndDate = (endValue) => {
    let me = this;
    const startValue = this.state.currentTime;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }
  handleEndOpenChange = (open) => {
    let me = this
    if (open) {
      me.currentTime = moment();
    }
    this.setState({ currentTime: moment() });
  }







  typeChange = (date, dateString) => {
    console.log(dateString.props.children)
    this.setState({
      waterman: dateString.props.children,
      waterMerchantId: date,
    }, function () {
      deviceview([
        this.state.waterMerchantId,
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].key = res.data.data[i].device_num
          }
          this.setState({
            data: res.data.data,
            num: res.data.data.length,
          });
        }
      });
    });

  }

  random = () => {
    this.setState({
      randomnum: parseInt(Math.random() * 10000000000),
    });

  }

  numtext = (e) => {
    this.setState({
      inputValue: e.target.value.replace(/[^\d]+/, '')
    })
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(selectedRowKeys.length)
    // var newarr = [];
    // for (var i = 0; i < selectedRowKeys.length; i++) {
    //   newarr.push(this.state.data[i].device_num)
    // }
    this.setState({
      list: selectedRowKeys,
      selectedRowKeys,
      keylist: selectedRowKeys,
      length: selectedRowKeys.length,
    });
  }
  onChanges = (date, dateString) => {
    console.log(date, dateString);
    this.setState({
      sendtime: dateString
    })
  }

  timeonChange = (value, dateString) => {
    this.setState({
      begintime: dateString[0],
      endtime: dateString[1],
    });
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  showModal = (text) => {
    console.log(this.state.waterMerchantId)
    this.setState({
      randomnum: '',
      visible: true,
    });
  }
  componentWillMount = () => {
    document.title = "产品发货";

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
          }, function () {
            deviceview([
              this.state.waterMerchantId
            ]).then(res => {
              if (res.data && res.data.message === 'success') {
                for (var i = 0; i < res.data.data.length; i++) {
                  res.data.data[i].key = res.data.data[i].device_num
                }
                this.setState({
                  data: res.data.data,
                  num: res.data.data.length,
                });
              }
            });
          });
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
                  defaultSelectedKeys={['29']}
                  defaultOpenKeys={['sub9']}
                  mode="inline"
                  theme="dark"
                  inlineCollapsed={this.state.collapsed}
                >
                  <Menu.Item key="19" style={{ background: '#0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
                产品监控 / 产品发货
            </div>
              <div className="tit">
                产品发货
            </div>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>
                <div style={{ marginTop: '10px' }}>
                  <span style={{ display: 'inline-block', textAlign: 'right' }}>水务商：</span>
                  <Select
                    className="one"
                    onChange={this.typeChange}
                    style={{ width: '20%' }}
                    value={this.state.waterman}
                    placeholder="请选择水务商"
                  >
                    {provinceOptions}
                  </Select>
                  <div style={{ float: "right" }}>
                    <Button type="danger" style={{ marginRight: '20px', color: 'white', background: 'red', border: 'none' }} onClick={() => this.showModal()}>添加订单</Button>
                    <Modal
                      title="添加订单"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      mask={false}
                    >

                      <p style={{ marginTop: '5px', marginBottom: '5px' }}>订单号:</p>
                      <Input type="text" placeholder="请点击生成订单号" style={{ width: "75%", float: 'left', borderRight: 'none', borderRadius: '5px 0 0 5px' }} value={this.state.randomnum} />
                      <Button type="primary" style={{ float: 'left', width: '25%', borderLeft: 'none', borderRadius: '0px 5px 5px 0px' }} onClick={this.random}>生成单号</Button>
                      <p style={{ marginTop: '5px', marginBottom: '5px' }}>订单内容:</p>
                      <Input addonAfter="台" placeholder="请输入设备数量"
                        value={this.state.length}
                      />
                      <p style={{ marginTop: '5px', marginBottom: '5px' }}>发货时间:</p>
                      <DatePicker
                        onChange={this.onChanges}
                        style={{ width: '100%' }}
                        placeholder="请选择发货时间"
                        disabledDate={this.disabledEndDate}
                        onOpenChange={this.handleEndOpenChange}
                      />
                      <p style={{ marginTop: '5px', marginBottom: '5px' }}>发货地址:</p>
                      <Input placeholder="请输入发货地址"
                        value={this.state.waterman}
                      />
                    </Modal>
                    <Button type="danger" style={{ marginRight: '20px', color: 'white', background: 'green', border: 'none' }}>
                      <Link to="/looklist">查看订单</Link>
                    </Button>
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

