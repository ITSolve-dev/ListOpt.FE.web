import type { SvgIconComponent } from "@mui/icons-material";

import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GroupsIcon from "@mui/icons-material/Groups";
import HomeIcon from "@mui/icons-material/Home";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import WarehouseIcon from "@mui/icons-material/Warehouse";

type NavItemType = {
	text: string;
	key: string;
	path: string;
	Icon: SvgIconComponent;
};

type UserRole = "supplier" | "customer" | "carrier";

type NavConfigType = Record<UserRole, NavItemType[]>;

const config: NavConfigType = {
	supplier: [
		{
			text: "Моя компания",
			key: "company",
			path: "/company",
			Icon: HomeIcon,
		},
		{
			text: "Мои подписки",
			key: "subscribes",
			path: "/subscribes",
			Icon: AccountBalanceWalletIcon,
		},
		{
			text: "Мои товары",
			key: "products",
			path: "/products",
			Icon: ViewInArIcon,
		},
		{
			text: "Мои заявки",
			key: "orders",
			path: "/subscribes",
			Icon: PendingActionsIcon,
		},
		{
			text: "Мои склады",
			key: "warehouses",
			path: "/warehouses",
			Icon: WarehouseIcon,
		},
		{
			text: "Мои клиенты",
			key: "customers",
			path: "/customers",
			Icon: GroupsIcon,
		},
		{
			text: "Статистика",
			key: "statistic",
			path: "/statistic",
			Icon: LeaderboardIcon,
		},
	],
	customer: [
		{
			text: "Моя компания",
			key: "company",
			path: "/company",
			Icon: HomeIcon,
		},
		{
			text: "Мои подписки",
			key: "subscribes",
			path: "/subscribes",
			Icon: AccountBalanceWalletIcon,
		},
		{
			text: "Мои склады",
			key: "warehouses",
			path: "/warehouses",
			Icon: WarehouseIcon,
		},
		{
			text: "Моя корзина",
			key: "cart",
			path: "/cart",
			Icon: ShoppingCartIcon,
		},
		{
			text: "Избранное",
			key: "favorites",
			path: "/favorites",
			Icon: FavoriteIcon,
		},
	],
	carrier: [
		{
			text: "Home",
			key: "home",
			path: "/",
			Icon: HomeIcon,
		},
		{
			text: "Orders",
			key: "orders",
			path: "/orders",
			Icon: ShoppingCartIcon,
		},
	],
};

export { config };
export type { UserRole };
