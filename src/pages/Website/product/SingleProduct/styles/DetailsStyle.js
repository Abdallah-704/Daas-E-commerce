// ProductDetailsStyles.js

import { color } from "framer-motion";

const getStyles = (theme, isSmallDevice) => ({
    cardStyle: {
        padding: isSmallDevice ? '12px' : '16px',
        background: theme.colors.card,
        borderRadius: theme.borderRadius.large,
        boxShadow: theme.shadows.medium,
        position: 'relative',
    },
    topBarStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '4px',
        background: theme.colors.primary,
    },
    imageContainerStyle: {
        width: '100%',
        height: isSmallDevice ? '200px' : '300px',
        borderRadius: theme.borderRadius.medium,
        cursor: 'pointer',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    headerStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '8px',
    },
    titleStyle: {
        fontSize: isSmallDevice ? '20px' : '24px',
        color: theme.colors.text,
        fontWeight: 600,
    },
    favoriteButtonStyle: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    ratingStyle: {
        display: 'flex',
        gap: '4px',
        marginBottom: '8px',
    },
    ratingTextStyle: {
        color: theme.colors.textSecondary,
        fontSize: '14px',
    },
    priceContainerStyle: {
        marginBottom: '12px',
    },
    priceStyle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: theme.colors.text,
    },
    discountedPriceStyle: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: theme.colors.error,
    },
    originalPriceStyle: {
        fontSize: '16px',
        textDecoration: 'line-through',
        color: theme.colors.textSecondary,
    },
    discountBadgeStyle: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.error,
        color: 'white',
        padding: '2px 6px',
        borderRadius: theme.borderRadius.small,
        fontWeight: 'bold',
        fontSize: '14px',
    },
    flexStyle: {
        display: 'flex',
        gap: '8px',
    },
    descriptionStyle: {
        color: theme.colors.textSecondary,
        fontSize: '14px',
        marginBottom: '12px',
    },
    variantsContainerStyle: {
        display: 'flex',
        gap: '12px',
        marginBottom: '12px',
    },
    variantStyle: {
        flex: 1,
    },
    labelStyle: {
        color: theme.colors.textSecondary,
        fontSize: '16px',
        display: 'block',
        marginBottom: '4px',
    },
    selectStyle: {
        width: '100%',
        padding: '8px',
        borderRadius: theme.borderRadius.small,
        border: `1px solid ${theme.colors.border}`,
        background: theme.colors.background,
        color: theme.colors.text,
    },
    detailsContainerStyle: {
        display: 'flex',
        gap: '12px',
        marginBottom: '12px',

    },
    detailStyle: {
        flex: 1,
        textAlign: 'center',
        backgroundColor:"#2196f366",
        borderRadius:"8px",
        
    },
    detailLabelStyle: {
        color: theme.colors.textSecondary,
        fontSize: '14px',
        fontWeight:"500",
        display: 'block',
    },
    detailValueStyle: {
        color:"white",
        fontSize: '17px',
        fontWeight: 500,
        
    },
    quantityContainerStyle: {
        display: 'flex',
        gap: '12px',
        marginBottom: '12px',
    },
    quantityLabelStyle: {
        color: theme.colors.textSecondary,
        fontSize: '16px',
        fontWeight:"600"
    },
    quantityControlsStyle: {
        display: 'flex',
        gap: '8px',
    },
    quantityButtonStyle: (disabled) => ({
        background: disabled ? theme.colors.disabled : theme.colors.primary,
        color: 'white',
        border: 'none',
        borderRadius: theme.borderRadius.small,
        width: '100%',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        margin:"auto",
        
    }),
    quantityValueStyle: {
        color: theme.colors.text,
        fontSize: '16px',
    },
    buttonStyle: {
        background: theme.colors.primary,
        color: 'white',
        border: 'none',
        borderRadius: theme.borderRadius.medium,
        padding: '8px 16px',
        fontSize: '18px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent:"center",
        margin:"auto",
        width:'100%',
        "&:hover":{
            background:theme.colors.secondary
        }
    },
    disabledButtonStyle: {
        background: theme.colors.disabled,
        color: 'white',
        border: 'none',
        borderRadius: theme.borderRadius.medium,
        padding: '8px 16px',
        fontSize: '14px',
        cursor: 'not-allowed',
        opacity: 0.5,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent:"center",
        width:"100%",
        margin:"auto"
    },
    overlayStyle: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'black',
        opacity: 0.6,
        zIndex: 1000,
    },
    modalStyle: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: theme.colors.card,
        borderRadius: theme.borderRadius.large,
        padding: isSmallDevice ? '16px' : '24px',
        maxWidth: isSmallDevice ? '90%' : '600px',
        width: '100%',
        zIndex: 1001,
        boxShadow: theme.shadows.large,
    },
    modalCloseButtonStyle: {
        position: 'absolute',
        top: '12px',
        right: '12px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    modalCloseIconStyle: {
        transform: 'rotate(45deg)',
    },
    modalImageStyle: {
        width: '100%',
        height: isSmallDevice ? '200px' : '300px',
        objectFit: 'contain',
        borderRadius: theme.borderRadius.medium,
        marginBottom: '12px',
    },
    modalTitleStyle: {
        fontSize: isSmallDevice ? '18px' : '22px',
        color: theme.colors.text,
        marginBottom: '8px',
    },
});

export default getStyles;