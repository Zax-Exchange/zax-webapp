import { useProjectDetail } from "./ProjectDetail"
import { Stack, Container, Typography, Button } from "@mui/material";
import "./ProjectDetail.scss";

const UserProjectDetail = ({projectId, bidInfo, setIsProjectOpen}) => {
  const {loading, error, data} = useProjectDetail(projectId);

  const renderProjectDetail = () => {
    if (!data) return null;

    const {
      name: projectName,
      deliveryDate,
      deliveryCountry,
      budget,
      deliveryCity,
      design,
      status,
      components
    } = data.getProjectDetail

    const bids = {};
    bidInfo.components.forEach(comp => {
      bids[comp.projectComponentId] = comp.quantityPrices;
    });


    return <Stack className="vendor-project-info-container">
        <Typography >Project Detail</Typography>

        <Container className="project-info-container">
          <Typography>name: {projectName}</Typography>
          <Typography>deliveryDate: {deliveryDate}</Typography>
          <Typography>deliveryCountry: {deliveryCountry}</Typography>
          <Typography>budget: {budget}</Typography>
          <Typography>deliveryCity: {deliveryCity}</Typography>
          <Typography>design: {design}</Typography>
          <Typography>status: {status}</Typography>
        </Container>
        
        <Container className="components-detail-container">
          <Typography className="title">Components Detail</Typography>

          {
            components.map(comp => {
              const {
                id,
                name,
                materials,
                dimension,
                postProcess
              } = comp;

              return (
                <Container className="component-detail-container">
                  <Typography>name: {name}</Typography>
                  <Typography>materials: {materials.join(",")}</Typography>
                  <Typography>dimension: {dimension}</Typography>
                  <Typography>post process: {postProcess}</Typography>
                  <Container className="bid-info-container">
                    <Typography>Bids</Typography>
                    {
                      bids[id].map((qp) => {
                        return <Container className="quantity-price-container">
                          <Typography className="quantity">Quantity: {qp.quantity}</Typography> 
                          <Typography className="price">Price: {qp.price}</Typography>
                        </Container>
                      })
                    }
                  </Container>
                </Container>
              )
            })
          }
        </Container>
        <Button onClick={() => setIsProjectOpen(false)}>Close</Button>
      </Stack>
  }

  const renderBidDetail = () => {

    return <div className="bid-info-container">

    </div>
  }

  return <div className="user-project-detail-container">
    {renderProjectDetail()}
  </div>
}

export default UserProjectDetail