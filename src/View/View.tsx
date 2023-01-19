import React,{ useEffect, useState } from 'react'
import axios from 'axios';
import { DetailsList, DetailsListLayoutMode, IColumn, DefaultButton } from '@fluentui/react';
import { Link } from 'react-router-dom';
import { get } from 'react-hook-form/dist/utils';
import { MdViewModule } from 'react-icons/md';
import { MdDelete } from 'react-icons/md';
import { MdModeEdit } from 'react-icons/md';
import './View.scss'

const View = () => {
    const [data, setData] = useState<any>();
    const getData = async () => {
        try {
            const url = 'http://localhost:4000/data'
            const result: any = await axios.get(url);
            setData(result.data)
        }catch (error) {
            console.log(error);
        }
    };
    const deleteRequest = async (id: any) => {
        try {
            const url = `http://localhost:4000/data/${id}`;
            const result: any = await axios.delete(url);
            console.log(result);
            getData();
        }catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getData();
    },[])
    const columns: IColumn[] = [
        {
            key: 'column1',
            name: 'Name',
            fieldName: 'name',
            minWidth: 70,
            maxWidth: 80,
            isResizable: true
        }, 
        {
            key: 'column2',
            name: 'Roll Number',
            fieldName: 'rollnumber',
            minWidth: 90,
            maxWidth: 100,
            isResizable: true
        },
        {
            key: 'column3',
            name: 'English',
            fieldName: 'english',
            minWidth: 30,
            maxWidth: 80,
            isResizable: true
        }, 
        {
            key: 'column4',
            name: 'Telugu',
            fieldName: 'telugu',
            minWidth: 30,
            maxWidth: 80,
            isResizable: true
        }, 
        {
            key: 'column5',
            name: 'Hindi',
            fieldName: 'hindi',
            minWidth: 30,
            maxWidth: 80,
            isResizable: true
        },  
        {
            key: 'column6',
            name: 'Maths',
            fieldName: 'maths',
            minWidth: 30,
            maxWidth: 80,
            isResizable: true
        },  
        {
            key: 'column7',
            name: 'Science',
            fieldName: 'science',
            minWidth: 70,
            maxWidth: 100,
            isResizable: true
        }, 
        {
            key: 'column8',
            name: 'Social',
            fieldName: 'social',
            minWidth: 50,
            maxWidth: 80,
            isResizable: true
        }, 
        {
            key: 'column9',
            name: 'Activities',
            fieldName: 'activities',
            minWidth: 70,
            maxWidth: 100,
            isResizable: true
        }, 
        {
            key: 'column10',
            name: 'Total Marks',
            fieldName: 'total marks',
            minWidth: 80,
            maxWidth: 100,
            isResizable: true
        }, 
        {
            key: 'column11',
            name: 'Action',
            fieldName: 'id',
            minWidth: 100,
            maxWidth: 250,
            isResizable: true,
            onRender: (item: any) => (
                item.id &&
                <>
                <div className='maincontainer__tablewrapper--entryactions'>
                <Link className='btn' to={`/view/${item.id}`}><MdViewModule size={17} color={"#B0B3B5"}/></Link>
                <Link className='btn' to={`/edit/${item.id}`}><MdModeEdit size={17} color={"#B0B3B5"}/></Link>
                <Link className='btn' onClick={() => deleteRequest(item.id)} to=''><MdDelete size={17} color={"#B0B3B5"}/></Link>
                </div>
                </>
            )
        }, 
    ];
    return (
        <div className='maincontainer'>
            <div className='maincontainer__toolbar'>
                <Link to={"/create"}><DefaultButton text='Add' style={{borderRadius:'12px', color:'#396CC5',borderColor:'#396CC5'}}/></Link>
                </div>
            <div className='maincontainer__tablewrapper'>
            {data && 
            <DetailsList
            items={data}
        columns={columns}
        setKey="set"
    layoutMode={DetailsListLayoutMode.justified}
/>
}
        </div>
        </div>
    )
}

export default View