import { useState } from "react";
import { Container, Typography, Button, Input, Stack, TextField} from "@mui/material";
const ProjectBidComponent = ({component, setComponentQpData, componentsQpData}) => {
    const {
      id,
      name,
      materials,
      dimension,
      postProcess} = component;
    
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [qpList, setQpList] = useState([]);

    const handleQpInput = (e) => {
      if (e.target.name === "quantity") {
        setQuantity(e.target.value);
      } else {
        setPrice(e.target.value);
      }
    }

    const addQp = () => {
      let list = componentsQpData[id];
      if (!componentsQpData[id]) {
        list = [];
      }
      list.push({
        quantity: parseInt(quantity, 10),
        price: parseInt(price, 10)
      });

      setComponentQpData({
        ...componentsQpData,
        [id]: list
      });
    }

    const deleteQp = (i) => {
      const list = [...componentsQpData[id]];
      list.splice(i, 1);
      setComponentQpData({
        ...componentsQpData,
        [id]: list
      });
    }

    return (
      <Container className="component-detail-container">
        <Typography>name: {name}</Typography>
        <Typography>materials: {materials.join(",")}</Typography>
        <Typography>dimension: {dimension}</Typography>
        <Typography>post process: {postProcess}</Typography>
        
        <Container className="quanity-price-input-container">
          <Typography className="quantity-container">
            Quantity
            <TextField type="number" name="quantity" onChange={handleQpInput} value={quantity}/>
          </Typography>
          <Typography className="price-container">
            Price
            <TextField type="number" name="price" onChange={handleQpInput} value={price}/>
          </Typography>
          <Button onClick={addQp}>Add</Button>

        </Container>
        {
          componentsQpData[id] && componentsQpData[id].map((qp, i) => {
            return <Stack direction="row" >
              <Typography>quantity: {qp.quantity}</Typography>
              <Typography>price: {qp.price}</Typography>
              <Button onClick={() => deleteQp(i)}>Delete</Button>
            </Stack>
          })
        }
      </Container>
    )
}

export default ProjectBidComponent;