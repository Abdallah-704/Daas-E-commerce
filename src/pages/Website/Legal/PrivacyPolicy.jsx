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
    List,
    LastUpdated,
    LinkText
} from '../Style/Legal';

const PrivacyPolicy = () => {
    const { theme } = useTheme();
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");

    // The date when this privacy policy was last updated
    const lastUpdatedDate = "April 10, 2025";

    return (
        <Container isSmallDevice={isSmallDevice} theme={theme}>
            <LegalCard isSmallDevice={isSmallDevice} theme={theme}>
                <Title isSmallDevice={isSmallDevice} theme={theme}>Privacy Policy</Title>
                <LastUpdated theme={theme}>Last Updated: {lastUpdatedDate}</LastUpdated>

                <Paragraph theme={theme}>
                    Welcome to our website. We respect your privacy and are committed to protecting it through our compliance with this policy.
                    This Privacy Policy describes how we collect, use, disclose, and safeguard your information when you visit our website.
                    Please also read our <Link to="/terms" style={{ color: theme.colors.primary }}>Terms of Service</Link> that govern your use of our services.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>Information We Collect</SectionTitle>
                <Paragraph theme={theme}>
                    We collect several types of information from and about users of our website, including information:
                </Paragraph>
                <List theme={theme}>
                    <li>Personal information like your name, postal address, email address, telephone number, or any other identifier by which you may be contacted online or offline.</li>
                    <li>Information about your internet connection, the equipment you use to access our website, and usage details.</li>
                    <li>Records and copies of your correspondence, if you contact us.</li>
                    <li>Your responses to surveys that we might ask you to complete for research purposes.</li>
                    <li>Your search queries on the website.</li>
                </List>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>How We Collect Information</SectionTitle>
                <Paragraph theme={theme}>
                    We collect this information:
                </Paragraph>
                <List theme={theme}>
                    <li>Directly from you when you provide it to us.</li>
                    <li>Automatically as you navigate through the site, which may include usage details, IP addresses, and information collected through cookies, web beacons, and other tracking technologies.</li>
                    <li>From third parties, for example, our business partners.</li>
                </List>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>How We Use Your Information</SectionTitle>
                <Paragraph theme={theme}>
                    We use information that we collect about you or that you provide to us:
                </Paragraph>
                <List theme={theme}>
                    <li>To present our website and its contents to you.</li>
                    <li>To provide you with information, products, or services that you request from us.</li>
                    <li>To fulfill any other purpose for which you provide it.</li>
                    <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
                    <li>To notify you about changes to our website or any products or services we offer or provide through it.</li>
                    <li>In any other way we may describe when you provide the information.</li>
                    <li>For any other purpose with your consent.</li>
                </List>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>Disclosure of Your Information</SectionTitle>
                <Paragraph theme={theme}>
                    We may disclose personal information that we collect or you provide as described in this privacy policy:
                </Paragraph>
                <List theme={theme}>
                    <li>To our subsidiaries and affiliates.</li>
                    <li>To contractors, service providers, and other third parties we use to support our business.</li>
                    <li>To a buyer or other successor in the event of a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of our assets.</li>
                    <li>To fulfill the purpose for which you provide it.</li>
                    <li>For any other purpose disclosed by us when you provide the information.</li>
                    <li>With your consent.</li>
                </List>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>Cookies</SectionTitle>
                <Paragraph theme={theme}>
                    We use cookies and similar technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.
                </Paragraph>
                <Paragraph theme={theme}>
                    You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>Security</SectionTitle>
                <Paragraph theme={theme}>
                    The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>Changes to Our Privacy Policy</SectionTitle>
                <Paragraph theme={theme}>
                    It is our policy to post any changes we make to our privacy policy on this page. If we make material changes to how we treat our users' personal information, we will notify you through a notice on the website home page.
                </Paragraph>
                <Paragraph theme={theme}>
                    The date the privacy policy was last revised is identified at the top of the page. You are responsible for ensuring we have an up-to-date, active, and deliverable email address for you, and for periodically visiting our website and this privacy policy to check for any changes.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>Contact Information</SectionTitle>
                <Paragraph theme={theme}>
                    To ask questions or comment about this privacy policy and our privacy practices, contact us at:
                </Paragraph>
                <Paragraph theme={theme}>
                    Email: abdallahdaas18@gmail,com<br />
                    Phone: 0937330224<br />
                    Address: Syria,Homs
                </Paragraph>
            </LegalCard>
        </Container>
    );
};

export default PrivacyPolicy; 