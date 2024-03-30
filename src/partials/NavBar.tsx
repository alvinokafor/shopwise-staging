import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HamburgerMenuIcon,
  Cross1Icon,
  HomeIcon,
  ArchiveIcon,
  BellIcon,
  Share2Icon,
} from "@radix-ui/react-icons";
import {
  Avatar,
  Button,
  Flex,
  Box,
  Text,
  IconButton,
  DropdownMenu,
  Badge,
  Tooltip,
} from "@radix-ui/themes";
import { UserContext, type IUserContext } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "@/contexts/ShopContext";
import { queryKeys } from "@/lib/constants";
import { useStoreQuery, StoreAdapter } from "@/adapters/StoreAdapter";
import { ICart } from "@/lib/types/Stores";
import { Shop, WalletIcon } from "@/assets/icons";
import { useWalletQuery, WalletAdapter } from "@/adapters/WalletAdapter";
import { getFormattedAmount } from "@/utils";

export default function Navbar() {
  const { user } = useContext(UserContext) as IUserContext;
  const navLinks = [
    {
      name: "Home",
      href: "/",
      icon: <HomeIcon color="#9DA4B7" width={24} height={24} />,
    },
    // ...(user
    //   ? [
    //       {
    //         name: "Send Money",
    //         href: "/send",
    //         icon: <PaperPlaneIcon color="#9DA4B7" width={24} height={24} />,
    //       },
    //     ]
    //   : []),
    // ...(user
    //   ? [
    //       {
    //         name: "Pay Bills",
    //         href: "/bill-payments",
    //         icon: <Money />,
    //       },
    //     ]
    //   : []),
    {
      name: "Exports",
      href: "/export",
      icon: <Share2Icon color="#9DA4B7" width={24} height={24} />,
    },
  ];

  const { data: walletBalance } = useWalletQuery(
    WalletAdapter.getWalletBalance,
    [queryKeys.WALLET_BALANCE],
    ""
  );

  const wallet = walletBalance?.data.wallet;

  const [menuOpen, setMenuOpen] = useState(false);
  //@ts-expect-error no types found
  const { orders } = useContext(ShopContext);
  const navigate = useNavigate();
  const [totalAmt, setTotalAmt] = useState<number | undefined>(0);

  const { data } = useStoreQuery<ICart>(
    StoreAdapter.getCart,
    [queryKeys.CART],
    ""
  );

  useEffect(() => {
    const calculateSum = () => {
      const totalPrices = data?.cart.products.reduce(
        (acc, product) => acc + product.quantity,
        0
      );

      setTotalAmt(totalPrices);
    };

    calculateSum();
  }, [data?.cart.products]);

  const toggleMobileMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    navigate("/login");
  };

  return (
    <header className="border-bottom fixed z-50 w-full border border-slate-50 bg-white shadow-sm">
      <Box className="mx-auto px-6 sm:max-w-2xl md:max-w-3xl lg:max-w-[1216px] lg:px-8">
        <div className="z-20 flex items-center justify-between py-5">
          <Link to="/">
            <img alt="Diaspora Logo" src="/logo.svg" />
          </Link>
          <ul className="hidden gap-x-12 text-secondary lg:flex">
            {navLinks.map((link) => {
              return (
                <Link
                  className={`transition-all text-slate-600 hover:text-slate-800 duration-100 hover:font-semibold`}
                  to={link.href}
                  key={link.name}
                >
                  <Flex className="group" align={"center"} gap={"3"}>
                    <Box>{link.icon}</Box>
                    <Text>{link.name}</Text>
                  </Flex>
                </Link>
              );
            })}
            <Link
              className={`transition-all text-slate-600 hover:text-slate-800 duration-100 hover:font-semibold`}
              to={`/shopping`}
            >
              <Flex className="group" align={"center"} gap={"3"}>
                <Box>
                  <Shop />
                </Box>
                <Text>Shops</Text>
              </Flex>
            </Link>

            <Link
              className={`transition-all text-slate-600 hover:text-slate-800 duration-100 hover:font-semibold`}
              to={`/orders`}
            >
              <Flex className="group" align={"center"} gap={"3"}>
                <Box>
                  <ArchiveIcon color="#9DA4B7" width={24} height={24} />
                </Box>

                <Text>Orders</Text>
                <Text>
                  <Badge>{totalAmt}</Badge>
                </Text>
              </Flex>
            </Link>
          </ul>

          <Flex align={"center"} gap={"5"} className="invisible md:visible">
            {/* <Button size={"3"} variant="ghost">
              {user?.firstName}
            </Button> */}

            <Tooltip content="Wallet Balance">
              <Badge size={"2"}>
                <WalletIcon />
                {getFormattedAmount(wallet?.balance!, wallet?.currency!)}
              </Badge>
            </Tooltip>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  fallback={"CC"}
                  size={"2"}
                  radius="full"
                  src="https://media.istockphoto.com/id/508319768/photo/portrait-of-male-owner-standing-in-gift-store.jpg?s=612x612&w=0&k=20&c=FU3VvhPQqkKtOEfpcTPM17lU5by_Hj2bqkpwOZnlPXc="
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <Flex align={"center"} gap={"2"}>
                  <Avatar
                    fallback={"CC"}
                    size={"2"}
                    radius="full"
                    src="https://media.istockphoto.com/id/508319768/photo/portrait-of-male-owner-standing-in-gift-store.jpg?s=612x612&w=0&k=20&c=FU3VvhPQqkKtOEfpcTPM17lU5by_Hj2bqkpwOZnlPXc="
                  />
                  <Text>{user?.firstName ? user?.firstName : "Account"}</Text>
                </Flex>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Profile</DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Link to={`/orders`}>
                    <Flex className="group" align={"center"} gap={"3"}>
                      <Text>
                        Orders <Badge>{totalAmt}</Badge>
                      </Text>
                    </Flex>
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Link to={"/beneficiaries"}>Beneficiaries</Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item>Get Help</DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={handleLogout}>
                  Logout
                </DropdownMenu.Item>
                {/* {user ? (
                  <DropdownMenu.Item onClick={handleLogout}>
                    Logout
                  </DropdownMenu.Item>
                ) : (
                  <DropdownMenu.Item>
                    <Link to={"/sign-up"}>Sign Up</Link>
                  </DropdownMenu.Item>
                )} */}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            <IconButton size={"3"} variant="ghost">
              <BellIcon width={24} height={24} />
            </IconButton>
          </Flex>

          <Flex
            onClick={toggleMobileMenu}
            align={"center"}
            gap={"4"}
            className="rounded-[4px] bg-primary px-2 py-2.5 font-semibold text-white transition-all duration-300 hover:bg-primary/80 lg:hidden"
          >
            <IconButton size={"3"} variant="ghost">
              <BellIcon width={24} height={24} />
            </IconButton>
            {!menuOpen ? (
              <IconButton variant="surface">
                <HamburgerMenuIcon color="blue" />
              </IconButton>
            ) : (
              <IconButton variant="surface">
                <Cross1Icon color="blue" />
              </IconButton>
            )}
          </Flex>
        </div>
      </Box>

      {menuOpen && (
        <motion.div
          animate={{ x: 0 }}
          initial={{ x: -250 }}
          className="z-10 mx-auto px-6  sm:max-w-2xl sm:px-8 md:max-w-3xl"
        >
          <div className="w-full space-y-7 bg-white py-6 text-secondary lg:hidden">
            <ul className="space-y-7  text-xl">
              {navLinks.map((link) => {
                return (
                  <li onClick={() => setMenuOpen(false)} key={link.name}>
                    <Link
                      className={` transition-all duration-100 hover:font-semibold font-normal`}
                      to={link.href}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Flex align={"center"} gap={"5"}>
              <Avatar
                fallback={"CC"}
                size={"2"}
                radius="full"
                src="https://media.istockphoto.com/id/508319768/photo/portrait-of-male-owner-standing-in-gift-store.jpg?s=612x612&w=0&k=20&c=FU3VvhPQqkKtOEfpcTPM17lU5by_Hj2bqkpwOZnlPXc="
              />
              <Button size={"3"} variant="ghost">
                {user?.firstName}
              </Button>
            </Flex>
          </div>
        </motion.div>
      )}
    </header>
  );
}
