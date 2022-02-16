import React from 'react';

class TableRow extends React.Component {
  renderFromProps() {
    return Object.keys(this.props).map((propKey) => this.props[propKey]);
  }

  render() {
    return (
      <tr>
        {this.renderFromProps().map((cell, i) => {
          return <td key={'' + cell + i}>{cell}</td>;
        })}
      </tr>
    );
  }
}

export default TableRow;
