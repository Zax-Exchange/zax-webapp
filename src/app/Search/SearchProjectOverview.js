import { useNavigate } from "react-router-dom";
import { Typography, Card, CardActionArea, CardContent, Container } from "@mui/material";


const SearchProjectOverview = ({projectData}) => {
  const navigate = useNavigate();

  const handleProjectOnClick = (projectId) => {
    navigate("/project-detail", {state: {projectId}})
  };

  const date = new Date(Date(projectData.createdAt)).toISOString().slice(0, 10);
  
  const renderMaterialsString = (materials) => {
    let res = "";
    const searchStrings = document.getElementById("search-bar").value.split(" ");
    for (let mat of materials) {
      if (searchStrings.includes(mat)) {
        res += `<b>${mat}</b>`;
      } else {
        res += mat 
      }
      res += " ";
    }
    return res;
  };

  return <Container style={{marginBottom: "10px"}}>
    <Card className="search-project-overview-container" onClick={() => handleProjectOnClick(projectData.id)} variant="elevation" elevation={2}>
      <CardActionArea>
        <CardContent>
          <Container sx={{minWidth: 400, textAlign: "left"}}>
            <Typography>Project Name: {projectData.name}</Typography>
            <Typography>Materials: {projectData.materials.join(",")}</Typography>
            <Typography>Company: {projectData.companyId}</Typography>
            <Typography>Delivery date: {projectData.deliveryDate}</Typography>
            <Typography>Delivery city: {projectData.deliveryCity}</Typography>
            <Typography>Budget: {projectData.budget}</Typography>
            <Typography>Posted on: {date}</Typography>
          </Container>

        </CardContent>
      </CardActionArea>
    </Card>
  </Container>
}

export default SearchProjectOverview;