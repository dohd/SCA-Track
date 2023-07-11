import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

export default function CreateInvoiceCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/create-invoice.jpg"
          alt="Create Invoice"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Create Invoice
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Click the button below to create a new invoice.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Create
        </Button>
      </CardActions>
    </Card>
  );
}
