import React from 'react';
import './App.css';

function Article(props){
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}

function Header(props) {
  return <header>
    <h1><a href="/" onChangeMode={(event)=>{ //function(event)
            event.preventDefault(); //a태그의 기본적인 동작 방법을 금지시킴.
            //debugger; 사용시 디버거부분까지만 실행됨.
            props.onChangeMode();
          }}>{props.title}</a></h1>
  </header>
}

function Nav(props){
  const lis = []
  for(let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i];
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={event=>{
        event.preventDefault();
        props.onChangeMode(event.target.id);
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}

function App() {
  const topics = [
    {id:1, title:'HTML', desc:'HTML is HyperText ...'}, 
    {id:2, title:'CSS', desc:'CSS is for design'},
    {id:3, title:'JavaScript', desc:'JavaScript is for interactive'}
  ]
    return (
      <div>
        <Header title="WEB" onChangeMode={()=>{ //function()
            alert('Header');
        }}></Header>
        <Nav topics={topics} onChangeMode={(id)=>{
          alert(id);
        }}></Nav>
        <Article title="Welcome" body="Hello, WEB"></Article>
      </div>
    );
}

export default App;
