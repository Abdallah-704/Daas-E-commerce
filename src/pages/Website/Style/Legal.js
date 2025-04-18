import styled from 'styled-components';

export const Container = styled.div`
  padding: ${props => props.isSmallDevice ? '20px 15px' : '40px'};
  background-color: ${props => props.theme.colors.background};
  min-height: calc(100vh - 80px);
  max-width: 1200px;
  margin: 0 auto;
`;

export const LegalCard = styled.div`
  background-color: ${props => props.theme.colors.card};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.medium};
  padding: ${props => props.isSmallDevice ? '20px' : '30px'};
  border: 1px solid ${props => props.theme.colors.border};
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 20px;
  font-size: ${props => props.isSmallDevice ? '24px' : '32px'};
  position: relative;
  
  &:after {
    content: '';
    display: block;
    width: 80px;
    height: 4px;
    background-color: ${props => props.theme.colors.primary};
    margin-top: 10px;
    border-radius: 2px;
  }
`;

export const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: ${props => props.isSmallDevice ? '20px' : '24px'};
`;

export const SubSectionTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: ${props => props.isSmallDevice ? '18px' : '20px'};
`;

export const Paragraph = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: 15px;
  font-size: 16px;
`;

export const List = styled.ul`
  color: ${props => props.theme.colors.textSecondary};
  padding-left: 20px;
  margin-bottom: 20px;
  
  li {
    margin-bottom: 10px;
    line-height: 1.5;
  }
`;

export const LastUpdated = styled.div`
  font-style: italic;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 30px;
  font-size: 14px;
`;

export const LinkText = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    text-decoration: underline;
    color: ${props => props.theme.colors.primary}dd;
  }
`; 