import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Stack,
  TextField,
  List,
  ListItem,
} from "@mui/material";
import React from "react";
import { ProjectComponent } from "../../../generated/graphql";
const ProjectBidComponent = ({
  component,
  setComponentQpData,
  componentsQpData,
}: {
  component: ProjectComponent;
  setComponentQpData: React.Dispatch<
    React.SetStateAction<Record<string, any[]>>
  >;
  componentsQpData: Record<string, any[]>;
}) => {
  const { id, name } = component;

  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");

  const handleQpInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "quantity") {
      setQuantity(e.target.value);
    } else {
      setPrice(e.target.value);
    }
  };

  const addQp = () => {
    let list = componentsQpData[id];
    if (!componentsQpData[id]) {
      list = [];
    }
    list.push({
      quantity: parseInt(quantity, 10),
      price: parseInt(price, 10),
    });

    setComponentQpData({
      ...componentsQpData,
      [id]: list,
    });
  };

  const deleteQp = (i: number) => {
    const list = [...componentsQpData[id]];
    list.splice(i, 1);
    setComponentQpData({
      ...componentsQpData,
      [id]: list,
    });
  };

  return (
    <Container className="component-detail-container">
      <List>
        <ListItem>
          <Typography>name: {name}</Typography>
        </ListItem>

        <ListItem>
          <TextField
            label="Quantity"
            name="quantity"
            onChange={handleQpInput}
            value={quantity}
          />
          <TextField
            label="Price"
            name="price"
            onChange={handleQpInput}
            value={price}
          />
        </ListItem>
        <ListItem>
          <Button onClick={addQp}>Add</Button>
        </ListItem>
      </List>

      {componentsQpData[id] &&
        componentsQpData[id].map((qp, i) => {
          return (
            <Stack direction="row">
              <Typography>quantity: {qp.quantity}</Typography>
              <Typography>price: {qp.price}</Typography>
              <Button onClick={() => deleteQp(i)}>Delete</Button>
            </Stack>
          );
        })}
    </Container>
  );
};

export default ProjectBidComponent;
