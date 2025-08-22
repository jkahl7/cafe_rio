import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { send } from 'process';

export interface ChatMessage {
    sender: string;
    message: string;
    id?: string;
    timestamp?: string;
}

interface ChatOutputProps {
    chatOutput: ChatMessage[];
    loading?: boolean;
}
// Example ChatParticipants object for reference

const senderStyles: Record<string, { color: string; fontWeight?: number, alignItems?: string }> = {
    User: { color: '#1976d2', fontWeight: 600, alignItems: 'flex-end' },
    System: { color: '#d32f2f', fontWeight: 700, alignItems: 'center' },
};
const ChatOutput: React.FC<ChatOutputProps> = ({ chatOutput }) => {

    const paperRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
           if (paperRef.current) {
            paperRef.current.scrollIntoView({ behavior: 'smooth' });
            console.log('Chat output updated, scrolling anchor into view.');
        }
    }, [chatOutput]);

    return (
        <Paper ref={paperRef} elevation={3} sx={{  height: 300,
          overflowY: 'auto',
          padding: 10,
          border: '1px solid #ccc', p: 2,  width: 800 }}>
            {chatOutput.length === 0 && (
                <Typography variant="body2" color="text.secondary" align="center">
                    Type your question below and I will do my best to answer it.
                </Typography>
            )}
            <List>
                {chatOutput.map(({sender, id,  message, timestamp }) => (
                    <ListItem
                        key={id}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: sender === 'User' ? 'flex-end' : 'flex-start',
                            border: 'none',
                            background: 'none',
                        }}
                        disableGutters
                    >
                        <Box
                            sx={{
                                bgcolor: sender === 'User' ? '#e3f2fd' : '#f8bbd0',
                                color: senderStyles[sender]?.color || '#c919d2ff',
                                borderRadius: sender === 'User'
                                    ? '16px 16px 4px 16px'
                                    : '16px 16px 16px 4px',
                                p: 1.5,
                                maxWidth: '75%',
                                boxShadow: 1,
                                mb: 1,
                            }}
                        >
                            <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                                <Typography
                                    variant="subtitle2"
                                    color={senderStyles[sender]?.color || '#c919d2ff'}
                                    sx={{ fontWeight: senderStyles[sender]?.fontWeight || 'normal' }}
                                >
                                    {sender}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    {timestamp && new Date(timestamp).toLocaleTimeString()}
                                </Typography>
                            </Box>
                            <Typography variant="body1" color="text.primary">
                                {message}
                            </Typography>
                        </Box>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default ChatOutput;