import React, { MouseEventHandler } from "react";
import { Navbar, Typography, IconButton } from "@material-tailwind/react";

interface IProps {
  isOpen: boolean;
  handleOpen?: MouseEventHandler<HTMLButtonElement>;
  handleClose?: MouseEventHandler<HTMLButtonElement>;
}

const NavbarDefault: React.FC<IProps> = ({ handleOpen }) => {
  return (
    <Navbar className="mx-auto max-w-screen-xl px-4 py-2 lg:px-8 lg:py-4 mb-24">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <IconButton
          variant="text"
          className="mr-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent"
          ripple={false}
          onClick={handleOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </IconButton>
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 font-medium"
        >
          Household Appliance Production
        </Typography>
      </div>
    </Navbar>
  );
};

export default NavbarDefault;
