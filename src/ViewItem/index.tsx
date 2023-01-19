import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './ViewItem.scss'

const ViewItem = () => {

  const [data, setData] = useState<any>();

  const id = useParams();

  const getData = async (item: any) => {
    try {
      const url = `http://localhost:4000/data/${item.id}`
      const result: any = await axios.get(url);
      debugger
      setData(result.data)
    } catch (err) {
      console.log(err);
    }
  };
console.log(data)
  useEffect(() => {
    getData(id);
  }, [id])

  return (
    <div>
      {data &&
      <>
        <h1>{data.name}</h1>
        <p>{data.rollnumber}</p>
        </>
      }

    </div>
  )
}

export default ViewItem