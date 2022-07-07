import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import BorderColorIcon from '@mui/icons-material/BorderColor';


export default function BasicCard() {
  return (
    <Card sx={{ maxWidth: 275, backgroundColor: "#1C1C26" }}>
      <CardContent>
        <BorderColorIcon sx={{color:"#B79CEC"}}/>
        <Typography sx={{ fontSize: 20, color:"white", fontFamily: "sans-serif" }} color="text.secondary" gutterBottom>
          Explore Curated Content resoivrs and nas fwhbshb
        </Typography>
        <Typography component="div" sx={{color: "white"}}>
          Read communit.
        </Typography>
      </CardContent>
    </Card>
  );
}
