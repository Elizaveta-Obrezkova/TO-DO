import React from 'react';
import './Card.css'


function Card(props) {

   
    return (
        <div className={props.card.thisMonth ? 'element element_active' : 'element'}>
                <h2 className="element__title">{props.card.day}</h2>
        </div>
    )
}

export default Card;