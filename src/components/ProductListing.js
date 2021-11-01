import React, { useRef, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "./ProductListing.css";
import { Button, AppBar, Toolbar, Typography, IconButton, TextField, Grid, Paper } from '@material-ui/core'
import { logoutInitiate, fetchMutualfundsDataInitiate } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@material-ui/icons';
import CloseIcon from "@material-ui/icons/Close";
import BookmarksOutlinedIcon from '@material-ui/icons/BookmarksOutlined';

function ProductListing(props) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user)
  const { mutualFundsData, error } = useSelector(state => state.mutualFundsData)
  const btnstyle = { backgroundColor: 'white', borderRadius: 15, color: '#9900cc' }
  const navstyle = { backgroundColor: '#9900cc' }
  const iconStyle = { color: 'white' }
  const iconStyle1 = { backgroundColor: '#9900cc' }
  const displayStyle = { marginTop: '30px', padding: "35px" }
  const itemStyle = { fontWeight: 'bold', color: 'black' }
  useEffect(() => {
    dispatch(fetchMutualfundsDataInitiate())
  }, []);

  const handleAuth = () => {
    if (currentUser) {
      dispatch(logoutInitiate())
    }

  }


  const limitMutualFundsData = mutualFundsData.slice(0, 50)
  const topFiveMutualFundsList = mutualFundsData.slice(0, 5)

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = limitMutualFundsData.filter((value) => {
      return value.schemeName.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord.trim() !== "") {

      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div>
      <AppBar position="static" style={navstyle}  >
        <Toolbar>
          <Typography variant="h6">
            Explore
          </Typography>

          <TextField

            value={wordEntered}
            onChange={handleFilter}
            onClick={clearInput}
            inputProps={{ style: { color: 'white', fontWeight: 'bold' } }}
            fullWidth
            placeholder="Search Here"
            InputProps={{
              endAdornment: (
                <IconButton style={iconStyle}>
                  {filteredData.length === 0 ? (
                    <SearchOutlined />
                  ) : (
                    <CloseIcon id="clearBtn" />
                  )}
                </IconButton>
              ),
            }}
          />

          <Button type='submit' variant="contained" style={btnstyle} onClick={handleAuth}>Logout</Button>

        </Toolbar>
      </AppBar>
      {filteredData.length != 0 && (
        <div className="dataResult">
          {filteredData.map((value, key) => {
            const id = value.schemeCode
            return (
              <Link to={`/product/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                <Typography key={key} className="dataItem">

                  {value.schemeName}

                </Typography>
              </Link>
            );
          })}
        </div>
      )
      }

      {topFiveMutualFundsList.map((item, index) => {
        const id = item.schemeCode
        return (

          <Paper key={index} style={displayStyle}>

            <Link to={`/product/${id}`} style={{ color: 'inherit', textDecoration: 'inherit' }}>
              <Grid >
                <Typography style={itemStyle} >
                  <IconButton style={iconStyle1}>
                    <BookmarksOutlinedIcon />
                  </IconButton>
                  {item.schemeName}
                </Typography>
              </Grid>
              <Grid style={{ color: '#9900cc', fontWeight: 'bold', float: 'right' }}>
                <Typography> Very High Risk </Typography>
              </Grid>
            </Link>
          </Paper>
        )
      }
      )
      }


    </div>

  );

}
export default ProductListing;