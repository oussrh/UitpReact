import React from 'react';

import "../Incident.css"

const  FrequenceSelect = (props)=>{


        return(
            <select defaultValue={props.freq} className="frequence" id={props.id} name="frequence" onChange={props.onChange}>
                <option value={-1}>-1</option>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
            </select>
        )
    

}

export default FrequenceSelect;