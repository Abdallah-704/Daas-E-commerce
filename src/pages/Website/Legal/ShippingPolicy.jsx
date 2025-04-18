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

const ShippingPolicy = () => {
    const { theme } = useTheme();
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");

    return (
        <Container isSmallDevice={isSmallDevice} theme={theme}>
            <LegalCard isSmallDevice={isSmallDevice} theme={theme}>
                <Title isSmallDevice={isSmallDevice} theme={theme}>Shipping Policy</Title>

                <Paragraph theme={theme}>
                    This Shipping Policy outlines the terms and conditions for the delivery of products purchased through our website. By placing an order with us, you acknowledge and agree to the terms set forth in this policy.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>1. Processing Time</SectionTitle>
                <Paragraph theme={theme}>
                    All orders are processed within 1-3 business days after receiving your order confirmation email. Orders placed during weekends or holidays will be processed on the next business day.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>2. Shipping Options</SectionTitle>
                <Paragraph theme={theme}>
                    We offer various shipping methods to meet your needs:
                </Paragraph>
                <List theme={theme}>
                    <li>Standard Shipping (5-7 business days)</li>
                    <li>Express Shipping (2-3 business days)</li>
                    <li>Next Day Delivery (order must be placed before 12 PM)</li>
                </List>
                <Paragraph theme={theme}>
                    The specific delivery timeframes mentioned above are estimates and may vary depending on your location and other factors beyond our control.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>3. Shipping Rates</SectionTitle>
                <Paragraph theme={theme}>
                    Shipping rates are calculated based on the weight of your items, the shipping method selected, and your delivery location. The exact shipping cost will be displayed during checkout before payment is completed.
                </Paragraph>
                <Paragraph theme={theme}>
                    Free shipping is available for orders over $100 within the continental United States when selecting Standard Shipping.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>4. Tracking Information</SectionTitle>
                <Paragraph theme={theme}>
                    Once your order has been shipped, you will receive a shipping confirmation email with tracking information. You can track your package's status and estimated delivery date using the provided tracking number.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>5. International Shipping</SectionTitle>
                <Paragraph theme={theme}>
                    We ship to most international destinations. Please note that international orders may be subject to import duties, taxes, and customs clearance fees, which are the responsibility of the recipient. We have no control over these charges and cannot predict their amount.
                </Paragraph>
                <Paragraph theme={theme}>
                    International shipping times typically range from 7-21 business days, depending on the destination country and customs processing.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>6. Shipping Restrictions</SectionTitle>
                <Paragraph theme={theme}>
                    Some products may be restricted from shipping to certain locations due to local regulations or shipping limitations. If we are unable to ship your order to your location, we will notify you promptly and provide a full refund.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>7. Delivery Issues</SectionTitle>
                <Paragraph theme={theme}>
                    In the event of a delivery issue such as a lost, damaged, or significantly delayed package, please contact our customer service team at <Link to="/contact" style={{ color: theme.colors.primary }}>our contact page</Link> within 7 days of the expected delivery date. We will work with the shipping carrier to resolve the issue and determine the appropriate solution.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>8. Address Accuracy</SectionTitle>
                <Paragraph theme={theme}>
                    Customers are responsible for providing accurate shipping information. We are not responsible for orders shipped to incorrect addresses provided by the customer. If a package is returned to us due to an incorrect address, the customer will be responsible for any additional shipping charges necessary to redeliver the package.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>9. Policy Updates</SectionTitle>
                <Paragraph theme={theme}>
                    We reserve the right to modify this Shipping Policy at any time. Changes will be effective immediately upon posting to our website. We encourage customers to review this policy periodically.
                </Paragraph>

                <SectionTitle isSmallDevice={isSmallDevice} theme={theme}>10. Contact Us</SectionTitle>
                <Paragraph theme={theme}>
                    If you have any questions or concerns regarding our shipping policy, please contact us at <Link to="/contact" style={{ color: theme.colors.primary }}>our contact page</Link>.
                </Paragraph>

                <LastUpdated theme={theme}>Last updated: April 2025</LastUpdated>
            </LegalCard>
        </Container>
    );
};

export default ShippingPolicy; 