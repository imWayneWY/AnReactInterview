import React, {useContext, useState} from 'react';


const ThemeContext = React.createContext();
class List extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sortItems: []
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount(){
    this.setState({
      sortItems: this.props.items
    })
  }
  handleClick(e,index){
    let {sortItems} = this.state;
    let top = sortItems.splice(index,1);
    sortItems.insert(0,top);
    this.setState({sortItems});
  }
  render() {
    return (
      <ul>
        {this.state.sortItems.map((item,index) => 
          <li 
            key={index}
            onClick = {(e,index) => this.handleClick(e,index)}
          >
              {item}
          </li>)
        }
      </ul>
    );
  }
}

// class CommentList extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = {
//       lists: []
//     };
//     this.handleClick = this.handleClick.bind(this);
//   }
  
//   render() {
//     return (<div>
//               <form>
//                 <input type="text" />
//                 <input type="button" value="Post" />
//               </form>
//               <ul>
//               </ul>
//            </div>);
//   }
// }

const CommentList = () => {
  const [lists, setLists] = React.useState([]);
  const [txt, setTxt] = React.useState('');
  const handleClick= () => {
    if (!txt) return;
    let newLists = lists;
    newLists.push(txt);
    setLists(newLists);
    setTxt('');
  }

  return(<div>
    <form>
      <input type="text" value={txt} onChange={e => setTxt(e.target.value)}/>
      <input type="button" onClick={handleClick} value="Post" />
    </form>
    <ul>
      {
        lists.map((item,index) => <li key={index}>{item}</li>)
      }
    </ul>
  </div>);
}

const Content = () => {
  const context = useContext(ThemeContext); // change this
  return (
    <section className={`theme-${context.theme}`}>
      <span>Current theme: {context.theme}</span>
      <button onClick={context.switchTheme}>Switch Theme</button>
    </section>
  );
};

function Cards({rows,columns}){
  const [up,setUp] = React.useState({x:null,y:null});

  let rowArr = Array.from(new Array(rows).keys());
  let colArr = Array.from(new Array(columns).keys());

  return(
    <table>
      <tbody>
        {
          rowArr.map(row => <tr key={row}>
            {  
              colArr.map(col => 
                <td key={col}
                  onClick = {() => setUp({x:row, y:col})}
                >
                  {(row===up.x&&col===up.y)?'up':'down'}
                </td>)
            }
          </tr>)
        }
      </tbody>
    </table>
  )
}
function App() {
  return (
    <Cards rows={2} columns={2} />
  );
}

export default App;