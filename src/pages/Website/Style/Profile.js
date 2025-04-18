// Style/Profile.jsx
import styled from 'styled-components';

export const ProfileContainer = styled.div`
    min-height: 100vh;
    width: 100vw;
    background: linear-gradient(135deg, ${props => props.theme.colors.background} 0%, ${props => props.theme.colors.card} 100%);
    padding: ${props => props.isSmallDevice ? '20px' : '60px'};
    position: relative;
    overflow-x: hidden;
`;

export const BackgroundOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
    z-index: 0;
`;

export const ProfileGrid = styled.div`
    display: grid;
    grid-template-columns: ${props => props.isSmallDevice ? '1fr' : 'minmax(300px, 1fr) 3fr'};
    gap: ${props => props.isSmallDevice ? '30px' : '40px'};
    max-width: 1600px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
`;

export const ProfileSidebar = styled.div`
    background: ${props => props.theme.colors.card};
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

export const AvatarCircle = styled.div`
    width: 180px;
    height: 180px;
    border-radius: 50%;
    background: linear-gradient(45deg, ${props => props.theme.colors.primary}22, ${props => props.theme.colors.primary}44);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    border: 4px solid ${props => props.theme.colors.primary}33;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 0 20px ${props => props.theme.colors.primary}44;
    }
`;

export const ProfileName = styled.h2`
    color: ${props => props.theme.colors.text};
    margin-bottom: 12px;
    text-align: center;
    font-size: 2rem;
    background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.text});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const ProfileRole = styled.p`
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 25px;
    text-align: center;
    font-size: 1.2rem;
    padding: 6px 12px;
    background: ${props => props.theme.colors.primary}11;
    border-radius: 12px;
`;

export const Divider = styled.div`
    width: 80%;
    height: 2px;
    background: linear-gradient(to right, transparent, ${props => props.theme.colors.primary}44, transparent);
    margin: 20px 0;
`;

export const ContactItem = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
    width: 100%;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
        background: ${props => props.theme.colors.primary}11;
        transform: translateX(5px);
    }

    span {
        color: ${props => props.theme.colors.text};
        font-size: 1.1rem;
    }
`;

export const ContentArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export const Card = styled.div`
    background: ${props => props.theme.colors.card};
    border-radius: 20px;
    padding: 35px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }
`;

export const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;

    h2 {
        color: ${props => props.theme.colors.text};
        font-size: 1.8rem;
        background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.text});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

export const EditButton = styled.button`
    background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primary}cc);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 12px 24px;
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 20px ${props => props.theme.colors.primary}66;
    }
`;

export const SaveButton = styled(EditButton)`
    background: linear-gradient(45deg, ${props => props.theme.colors.success}, ${props => props.theme.colors.success}cc);
`;

export const CancelButton = styled(EditButton)`
    background: linear-gradient(45deg, ${props => props.theme.colors.error}, ${props => props.theme.colors.error}cc);
`;

export const ButtonGroup = styled.div`
    display: flex;
    gap: 15px;
    flex-wrap: wrap;
`;

export const FormGrid = styled.div`
    display: grid;
    grid-template-columns: ${props => props.isSmallDevice ? '1fr' : '1fr 1fr'};
    gap: 25px;
    margin-bottom: 25px;
`;

export const FormField = styled.div`
    position: relative;
`;

export const Label = styled.label`
    display: block;
    margin-bottom: 10px;
    color: ${props => props.theme.colors.text};
    font-weight: 600;
    font-size: 1.1rem;
`;

export const Input = styled.input`
    width: 100%;
    padding: 14px 18px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.colors.border};
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
        border-color: ${props => props.theme.colors.primary};
        box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}33;
        background: ${props => props.theme.colors.card};
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 14px 18px;
    border-radius: 12px;
    border: 1px solid ${props => props.theme.colors.border};
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-size: 1rem;
    resize: vertical;
    transition: all 0.3s ease;

    &:focus {
        border-color: ${props => props.theme.colors.primary};
        box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}33;
        background: ${props => props.theme.colors.card};
    }
`;

export const ProfileField = styled.div`
    padding: 15px;
    border-radius: 12px;
    background: ${props => props.theme.colors.background};
    border: 1px solid ${props => props.theme.colors.border}33;
    transition: all 0.3s ease;

    strong {
        color: ${props => props.theme.colors.primary};
        margin-right: 8px;
    }

    &:hover {
        background: ${props => props.theme.colors.primary}11;
        transform: translateX(5px);
    }
`;

export const OrderList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const OrderItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background: ${props => props.theme.colors.background};
    border-radius: 15px;
    border: 1px solid ${props => props.theme.colors.border}33;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
`;

export const OrderInfo = styled.div`
    p:first-child {
        color: ${props => props.theme.colors.text};
        font-weight: 600;
        margin-bottom: 8px;
        font-size: 1.1rem;
    }

    p:last-child {
        color: ${props => props.theme.colors.textSecondary};
        font-size: 0.95rem;
    }
`;

export const OrderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;

    @media (max-width: 768px) {
        width: 100%;
        justify-content: space-between;
        flex-wrap: wrap;
    }
`;

export const StatusBadge = styled.span`
    color: ${props => props.color};
    padding: 8px 16px;
    border-radius: 20px;
    background: ${props => props.color}22;
    font-size: 0.95rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

export const OrderPrice = styled.span`
    color: ${props => props.theme.colors.text};
    font-weight: 600;
    font-size: 1.1rem;
`;

export const ViewButton = styled.button`
    background: linear-gradient(45deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primary}cc);
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 20px ${props => props.theme.colors.primary}66;
    }
`;