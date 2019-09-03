import React, { Component } from 'react';
import { Icon, Button, Select, Table, Menu, Layout, DatePicker, Cascader, Row, Col, Tabs } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { createForm } from 'rc-form';
import { Map, Marker } from 'react-amap';
import './homepage.css';
import Highcharts from 'highcharts/highstock';
import Headers from '../header';


const myDate = new Date();
const { RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;

const dateFormat = 'YYYY/MM/DD HH:mm:ss';
function callback(key) {
  console.log(key);
}
const YOUR_AMAP_KEY = '076cb00b4c9014e47f9b19e1da93daca';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const Option = Select.Option;
const options = [{
  value: 'zhejiang',
  label: '浙江省',
  children: [{
    value: 'hangzhou',
    label: '杭州市',
    children: [{
      value: 'shangcheng',
      label: '上城区',
      children: [{
        value: 'shiyi',
        label: "杭州市十一中"
      }, {
        value: 'shi',
        label: "杭州市十中"
      }, {
        value: 'fenghuang',
        label: "凤凰小学"
      }, {
        value: 'shengli',
        label: "上城区水务商"
      }]
    }],
  }],
}];





const styleC = {
  background: `url('http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/map-marker-icon.png')`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  width: '30px',
  height: '40px',
  color: '#000',
  textAlign: 'center',
  lineHeight: '40px'
}
function onChange(date, dateString) {
  console.log(date, dateString);
}
class journal extends React.Component {

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
  constructor(props) {
    super(props);
    this.state = {
      province: '浙江省',
      powermenu: JSON.parse(localStorage.getItem('menu')),
      city: '杭州市',
      area: '上城区',
      num: 15,
      collapsed: false,
      size: 'small',
      time: myDate,
      selectedRowKeys: [],
      count: 2,
      longitude: '120.201316',
      latitude: '30.236285',
    };
  }




  componentWillMount = () => {


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
      if (this.state.powermenu[i].id === 9 || this.state.powermenu[i].id === 10 || this.state.powermenu[i].id === 68) {
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




    document.title = "总体页面展示";
    window.onload = function () {
      var speed = 30; //数字越大速度越慢
      var tab = document.getElementById("demo");
      var tab1 = document.getElementById("demo1");
      var tab2 = document.getElementById("demo2");
      tab2.innerHTML = tab1.innerHTML; //克隆demo1为demo2
      function Marquee() {
        if (tab2.offsetTop - tab.scrollTop <= 0) {//当滚动至demo1与demo2交界时
          tab.scrollTop += tab1.offsetHeight
        }  //demo跳到最顶端   
        else {
          tab.scrollTop++;
        }
      }
      var MyMar = setInterval(Marquee, speed);
      tab.onmouseover = function () { clearInterval(MyMar) };//鼠标移上时清除定时器达到滚动停止的目的
      tab.onmouseout = function () { MyMar = setInterval(Marquee, speed) };//鼠标移开时重设定时器   
      setTimeout(Marquee, 2000);


      var speed = 50
      var colee2 = document.getElementById("colee2");
      var colee1 = document.getElementById("colee1");
      var colee = document.getElementById("colee");
      colee2.innerHTML = colee1.innerHTML
      colee.scrollTop = colee.scrollHeight
      function Marquee2() {
        if (colee1.offsetTop - colee.scrollTop >= 0)
          colee.scrollTop += colee2.offsetHeight
        else {
          colee.scrollTop--
        }
      }
      var MyMar2 = setInterval(Marquee2, speed)
      colee.onmouseover = function () { clearInterval(MyMar2) }
      colee.onmouseout = function () { MyMar2 = setInterval(Marquee2, speed) }

    }

  }


  componentDidMount() {
    var chart1 = new Highcharts.Chart({
      chart: {
        renderTo: 'container1',
        type: 'column'
      },
      title: {
        text: '昨日各时段用水量统计'
      },
      credits: {
        enabled: false // 禁用版权信息
      },
      xAxis: {
        title: {
          text: 'x轴标题'
        }
      },
      yAxis: {
        title: {
          text: '用水量/L'
        }
      },
      xAxis: {
        type: 'datetime'
      },

      series: [{
        data: [15252, 35272, 54220, 22787, 22552, 45252, 25421, 80587, 56852, 75871, 57881, 85850, 25272, 52253, 57478, 58710, 57850, 85770, 124525, 12566, 52523, 25555, 34442, 58556],
        pointStart: Date.UTC(2010, 0, 1),
        pointInterval: 3600 * 1000 // one hour
      }]
    });





  }



  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  tabchange = (key) => {
    if (key === '1') {
      var chart1 = new Highcharts.Chart({
        chart: {
          renderTo: 'container1',
          type: 'column'
        },
        title: {
          text: '昨日各时段用水量统计'
        },
        xAxis: {
          title: {
            text: 'x轴标题'
          }
        },
        yAxis: {
          title: {
            text: '用水量/L'
          }
        },
        credits: {
          enabled: false // 禁用版权信息
        },
        xAxis: {
          type: 'datetime',
        },

        series: [{
          data: [15252, 35272, 54220, 22787, 22552, 45252, 25421, 80587, 56852, 75871, 57881, 85850, 25272, 52253, 57478, 58710, 57850, 85770, 124525, 12566, 52523, 25555, 34442, 58556],
          pointStart: Date.UTC(2010, 0, 1),
          pointInterval: 3600 * 1000 // one hour
        }]
      });

    }


    if (key === '2') {
      console.log(key)
      var chart2 = new Highcharts.Chart({
        chart: {
          renderTo: 'container2',
          type: 'column'
        },
        title: {
          text: '上周每日用水量统计'
        },
        xAxis: {
          categories: [
            '星期日', '星期一', '星期一二', '星期三', '星期四', '星期五', '星期六',
          ],
          crosshair: true
        },
        credits: {
          enabled: false // 禁用版权信息
        },
        yAxis: {
          title: {
            text: '用水量/L'
          }
        },
        series: [{
          data: [15252, 35272, 54220, 22787, 22552, 45252, 25421],
        }]
      });
    }




    if (key === '3') {
      console.log(key)
      var chart3 = new Highcharts.Chart({
        chart: {
          renderTo: 'container3',
          type: 'column'
        },
        title: {
          text: '今年每月用水量统计'
        },
        credits: {
          enabled: false // 禁用版权信息
        },
        xAxis: {
          categories: [
            '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
          ],
          crosshair: true
        },
        yAxis: {
          title: {
            text: '用水量/L'
          }
        },
        series: [{
          data: [15252, 35272, 54220, 22787, 22552, 45252, 25421, 54556, 52565, 26362, 78652, 15225],
        }]
      });
    }

  }
  onChange = (date, dateString) => {
    if (dateString[3].value === "shiyi") {
      this.setState({
        longitude: '120.160833',
        latitude: ' 30.302786',
      });
    }
    if (dateString[3].value === "shengli") {
      this.setState({
        longitude: '120.201316',
        latitude: ' 30.236285',
      });
    }
    if (dateString[3].value === "shi") {
      this.setState({
        longitude: '120.175573',
        latitude: ' 30.25539',
      });
    }
    if (dateString[3].value === "fenghuang") {
      this.setState({
        longitude: '120.179335',
        latitude: '30.219246',
      });
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
    return (
      <div id="homepagebody" >
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <div className="logo" />
            <Menu
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['1']}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="" style={{ background: '#0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
                <Icon type="windows" />
                <span>水表管理平台</span>
              </Menu.Item>
              <Menu.Item key="1" >
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
              <SubMenu key="sub4" title={<span><Icon type="calendar" /><span>日志管理</span></span>}>
                {powers3}
                <SubMenu key="sub5" title={<span>用户日志</span>}>
                  {powers4}
                </SubMenu>
              </SubMenu>
              <SubMenu key="sub6" title={<span><Icon type="sync" /><span>生命周期</span></span>}>
                {powers5}
              </SubMenu>
              {/* <SubMenu key="sub7" title={<span><Icon type="dashboard" /><span>OTA</span></span>}>
                {powers6}
              </SubMenu> */}
              <SubMenu key="sub8" title={<span><Icon type="warning" /><span>产品监控</span></span>}>
                <SubMenu key="sub9" title={<span>产品测试</span>}>
                  {powers7}
                </SubMenu>
                {powers8}
              </SubMenu>
            </Menu>
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
              <Row>
                <Col span={8} >
                  <div className="navhead">
                    <p className="navtitle">今日报警数量</p>
                    <p className="number"><span style={{ color: 'blue' }}>5</span>台</p>
                    <p className="beizhu">备注：</p>
                  </div>
                </Col>
                <Col span={8} style={{ paddingLeft: '12px' }}>
                  <div className="navhead">
                    <p className="navtitle">今日维护数量</p>
                    <p className="number"><span style={{ color: 'red' }}>2</span>台</p>
                    <p className="beizhu">备注： 剩余 <span style={{ color: 'red', fontSize: '18px', fontWeight: 'bold' }}>3</span> 台正在维护中</p>
                  </div>
                </Col>
                <Col span={8} style={{ paddingLeft: '12px' }}>
                  <div className="navhead">
                    <p className="navtitle">设备分布</p>
                    <p className="number"><span style={{ color: 'green' }}>4</span>所</p>
                    <p className="beizhu">备注：总计 <span style={{ color: 'green', fontSize: '18px', fontWeight: 'bold' }}>10</span> 台设备 </p>
                  </div>
                </Col>
              </Row>
            </div>
            <Content style={{ margin: '24px 16px', minHeight: 280, marginTop: '10px' }}>
              <Row>
                <Col span={7} >
                  <div id="report">
                    <h3 style={{ textAlign: 'center', fontSize: '20px', color: 'orange' }}>24小时报警情况总览</h3>
                    <div id="demo" style={{ overflow: 'hidden', height: '400px', width: '100%' }}>
                      <div id="demo1">
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1051 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1052 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1053 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1054 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1055 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1056 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1057 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1058 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1059 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1060 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1061 </p>
                      </div>
                      <div id="demo2"></div>
                    </div>
                  </div>
                </Col>
                <Col span={10} style={{ paddingLeft: '12px' }}>
                  {/* <div style={{ width: '100%', height: '300px' }} >
                    <Cascader defaultValue={['zhejiang', 'hangzhou', 'shangcheng', 'shengli']} options={options} onChange={this.onChange} style={{ width: '100%', marginBottom: '20px' }} />
                    <Map
                      amapkey={YOUR_AMAP_KEY}
                      center={{ longitude: this.state.longitude, latitude: this.state.latitude }}
                      zoom={20}
                    >
                      <Marker position={{ longitude: 120.179335, latitude: 30.219246 }}  >

                      </Marker>
                      <Marker position={{ longitude: 120.201316, latitude: 30.236285 }}  >

                      </Marker>
                      <Marker position={{ longitude: 120.160833, latitude: 30.302786 }}  >

                      </Marker>
                      <Marker position={{ longitude: 120.175573, latitude: 30.25539 }} >
                        <div style={styleC}>{this.state.value}</div>
                      </Marker>
                    </Map>
                  </div> */}
                </Col>
                <Col span={7} style={{ paddingLeft: '12px' }}>
                  <div style={{ width: '100%', height: '350px', background: "white", overflow: 'hidden', textAlign: "center", paddingTop: '20px' }} >
                    <h3 style={{ textAlign: 'center', fontSize: '20px', color: 'orange' }}>24小时维护情况统计</h3>
                    <div id="colee" style={{ overflow: 'hidden', height: '400px', width: '100%' }}>
                      <div id="colee1">
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1051 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1052 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1053 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1054 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1055 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1056 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1057 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1058 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1059 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1060 </p>
                        <p>时间： 22:05:00 | 用户：浙大玉泉校区 | 编号：1061 </p>
                      </div>
                      <div id="colee2"></div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="diagram">
                {/* <RangePicker 
            style={{marginLeft:'20px',position:'absolute',top:'5px',zIndex:"99"}}  
            defaultValue={[moment().startOf('day'), moment(this.state.time, dateFormat)]}
            format={dateFormat}
            ranges={{ 今天: [moment().startOf('day'), moment().endOf('day')], '本月': [moment().startOf('month'), moment().endOf('month')] }}
            onChange={this.timeonChange}
          />   */}
                <Tabs type="card" onChange={this.tabchange} >
                  <TabPane tab="本日" key="1">
                    <div id="container1" style={{ height: '400px' }}></div>
                  </TabPane>
                  <TabPane tab="上周" key="2" forceRender={true}>
                    <div id="container2" style={{ height: '400px' }}></div>
                  </TabPane>
                  <TabPane tab="今年" key="3" forceRender={true}>
                    <div id="container3" style={{ height: '400px' }}></div>
                  </TabPane>
                </Tabs>
              </div>
            </Content>
          </Layout>
        </Layout>
      </div>
    )
  }
}
export default journal = createForm()(journal);

