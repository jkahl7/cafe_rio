import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

export interface ChatMessage {
    id: string;
    message: string;
    timestamp: string;
}

interface ChatOutputProps {
    messages: ChatMessage[];
}

const ChatOutput: React.FC<ChatOutputProps> = ({ messages }) => (
    <Paper elevation={3} sx={{ p: 2, maxHeight: 400, overflowY: 'auto' }}>
        <List>
            {messages.map(({ id,  message, timestamp }) => (
                <ListItem key={id} alignItems="flex-start">
                    <ListItemText
                        primary={
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="subtitle2" color="primary">
                                    Cafe Rio Bot
                                </Typography>
                                {/* <Typography variant="caption" color="text.secondary">
                                    {new Date(timestamp).toLocaleTimeString()}
                                </Typography> */}
                            </Box>
                        }
                        secondary={
                            <Typography variant="body1" color="text.primary">
                                {message}
                            </Typography>
                        }
                    />
                </ListItem>
            ))}
        </List>
    </Paper>
);

export default ChatOutput;