import React from 'react';
import './Card.css'


function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
    }

    return (
        <div className={props.card.thisMonth ? 'element element_active' : 'element'} onClick={handleClick}>
                <h2 className="element__title">{props.card.day}</h2>
        </div>
    )
}

export default Card;