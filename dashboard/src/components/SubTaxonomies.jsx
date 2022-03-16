import React, { Component } from 'react';
import SubTaxonomy from './SubTaxonomy';

class SubTaxonomies extends Component {
  constructor() {
    super();
    this.state = {
      hardwareList: [],
      peripheralsList: [],
    };
  }
  async getSubTaxonomies() {
    const response = await fetch(
      'https://pc-gamer-website.herokuapp.com/api/products/subtaxonomies'
    );
    const subTaxonomies = await response.json();
    this.setState({ hardwareList: subTaxonomies.data.hardware });
    this.setState({ peripheralsList: subTaxonomies.data.peripherals });
  }
  componentDidMount() {
    this.getSubTaxonomies();
  }
  render() {
    return (
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">Hardware</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {this.state.hardwareList.map((subTaxonomy) => {
                return (
                  <SubTaxonomy key={subTaxonomy.id} name={subTaxonomy.name} />
                );
              })}
            </div>
          </div>
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">Periféricos</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {this.state.peripheralsList.map((subTaxonomy) => {
                return (
                  <SubTaxonomy key={subTaxonomy.id} name={subTaxonomy.name} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SubTaxonomies;
