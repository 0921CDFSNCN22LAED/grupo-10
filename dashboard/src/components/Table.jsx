function Table(props) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          {props.columns.map((column,i)=>{
            return <th scope="col" key={column+i}>{column}</th>
          })}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">a</th>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <th scope="row">-</th>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          {props.columns.map((column,i)=>{
            return <th scope="col" key={column+i}>{column}</th>
          })}
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
