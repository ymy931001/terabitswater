import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Popconfirm, Form, Table, InputNumber, LocaleProvider, Input, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import { addcommunity, getcommunity, deletecommunity, updatecommunity } from '../axios';
import { createForm } from 'rc-form';
import './community.css';
import Headers from '../header';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);


const EditableFormRow = Form.create()(EditableRow);
class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };
  render() {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <FormItem style={{ margin: 0 }}>
                  {getFieldDecorator(dataIndex, {
                    rules: [{
                      required: true,
                      message: `Please Input ${title}!`,
                    }],
                    initialValue: record[dataIndex],
                  })(this.getInput())}
                </FormItem>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}

class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
      selectedRowKeys: [],
      editingKey: '',
      city: '',
      area: '',
      provinceid: '',
      cityid: '',
      areaid: '',
      powermenu: JSON.parse(localStorage.getItem('menu')),
    };
    this.columns = [{
      title: '小区名称',
      dataIndex: 'communityName',
    }, {
      title: '所属水务商',
      dataIndex: 'waterMerchantName',
    },{
      title: '小区地址',
      dataIndex: 'address',
    }, {
      title: '住户数量',
      dataIndex: 'houseQuantity',
    }, {
      title: '水表数量',
      dataIndex: 'deviceQuantity',
    }, {
      title: '抄见率',
      dataIndex: 'readingRate',
      render: (text) => {
        if (text==="NaN%") {
          return (
            <div>
              <span>无</span>
            </div>
          )
        }else{
          return (
            <div>
              <span>{parseFloat(text).toFixed(2)}</span>
            </div>
          )
        }
      }
    }, {
      title: '日供水量(t)',
      dataIndex: 'dailySupply',
    }, {
      title: '七日平均用水量(t)',
      dataIndex: 'sevenAvg',
      render: (text) => {
        if (text != undefined && text != "" && text != null) {
          return (
            <div>
              <span>{parseFloat(text).toFixed(2)}</span>
            </div>
          )
        }
      }
    }, {
      title: '月用水量(t)',
      dataIndex: 'monthSupply',

    }, {
      title: '创建时间',
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
      },
    },
    ];
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  equipmentquery = () => {
    var order = document.getElementById('order').value;
    getcommunity([
      order
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
    document.getElementById('order').value = '';
    getcommunity([
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        this.setState({
          data: res.data.data,
          num: res.data.data.length,
        });
      }
    });
  }



  onDelete = (text, record, index) => {
    deletecommunity([
      record.id,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        message.success("信息删除成功");
        const dataSource = [...this.state.data];
        this.setState({
          data: dataSource.filter(item => item.id !== record.id),
          num: this.state.data.length,
        });
        getcommunity([
        ]).then(res => {
          if (res.data && res.data.message === 'success') {
            this.setState({
              data: res.data.data,
              num: res.data.data.length,
            });
          }

        });
      }
      if (res.data && res.data.message === '该小区存在住户') {
        message.error("请确保该小区无用户，再进行删除")
      }
    });
  }


  componentWillMount = () => {
    document.title = "小区管理";
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
        if (res.data.data === "查询小区基本信息为空") {
          this.setState({
            data: [],
            num: 0,
          });
        } else {
          this.setState({
            data: res.data.data,
            num: res.data.data.length,
          });
        }
      }
    });
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }


  handleOk = (e) => {
    console.log(e);
    let communityName = document.getElementById('communityName').value;
    let xsaddress = document.getElementById('xsaddress').value;
    if (communityName === "") {
      message.error('请输入小区名称');
    } else if (xsaddress === "") {
      message.error('请输入详细地址');
    } else {
      addcommunity([
        communityName,
        xsaddress,
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          message.success("小区添加成功");
          getcommunity([
          ]).then(res => {
            if (res.data && res.data.message === 'success') {
              this.setState({
                data: res.data.data,
                num: res.data.data.length,
              });
            }
          });
        }
      })
      this.setState({
        visible: false,
      });
    }

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
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

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
          editing: this.isEditing(record),
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
                  defaultSelectedKeys={['66']}
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
                用水管理 / 小区管理
            </div>
              <div className="tit">
                小区管理
            </div>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280, paddingTop: '10px' }}>
                <div style={{ marginTop: '10px' }}>
                  小区查询:<Input placeholder="请输入单号" style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="order" />
                  <Button type="primary" style={{ marginRight: '20px', zIndex: 99, }} onClick={this.equipmentquery}>查询</Button>
                  <Button style={{ zIndex: 99, }} onClick={this.reset}>重置</Button>
                  <div style={{ float: "right" }}>
                    <Button type="danger" style={{ marginLeft: '20px', color: 'white', background: 'red', border: 'none' }} onClick={this.showModal}>
                      {/* <Link to="/addcommunity"> */}
                      新增小区
                        {/* </Link> */}
                    </Button>
                    <Modal
                      title="添加小区"
                      visible={this.state.visible}
                      onOk={this.handleOk}
                      onCancel={this.handleCancel}
                      okText="确认"
                      width="400px"
                    // mask={false}
                    >
                      <div>
                        <span>小区名称：</span>
                        <Input style={{ width: '100%', marginBottom: "10px", marginTop: '10px' }}
                          id="communityName"
                          placeholder="请输入小区名称"
                        />
                      </div>
                      <div>
                        <span>详细地址：</span>
                        <Input placeholder="请输入详细地址" id="xsaddress" style={{ width: '100%', marginBottom: "10px", marginTop: '10px' }} autoComplete="off" />
                      </div>
                    </Modal>
                  </div>
                </div>
                <div className="derive">
                  <Icon type="info-circle-o" />
                  {/* &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                    {hasSelected ? `   ${selectedRowKeys.length}  ` : ''}
                  </span>条记录 */}
                  &nbsp; &nbsp;列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num}</span> 条
                </div>
                <div style={{ marginTop: '10px' }}>
                  <Table
                    dataSource={this.state.data}
                    columns={columns}
                    components={components}
                    bordered
                    rowClassName="editable-row"
                  />
                </div>
              </Content>
            </Layout>
          </Layout>
        </div>
      </LocaleProvider >
    )

  }
}
export default journal = createForm()(journal);

