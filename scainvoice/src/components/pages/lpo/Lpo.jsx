import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Lpo = () => {
  return (
    <div>
      <h1>Lpo Page</h1>
      
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Card 1
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contents of Card 1
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Card 2
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contents of Card 2
          </Typography>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            Card 3
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Contents of Card 3
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Lpo;
