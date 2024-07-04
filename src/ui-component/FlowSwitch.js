// src/ui-component/FlowSwitch.js
import React from 'react';
import { Switch } from '@mui/material';

const FlowSwitch = ({ checked, onChange }) => {
    return (
        <Switch
            checked={checked}
            onChange={onChange}
        />
    );
};

export default FlowSwitch;
