import './Home.scss';
const Note = ({id, title, body}) => {
    return (  
        <div className="col-md-4 mb-4">
              <div className="card card-body">
                <h5 className="card-title">{title}</h5>
                   <p className="card-text"> {body}</p>
              </div>
           </div>
    );
}
 
export default Note;