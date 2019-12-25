import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox, Modal, message } from 'antd';
import { createForm } from 'rc-form';
// import 'babel-polyfill'
import http from 'axios';
// import { login } from '../axios';

import { Link } from 'react-router-dom';
import './login.css';

const FormItem = Form.Item;

// function b64EncodeUnicode(str) {
//   return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
//     function (match, p1) {
//       return String.fromCharCode('0x' + p1);
//     }));
// }




class logins extends Component {
  componentWillMount = () => {
    document.title = "登录页面";
    localStorage.clear();
  }
  state = {
    username: '',
    password: '',
    visible: false,
  }
  login_btn = () => {
    console.log(1)
    this.setState({
      btn_disabled: true,
    });
  };

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
  showModal = () => {
    console.log(1)
    this.setState({
      visible: true,
    });
  }

  logindown = (e) => {
    if (e.keyCode === 13) {
      this.handleSubmit()
    }
  }

  handleSubmit = (e) => {
    this.props.form.validateFields((err, values) => {
      if (values.userName === "") {
        message.error("请输入账号");
      }
      else if (values.password === "") {
        message.error("请输入密码");
      }
      if (!err) {
        http.defaults.headers.get['Content-Type'] = "application/x-www-form-urlencoded"
        http.get('http://water.terabits.cn:8040/auth/login?username=' + values.userName + '&password=' + values.password + '&type=user&grant_type=password', {
          auth: {
            username: "webApp",
            password: 'webApp',
          }
        }).then(res => {
          if (res.data.code === 1004) {
            message.error("密码错误！");
          } else if (res.data.code === 1003) {
            message.error("用户名不存在！");
          }
          else if (res.data.code === 0) {
            message.success('登录成功')
            console.log(res.data.data.menu)
            localStorage.setItem('access_token', res.data.data.access_token)
            localStorage.setItem('currenttime', new Date().getTime())
            localStorage.setItem('name', res.data.data.name)
            localStorage.setItem('menu', JSON.stringify(res.data.data.menu))
            setTimeout(() => {
              window.location.href = res.data.data.menu[1].code;
            }, 1000);
          }
        })
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      // <div id="loginmbody" >
      //   <div style={{ marginTop: "30px", marginLeft: '40px', fontFamily: '方正粗倩简体', color: 'white', fontSize: '35px' }}>
      //     {/* <img src={require('./logo.png')} alt="" className="footimg" /> */}
      //     钛比水表管理平台
      //   </div>
      //   <Form className="login-form" style={{ background: 'url(http://maoyang.terabits.cn/black.png)', padding: '40px', borderRadius: '10px', paddingTop: '10px' }}>
      //     <div style={{
      //       color: 'white',
      //       fontSize: '30px',
      //       textAlign: 'center',
      //       marginBottom: '20px'
      //     }}>
      //       账密登录
      //     </div>
      //     <FormItem>
      //       {getFieldDecorator('userName', {
      //         rules: [{ required: true, message: 'Please input your username!' }],
      //       })(
      //         <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" autocomplete="off" />
      //       )}
      //     </FormItem>
      //     <FormItem>
      //       {getFieldDecorator('password', {
      //         rules: [{ required: true, message: 'Please input your Password!' }],
      //       })(
      //         <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" autocomplete="off" />
      //       )}
      //     </FormItem>
      //     <FormItem style={{ marginBottom: '0' }} >
      //       {getFieldDecorator('remember', {
      //         valuePropName: 'checked',
      //         initialValue: true,
      //       })(
      //         <Checkbox style={{ color: 'white' }}>记住密码</Checkbox>
      //       )}
      //       <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
      //         登录
      //         </Button>
      //       {/* <a  style={{display:'block',textAlign:'right'}}  onClick={this.showModal}>联系管理员</a> */}
      //       <Modal
      //         title="管理员信息"
      //         visible={this.state.visible}
      //         onOk={this.handleOk}
      //         onCancel={this.handleCancel}
      //       >
      //         <p>姓名：</p>
      //         <p>联系电话：</p>
      //         <p>地址：</p>
      //       </Modal>
      //     </FormItem>
      //   </Form >
      // </div >
      <div id="signbody">
        <div style={{ display: "flex", flexDirection: 'column' }}>
          <div className="SignIn-body">
            <div className="cover">
              <div className="logo">
                <img src={require('./logo1.png')} alt="" style={{ width: "70px", marginRight: '20px' }} />
                钛比智慧水务管理平台
            </div>
              <div className="loginmain">
                <div className="loginl">

                </div>
                <div className="loginr">
                  <span className="logintitle">
                    登录
                </span>
                  <div>
                    <FormItem style={{ marginBottom: '40px', marginTop: '35px' }}>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input
                          prefix={
                            <span style={{ borderRight: '1px solid #d9d9d9', paddingRight: '10px' }}>
                              <img src={require('./user.png')} alt="" style={{ width: "15px" }} />
                            </span>
                          }
                          className="SignIn-Input"
                          placeholder="请输入账号"
                          autocomplete="off"
                          onKeyDown={this.logindown}
                        />
                      )}
                    </FormItem>
                  </div>
                  <div>
                    <FormItem style={{ marginBottom: '40px' }}>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input
                          prefix={
                            <span style={{ borderRight: '1px solid #d9d9d9', paddingRight: '10px' }}>
                              <img src={require('./pass.png')} alt="" style={{ width: "15px" }} />
                            </span>
                          }
                          className="SignIn-Input"
                          type="password"
                          placeholder="请输入密码"
                          autocomplete="off"
                          onKeyDown={this.logindown}
                        />
                      )}
                    </FormItem>
                  </div>
                  <div>
                    <Button
                      className="SignIn-requestbutton"
                      onClick={this.handleSubmit}
                      style={{ height: '40px', width: '100%', fontSize: '18px', background: '#0099cb', color: 'white', border: 'none' }}
                    >
                      <span>登录</span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bombtn">
                技术支持：&nbsp;&nbsp;<a href="http://www.terabits.cn/" target="_blank" style={{ color: '#666666' }}>杭州钛比科技有限公司</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;联系电话：&nbsp;&nbsp;0571-87755736
              </div>
              <div className="bombtns">
                备案号：浙ICP备16003817号-1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;网站标识：3610782
              </div>
              <div className="bombtns">
                Operated by Hangzhou terabits technology co. LTD
              </div>
              <div className="bombtns">
                <img src={require('./bot.png')} alt="" style={{ width: '20px', marginRight: '10px' }} />
                <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010602007808" target="_blank" style={{ color: '#666666' }}>浙公网安备33010602009975号</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default logins = createForm()(logins);

