import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Cards from './components/Cards';
import Win from './components/Win';

const App = () => {
	const cards = [];
	const suits = ['clubs', 'diamonds', 'hearts', 'spades'];
	const ranks = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king'];

	let index = 0;
	for (let i = 0; i < 13; i++) {
		for (let j = 0; j < 4; j++) {
			cards.push({
				id: index,
				rank: ranks[i],
				suit: suits[j]
			});

			index++;
		}
	}

	const [deck, setDeck] = useState(cards);
	const [pickedCards, setPickedCards] = useState([]);
	const [score, setScore] = useState(0);
	const [highScore, setHighScore] = useState(0);
	const [win, setWin] = useState(false);

	// Shuffle array using Fisher-Yates algorithm
	const randomizeArray = (array) => {
		let a = array.slice(); // Clone array because cannot directly modify state

		// While there are elements to shuffle
		for (let i = a.length - 1, randomIndex; i > 0; i--) {
			// Pick a remaining element at random
			randomIndex = Math.floor(Math.random() * i);

			// Swap with current element
			let temp = a[i];
			a[i] = a[randomIndex];
			a[randomIndex] = temp;
		}

		return a;
	};

	useEffect(() => {
		const pickCard = (event) => {
			const id = parseInt(event.target.id); // Get card id and parse as int
			let alreadyPicked = false;

			// Check if card has already been picked
			pickedCards.forEach(c => {
				if (c.id === id) {
					alreadyPicked = true;
				}
			});

			/* If not already picked or is first card, add to picked cards & increase score,
			otherwise reset states and set high score */
			if (!alreadyPicked || pickedCards.length === 0) {
				setPickedCards(pickedCards.concat(cards[id]));
				setScore(score + 1);
				setDeck(randomizeArray(deck));

				// Check win condition
				if (score + 1 === cards.length) {
					setWin(true);
				}
			} else {
				setPickedCards([]);
				setScore(0);
				setDeck(cards);

				if (score > highScore) {
					setHighScore(score);
				}
			}
		};

		// Add event listeners to cards
		const cardElements = document.querySelectorAll('.card');
		cardElements.forEach(c => {
			c.addEventListener('click', pickCard);
		});

		// On component unmount, remove event listeners from cards
		return () => {
			cardElements.forEach(c => {
				c.removeEventListener('click', pickCard);
			});
		};
	}); // Leave out dependency array [] to useEffect on component mount & update

	// On Play Again
	const playAgain = () => {
		setPickedCards([]);
		setScore(0);
		setHighScore(0);
		setDeck(cards);
		setWin(false);
	};

	return (
		<div>
			<Header score={score} highScore={highScore} />
			{win ? <Win win={win} playAgain={playAgain} /> : <Cards deck={deck} />}
		</div>
	);
};

export default App;