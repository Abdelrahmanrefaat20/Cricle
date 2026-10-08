import {
  Navbar as HeroUiNavbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarItem,
} from "@heroui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../contexts/AuthContext";
// import { counterContext } from "../contexts/CounterContext";


export default function Navbar() {
  // const { counter } = useContext(counterContext);
  const { isLoggedIn, setIsLoggedIn, userData } = useContext(authContext);

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }

  return (
    <HeroUiNavbar className="bg-[#07100F]">
      <NavbarBrand>
        <Link to={"/"}>
          <p className="font-bold  text-[#3cc1c4] text-2xl">CIRCLE</p>
        </Link>
      </NavbarBrand>

      <NavbarContent as="div" justify="end">
        {isLoggedIn ? (
          <Dropdown placement="bottom-end" className="bg-[#07100F]">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={userData?.name}
                size="sm"
                src={userData?.photo}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" className="font-bold  text-[#3cc1c4] text-2xl">
              <DropdownItem textValue="profile" key="profile">
                <Link className="h-14" to="/profile">
                  <p className="font-semibold">{userData?.name}</p>
                  <p className="font-semibold">{userData?.email}</p>
                </Link>
              </DropdownItem>
              <DropdownItem textValue="logout" onPress={logout} key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Link to={"/signin"}>SignIn</Link>
            </NavbarItem>
            <NavbarItem>
              <Link to={"/signup"}>SignUp</Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </HeroUiNavbar>
  );
}