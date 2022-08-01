import { Container, Typography } from "@mui/material";
import { useGetAllPlans } from "../hooks/signupHooks";
import FullScreenLoading from "../Utils/Loading";


const ChangePlan = ({
  setSnackbar,
  setSnackbarOpen
}) => {
  const {
    getAllPlansData,
    getAllPlansError,
    getAllPlansLoading,
    getAllPlansRefetch
  } = useGetAllPlans();
 
  return <Container>
    {getAllPlansLoading && <FullScreenLoading />}
    {
      getAllPlansData &&
      getAllPlansData.getAllPlans &&
      getAllPlansData.getAllPlans.map((plan) => {
        return <Typography>{plan.name}</Typography>
      })
    }
  </Container>
}

export default ChangePlan;