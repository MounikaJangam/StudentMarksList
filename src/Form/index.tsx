import * as React from "react";
import { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DynamicField from "../SharedComponents/DynamicField";
import { PrimaryButton } from "@fluentui/react";
import TextFieldForm from "../SharedComponents/TextFieldForm";
import { useParams } from "react-router-dom";
import { NewSTUDENT_FORM_ELEMENTS, STUDENT_FORM_ELEMENTS } from "./helper";
import './form.scss';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {

    interface IStudentInfo {
        name?: string;
        rollnumber?: number;
        english?: number;
        telugu?: number;
        hindi?: number;
        maths?: number;
        science?: number;
        social?: number;
        activities?: string;
        totalMarks?: number;
    }

    const StudentSchema: yup.SchemaOf<IStudentInfo> = yup.object().shape({
        name: yup.string().required().min(5).max(20),
        rollnumber: yup.number(),
        english: yup.number().required().min(1).max(100),
        telugu: yup.number().required().min(1).max(100),
        hindi: yup.number().required().min(1).max(100),
        maths: yup.number().required().min(1).max(100),
        science: yup.number().required().min(1).max(100),
        social: yup.number().required().min(1).max(100),
        activities: yup.string().required().min(1).max(20),
        totalMarks: yup.number(),
    });

    const StudentFormMethods = useForm<any>({
        mode: "all",
        resolver: async (data, context, options) => {
            return yupResolver(StudentSchema)(data, context, options);
        },
    });

    const [submittedInfo, setSubmitedInfo] = React.useState();
    const id = useParams();
    const navigation = useNavigate();
    const StudentFormSubmission: SubmitHandler<any> = async (
        data: any,
    ) => {
        setSubmitedInfo(data);
        if (id.id) {
            editForm(data);
        }else {
            createForm(data);
        }
        StudentFormMethods.reset({});
        navigation('/view')
    };

    const getAdditionalProps = (item: any) => {
        item.control = StudentFormMethods.control;
        item.setValue = StudentFormMethods.setValue;
        item.register = StudentFormMethods.register;
        return item;
    };

    
    const [data, setData] = React.useState<any>();
    const getStudentInfo = async () => {
        try{
            const result = await
            axios.get(`http://localhost:4000/data/${id.id}`);
            setData(result.data);
        }catch (error){
            console.log(error)
        }
    }
    const editForm = async (updatedData: any) => {
        try {
            const result = await
            axios.put(`http://localhost:4000/data/${id.id}`, updatedData);
            setData(result.data);
        }catch(error) {
            console.log(error)
        }
    }

        const createForm = async (updatedData: any) => {
            const generateNumber : any=Math.random();
            const newData ={ ...updatedData, 'id': generateNumber }
            try{
                const result = await axios.post(`http://localhost:4000/data`, newData);
                setData(result.data);
            }catch (error) {
                console.log(error);
            }
        }
        useEffect(() => {
            getStudentInfo();
        },[id]);

        useEffect(() => {
            data &&
            Object.entries(data).forEach(([key, value]: any) => {
                StudentFormMethods.setValue(key, value, {shouldValidate: true});
            });
        },[data]);
        console.log(StudentFormMethods.watch(),
        StudentFormMethods.formState.errors)
        
        return (
            <div className="form">
                {/* <div className="form_header">
                    <h2 className="formHeader">Create Student Marks List</h2>
                </div>
                <div>
                    <hr className="formLine"></hr>
                 </div> */}
                
                <FormProvider {...StudentFormMethods}>
                <form onSubmit={StudentFormMethods.handleSubmit(StudentFormSubmission)}>
                     <div className="form_container"> 
                     <div className="form_header">
                    <h3>CREATE MARKS LIST</h3>
                </div>
                <div>
                    <hr/>
                </div>
                        {STUDENT_FORM_ELEMENTS?.map((rows: any) => {
                            return (
                                <div className={`rowThree ${rows.className}`}>
                                    {rows.controls?.map((item: any) => {
                                        const updatedItem = getAdditionalProps(item);
                                        return DynamicField(item.type, updatedItem);
                                    })}
                                </div>
                            );
                        })}
                        <hr />
                       
                        <div className="form_footer">
                        <PrimaryButton type="submit" style={{borderRadius:"10px"}}
                            onClick={StudentFormMethods.handleSubmit(StudentFormSubmission)}>Submit</PrimaryButton>
                     </div>
                    </div>
                    {/* </div> */}
                    {/* <div className="form_footer">
                        <PrimaryButton type="submit"
                            onClick={StudentFormMethods.handleSubmit(StudentFormSubmission)}>Submit</PrimaryButton>
                    </div> */}
                </form>
            </FormProvider>
            
        </div>
    );
};

export default StudentForm;