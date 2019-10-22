import React, { Component } from 'react';
import { Icon, Menu, Layout, Button, Tabs, Input, Select, Table, Form, Popconfirm, LocaleProvider, message, Steps } from 'antd';
import { setparameter, wirelessedit, editValveG } from '../axios';
import { Link } from 'react-router-dom';
import { createForm } from 'rc-form';
import './parameter.css';
import Headers from '../header';
import moment from 'moment';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');


const Option = Select.Option;
const switchtypes = ['关阀', '开阀'];
const openypes = ['打开', '关闭'];
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const typetext = {
  "0": '开阀',
  "1": "关阀",
  "2": '半悬',
  "3": '非阀控',
};
const typenum = {
  "开阀": '0',
  "关阀": '1',
  "半悬": '2',
  "非阀控": '3',
};

const opentext = {
  "1": '打开',
  "0": "关闭",
};

const opennum = {
  "打开": '1',
  "关闭": "0",
};

const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {


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
          return (
            <td {...restProps}>
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}




class journal extends React.Component {

  constructor(props) {
    const typeOptions = switchtypes.map(type => <Option key={type}>{type}</Option>);
    const typeOptionss = openypes.map(type => <Option key={type}>{type}</Option>);
    super(props);
    this.state = {
      editingKey: '',
      editingKeys: '',
      collapsed: false,
      keylist: '',
      keylists: '',
      selectedRowKeys: [],
      dbselectedRowKeys: [],
      reportingInterval: '',
      powermenu: JSON.parse(localStorage.getItem('menu')),
    };


    this.sbcolumn = [{
      title: '产品名称',
      dataIndex: '产品名称',
    }, {
      title: '产品编号',
      dataIndex: 'general_num',
    }, {
      title: '开关阀设置',
      dataIndex: '开关阀设置',
      editables: true,
      render: (text, record, index) => {
        const editables = this.isEditings(record);
        return (
          <div>
            {editables ? (
              <Select defaultValue={typetext[text]} onChange={this.typeChanges} style={{ width: '80%' }} disabled={false} >
                {typeOptions}
              </Select>
            ) : (
                <Select defaultValue={typetext[text]} onChange={this.typeChanges} style={{ width: '80%' }} disabled={true} >
                  {typeOptions}
                </Select>
              )
            }</div>
        )
      }
    }, {
      title: '所属采集器',
      dataIndex: '集中器号',
    }, {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => {
        const editables = this.isEditings(record);
        return (
          <div>
            {editables ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      href="javascript:;"
                      onClick={() => this.saves(form, text, record)}
                      style={{ marginRight: 8 }}
                    >
                      保存
                      </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="确认要取消吗?"
                  onConfirm={() => this.cancel(text)}
                >
                  <a>取消</a>
                </Popconfirm>
              </span>
            ) : (
                <a onClick={() => this.edits(text, record)}>修改阀门状态</a>
              )}
          </div>
        );
      },
    }
    ];


    this.columns = [{
      title: '产品名称',
      dataIndex: '产品名称',
    }, {
      title: '产品编号',
      dataIndex: 'wireless_num',
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <Input defaultValue={record.wireless_num} disabled={false} onChange={this.wirelessnumchange} style={{ width: '200px' }} />
            ) : (
                <Input defaultValue={record.wireless_num} disabled={true} onChange={this.wirelessnumchange} style={{ width: '200px' }} />
              )
            }


          </div>
        );
      },
    }, {
      title: '开关阀设置',
      dataIndex: '开关阀设置',
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <Select defaultValue={typetext[text]}   onChange={this.typeChange} style={{ width: '80%' }} disabled={false} >
                {typeOptions}
              </Select>
            ) : (
                <Select defaultValue={typetext[text]}   onChange={this.typeChange} style={{ width: '80%' }} disabled={true} >
                  {typeOptions}
                </Select>
              )
            }
          </div>
        )
      }
    }
      , {
      title: '霍尔开关设置',
      dataIndex: 'hallflag',
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <Select defaultValue={opentext[text]} onChange={this.typeChange} style={{ width: '80%' }} disabled={false} >
                {typeOptionss}
              </Select>
            ) : (
                <Select defaultValue={opentext[text]} onChange={this.typeChange} style={{ width: '80%' }} disabled={true} >
                  {typeOptionss}
                </Select>
              )
            }
          </div>
        )
      }
    }
      , {
      title: '振动开关设置',
      dataIndex: 'vips',
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <Select defaultValue={opentext[text]} onChange={this.typeChange} style={{ width: '80%' }} disabled={false} >
                {typeOptionss}
              </Select>
            ) : (
                <Select defaultValue={opentext[text]} onChange={this.typeChange} style={{ width: '80%' }} disabled={true} >
                  {typeOptionss}
                </Select>
              )
            }
          </div>
        )
      }
    }, {
      title: '上线周期(小时)',
      dataIndex: '上传时间间隔',
      editable: true,
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <Input defaultValue={record.上传时间间隔} disabled={false} onChange={this.timeChange} style={{ width: '40%' }}  />
            ) : (
                <Input defaultValue={record.上传时间间隔} disabled={true} onChange={this.timeChange} style={{ width: '40%' }} />
              )
            }
          </div>
        );
      },
    }, {
      title: '当前读数',
      dataIndex: 'readingLatest',
      editable: true,
      render: (text, record) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <Input value={this.state.readingLatest} disabled={false} onChange={this.readingChange} style={{ width: '80%' }} />
            ) : (
                <Input defaultValue={text} disabled={true} onChange={this.readingChange} style={{ width: '80%' }}/>
              )
            }


          </div>
        );
      },
    }, {
      title: '操作',
      dataIndex: 'id',
      render: (text, record, index) => {
        const editable = this.isEditing(record);
        return (
          <div>
            {editable ? (
              <span>
                <EditableContext.Consumer>
                  {form => (
                    <a
                      href="javascript:;"
                      onClick={() => this.save(form,record, index)}
                      style={{ marginRight: 8 }}
                    >
                      保存
                      </a>
                  )}
                </EditableContext.Consumer>
                <Popconfirm
                  title="确认要取消吗?"
                  onConfirm={() => this.cancel(text)}
                >
                  <a>取消</a>
                </Popconfirm>
              </span>
            ) : (
                <a onClick={() => this.edit(text, record)}>修改参数</a>
              )}
          </div>
        );
      },
    }
    ];
  }


  timeChange = (e) => {
    console.log(e.target.value)
    this.setState({
      reportingInterval: e.target.value,
    });
  }

  readingChange=(e)=>{
    console.log(e.target.value)
    this.setState({
      readingLatest: e.target.value.replace(/[^\d^\.]+/g,''),
    });
  }




  wirelessnumchange = (e) => {
    console.log(e.target.value)
    this.setState({
      wirelessnum: e.target.value,
    });
  }

  isEditing = (record) => {
    return record.id === this.state.editingKey;
  };

  edit(text, record) {
    console.log(record.上传时间间隔)
    this.setState({
      nowtext:typetext[record.开关阀设置],
      originalinterval: record.上传时间间隔,
      editingKey: record.id,
      dbvaluenum: record.开关阀设置,
      reportingInterval: record.上传时间间隔,
      readingLatest: record.readingLatest,
    });
  }

  isEditings = (record) => {
    return record.id === this.state.editingKeys;
  };

  edits(text, record) {
    this.setState({
      editingKeys: text,
      sbvaluenum: record.开关阀设置,
    });
  }

  save(form, record, text) {
    if (this.state.reportingInterval === this.state.originalinterval) {
      console.log(this.state.reportingInterval === this.state.originalinterval)
      this.setState({
        reportingInterval: null,
      });
    }
    if (this.state.reportingInterval != "" && this.state.reportingInterval != null && parseInt(this.state.reportingInterval&&this.state.reportingInterval != undefined) < 24) {
      message.error('修改失败:上传时间间隔需大于24')
    } else{
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        record.开关阀设置=this.state.dbvaluenum;
        const newData = [...this.state.data];
        console.log( [...this.state.data])
        const index = newData.findIndex(item => record.id === item.key);
        if (index > -1) {
          console.log(index)
          console.log(newData[index])
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          this.setState({
            data: newData,
            editingKey: '',
          }, () => {
            wirelessedit([
              record.wireless_num,
              this.state.dbvaluenum,
              this.state.reportingInterval,
              this.state.wirelessnum,
              Math.floor( this.state.readingLatest * 100) / 100,
            ]).then(res => {
              if (res.data && res.data.message === 'success') {
                if (res.data.data.开关阀命令结果 != null || res.data.data.开关阀命令结果 != undefined) {
                  if (res.data.data.时间间隔命令结果 != null || res.data.data.时间间隔命令结果 != undefined) {
                    message.success('开关阀命令结果:' + res.data.data.开关阀命令结果.message + ', 时间间隔命令结果:' + res.data.data.时间间隔命令结果.message);
                  } else {
                    message.success('开关阀命令结果:' + res.data.data.开关阀命令结果.message + ', 时间间隔命令结果:无');
                  }
                } else {
                  if (res.data.data.时间间隔命令结果 === undefined || res.data.data.时间间隔命令结果 === null) {
                    message.success('开关阀命令结果:无' + ', 时间间隔命令结果:无');
                  } else {
                    message.success('开关阀命令结果:无' + ', 时间间隔命令结果:' + res.data.data.时间间隔命令结果.message);
                  }
                }
              } else {
                message.error("设备未激活，请先激活！");
              }
            });
  
          });
  
        } else {
          newData.push(this.state.data);
          this.setState({ data: newData, editingKey: '' });
        }
      });
    }

  }

  saves(form, text, record) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.dataSource];
      const index = newData.findIndex(item => text === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({
          dataSource: newData,
          editingKeys: '',
        }, () => {
          editValveG([
            record.general_num,
            this.state.sbvaluenum,
          ]).then(res => {
            if (res.data && res.data.message === 'success') {
              if (res.data.updateResult === 1) {
                message.success("信息下发成功");
              } else {
                message.error(res.data.data.message);
              }
            } else {
              message.error("加载失败");
            }
          });
        });
      } else {
        newData.push(this.state.data);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }




  cancel = () => {
    this.setState({
      editingKey: '',
      editingKeys: ''
    });
  };

  wirelessquery = () => {
    var wirelessid = document.getElementById('wirelessid').value
    setparameter([
      wirelessid,
      1,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        console.log(res.data.data)
        this.setState({
          data: res.data.data,
          num1: res.data.data.length,
        });
      }
    });
  }


  wirequery = (e) => {
    var wirelessid = document.getElementById('wirelessid').value
    if(e.keyCode === 13){
      setparameter([
        wirelessid,
        1,
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].key = res.data.data[i].id
          }
          console.log(res.data.data)
          this.setState({
            data: res.data.data,
            num1: res.data.data.length,
          });
        }
      });
    }
  
  }

  wirelessreset = () => {
    document.getElementById('wirelessid').value = '',
      setparameter([
        null,
        1,
      ]).then(res => {
        if (res.data && res.data.message === 'success') {
          for (var i = 0; i < res.data.data.length; i++) {
            res.data.data[i].key = res.data.data[i].id
          }
          this.setState({
            data: res.data.data,
            num1: res.data.data.length,
          });
        }
      });
  }


  generalquery = () => {
    var generalid = document.getElementById('generalid').value
    setparameter([
      generalid,
      3,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        console.log(res.data.data)
        this.setState({
          dataSource: res.data.data,
          num2: res.data.data.length,
        });
      }
    });
  }

  generalreset = () => {
    document.getElementById('generalid').value = '',
      setparameter([
        null,
        3,
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




    setparameter([
      null,
      1,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
        }
        this.setState({
          data: res.data.data,
          num1: res.data.data.length,
        });
      }
    });


    setparameter([
      null,
      3,
    ]).then(res => {
      if (res.data && res.data.message === 'success') {
        for (var i = 0; i < res.data.data.length; i++) {
          res.data.data[i].key = res.data.data[i].id
          res.data.data[i].process = '暂无'
        }
        this.setState({
          dataSource: res.data.data,
          num2: res.data.data.length,
        });
      }
    });


  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(selectedRowKeys.length)
    this.setState({
      selectedRowKeys,
      keylist: selectedRowKeys,
    });
  }

  ondbSelectChange = (dbselectedRowKeys) => {
    this.setState({
      dbselectedRowKeys,
      keylists: dbselectedRowKeys,
    });
  }



  typeChange = (date, dateString) => {
    console.log(date)
    this.setState({
      dbvalue: date,
      nowtext:date,
      dbvaluenum: typenum[date],
    }, function () {
      console.log(this.state.dbvaluenum)
    });

  }
  typeChanges = (date, dateString) => {
    this.setState({
      sbvalue: date,
      sbvaluenum: typenum[date],
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
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const { dbselectedRowKeys } = this.state;
    const rowSelections = {
      dbselectedRowKeys,
      onChange: this.ondbSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const dbhasSelected = dbselectedRowKeys.length > 0;
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
          editing: this.isEditing(record),
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
                defaultSelectedKeys={['13']}
                defaultOpenKeys={['sub2']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
              >
                <Menu.Item key="2" style={{ background: '#0099CB', color: 'white', fontSize: "18px", display: "block", width: "94%", borderRadius: '5px', marginLeft: "3%", marginRight: '3%' }}>
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
              设备管理 / 参数设置
            </div>
            <div className="tit">
              参数设置
            </div>
            <Content style={{ margin: '24px 16px', background: '#fff', minHeight: 280 }}>
              <div className="current">
                <div className="curr">
                  <Tabs onChange={this.tabchange} type="card" style={{ background: 'white' }}>
                    <TabPane tab="无线单表" key="1" style={{ padding: '20px' }}>
                      无线单表:<Input placeholder="请输入无线单表编号/IMEI" style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="wirelessid" onKeyDown={this.wirequery} />
                      <div style={{ float: "right" }}>
                        <Button type="primary" style={{ marginRight: '20px' }} onClick={this.wirelessquery}>查询</Button>
                        <Button onClick={this.wirelessreset}>重置</Button>
                      </div>
                      <div className="derive">
                        <Icon type="info-circle-o" />
                        &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                          {dbhasSelected ? `   ${dbselectedRowKeys.length}  ` : ''}
                        </span>条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num1}</span> 条
                {/* <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button> */}
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <Table
                          rowSelection={rowSelections}
                          components={components}
                          dataSource={this.state.data}
                          columns={columns}
                          bordered
                          rowClassName="editable-row"
                        />
                      </div>
                    </TabPane>
                    <TabPane tab="普通水表" key="2" style={{ padding: '20px' }}>
                      普通水表编号:<Input placeholder="请输入普通水表编号" style={{ width: '20%', marginLeft: '10px', marginRight: '10px' }} id="generalid" />
                      <div style={{ float: "right" }}>
                        <Button type="primary" style={{ marginRight: '20px' }} onClick={this.generalquery}>查询</Button>
                        <Button onClick={this.generalreset}>重置</Button>
                      </div>
                      <div className="derive">
                        <Icon type="info-circle-o" />
                        &nbsp; &nbsp;已选择<span style={{ marginLeft: 8, color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>
                          {hasSelected ? `   ${selectedRowKeys.length}  ` : ''}
                        </span>条记录
                列表记录总计： <span style={{ color: 'rgba(0, 51, 255, 0.647058823529412)', fontWeight: 'bold' }}>{this.state.num2}</span> 条
                {/* <Button type="primary" style={{ float: 'right', marginTop: '3px' }}>数据导出</Button> */}
                      </div>
                      <div style={{ marginTop: '10px' }}>
                        <Table
                          rowSelection={rowSelection}
                          dataSource={this.state.dataSource}
                          components={components}
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

