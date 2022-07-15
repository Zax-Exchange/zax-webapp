import { useQuery, gql } from '@apollo/client';
import { Grid, Typography, Container } from '@mui/material';

const getUserProfile = gql`
  query getUserWithUserId($userId: Int) {
    getUserWithUserId(userId: $userId) {
      id
      name
      email
      companyId
    }
  }
`;
const getCompanyDetail = gql`
  query getCompanyDetail($id: Int) {
    getCompanyDetail(companyId: $id) {
      name
      phone
      leadTime
      moq
      locations
      materials
    }
  }
`
const Profile = () => {
  const {loading: userLoading, error: userError, data: userData} = useQuery(getUserProfile, {
    variables: {
      userId: parseInt(window.sessionStorage.getItem("userId"))
    }
  });
  const companyId = userData?.getUserWithUserId.companyId;
  const {loading, error, data: companyData} = useQuery(getCompanyDetail, {
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
          <Typography>company name: {companyData && companyData.getCompanyDetail.name}</Typography>
          <Typography>company phone: {companyData && companyData.getCompanyDetail.phone}</Typography>
          <Typography>company locations: {companyData && companyData.getCompanyDetail.locations}</Typography>
          <Typography>company leadTime: {companyData && companyData.getCompanyDetail.leadTime}</Typography>
          <Typography>company materials: {companyData && companyData.getCompanyDetail.materials}</Typography>
        </Container>
      </Grid>
    </Grid>
  )
};

export default Profile