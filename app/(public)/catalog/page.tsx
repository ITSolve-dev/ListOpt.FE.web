import { Box, Stack, Typography } from "@mui/material";
import { getTranslations } from "next-intl/server";
import { BreadcrumbsNav, FastLink } from "@/shared/ui";

export default async function CatalogPage() {
	const t = await getTranslations();

	return (
		<Box sx={{ alignItems: "start", px: 10 }}>
			<BreadcrumbsNav sx={{ mt: 3.75 }} />
			<Typography variant="h2" gutterBottom sx={{ mt: 3.75 }}>
				{t("pages.catalog.title")}
			</Typography>
			<Stack sx={{ mt: 7.5 }}>
				<FastLink
					href="/catalog/milk"
					variant="filled"
					className="tw:inline-flex"
				>
					{t("general.categories.milk.title").toUpperCase()}
				</FastLink>
			</Stack>
			<Box component="section" sx={{ py: 6, mt: 15, mb: 15 }}>
				<Typography component="h2" variant="h2" gutterBottom>
					H2
				</Typography>

				<Typography component="p" variant="body1">
					Etiam dignissim nisl nec sem suscipit, ac maximus justo lacinia.
					Praesent elit odio, dapibus sed egestas at, hendrerit lacinia velit.
					Vestibulum est tortor, dignissim non nisl quis, congue sollicitudin
					magna. Nulla porttitor nunc quis efficitur pharetra. Mauris volutpat
					mi non ex viverra, volutpat tincidunt dolor iaculis. Cras condimentum
					vehicula urna sed interdum. In cursus mauris metus, id maximus massa
					facilisis et. Etiam vitae molestie dui. Pellentesque hendrerit libero
					id sapien mattis feugiat. Praesent suscipit massa non lobortis tempor.
					Nam ex leo, fringilla id dictum at, placerat at sem. Vivamus pulvinar
					ullamcorper arcu, sit amet auctor urna efficitur at. Morbi eu sodales
					quam, id blandit lorem. Aliquam rhoncus elit nibh, nec scelerisque
					quam dignissim ut. Ut quis ante tellus. Cras in porttitor orci.
					Curabitur vitae bibendum urna. Curabitur lectus neque, viverra vel
					turpis ac, pharetra suscipit odio. In ornare felis nec molestie
					posuere. Curabitur non ultrices ex, id consequat purus. Sed varius
					ligula dui, eu consequat purus tincidunt at. Orci varius natoque
					penatibus et magnis dis parturient montes, nascetur ridiculus mus.
					Donec aliquet non orci eget tincidunt. Duis interdum, diam sed
					imperdiet suscipit, metus libero placerat arcu, vel congue risus
					libero quis ex. Donec at tellus interdum, feugiat purus sed, lobortis
					est. Integer vulputate a nunc id condimentum. Fusce sit amet pulvinar
					lacus. Etiam egestas urna et eros egestas, ac auctor arcu efficitur
					tincidunt.
				</Typography>

				<Typography component="h3" variant="h3" gutterBottom>
					H3
				</Typography>

				<Typography component="p" variant="body2">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eros
					mauris, varius tincidunt mi vel, fringilla suscipit arcu. Fusce
					luctus, velit eu consectetur pulvinar, orci dui tincidunt libero, a
					consequat mauris nisl et dui. Nam volutpat risus at arcu efficitur,
					sed sagittis turpis dictum. Sed quam urna, venenatis at libero eget,
					mattis tincidunt urna. Donec vestibulum urna ante, in vestibulum mi
					faucibus at. Vivamus commodo eros leo, quis eleifend mi tincidunt in.
					Nullam urna ante, eleifend ac ipsum nec, condimentum condimentum urna.
					Nunc non commodo diam, ac lobortis justo. Morbi feugiat leo vehicula
					tortor euismod, at venenatis arcu finibus. Integer ac odio sapien.
					Aenean semper condimentum nulla vitae tristique. Nullam quis purus sed
					sapien mattis viverra quis fringilla est. Donec rhoncus consectetur
					sapien id vulputate. Sed ac elit orci. Donec finibus augue nisl, quis
					aliquet nulla tempus quis. Maecenas a arcu ornare, iaculis lacus
					vitae, tincidunt enim. Suspendisse ut interdum quam.
				</Typography>
			</Box>
		</Box>
	);
}
