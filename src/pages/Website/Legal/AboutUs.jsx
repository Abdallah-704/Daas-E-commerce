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
  LastUpdated
} from '../Style/Legal';
import styled from 'styled-components';

// Additional styled components for about page
const AboutSection = styled.div`
    margin-bottom: 30px;
`;

const TeamSection = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 20px;
`;

const TeamMember = styled.div`
    background-color: ${props => props.theme.colors.background};
    border-radius: ${props => props.theme.borderRadius.medium};
    border: 1px solid ${props => props.theme.colors.border};
    padding: 20px;
    text-align: center;
`;

const TeamMemberName = styled.h3`
    color: ${props => props.theme.colors.text};
    margin: 10px 0 5px;
`;

const TeamMemberRole = styled.p`
    color: ${props => props.theme.colors.primary};
    font-weight: 500;
    margin-bottom: 10px;
`;

const TeamMemberBio = styled.p`
    color: ${props => props.theme.colors.textSecondary};
    font-size: 14px;
`;

const ValuesList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 20px 0;
`;

const ValueItem = styled.li`
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
    color: ${props => props.theme.colors.text};
    
    &:before {
        content: "✓";
        color: ${props => props.theme.colors.primary};
        font-weight: bold;
        margin-right: 10px;
    }
`;


const AboutUs = () => {
  const { theme } = useTheme();
  const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");

  return (
    <Container isSmallDevice={isSmallDevice} theme={theme}>
      <LegalCard isSmallDevice={isSmallDevice} theme={theme}>
        <Title isSmallDevice={isSmallDevice} theme={theme}>About Us</Title>

        <AboutSection>
          <Paragraph theme={theme}>
            Welcome to our online store! We are dedicated to providing high-quality products and exceptional customer service to our valued customers. Our mission is to make shopping easy, enjoyable, and accessible for everyone.
          </Paragraph>

          <Paragraph theme={theme}>
            Founded in 2025, we have grown from a small startup to a trusted online retailer serving customers worldwide. Our commitment to quality, affordability, and customer satisfaction has been the cornerstone of our success.
          </Paragraph>
        </AboutSection>

        <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>Our Values</SectionTitle>

        <ValuesList theme={theme}>
          <ValueItem theme={theme}>Quality: We source only the best products from trusted manufacturers.</ValueItem>
          <ValueItem theme={theme}>Customer Satisfaction: Your happiness is our top priority.</ValueItem>
          <ValueItem theme={theme}>Integrity: We conduct our business with honesty and transparency.</ValueItem>
          <ValueItem theme={theme}>Innovation: We continuously improve our services and product offerings.</ValueItem>
          <ValueItem theme={theme}>Sustainability: We are committed to environmentally responsible practices.</ValueItem>
        </ValuesList>

        <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>Our Team</SectionTitle>

        <Paragraph theme={theme}>
          Our dedicated team works tirelessly to ensure you have the best shopping experience possible. Meet our team:
        </Paragraph>

        <TeamSection>
          <TeamMember theme={theme}>
            <TeamMemberName theme={theme}>Abdallah Daas</TeamMemberName>
            <TeamMemberRole theme={theme}>Founder & Developer</TeamMemberRole>
            <TeamMemberBio theme={theme}>
              With over a year of experience in React development, Abdallah founded our company with a vision to revolutionize online shopping. He handles all aspects of the business from development to customer service.
            </TeamMemberBio>
          </TeamMember>
        </TeamSection>

        <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>Contact Information</SectionTitle>

        <Paragraph theme={theme}>
          We'd love to hear from you! If you have any questions, feedback, or concerns, please don't hesitate to reach out to us:
        </Paragraph>

        <Paragraph theme={theme}>
          <strong>Phone:</strong> 0937330224<br />
          <strong>Email:</strong> abdallahdaas18@gmail.com<br />
          <strong>Address:</strong> Syria, Homs<br />
          <strong>Business Hours:</strong> Monday-Friday: 9AM-5PM
        </Paragraph>

        <Paragraph theme={theme} style={{ marginTop: '30px' }}>
          For more detailed information about our policies, please visit our <Link to="/privacy" style={{ color: theme.colors.primary }}>Privacy Policy</Link>, <Link to="/terms" style={{ color: theme.colors.primary }}>Terms of Service</Link>, and <Link to="/contact" style={{ color: theme.colors.primary }}>Contact</Link> pages.
        </Paragraph>

        <LastUpdated theme={theme}>Last Updated: April 10, 2025</LastUpdated>
      </LegalCard>
    </Container>
  );
};

export default AboutUs; 