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
}

const ChatOutput: React.FC<ChatOutputProps> = ({ chatOutput }) => (
    <Paper elevation={3} sx={{ p: 2, maxHeight: 400, overflowY: 'auto' }}>
        <List>
            {chatOutput.map(({sender, id,  message, timestamp }) => (
                <ListItem key={id} alignItems="flex-start">
                    <ListItemText
                        primary={
                            <Box display="flex" alignItems="center" gap={1}>
                                <Typography variant="subtitle2" color="primary">
                                   {sender} 
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