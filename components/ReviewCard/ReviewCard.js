import * as React from "react";
import {
  Box,
  Rating,
  Card,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import classes from "./ReviewCard.module.css";

export default function ReviewCard(props) {
  return (
    <Card className={classes["review-card-layout"]}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <CardMedia
          component="img"
          sx={{ width: 45, height: 45, marginRight: "1rem" }}
          image="/user-review.svg"
          alt="user-profile-pic"
        />
        <div className={classes["reviewer-details-rating"]}>
          <Typography component="div" variant="h6">
            {props.name}
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              sx={{ fontSize: "0.7rem", fontWeight: "600" }}
            >
              {props.date}
            </Typography>
          </Typography>
          <Rating
            name="simple-controlled"
            value={props.rating}
            precision={0.5}
            readOnly
          />
        </div>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
              marginLeft: "2.2rem",
            }}
          >
            <Typography>{props.review}</Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
