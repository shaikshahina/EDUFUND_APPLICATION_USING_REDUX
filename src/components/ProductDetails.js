import React,{useEffect} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchMutualDetails,removeFundDetails } from '../redux/actions/userActions';
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';
import { IconButton,Typography } from '@material-ui/core'



function ProductDetails(props) {
    const { productId } = useParams();
    let {singleFundDetails} = useSelector((state) => state.singleFundDetails);
    const data = singleFundDetails.data;
    const {meta} = singleFundDetails
    const dispatch = useDispatch();
    const iconStyle1 = { color: '#9900cc' }
    const itemStyle = {fontWeight: 'bold',color: '#9900cc',alignItems: 'center'}
    useEffect(() => {
        if (productId && productId !== "") dispatch(fetchMutualDetails(productId));
        return () => {
          dispatch(removeFundDetails());
        };
      }, []);
    return (
        <>
        {singleFundDetails.meta ? 
        (<Typography style = {itemStyle}>
              <IconButton style = {iconStyle1}>
              <BookmarksOutlinedIcon/>
              </IconButton>
              {singleFundDetails.meta.scheme_name}
              </Typography>)
              : <></> }
      
      <ResponsiveContainer width="90%" aspect={2}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 15,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid  horizontal="true" vertical="" stroke="#243240"/>
        <XAxis dataKey="date"/>
        <YAxis type="number" domain={[0, 1000]} />
        
        <Tooltip contentStyle={{ backgroundColor: "#8884d8", color: "#fff" }} itemStyle={{ color: "#fff" }} cursor={false}/>
        <Legend />
        <Line type="monotone" dataKey="nav" stroke="#8884d8" strokeWidth="5" dot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 2,r:2}} activeDot={{fill:"#2e4355",stroke:"#8884d8",strokeWidth: 5,r:10}} />
        
      </LineChart>
    </ResponsiveContainer>
  </>
      );
}

export default ProductDetails;