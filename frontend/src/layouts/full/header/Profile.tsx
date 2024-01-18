import {
  Box,
  Button,
  Typography
} from "@mui/material";

import { useSession, signOut } from "next-auth/react"

const Profile = () => {
  const { data: session, status } = useSession()

  if (status === "authenticated") {
    return (
      <Box sx={{ display: 'flex' }}>
        <Typography 
          sx={{ fontStyle: 'italic', width: 250, textAlign: 'right' }}>
          Hello {session.user?.email}!
        </Typography>
        <Button 
          sx={{ color: (theme) => theme.palette.error.main }}
          onClick={() => signOut()}>
            (Logout)
        </Button>
      </Box>

    );
  }

  return (
    <Button variant="contained" disableElevation color="primary" href="/authentication/login">
      Login
    </Button>
  )

};

export default Profile;
