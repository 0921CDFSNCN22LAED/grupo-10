import { Link } from "react-router-dom"

function NotFound(){
  return (
    <div className="text-center d-flex justify-content-center flex-grow-1 align-items-center">
      <div>
        <h1>404: No encontrado.</h1>
        <Link to="/"><h2>Volver al inicio</h2></Link>
      </div>
    </div>
  )
}

export default NotFound