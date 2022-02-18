import React, {Component} from 'react'
import SubTaxonomy from './SubTaxonomy'

class SubTaxonomies extends Component {
  constructor(){
    super()
    this.state = {
      subTaxonomiesList: []
    }
  }
  async getSubTaxonomies(){
    const response = await fetch('http://localhost:3001/api/products/subtaxonomies')
    const subTaxonomies = await response.json()
    console.log(subTaxonomies)
    this.setState({
      subTaxonomiesList: subTaxonomies
    })
    console.log(subTaxonomies)
  }
  componentDidMount(){
    this.getSubTaxonomies()
    // fetch('http://localhost:3001/api/products/subtaxonomies')
  }
  render(){
    return(
      <div className="col-lg-6 mb-4">						
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h5 className="m-0 font-weight-bold text-gray-800">Sub-Taxonomies</h5>
          </div>
          <div className="card-body">
            <div className="row">
              {
              // this.state.subTaxonomiesList[0] ?
              // (this.state.subTaxonomiesList[0].map(subTaxonomy=>{
              //   return (
              //     <SubTaxonomy key={subTaxonomy.id} name={subTaxonomy.name}/>
              //   )
              // })) 
              // : <div>Cargando</div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SubTaxonomies