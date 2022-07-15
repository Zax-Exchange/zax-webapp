import { useState } from "react";
import Modal from "react-modal";
import UserProjectDetail from "./UserProjectDetail";

const UserProjectOverview = ({projectData}) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  }

  const afterOpenModal = () => {
    
  }

  const closeModal = () => {
    setIsOpen(false);
  }

 
  // TODO: use isVendor
  if (true) {
    const date = new Date(Date(projectData.createdAt)).toISOString().slice(0, 10);

    return <div className="user-project-overview-container" onClick={openModal}>
      <div>Project Name: {projectData.name}</div>

      <div>Company: {projectData.companyId}</div>
      <div>Delivery date: {projectData.deliveryDate}</div>
      <div>Delivery city: {projectData.deliveryCity}</div>
      <div>Budget: {projectData.budget}</div>
      <div>Posted on: {date}</div>

      <Modal
        isOpen={isOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Project Bid"
        ariaHideApp={false}
      >

        <UserProjectDetail projectId={projectData.id} bidInfo={projectData.bidInfo}/>
      </Modal>
    </div>

  }
  return null;
}

export default UserProjectOverview;