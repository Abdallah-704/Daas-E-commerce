import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useTheme } from '../../context/ThemeContext';

const slideIn = keyframes`
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

const AlertContainer = styled.div`
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
    max-width: 400px;
    padding: 16px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    gap: 12px;
    animation: ${slideIn} 0.3s ease-out;
    ${props => props.isClosing && css`
        animation: ${fadeOut} 0.3s ease-out forwards;
    `}
    background: ${props => {
    switch (props.type) {
      case 'success':
        return props.theme.colors.success;
      case 'error':
        return props.theme.colors.error;
      case 'warning':
        return props.theme.colors.warning;
      default:
        return props.theme.colors.primary;
    }
  }};
    color: white;
`;

const Icon = styled.div`
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Message = styled.div`
    flex: 1;
    font-size: 14px;
    line-height: 1.4;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }
`;

const Alert = ({
  message,
  type = 'info',
  duration = 3000,
  onClose
}) => {
  const { theme } = useTheme();
  const [isClosing, setIsClosing] = React.useState(false);

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  return (
    <AlertContainer type={type} isClosing={isClosing} theme={theme}>
      <Icon>{getIcon()}</Icon>
      <Message>{message}</Message>
      <CloseButton onClick={handleClose}>×</CloseButton>
    </AlertContainer>
  );
};

export default Alert; 