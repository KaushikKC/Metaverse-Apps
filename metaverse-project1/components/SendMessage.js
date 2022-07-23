import React, { useState } from 'react'
import { useMoralis } from 'react-moralis'

function SendMessage({endOfMessagesRef}) {

    const { user, Moralis} = useMoralis();
    const [message, setMessages] = useState("");
    console.log(endOfMessagesRef.current)
    const sendMessage = (e) => {
        e.preventDefault();

        if(!message) return;

        // this is used to create a Message table in database
        const Messages = Moralis.Object.extend("Messages");
        const messages = new Messages();

        messages.save({
            message: message,
            username: user.getUsername(),
            ethAddress: user.get("ethAddress")
        }).then((message) => {
 
        },
        (error) => {
            console.log(error.message)
        }
        );

        endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });

        setMessages("");
    };


  return (
    <form className="flex fixed bottom-10 bg-black px-6 py-4 max-w-2xl shadow-xl rounded-full border-4 border-blue-400 opacity-80 w-11/12">
       <input className='flex-grow outline-none bg-transparent text-white placeholder-gray-500' 
       type="text"
       value={message}
       onChange={(e) => setMessages(e.target.value)} 
       placeholder={`Enter a Messages ${user.getUsername()}`}
       />
       <button type='submit' onClick={sendMessage} className="font-bold text-pink-500">Send</button>
    </form>
  )
}

export default SendMessage