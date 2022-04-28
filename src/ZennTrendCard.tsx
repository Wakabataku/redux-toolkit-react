import "./App.css"
import React from "react"
import { ZennTrendItem } from "./type/zennTrend"
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material"

const ZennTrendCard: React.FC<{ item: ZennTrendItem }> = ({ item }) => {
  return (
    <Grid item xs={6}>
      <Card>
        <CardHeader
          avatar={<Avatar aria-label="recipe">{item.emoji}</Avatar>}
          title={item.title}
          sx={{ display: "flex", justifyContent: "start", textAlign: "start" }}
        />
        <CardActions>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "start",
              textAlign: "start",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              user: {item.user.name} <br /> category: (`$
              {item.topics.map((t) => t.displayName)}`)
            </Typography>
          </CardContent>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default ZennTrendCard
