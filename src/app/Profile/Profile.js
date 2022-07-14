import { useQuery, gql } from '@apollo/client';

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
    <div>
      Profile PAGE
      <div>
        USER INFO
        user name: {userData && userData.getUserWithUserId.name}
        email: {userData && userData.getUserWithUserId.email}
      </div>

      <div>
        COMPANY INFO
        <p>company name: {companyData && companyData.getCompanyDetail.name}</p>
        <p>company phone: {companyData && companyData.getCompanyDetail.phone}</p>
        <p>company locations: {companyData && companyData.getCompanyDetail.locations}</p>
        <p>company leadTime: {companyData && companyData.getCompanyDetail.leadTime}</p>
        <p>company materials: {companyData && companyData.getCompanyDetail.materials}</p>
      </div>
    </div>
  )
};

export default Profile