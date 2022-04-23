import { Tooltip } from '@mui/material';
import React, { useState } from 'react'
import copy from 'clipboard-copy';

export const CopyToClipboard = ({ TooltipProps, children, ...props}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const onCopy = (content) => {
    copy(content);
    setShowTooltip(true);
  };

  const handleOnTooltipClose = () => {
    setShowTooltip(false);
  };

  return (
    <Tooltip
      open={showTooltip}
      title={"Copiado!"}
      leaveDelay={1500}
      onClose={handleOnTooltipClose}
      {...TooltipProps || {}}
    >
      {children({ copy: onCopy })}
    </Tooltip>
  )
}
