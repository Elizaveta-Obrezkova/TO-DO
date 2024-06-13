import './Calendar.css';
import React from 'react';
import Card from '../Card/Card'

function Main(props) {

    return (
      <section className="calendar page__calendar">
        <h1 className="calendar__header">Твой календарь - планировщик дел</h1>
        <div className="elements">
              <button type="button" className="elements__button elements__button_direction_previous" onClick={props.onPreviousMonth}><span className="visually-hidden">Предыдущий месяц</span></button>
              <h2 className="elements__header">{props.month} {props.year}</h2>
              <button type="button" className="elements__button elements__button_direction_next" onClick={props.onNextMonth}><span className="visually-hidden">Следующий месяц</span></button>
              <ul className="elements__column-headings">
                <li className="elements__column-header"><h3>пн</h3></li>
                <li className="elements__column-header"><h3>вт</h3></li>
                <li className="elements__column-header"><h3>ср</h3></li>
                <li className="elements__column-header"><h3>чт</h3></li>
                <li className="elements__column-header"><h3>пт</h3></li>
                <li className="elements__column-header"><h3>сб</h3></li>
                <li className="elements__column-header"><h3>вс</h3></li>
              </ul>
                {props.cards.reverse().map((item) =>
                    (<Card card={item} key={item._id} />)
                )}
            </div>
      </section>
            
    );
}

export default Main;