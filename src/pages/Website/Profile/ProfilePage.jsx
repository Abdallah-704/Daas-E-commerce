import React from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { useQuery } from '@tanstack/react-query';
import { Axios } from '../../../API/Axios';
import { api_user } from '../../../API/Api';
import { useMediaQuery } from '@uidotdev/usehooks';
import { MdPerson, MdEmail  } from 'react-icons/md';
import Loading from '../../../components/loading/Loading';
import {
  ProfileContainer,
  ProfileGrid,
  ProfileSidebar,
  AvatarCircle,
  ProfileName,
  ProfileRole,
  Divider,
  ContactItem,
  ContentArea,
  Card,
  CardHeader,
  ProfileField,
  OrderList,
  OrderItem,
  OrderInfo,
  OrderActions,
  StatusBadge,
  OrderPrice,
  ViewButton,
} from '../Style/Profile';

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString();
};

const getRoleName = (roleCode) => {
  switch (roleCode) {
    case '1995': return 'Admin';
    case '1996': return 'Manager';
    case '1999': return 'Editor';
    default: return 'Customer';
  }
};

const ProfilePage = () => {
  const { theme } = useTheme();
  const isSmallDevice = useMediaQuery('only screen and (max-width: 768px)');

  // Fetch user data with useQuery
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ['userProfil'],
    queryFn: async () => {
      const { data } = await Axios.get(`/${api_user}`);
      return data;
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    onError: (err) => {
      console.error('Error fetching user data:', err);
    },
  });

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return theme.colors.success;
      case 'processing':
        return theme.colors.warning;
      case 'cancelled':
        return theme.colors.error;
      default:
        return theme.colors.textSecondary;
    }
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 100px)',
        }}
      >
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div
        style={{
          padding: '20px',
          textAlign: 'center',
          color: theme.colors.error,
        }}
        role="alert"
      >
        <h2>Error: {error?.message || 'Failed to load profile information'}</h2>

      </div>
    );
  }

  return (
    <ProfileContainer isSmallDevice={isSmallDevice}>
      <ProfileGrid isSmallDevice={isSmallDevice}>
        {/* Profile Sidebar */}
        <ProfileSidebar isSmallDevice={isSmallDevice}>
          <AvatarCircle>
            <MdPerson size={80} color={theme.colors.primary} />
          </AvatarCircle>

          <ProfileName>{user?.name || 'User'}</ProfileName>

          <ProfileRole>{getRoleName(user?.role) || 'Customer'}</ProfileRole>

          <Divider />

          <ContactItem>
            <MdEmail size={20} color={theme.colors.icon} />
            <span>{user?.email || 'email@example.com'}</span>
          </ContactItem>
        </ProfileSidebar>

        {/* Profile Content */}
        <ContentArea>
          {/* Profile Information Card */}
          <Card>
            <CardHeader>
              <h2>Profile Information</h2>
            </CardHeader>

            <div>
              <ProfileField>
                <strong>Name:</strong> {user?.name || 'N/A'}
              </ProfileField>
              <ProfileField>
                <strong>Email:</strong> {user?.email || 'N/A'}
              </ProfileField>
            </div>
          </Card>

          {/* Order History Card */}
          <Card>
            <CardHeader>
              <h2>Order History</h2>
            </CardHeader>

            <OrderList>
              <OrderItem>
                <OrderInfo>
                  <p>ORD-12345</p>
                  <p>{formatDate('2024-12-18')}</p>
                </OrderInfo>

                <OrderActions>
                  <StatusBadge color={getStatusColor('Delivered')}>
                    Delivered
                  </StatusBadge>
                  <OrderPrice>${156.99.toFixed(2)}</OrderPrice>
                  <ViewButton>View Details</ViewButton>
                </OrderActions>
              </OrderItem>

              <OrderItem>
                <OrderInfo>
                  <p>ORD-12346</p>
                  <p>{formatDate('2025-04-4')}</p>
                </OrderInfo>

                <OrderActions>
                  <StatusBadge color={getStatusColor('Processing')}>
                    Processing
                  </StatusBadge>
                  <OrderPrice>${89.99.toFixed(2)}</OrderPrice>
                  <ViewButton>View Details</ViewButton>
                </OrderActions>
              </OrderItem>

              <OrderItem>
                <OrderInfo>
                  <p>ORD-12347</p>
                  <p>{formatDate('2025-04-10')}</p>
                </OrderInfo>

                <OrderActions>
                  <StatusBadge color={getStatusColor('Delivered')}>
                    Delivered
                  </StatusBadge>
                  <OrderPrice>${224.50.toFixed(2)}</OrderPrice>
                  <ViewButton>View Details</ViewButton>
                </OrderActions>
              </OrderItem>
            </OrderList>
          </Card>
        </ContentArea>
      </ProfileGrid>
    </ProfileContainer>
  );
};

export default ProfilePage;