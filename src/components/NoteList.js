import Note from "./Note";
import './Home.scss';

const NoteList = ({note}) => {
    return ( 
        <div id="notes-grid" className="row">
            {
                //map function: for each note, render a <Note> component
                note.map((note) => 
                <Note id={note.id} title={note.title} body={note.body}/>
            )}
        </div>
     );
}
 
export default NoteList;