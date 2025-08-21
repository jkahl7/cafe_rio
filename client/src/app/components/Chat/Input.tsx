import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export interface ChatInputProps {
    value: string;
    onChange: (value: string) => void;
    onSubmit: () => void;
    disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit, disabled = false }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = () => {
        if (message.trim()) {
            onSubmit();
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <Paper elevation={2} sx={{ p: 1, display: 'flex', alignItems: 'center' }}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={disabled}
                size="small"
                multiline
                maxRows={4}
                sx={{ mr: 1 }}
            />
            <IconButton
                color="primary"
                onClick={handleSubmit}
                disabled={disabled || !message.trim()}
                aria-label="send"
            >
                <SendIcon />
            </IconButton>
        </Paper>
    );
};

export default ChatInput;