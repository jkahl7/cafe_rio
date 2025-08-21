import React, { useState } from 'react';
import Input from './Input';
import Output from './Output';
import { ChatMessage } from './Output';

const ChatParticipants = {
    USER: 'User',
    BOT: 'Cafe Rio Bot',
    SYSTEM: 'System',
};

const ChatContainer: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);

    const handleInputChange = (value: string) => {
        setInputText(value);
    };

    // const handleSubmit = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await fetch('/chat', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ message: inputText }),
    //         });
    //         const data = await response.json();
    //         setOutputText(data.reply || 'No response');
    //     } catch (error) {
    //         setOutputText('Error communicating with server.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const handleSubmit = async (input: string) => {
        setLoading(true);
        // again refactor state here
            const chatUpdate = [...outputText];
            chatUpdate.push({ sender: ChatParticipants.USER, id: Date.now().toString(), message: input, timestamp: new Date().toISOString() });
        try {
            const response = await fetch('http://localhost:8080/bot', {
                method: 'POST',
                body: JSON.stringify({ content: input }),
                headers: { 'Content-Type': 'application/json' },
            });
            const message = await response.json();
            console.log(message);
            if (message) {
                //TODO likely usecase for better state management
                 chatUpdate.push({ sender: ChatParticipants.BOT, id: Date.now().toString(), message, timestamp: new Date().toISOString() });
                 setOutputText(chatUpdate);
                // For now, just set the output text directly
                // Note: The id and timestamp are not being used in this example, but can be added if needed
                // For example, you could create a unique id using Date.now() and
            } else {
                setOutputText([{sender: ChatParticipants.SYSTEM, message: 'No response'}]);
        }
        } catch (error) {
                setOutputText([{sender:ChatParticipants.SYSTEM, message: 'Error communicating with server.'}]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Output chatOutput={outputText} loading={loading} />
            <Input
                value={inputText}
                onChange={handleInputChange}
                onSubmit={handleSubmit}
                disabled={loading}
            />
        </div>
    );
};

export default ChatContainer;