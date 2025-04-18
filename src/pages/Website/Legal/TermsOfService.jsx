import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useMediaQuery } from "@uidotdev/usehooks";
import { Link } from 'react-router-dom';
import {
    Container,
    LegalCard,
    Title,
    SectionTitle,
    SubSectionTitle,
    Paragraph,
    List,
    LastUpdated,
    LinkText
} from '../Style/Legal';

const TermsOfService = () => {
    const { theme } = useTheme();
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");

    // The date when these terms were last updated
    const lastUpdatedDate = "April 10, 2025";

    return (
        <Container isSmallDevice={isSmallDevice} theme={theme}>
            <LegalCard isSmallDevice={isSmallDevice} theme={theme}>
                <Title isSmallDevice={isSmallDevice} theme={theme}>Terms of Service</Title>
                <LastUpdated theme={theme}>Last Updated: {lastUpdatedDate}</LastUpdated>

                <Paragraph theme={theme}>
                    Welcome to our website. These terms and conditions outline the rules and regulations for the use of our website.
                    By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use our website
                    if you do not agree to all of the terms and conditions stated on this page.
                    Please also read our <Link to="/privacy" style={{ color: theme.colors.primary }}>Privacy Policy</Link> to understand how we collect and use your data.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>1. Agreement to Terms</SectionTitle>
                <Paragraph theme={theme}>
                    By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.
                    If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>2. Use of the Website</SectionTitle>
                <Paragraph theme={theme}>
                    You may use our website for lawful purposes only and in accordance with these Terms of Service. You agree:
                </Paragraph>
                <List theme={theme}>
                    <li>Not to use our website in any way that breaches any applicable local, national, or international laws or regulations.</li>
                    <li>Not to use our website in any way that is unlawful or fraudulent, or has any unlawful or fraudulent purpose or effect.</li>
                    <li>Not to transmit, or procure the sending of, any unsolicited or unauthorized advertising or promotional material.</li>
                    <li>Not to attempt to gain unauthorized access to, interfere with, damage, or disrupt any part of our website, the server on which our website is stored, or any server, computer, or database connected to our website.</li>
                </List>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>3. User Accounts</SectionTitle>
                <Paragraph theme={theme}>
                    When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times.
                    Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on our service.
                </Paragraph>
                <Paragraph theme={theme}>
                    You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction
                    of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur
                    under your account and/or password.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>4. Intellectual Property</SectionTitle>
                <Paragraph theme={theme}>
                    The website and its original content, features, and functionality are and will remain the exclusive property of our company and
                    its licensors. The website is protected by copyright, trademark, and other laws of both the country and foreign countries.
                    Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of our company.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>5. User Contributions</SectionTitle>
                <Paragraph theme={theme}>
                    Our website may contain message boards, chat rooms, personal web pages or profiles, forums, bulletin boards, and other interactive
                    features that allow users to post, submit, publish, display, or transmit content or materials on or through our website.
                </Paragraph>
                <Paragraph theme={theme}>
                    Any content you post to the website will be considered non-confidential and non-proprietary. By providing any user contribution on the website,
                    you grant us and our affiliates and service providers, and each of their and our respective licensees, successors, and assigns the right to use,
                    reproduce, modify, perform, display, distribute, and otherwise disclose to third parties any such material.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>6. Prohibited Uses</SectionTitle>
                <Paragraph theme={theme}>
                    You may use our website only for lawful purposes and in accordance with these Terms of Service. You agree not to use our website:
                </Paragraph>
                <List theme={theme}>
                    <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                    <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam,"
                        or any other similar solicitation.</li>
                    <li>To impersonate or attempt to impersonate the company, a company employee, another user, or any other person or entity.</li>
                    <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website, or which may harm
                        the company or users of the website or expose them to liability.</li>
                </List>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>7. Links to Other Websites</SectionTitle>
                <Paragraph theme={theme}>
                    Our website may contain links to third-party websites or services that are not owned or controlled by our company.
                </Paragraph>
                <Paragraph theme={theme}>
                    Our company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any
                    third-party websites or services. We do not warrant the offerings of any of these entities/individuals or their websites.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>8. Termination</SectionTitle>
                <Paragraph theme={theme}>
                    We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability,
                    under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </Paragraph>
                <Paragraph theme={theme}>
                    If you wish to terminate your account, you may simply discontinue using the service, or notify us that you wish to terminate your account.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>9. Limitation of Liability</SectionTitle>
                <Paragraph theme={theme}>
                    In no event shall our company, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect,
                    incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                    intangible losses, resulting from:
                </Paragraph>
                <List theme={theme}>
                    <li>Your access to or use of or inability to access or use the service;</li>
                    <li>Any conduct or content of any third party on the service;</li>
                    <li>Any content obtained from the service; and</li>
                    <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
                </List>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>10. Disclaimer</SectionTitle>
                <Paragraph theme={theme}>
                    Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. The service is provided
                    without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability,
                    fitness for a particular purpose, non-infringement, or course of performance.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>11. Governing Law</SectionTitle>
                <Paragraph theme={theme}>
                    These Terms shall be governed and construed in accordance with the laws applicable in your jurisdiction, without regard to its
                    conflict of law provisions.
                </Paragraph>
                <Paragraph theme={theme}>
                    Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision
                    of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>12. Changes to Terms</SectionTitle>
                <Paragraph theme={theme}>
                    We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will
                    provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </Paragraph>
                <Paragraph theme={theme}>
                    By continuing to access or use our service after any revisions become effective, you agree to be bound by the revised terms.
                    If you do not agree to the new terms, you are no longer authorized to use the service.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>13. Contact Us</SectionTitle>
                <Paragraph theme={theme}>
                    If you have any questions about these Terms, please contact us:
                </Paragraph>
                <Paragraph theme={theme}>
                    Email: abdallahdaas18@gmail.com<br />
                    Phone: 0937330224<br />
                    Address: Syria,Homs
                </Paragraph>
            </LegalCard>
        </Container>
    );
};

export default TermsOfService; 