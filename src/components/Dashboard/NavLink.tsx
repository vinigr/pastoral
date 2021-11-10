import React, { cloneElement, forwardRef } from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const InternalLink = ({ children, ...props }: any) => {
  const router = useLocation();
  let isActive = false;

  if (router.pathname === props.href) {
    isActive = true;
  }

  return (
    <Link to={props.href} style={{ width: "100%" }}>
      {typeof children === "function" ? children(isActive) : children}
    </Link>
  );
};

export const A = forwardRef(({ children, icon, ...props }: any, ref) => {
  const color = useColorModeValue("gray.500", "gray.300");

  return (
    <Flex
      ref={ref}
      as="div"
      w="full"
      align="center"
      cursor="pointer"
      px={3}
      py={2}
      fontWeight="medium"
      color={color}
      borderRadius="md"
      outline="none"
      _focus={{ shadow: "outline" }}
      _notFirst={{ mt: 1 }}
      {...props}
    >
      {icon && cloneElement(icon, { mr: 3 })}
      <Box w="full">{children}</Box>
    </Flex>
  );
});

// eslint-disable-next-line react/display-name
export const NavLink = forwardRef(({ href, ...props }: any, ref) => {
  const hoverColor = useColorModeValue("gray.900", "white");
  const hoverBg = useColorModeValue("gray.100", "gray.700");
  const activeColor = useColorModeValue("gray.600", "teal.200");
  const activeBg = useColorModeValue("gray.100", "gray.900");

  return (
    <InternalLink href={href}>
      {(isActive: boolean) => (
        <A
          ref={ref}
          aria-current={isActive ? "page" : undefined}
          _hover={{
            color: hoverColor,
            bg: hoverBg,
          }}
          {...(isActive && {
            bg: activeBg,
            color: activeColor,
            _hover: {},
          })}
          {...props}
        />
      )}
    </InternalLink>
  );
});
