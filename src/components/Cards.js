import React from 'react';

const Cards = (props) => {
	const cardsPath = './images/cards/';
	const ext = '.png';

	//const newCards = randomizeArray(props.cards);

	return (
		<div id="cards-container">
		{props.deck.map((card, i) => {
			const name = card.rank + '_of_' + card.suit;
			return (
				<div key={i}>
					<img id={card.id} className='card' alt='' src={cardsPath + name + ext} />
				</div>
			);
		})}
		</div>
	);
};

export default Cards;