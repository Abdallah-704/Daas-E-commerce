import React, { memo, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@uidotdev/usehooks';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { useTheme } from '../../context/ThemeContext';
import { getFooterStyles, getFooterLinkStyles, getSocialIconStyles } from './FooterStyles';

const Footer = () => {
    const { theme } = useTheme();
    const [email, setEmail] = useState('');
    const isSmallDevice = useMediaQuery("only screen and (max-width: 768px)");
    const isMediumDevice = useMediaQuery("only screen and (min-width: 769px) and (max-width: 992px)");

    // Memoize styles to prevent unnecessary recalculations
    const styles = useMemo(() =>
        getFooterStyles(theme, isSmallDevice, isMediumDevice),
        [theme, isSmallDevice, isMediumDevice]
    );

    const handleSubscribe = useCallback((e) => {
        e.preventDefault();
        // Add subscription logic here
        console.log('Subscribed with email:', email);
        setEmail('');
        // Show a toast notification or success message
    }, [email]);

    const currentYear = new Date().getFullYear();

    return (
        <footer style={styles.footer}>
            <div style={styles.gridContainer}>
                {/* About section */}
                <div>
                    <h3 style={styles.heading}>About Us</h3>
                    <p style={styles.paragraph}>
                        We provide high-quality products at competitive prices. Our mission is to make shopping simple,
                        enjoyable, and accessible to everyone.
                    </p>
                    <div style={styles.socialContainer}>
                        <SocialIcon Icon={FaFacebook} url="https://facebook.com" />
                        <SocialIcon Icon={FaTwitter} url="https://twitter.com" />
                        <SocialIcon Icon={FaInstagram} url="https://instagram.com" />
                        <SocialIcon Icon={FaLinkedin} url="https://linkedin.com" />
                        <SocialIcon Icon={FaGithub} url="https://github.com" />
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 style={styles.heading}>Quick Links</h3>
                    <ul style={styles.ulStyle}>
                        <FooterLink to="/">Home</FooterLink>
                        <FooterLink to="/products">Products</FooterLink>
                        <FooterLink to="/categories">Categories</FooterLink>
                        <FooterLink to="/about">About Us</FooterLink>
                        <FooterLink to="/contact">Contact</FooterLink>
                    </ul>
                </div>

                {/* Contact Information */}
                <div>
                    <h3 style={styles.heading}>Contact Us</h3>
                    <div style={styles.contactItem}>
                        <MdLocationOn style={styles.contactIcon} />
                        <p style={styles.contactText}>
                            123 Commerce St, New York, NY 10001
                        </p>
                    </div>
                    <div style={styles.contactItem}>
                        <MdPhone style={styles.contactIcon} />
                        <p style={styles.contactText}>
                            +1 (555) 123-4567
                        </p>
                    </div>
                    <div style={styles.contactItem}>
                        <MdEmail style={styles.contactIcon} />
                        <p style={styles.contactText}>
                            support@yourstore.com
                        </p>
                    </div>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 style={styles.heading}>Newsletter</h3>
                    <p style={styles.paragraph}>
                        Subscribe to our newsletter to receive updates on new products, special offers, and promotions.
                    </p>
                    <form onSubmit={handleSubscribe}>
                        <div style={styles.formContainer}>
                            <input
                                type="email"
                                placeholder="Your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={styles.inputField}
                            />
                            <button
                                type="submit"
                                style={{
                                    ...styles.button,
                                    '&:hover': styles.buttonHover
                                }}
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Copyright */}
            <div style={styles.copyrightSection}>
                <p>© {currentYear} Your E-Commerce Store. All rights reserved.</p>
                <div style={styles.linkContainer}>
                    <Link
                        to="/privacy"
                        style={{
                            ...styles.link,
                            '&:hover': styles.linkHover
                        }}
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        to="/terms"
                        style={{
                            ...styles.link,
                            '&:hover': styles.linkHover
                        }}
                    >
                        Terms of Service
                    </Link>
                    <Link
                        to="/shipping"
                        style={{
                            ...styles.link,
                            '&:hover': styles.linkHover
                        }}
                    >
                        Shipping Policy
                    </Link>
                    <Link
                        to="/refunds"
                        style={{
                            ...styles.link,
                            '&:hover': styles.linkHover
                        }}
                    >
                        Refund Policy
                    </Link>
                </div>
            </div>
        </footer>
    );
};

// Helper component for footer links
const FooterLink = memo(({ to, children }) => {
    const { theme } = useTheme();
    const linkStyles = useMemo(() => getFooterLinkStyles(theme), [theme]);

    return (
        <li style={linkStyles.listItem}>
            <Link
                to={to}
                style={{
                    ...linkStyles.link,
                    '&:hover': linkStyles.linkHover
                }}
            >
                {children}
            </Link>
        </li>
    );
});

// Helper component for social media icons
const SocialIcon = memo(({ Icon, url }) => {
    const { theme } = useTheme();
    const iconStyles = useMemo(() => getSocialIconStyles(theme), [theme]);

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                ...iconStyles.icon,
                '&:hover': iconStyles.iconHover
            }}
        >
            <Icon size={18} />
        </a>
    );
});

export default memo(Footer); 