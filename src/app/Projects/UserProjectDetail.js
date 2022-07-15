import { useProjectDetail } from "./ProjectDetail"

const UserProjectDetail = ({projectId, bidInfo}) => {
  const {loading, error, data} = useProjectDetail(projectId);
  console.log(data)
  const renderProjectDetail = () => {
    const {
      name: projectName,
      deliveryDate,
      deliveryCountry,
      budget,
      deliveryCity,
      design,
      status
    } = data.getProjectDetail

    return <div>
      <div className="project-info-container">
          <div className="title">Project Detail</div>
          <div className="field-container">name: {projectName}</div>
          <div className="field-container">deliveryDate: {deliveryDate}</div>
          <div className="field-container">deliveryCountry: {deliveryCountry}</div>
          <div className="field-container">budget: {budget}</div>
          <div className="field-container">deliveryCity: {deliveryCity}</div>
          <div className="field-container">design: {design}</div>
          <div className="field-container">status: {status}</div>
        </div>
        
        <div className="components-detail-container">
        <div className="title">Components Detail</div>

        {
          data.getProjectDetail.components.map(comp => {
            const {name,
              materials,
              dimension,
              postProcess} = comp;
            return (
              <div className="component-detail-container">
                <div className="field-container">name: {name}</div>
                <div className="field-container">materials: {materials.join(",")}</div>
                <div className="field-container">dimension: {dimension}</div>
                <div className="field-container">post process: {postProcess}</div>
              </div>
            )
          })
        }
        </div>
      </div>
  }
  return <div className="user-project-detail-container">
    {renderProjectDetail()}
  </div>
}

export default UserProjectDetail