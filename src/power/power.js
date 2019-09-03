import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Modal, Select, Table, Input, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { powerlist } from '../axios';
import moment from 'moment';
import { createForm } from 'rc-form';
import './power.css';
import Headers from '../header';
import Siderbar from '../sidebar';

const Option = Select.Option;
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;

class journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
    this.columns = [{
      title: '权限名称',
      dataIndex: 'name',
    }, {
      title: '角色类型',
      dataIndex: 'code',
    }, {
      title: '操作',
      dataIndex: 'id',
      render: (text) => {
        return (
          <div>
            <span style={{ marginLeft: '10px' }}>
              <Popconfirm title="确定要删除吗?" onConfirm={() => this.onDelete(text)}>
                <a href="javascript:;">删除</a>
              </Popconfirm>
            </span>
          </div>
        );
      },
    }
    ];
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  componentWillMount = () => {
    document.title = "权限列表";
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        powerlist([
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
    })

  }
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys > 0;
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
      <div id="accountbody" >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <Siderbar />
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
              用户管理 / 权限列表
            </div>
            <div className="tit">
              权限列表
            </div>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
              <div >
                权限名称：<Input placeholder="输入权限名称" style={{ width: '20%', marginLeft: '10px', marginRight: '40px' }} />
                <Button type="primary" style={{ marginRight: '20px' }} onClick={this.equipmentquery}>查询</Button>
                <Button type="primary" onClick={this.showModal} style={{ marginLeft: '20px', color: 'white', backgroundColor: '#d9534f', borderColor: '#d9534f', }}>
                  增加权限
                </Button>
                <Modal
                  title="添加角色"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                  okText="Save"
                >
                  权限名称：<Input placeholder="请输入权限名称" style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
                  权限URL地址：<Input placeholder="请输入权限URL地址" style={{ width: '100%', marginTop: '10px', marginBottom: '10px' }} />
                </Modal>
                <Button style={{ marginLeft: '20px', color: 'white', backgroundColor: '#5cb85c', borderColor: '#5cb85c', }}><Link to="/role">角色列表</Link></Button>
                <Button style={{ marginLeft: '20px', color: 'white', backgroundColor: '#5cb85c', borderColor: '#5cb85c', }}><Link to="/roleassignment">角色分配</Link></Button>
                <Button style={{ marginLeft: '20px', color: 'white', backgroundColor: '#5cb85c', borderColor: '#5cb85c', }}><Link to="/powerassignment">权限分配</Link></Button>
              </div>
              <div className="derive">
                <Icon type="info-circle-o" />
                &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                  {hasSelected ? `   ${selectedRowKeys.length}  ` : ''}
                </span>条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num}</span> 条
                <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button>
              </div>
              <div style={{ marginTop: '10px' }}>
                <Table
                  rowSelection={rowSelection}
                  dataSource={this.state.data}
                  columns={columns}
                  rowClassName="editable-row"
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

