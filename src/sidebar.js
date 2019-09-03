import React, { Component } from 'react';
import { Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';


const SubMenu = Menu.SubMenu;


class Siderbar extends Component {
  state = {
    user: '',
    visible: false,
  };
  render() {
    return (
      <div className="Layout-left">
        <Menu
          defaultSelectedKeys={['8']}
          defaultOpenKeys={['sub3']}
          mode="inline"
          theme="dark"
          inlineCollapsed={this.state.collapsed}
        >
          <Menu.Item key="8" style={{ background: '#1890ff', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
            <Icon type="windows" />
            <span>水表管理平台</span>
          </Menu.Item>
          <Menu.Item key="0">
            <Link to="/homepage">
              <Icon type="bar-chart" />
              <span>数据概览</span>
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" title={<span><Icon type="file-text" /><span>信息查询</span></span>}>
            <Menu.Item key="1"><Link to="/product">产品信息</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/connector">接口信息</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="desktop" /><span>设备管理</span></span>}>
            <Menu.Item key="4"><Link to="/basic">基本信息</Link></Menu.Item>
            <Menu.Item key="5"><Link to="/status">设备状态</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/parameter">参数设置</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="user" /><span>用户管理</span></span>}>
            <Menu.Item key="6"><Link to="/waterman">水务商</Link></Menu.Item>
            <Menu.Item key="7"><Link to="/account">账户管理</Link></Menu.Item>
            <Menu.Item key="8"><Link to="/role">角色管理</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="calendar" /><span>日志管理</span></span>}>
            <Menu.Item key="9"><Link to="/journal">数据日志</Link></Menu.Item>
            <Menu.Item key="10"><Link to="/datalogs">设备日志</Link></Menu.Item>
            <SubMenu key="sub5" title={<span>用户日志</span>}>
              <Menu.Item key="11"><Link to="/userlogs">登入登出</Link></Menu.Item>
              <Menu.Item key="12"><Link to="/otherlogs">其他日志</Link></Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu key="sub6" title={<span><Icon type="sync" /><span>生命周期</span></span>}>
            <Menu.Item key="13"><Link to="/lifecycle">基本信息</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub7" title={<span><Icon type="dashboard" /><span>OTA</span></span>}>
            <Menu.Item key="15"><Link to="/history">历史记录</Link></Menu.Item>
            <Menu.Item key="16"><Link to="/operation">操作</Link></Menu.Item>
          </SubMenu>
          <SubMenu key="sub8" title={<span><Icon type="warning" /><span>产品监控</span></span>}>
            <SubMenu key="sub9" title={<span>产品测试</span>}>
              <Menu.Item key="22"><Link to="/collectorstest">采集器测试</Link></Menu.Item>
              <Menu.Item key="23"><Link to="/wirelesstest">无线单表测试</Link></Menu.Item>
            </SubMenu>
            <Menu.Item key="17"><Link to="/instorage">产品出库</Link></Menu.Item>
            <Menu.Item key="19"><Link to="/sendout">产品发货</Link></Menu.Item>
            <Menu.Item key="20"><Link to="/confirm">确认收货</Link></Menu.Item>
            <Menu.Item key="21"><Link to="/maintenance">产品维修</Link></Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}
export default Siderbar;
