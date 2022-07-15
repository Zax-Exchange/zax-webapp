import { useState } from "react";

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
      <div className="component-detail-container">
        <div className="field-container">name: {name}</div>
        <div className="field-container">materials: {materials.join(",")}</div>
        <div className="field-container">dimension: {dimension}</div>
        <div className="field-container">post process: {postProcess}</div>
        
        <div className="quanity-price-input-container">
          <div className="quantity-container">
            Quantity
            <input name="quantity" onChange={handleQpInput} value={quantity}/>
          </div>
          <div className="price-container">
            Price
            <input name="price" onChange={handleQpInput} value={price}/>
          </div>
          <button onClick={addQp}>Add</button>

        </div>
        {
          componentsQpData[id] && componentsQpData[id].map((qp, i) => {
            return <div className="quantity-price-detail">
              <div>quantity: {qp.quantity}</div>
              <div>price: {qp.price}</div>
              <button onClick={() => deleteQp(i)}>Delete</button>
            </div>
          })
        }
      </div>
    )
}

export default ProjectBidComponent;