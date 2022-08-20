import { useQuery, gql } from '@apollo/client';
import { Grid, Typography, Container } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const GET_USER = gql`
  query getUserWithUserId($userId: String) {
    getUserWithUserId(userId: $userId) {
      id
      name
      email
      companyId
    }
  }
`;
export const GET_CUSTOMER_DETAIL = gql`
  query Query($id: String) {
    getCustomerDetail(companyId: $id) {
      name
      phone
      country
    }
  }
`
const Profile = () => {
  const { user } = useContext(AuthContext);
  const {loading: userLoading, error: userError, data: userData} = useQuery(GET_USER, {
    variables: {
      userId: user.id
    }
  });
  const companyId = userData?.getUserWithUserId.companyId;
  const {loading, error, data: companyData} = useQuery(GET_CUSTOMER_DETAIL, {
    variables: {
      id: companyId
    },
    skip: !userData
  });
  if (error) console.log(error);
  if (userData) {
    console.log(!!userData);
  }
  if (companyData) {
    console.log(companyData);
  }
  return (
    <Grid container className="profile-outer-container">
      <Grid item xs={2}>
        <Container>
          USER PROFILE
          <Typography>user name: {userData && userData.getUserWithUserId.name}</Typography>
          <Typography>email: {userData && userData.getUserWithUserId.email}</Typography>
        </Container>
      </Grid>

      <Grid item xs={10}>
        <Container>
          COMPANY PROFILE
          <Typography>company name: {companyData && companyData.getCustomerDetail.name}</Typography>
          <Typography>company phone: {companyData && companyData.getCustomerDetail.phone}</Typography>
          <Typography>company locations: {companyData && companyData.getCustomerDetail.locations}</Typography>
          <Typography>company leadTime: {companyData && companyData.getCustomerDetail.leadTime}</Typography>
          <Typography>company materials: {companyData && companyData.getCustomerDetail.materials}</Typography>
        </Container>
      </Grid>
    </Grid>
  )
};

export default Profile