import React from 'react';

import "../Incident.css"

const CommentInput = (props) =>{
        let test = "" 
        props.entries.filter(i => {if(i.idIncidents === props.id) { test = i.commentaire }})
        return(
            <input defaultValue={test} type="text" className="comment" placeholder="comment" name="commentaire" onChange={props.onChange}/>
            )

}

export default CommentInput;