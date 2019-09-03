import React, { Component } from 'react';
import { Icon } from 'antd';
import { message } from 'antd';
import http from 'axios';


class Headers extends Component {
    state = {
        user: '',
        visible: false,
    };
    out = () => {
        http.delete('/api/auth/oauth/token?access_token=' + localStorage.getItem('access_token'), {
        })
            .then(res => {
                window.location.href = "/login";
                localStorage.clear();
            })
    }
    componentWillMount = () => {
        if ((new Date() - localStorage.getItem('currenttime')) / 1000 > 60 * 60 * 12) {
            message.error('登录信息已过期,请重新登录')
            setTimeout(() => {
                window.location = "/login";
                localStorage.clear();
            }, 1500);
        }
        if (localStorage.getItem('access_token') === "" || localStorage.getItem('access_token') === null) {
            window.location = "/login";
        }
        function showTime() {
            let nowtime = new Date();
            let year = nowtime.getFullYear();
            let month = nowtime.getMonth() + 1;
            let date = nowtime.getDate();
            document.getElementById("mytime").innerText = year + "年" + month + "月" + date + "日 " + nowtime.toLocaleTimeString();
        }
        setInterval(showTime, 1000);

    }
    render() {
        return (
            <div style={{  textAlign: 'center', height: '80px', display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ lineHeight: '30px', textAlign: "left", marginLeft: '25px', paddingTop: '10px' }}>
                    {/* <img src={require('./logo1.png')} alt="" style={{ float: 'left', marginTop: '10px', marginRight: '10px' }} /> */}
                </div>
                <div style={{ marginRight: "20px", float: 'right', height: '80px', display: 'flex', alignItems: 'center' }}>
                    <div style={{ textAlign: 'right' }}>
                        <span id="mytime" style={{ display: "inline-block", marginRight: '20px' }}></span>
                        <span style={{ fontSize: '16px', display: 'inline-block', height: '56px' }}>欢迎您，</span>
                        <span style={{ marginRight: '10px', fontSize: '16px', }}>
                            {localStorage.getItem('name')}
                        </span>
                    </div>
                    <div style={{ height: "32px", lineHeight: "32px", textAlign: 'right' }}>

                        <span onClick={this.out} style={{ cursor: 'pointer', marginLeft: '10px',fontSize: '16px',color:'red', }}> <Icon type="export" /> 退出</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default Headers;
