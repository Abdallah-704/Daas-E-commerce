import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useMediaQuery } from "@uidotdev/usehooks";
import { Link } from 'react-router-dom';
import {
    Container,
    LegalCard,
    Title,
    SectionTitle,
    Paragraph,

} from '../Style/Legal';
import styled from 'styled-components';
import { useAlert } from '../../../context/AlertContext';

// Additional styled components for contact page
const ContactInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 20px;
    background-color: ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.borderRadius.medium};
    border: 1px solid ${props => props.theme.colors.border};
    margin-bottom: 20px;
`;

const ContactItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    
    svg {
        color: ${props => props.theme.colors.primary};
        font-size: 24px;
    }
`;

const ContactLabel = styled.span`
    font-weight: bold;
    min-width: 120px;
    color: ${props => props.theme.colors.text};
`;

const ContactValue = styled.span`
    color: ${props => props.theme.colors.textSecondary};
`;

const ContactForm = styled.form`
    margin-top: 30px;
`;

const FormGroup = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 8px;
    color: ${props => props.theme.colors.text};
    font-weight: 500;
`;

const Input = styled.input`
    width: 100%;
    padding: 12px 15px;
    border-radius: ${props => props.theme.borderRadius.small};
    border: 1px solid ${props => props.theme.colors.border};
    background-color: ${props => props.theme.colors.inputBg || props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-size: 16px;
    transition: border-color 0.3s;
    
    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 12px 15px;
    border-radius: ${props => props.theme.borderRadius.small};
    border: 1px solid ${props => props.theme.colors.border};
    background-color: ${props => props.theme.colors.inputBg || props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-size: 16px;
    min-height: 150px;
    resize: vertical;
    transition: border-color 0.3s;
    
    &:focus {
        outline: none;
        border-color: ${props => props.theme.colors.primary};
    }
`;

const Button = styled.button`
    padding: 12px 24px;
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border: none;
    border-radius: ${props => props.theme.borderRadius.small};
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.2s;
    
    &:hover {
        background-color: ${props => `${props.theme.colors.primary}dd`};
        transform: translateY(-2px);
    }
    
    &:active {
        transform: translateY(0);
    }
`;

const Contact = () => {
    const { theme } = useTheme();
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const { alert } = useAlert()
    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic would go here
        alert('Message sent! (This is a demo - no actual message was sent)');
    };

    return (
        <Container isSmallDevice={isSmallDevice} theme={theme}>
            <LegalCard isSmallDevice={isSmallDevice} theme={theme}>
                <Title isSmallDevice={isSmallDevice} theme={theme}>Contact Us</Title>

                <Paragraph theme={theme}>
                    Have questions or feedback? We'd love to hear from you! Reach out to us using the contact information below or fill out the form, and we'll get back to you as soon as possible.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>Contact Information</SectionTitle>

                <ContactInfo theme={theme}>
                    <ContactItem theme={theme}>
                        <ContactLabel theme={theme}>Name:</ContactLabel>
                        <ContactValue theme={theme}>Abdallah Daas</ContactValue>
                    </ContactItem>

                    <ContactItem theme={theme}>
                        <ContactLabel theme={theme}>Phone:</ContactLabel>
                        <ContactValue theme={theme}>0937330224</ContactValue>
                    </ContactItem>

                    <ContactItem theme={theme}>
                        <ContactLabel theme={theme}>Email:</ContactLabel>
                        <ContactValue theme={theme}>abdallahdaas18@gmail.com</ContactValue>
                    </ContactItem>

                    <ContactItem theme={theme}>
                        <ContactLabel theme={theme}>Address:</ContactLabel>
                        <ContactValue theme={theme}>Syria, Homs</ContactValue>
                    </ContactItem>

                    <ContactItem theme={theme}>
                        <ContactLabel theme={theme}>Business Hours:</ContactLabel>
                        <ContactValue theme={theme}>Monday-Friday: 9AM-5PM</ContactValue>
                    </ContactItem>
                </ContactInfo>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>Send Us a Message</SectionTitle>

                <ContactForm onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label theme={theme}>Name</Label>
                        <Input theme={theme} type="text" placeholder="Your name" required />
                    </FormGroup>

                    <FormGroup>
                        <Label theme={theme}>Email</Label>
                        <Input theme={theme} type="email" placeholder="Your email address" required />
                    </FormGroup>

                    <FormGroup>
                        <Label theme={theme}>Subject</Label>
                        <Input theme={theme} type="text" placeholder="What is this regarding?" required />
                    </FormGroup>

                    <FormGroup>
                        <Label theme={theme}>Message</Label>
                        <TextArea theme={theme} placeholder="Your message..." required></TextArea>
                    </FormGroup>

                    <Button theme={theme} type="submit">Send Message</Button>
                </ContactForm>

                <Paragraph theme={theme} style={{ marginTop: '30px' }}>
                    By submitting this form, you agree to our <Link to="/privacy" style={{ color: theme.colors.primary }}>Privacy Policy</Link> and <Link to="/terms" style={{ color: theme.colors.primary }}>Terms of Service</Link>.
                </Paragraph>
            </LegalCard>
        </Container>
    );
};

export default Contact; 