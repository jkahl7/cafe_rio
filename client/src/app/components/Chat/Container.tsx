import React, { useState } from 'react';
import Input from './Input';
import Output from './Output';

const ChatContainer: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
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


    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:8080/info', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
            setOutputText(data.reply || 'No response');
        } catch (error) {
            setOutputText('Error communicating with server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Output messages={[{id: '1', message: outputText, timestamp: 'asdf' }]} />
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