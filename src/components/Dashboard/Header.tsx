import { Button, Flex, IconButton } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";

import { MdExitToApp } from "react-icons/md";

export default function Header() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("logado");
    navigate("/login");
  };

  return (
    <Flex as="header" align="center" h={16} px={[10, 4, 6, 8]} bg={"white"}>
      <Flex w="full" align="center" justify="center">
        <MobileNav />
        <Flex w="full" align="center" justify="space-between">
          <Flex>
            <Flex justify="space-between">
              <Flex align="center" mr={10}>
                <Link to="/">
                  <Button variant="ghost" px={0} fontWeight="bold">
                    Pastoral do menor
                  </Button>
                </Link>
              </Flex>
            </Flex>
          </Flex>

          <Flex alignItems={"center"}>
            <IconButton
              aria-label="Sair"
              icon={<MdExitToApp />}
              onClick={logout}
            >
              Sair
            </IconButton>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
