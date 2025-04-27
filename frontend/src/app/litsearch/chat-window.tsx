'use client';

import { useState, useEffect } from 'react';
import InfoCard from './info-card'; // make sure path is correct

type Card = {
  title: string;
  findings: string;
  readMore: string;
};

export default function ChatWindow() {
  const [text, setText] = useState('');
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedInput = localStorage.getItem('userInput');
    if (savedInput) {
      setText(savedInput);
      sendTextToBackend(savedInput);
      localStorage.removeItem('userInput');
    }
  }, []);

  const sendTextToBackend = async (inputText: string) => {
    if (!inputText.trim()) return;
    try {
      setLoading(true);

      const response = await fetch('http://localhost:5004/api/home-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      console.log('Server Response:', data);

      if (data.cards) {
        setCards(data.cards);
      } else {
        console.error('No cards field!');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <div className="text-center text-gray-500 text-lg">
          Thinking... 🔎 Fetching research papers...
        </div>
      ) : (
        <div>
          {cards.length > 0 ? (
            cards.map((card, idx) => (
              <div key={idx} className="mb-4">
                <InfoCard
                  title={card.title}
                  findings={card.findings}
                  readMore={card.readMore}
                />
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400">No research results yet. Start your search above!</div>
          )}
        </div>
      )}
    </div>
  );
}


// 'use client';

// import { useState, useEffect } from 'react';
// import InfoCard from './info-card'; // fix your path if needed

// type Card = {
//   title: string;
//   findings: string;
//   readMore: string;
// };

// export default function ChatWindow() {
//   const [text, setText] = useState('');
//   const [userInput, setUserInput] = useState('');
//   const [cards, setCards] = useState<Card[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const savedInput = localStorage.getItem('userInput');
//     if (savedInput) {
//       setUserInput(savedInput);
//       setText(savedInput); // set input box too
//       sendTextToBackend(savedInput);
//       localStorage.removeItem('userInput'); // clear it after use
//     }
//   }, []);

//   const sendTextToBackend = async (inputText: string) => {
//     if (!inputText.trim()) return;
//     try {
//       setLoading(true);

//       const response = await fetch('http://localhost:5004/api/home-chat', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ text: inputText }),
//       });

//       const data = await response.json();
//       console.log('Server Response:', data);

//       if (data.cards) {
//         setCards(data.cards);
//       }
//       else {
//         console.error('No cards found in response');
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4">
//       {/* Input box at the top */}
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         placeholder="Find me papers about..."
//         className="border p-2 w-full mb-2"
//       />

//       {/* InfoCards Section */}
//       <div className="mt-4">
//         {loading && <div className="text-gray-600">Loading...</div>}

//         {cards.map((card, idx) => (
//           <div key={idx} className="mb-4">
//             <InfoCard
//               title={card.title}
//               findings={card.findings}
//               readMore={card.readMore}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
