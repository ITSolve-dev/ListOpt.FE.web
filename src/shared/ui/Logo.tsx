import Image, { type ImageProps } from "next/image";
import LogoDark from "@/images/LogoDark.webp";
import logo from "@/images/logo.png";

type LogoProps = {
	dark?: boolean;
};

export function Logo({
	dark = false,
	...rest
}: LogoProps & Omit<ImageProps, "src" | "alt">) {
	return <Image src={dark ? LogoDark : logo} alt="Logo ListOpt" {...rest} />;
}
