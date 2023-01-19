import TextFieldForm from "./TextFieldForm";

export const DynamicField = (fieldName: string, item: any) => {
            return <TextFieldForm {...item} />;
        
};
export default DynamicField;