import React, {Component} from 'react';
import TOC from "./components/TOC";
import Content from "./components/Content";
import Subject from "./components/Subject";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props); //props 초기화
    this.state = {
      mode:'welcome', //읽기 페이지인지 아닌지를 나타냄.
      subject:{title:'WEB', sub:'world wide web!'},
      welcome:{title:'Welcome', desc:'Hello, React!!'},
      contents:[
        {id:1, title:'HTML', desc:'HTML is HyperText ...'}, 
        {id:2, title:'CSS', desc:'CSS is for design'},
        {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
      ]
    }
  }
  render() { //props, state가 바뀌면 화면이 다시 그려짐.
    console.log('App render');
    var _title, _desc = null;
    if(this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
    } else if(this.state.mode === 'read') {
      _title = this.state.contents[0].title;
      _desc = this.state.contents[0].desc;
    }
    return (
      <div className="App">
        {/*<Subject 
          title={this.state.subject.title} 
          sub={this.state.subject.sub}>
    </Subject>*/}
        <header>
          <h1><a href="/" onClick={function(e){
            e.preventDefault(); //a태그의 기본적인 동작 방법을 금지시킴.
            //debugger; 사용시 디버거부분까지만 실행됨.
            //this.state.mode = 'welcome' this를 찾을수 없어서 끝에 bind(this)를 붙여야함.
            this.setState({
              mode:'welcome'
            })
          }.bind(this)}>{this.state.subject.title}</a></h1>
          {this.state.subject.sub}
        </header>
        <TOC data={this.state.contents}></TOC>
        <Content title={_title} desc={_desc}></Content>
      </div>
    );
  }
}

export default App;
