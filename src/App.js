import React from 'react';
import './App.css';
import {useState} from 'react';

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
        props.onChangeMode(Number(event.target.id)); //id값을 태그로 넘기면 문자가 됨.
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event=>{
      event.preventDefault();
      const title = event.target.title.value; //input에서 가져온 제목
      const body = event.target.body.value;  //input에서 가져온 내용
      props.onCreate(title, body);
    }}>
      <p><input type="text" name="title" placeholder="title"/></p>
      <p><textarea name="body" placeholder="body"></textarea></p>
      <p><input type="submit" value="Create"/></p>
    </form>
  </article>
}
function Update(props) {
  const [title, setTitle] = useState(props.title); //업데이트 하려면 props에 있는 값을 State로 바꿔야 수정할 수 있음.
  const [body, setBody] = useState(props.body);
  return <article>
  <h2>Update</h2>
  <form onSubmit={event=>{
    event.preventDefault();
    const title = event.target.title.value; //input에서 가져온 제목
    const body = event.target.body.value;  //input에서 가져온 내용
    props.onUpdate(title, body);
  }}>
    <p><input type="text" name="title" placeholder="title" value={title} onChange={event=>{
      setTitle(event.target.value); //onChange에서 함수를 이용해 setTitle로 바꿈.
    }}/></p> 
    <p><textarea name="body" placeholder="body" value={body} onChange={event=>{
      setBody(event.target.value); //onChange에서 함수를 이용해 setBody로 바꿈.
    }}></textarea></p>
    <p><input type="submit" value="Update"/></p>
  </form>
</article>
}

function App() {
  //const _mode = useState('WELCOME'); 
  //const mode = _mode[0]; 0번째엔 웰컴이
  //const setMode = _mode[1]; 1번째엔 함수가 저장되어있음.
  const [mode, setMode] = useState('WELCOME'); //축약형

  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4); //id값
  const [topics, setTopics] = useState([
    {id:1, title:'HTML', body:'HTML is ...'}, 
    {id:2, title:'CSS', body:'CSS is ...'},
    {id:3, title:'JavaScript', body:'JavaScript is ...'}
  ])
  let content = null;
  let contextControl = null;
  if(mode === 'WELCOME') { //첫화면
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if(mode === 'READ') { //읽기
    let title, body = null;
    for(let i=0; i < topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    } //title과 body를 알아냄.
    content = <Article title={title} body={body}></Article>
    contextControl = 
    <><li><a gref={'/update/' + id} onClick={event=>{
      event.preventDefault();
      setMode('UPDATE');
    }}>Update</a></li>
    <li><input type="button" value="Delete" onClick={()=>{
      const newTopics = []
      for(let i = 0; i<topics.length; i++) {
        if(topics[i].id !== id) {
          newTopics.push(topics[i]); //빈 배열에 선택된 토픽을 제외한 나머지 토픽을 넣음.
        }
      }
      setTopics(newTopics); //선택한 토픽이 제외된 토픽으로 렌더링.
      setMode('WELCOME'); //첫화면으로 감.
    }}/></li>
    </> 
  } else if(mode === 'CREATE') {
    content = <Create onCreate={(_title, _body)=>{
      const newTopic = {id:nextId, title:_title, body:_body}
      //topics처럼 useState는 Object, array같은 범 객체는 복제해서 변경후 setter로 넣어야 함.
      const newTopics = [...topics] //topics 복제본 (이걸 하는 이유가 기존의 데이터와 같은 데이터면 렌더링이 안되기 때문임.)
      newTopics.push(newTopic); //새로만든 토픽을 복제본에 넣음.
      setTopics(newTopics); //setTopics로 app을 재실행하면서 추가
      setMode('READ'); //상세페이지 이동
      setId(nextId); 
      setNextId(nextId + 1) //ID값 증가.
    }}></Create>
  } else if(mode === 'UPDATE') {
    let title, body = null;
    for(let i=0; i < topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    //제목과 내용을 찾아옴.
    content = <Update title={title} body={body} onUpdate={(title, body)=>{
      const newTopics = [...topics]
      const updatedTopic = {id:id ,title:title, body:body}
      for(let i=0; i<newTopics.length; i++) {
        if(newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
    }}></Update>
  }
    return (
      <div>
        <Header title="WEB" onChangeMode={()=>{ //function()
            setMode('WELCOME'); //setMode에 있는 값으로 바뀌면서 APP가 다시 실행.
        }}></Header>
        <Nav topics={topics} onChangeMode={(_id)=>{
            setMode('READ'); //setMode에 있는 값으로 바뀌면서 APP가 다시 실행.
            setId(_id);
        }}></Nav>
        {content}
        <ul>
          <li><a href="/create" onClick={event=>{
            event.preventDefault();
            setMode('CREATE');
          }}>Create</a></li>
          {contextControl} {/*update는 상세페이지에서만 표시 */}
        </ul>
      </div>
    );
}

export default App;
