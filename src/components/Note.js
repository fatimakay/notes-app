import './Home.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/fontawesome-free-solid';
const Note = ({id, title, body, handleDeleteNote}) => {
    //Component to define a single note item 
    return (  
        <div className="col-md-4 mb-4">
              <div className="card card-body">
                <h5 className="card-title">{title}</h5>
                   <p className="card-text"> {body}</p>
                   <footer>
                    <FontAwesomeIcon className='px-1 icon float-right' icon={faTrashCan} 
                   onClick={() => handleDeleteNote(id)}/>
                   </footer>
              </div>
           </div>
    );
}
 
export default Note;