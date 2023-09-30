function Square({value}){
  return<button className="square">{value}</button>
}

export default function Board() {
    return (
      <>
        <div className="row1">        
          <Square value={A}/>
          <Square value={B}/>
          <Square value={C}/>
        </div>
        
        <div className="row2">
          <Square value={1}/>
          <Square value={2}/>
          <Square value={3}/>
        </div>

        <div className="row3">
          <Square value={X}/>
          <Square value={Y}/>
          <Square value={Z}/>
        </div>
      </>);
  }  