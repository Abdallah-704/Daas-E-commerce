// Function to generate footer styles based on theme and device size
export const getFooterStyles = (theme, isSmallDevice, isMediumDevice) => {
    return {
        footer: {
            backgroundColor: theme.colors.cardBackground || '#1A1A1A',
            color: theme.colors.text || '#FFFFFF',
            position:"relative",
            padding: isSmallDevice ? '2rem 1rem' : '3rem 2rem',
            borderTop: `1px solid ${theme.colors.border || 'rgba(255,255,255,0.1)'}`,
            boxShadow: `0 -5px 15px ${theme.colors.shadow || 'rgba(0,0,0,0.1)'}`,
        },

        gridContainer: {
            display: 'grid',
            gridTemplateColumns: isSmallDevice
                ? '1fr'
                : isMediumDevice
                    ? '1fr 1fr'
                    : '1fr 1fr 1fr 1fr',
            gap: isSmallDevice ? '2rem' : '3rem',
            maxWidth: '1200px',
            margin: '0 auto',
        },

        heading: {
            fontSize: '1.5rem',
            marginBottom: '1rem',
            fontWeight: 'bold',
            color: theme.colors.primary || '#2196F3',
        },

        paragraph: {
            fontSize: '0.95rem',
            lineHeight: '1.6',
            marginBottom: '1rem',
            opacity: 0.85,
        },

        socialContainer: {
            display: 'flex',
            gap: '1rem',
            marginTop: '1.5rem',
        },

        ulStyle: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
        },

        contactItem: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
        },

        contactIcon: {
            fontSize: '1.25rem',
            marginRight: '0.75rem',
            color: theme.colors.primary || '#2196F3',
        },

        contactText: {
            margin: 0,
            fontSize: '0.95rem',
        },

        formContainer: {
            display: 'flex',
            flexDirection: isSmallDevice ? 'column' : 'row',
        },

        inputField: {
            padding: '0.75rem 1rem',
            borderRadius: isSmallDevice ? '0.5rem' : '0.5rem 0 0 0.5rem',
            border: `1px solid ${theme.colors.border || 'rgba(255,255,255,0.1)'}`,
            backgroundColor: theme.isDark
                ? 'rgba(255,255,255,0.05)'
                : 'rgba(0,0,0,0.05)',
            color: theme.colors.text || '#FFFFFF',
            marginBottom: isSmallDevice ? '0.5rem' : 0,
            width: isSmallDevice ? '100%' : 'auto',
            flexGrow: 1,
        },

        button: {
            padding: '0.75rem 1.25rem',
            backgroundColor: theme.colors.primary || '#2196F3',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: isSmallDevice
                ? '0.5rem'
                : '0 0.5rem 0.5rem 0',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
            whiteSpace: 'nowrap',
        },

        buttonHover: {
            backgroundColor: theme.colors.primaryDark || '#1976D2',
        },

        copyrightSection: {
            marginTop: isSmallDevice ? '2rem' : '3rem',
            textAlign: 'center',
            padding: '1.5rem 0 0',
            borderTop: `1px solid ${theme.colors.border || 'rgba(255,255,255,0.1)'}`,
            fontSize: '0.9rem',
            opacity: 0.75,
        },

        linkContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '0.5rem',
            flexWrap: 'wrap',
        },

        link: {
            color: theme.colors.text || '#FFFFFF',
            textDecoration: 'none',
            fontSize: '0.85rem',
        },

        linkHover: {
            textDecoration: 'underline',
        },
    };
};

// Footer link styling
export const getFooterLinkStyles = (theme) => {
    return {
        listItem: {
            marginBottom: '0.75rem',
        },

        link: {
            color: theme.colors.text || '#FFFFFF',
            textDecoration: 'none',
            fontSize: '0.95rem',
            transition: 'color 0.3s ease, transform 0.3s ease',
            display: 'inline-block',
            opacity: 0.85,
        },

        linkHover: {
            color: theme.colors.primary || '#2196F3',
            transform: 'translateX(5px)',
            opacity: 1,
        },
    };
};

// Social icon styling
export const getSocialIconStyles = (theme) => {
    return {
        icon: {
            color: theme.colors.text || '#FFFFFF',
            backgroundColor: theme.isDark
                ? 'rgba(255,255,255,0.1)'
                : 'rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            transition: 'all 0.3s ease',
        },

        iconHover: {
            backgroundColor: theme.colors.primary || '#2196F3',
            transform: 'translateY(-3px)',
            color: '#FFFFFF',
        },
    };
}; 