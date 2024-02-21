import React from "react";
import AddNotes from "../AddNotes/AddNotes";
import DisplayNotes from "../DisplayNotes/DisplayNotes"
import Services from "../../Services/noteService";
import Archive from "../ArchiveNotes/ArchiveNotes"
import "./Notes.css";
const service = new Services();

export default function Notes(props) {
    const [show, setShow] = React.useState([]);

    React.useEffect(() => {
        getAllNotes();
    },[]);

    
    const getAllNotes = () => {
        service
            .getNote()
            .then((data) => {
                console.log("dataaaaaa",data.data.title)
                let arrayData = data.data.data;
                let array = arrayData.reverse();
                console.log("arrayaaaaaaaaaaaaaaaa",array);
                setShow(array);
            })
            .catch((err) => {
                console.log("error = " + err);
            });
    };


    return (
        <div className="mainContent" >
            <AddNotes getall={getAllNotes} />
            <DisplayNotes notes={show} getall={getAllNotes}/>
        
        </div>
    );
}