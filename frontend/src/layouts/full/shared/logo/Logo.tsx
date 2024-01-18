import Link from "next/link";
import { styled, Typography } from "@mui/material";
import Image from "next/image";
import logo from "../../../../../public/images/BEE/beefree_sdk.png"

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "200px",
  overflow: "hidden",
  display: "block",
  marginTop: "10px"
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image src={logo.src} alt="logo" height={40} width={200} priority />
    </LinkStyled>
  );
};

export default Logo;
