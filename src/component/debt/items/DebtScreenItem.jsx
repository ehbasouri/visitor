import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import { blueGrey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { API, HOST } from "../../../service/api";
import fa from "../../../translation/fa";
import converEnglishNumToPersian from "../../../utils/EnglishNumToPersianNum";
import numberWithCommas from "../../../utils/commaSeperator";
import { useDebtContext } from "../screen/useDebtContext";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
  avatar: {
    backgroundColor: blueGrey[500],
  },
}));

export function DebtScreenItem({ debt }) {
  const classes = useStyles();
  const { getClientTotalDebt } = useDebtContext();
  const [client, setClient] = React.useState(null);

  useEffect(() => {
    if (debt?.client) {
      setClient(debt.client);
    } else {
      if (debt?.client_id) fetchUser();
    }
  }, []);

  async function fetchUser() {
    try {
      const { data } = await API.get("business/getusers", {
        _id: debt?.client_id,
      });
      if (data?.users.length > 0) setClient(data?.users[0]);
    } catch (error) {
      console.log("error : ", error);
    }
  }

  return (
    <Link to={`/admin/debtclient/${client?.name}/${client?._id}`}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar
            src={HOST + client?.avatar}
            className={classes.avatar}
            alt={client?.name}
          />
        </ListItemAvatar>
        <ListItemText
          primary={client?.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {converEnglishNumToPersian(
                  numberWithCommas(getClientTotalDebt(debt.client_id))
                ) +
                  " " +
                  fa["toman"]}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" />
    </Link>
  );
}
