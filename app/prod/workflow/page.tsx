'use client'
import WorkflowForm from "@/components/prod/WorkflowForm";

const WorkflowFormPage = ({ workflow }: any) => {
const workflowData = workflow.json();
return(
    <WorkflowForm workflow={workflowData} />
)
}
export default WorkflowFormPage;