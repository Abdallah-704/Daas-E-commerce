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
    LastUpdated,
    List
} from '../Style/Legal';

const RefundPolicy = () => {
    const { theme } = useTheme();
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");

    return (
        <Container isSmallDevice={isSmallDevice} theme={theme}>
            <LegalCard isSmallDevice={isSmallDevice} theme={theme}>
                <Title isSmallDevice={isSmallDevice} theme={theme}>Refund Policy</Title>

                <Paragraph theme={theme}>
                    We want you to be completely satisfied with your purchase. This Refund Policy outlines the terms and conditions for returns, exchanges, and refunds for products purchased through our website.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>1. Return Eligibility</SectionTitle>
                <Paragraph theme={theme}>
                    You may return most new, unopened items within 30 days of delivery for a full refund. We also accept returns of opened items within 14 days if the product is defective, damaged, or not as described.
                </Paragraph>
                <Paragraph theme={theme}>
                    To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>2. Non-Returnable Items</SectionTitle>
                <Paragraph theme={theme}>
                    The following items cannot be returned:
                </Paragraph>
                <List theme={theme}>
                    <li>Gift cards</li>
                    <li>Downloadable software products</li>
                    <li>Personal care items that have been opened or used</li>
                    <li>Items marked as "Final Sale" or "Non-Returnable"</li>
                    <li>Items that have been customized or personalized</li>
                </List>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>3. Return Process</SectionTitle>
                <Paragraph theme={theme}>
                    To initiate a return, please follow these steps:
                </Paragraph>
                <List theme={theme}>
                    <li>Contact our customer service team at <Link to="/contact" style={{ color: theme.colors.primary }}>our contact page</Link> to request a Return Merchandise Authorization (RMA) number.</li>
                    <li>Pack the item securely in its original packaging along with the RMA number and your order information.</li>
                    <li>Ship the item to the address provided by our customer service team.</li>
                </List>
                <Paragraph theme={theme}>
                    You will be responsible for paying the shipping costs for returning your item. Shipping costs are non-refundable.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>4. Refund Processing</SectionTitle>
                <Paragraph theme={theme}>
                    Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
                </Paragraph>
                <Paragraph theme={theme}>
                    If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-10 business days. Please note that depending on your credit card company, it may take an additional 2-10 business days for the refund to appear on your statement.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>5. Late or Missing Refunds</SectionTitle>
                <Paragraph theme={theme}>
                    If you haven't received a refund within the timeframe specified above, please check your bank account again. Then contact your credit card company, as it may take some time before your refund is officially posted. Next, contact your bank. There is often some processing time before a refund is posted.
                </Paragraph>
                <Paragraph theme={theme}>
                    If you've done all of this and you still have not received your refund, please contact us at <Link to="/contact" style={{ color: theme.colors.primary }}>our contact page</Link>.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>6. Exchanges</SectionTitle>
                <Paragraph theme={theme}>
                    We only replace items if they are defective or damaged. If you need to exchange an item for the same item in a different size or color, please send us an email at <Link to="/contact" style={{ color: theme.colors.primary }}>our contact page</Link> and send your item to the address provided.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>7. Sale Items</SectionTitle>
                <Paragraph theme={theme}>
                    Only regular priced items may be refunded; sale items cannot be refunded unless they are defective or damaged.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>8. Damaged or Defective Items</SectionTitle>
                <Paragraph theme={theme}>
                    If you receive an item that is damaged or defective, please contact us immediately at <Link to="/contact" style={{ color: theme.colors.primary }}>our contact page</Link>. We will work with you to resolve the issue promptly, which may include providing a prepaid return shipping label, replacing the item, or issuing a full refund.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>9. Policy Updates</SectionTitle>
                <Paragraph theme={theme}>
                    We reserve the right to modify this Refund Policy at any time. Changes will be effective immediately upon posting to our website. We encourage customers to review this policy periodically.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>10. Contact Us</SectionTitle>
                <Paragraph theme={theme}>
                    If you have any questions or concerns regarding our refund policy, please contact us at <Link to="/contact" style={{ color: theme.colors.primary }}>our contact page</Link>.
                </Paragraph>

                <LastUpdated theme={theme}>Last updated: April 2025</LastUpdated>
            </LegalCard>
        </Container>
    );
};

export default RefundPolicy; 