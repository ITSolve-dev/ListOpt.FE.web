"use client";
import AddIcon from "@mui/icons-material/Add";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
	Alert,
	AlertTitle,
	Box,
	Button,
	Chip,
	Grid2 as Grid,
	Menu,
	MenuItem,
	Paper,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";

import { useTranslations } from "next-intl";
import { useState } from "react";

import { deliveryDocumentsConfig, documentsConfig } from "@/config";
import {
	type DeliveryDocument,
	type Document,
	DocumentStatusSchema,
	type DocumentStatusType,
} from "@/entities/document";
import { EditCompanyDocumentsForm } from "@/features/dashboard/EditCompanyDocumentsForm";
import { resolveKey } from "@/shared/lib/intl.helpers";

const getStatusChip = (status: DocumentStatusType) => {
	switch (status) {
		case DocumentStatusSchema.Enum.NOT_UPLOADED:
			return (
				<Chip
					label={status}
					color="primary"
					clickable
					onClick={() => alert(1)}
				/>
			);
		case DocumentStatusSchema.Enum.UPLOADED:
			return <Chip label={status} color="primary" variant="outlined" />;
		case DocumentStatusSchema.Enum.UNDER_REVIEW:
			return <Chip label={status} color="warning" />;
		case DocumentStatusSchema.Enum.ACTIVE:
			return <Chip label={status} color="success" />;
		default:
			return <Chip label={status} color="default" />;
	}
};

function formatDate(date: Date): string {
	const year = new Intl.DateTimeFormat("en", { year: "numeric" }).format(date);
	const month = new Intl.DateTimeFormat("en", { month: "numeric" }).format(
		date,
	);
	const day = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(date);
	return `${day}.${month}.${year}`;
}

export function DocumentsTab() {
	const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
	const [selectedDoc, setSelectedDoc] = useState<
		Document | DeliveryDocument | null
	>(null);
	const [isEditOpen, setIsEditOpen] = useState(false);

	const t = useTranslations();

	const open = Boolean(anchorEl);
	const handleClick = (
		event: React.MouseEvent<SVGSVGElement>,
		doc: Document | DeliveryDocument,
	) => {
		setAnchorEl(event.currentTarget);
		setSelectedDoc(doc);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<Stack spacing={10}>
			<Grid size={12}>
				<Box display="flex" justifyContent="flex-end" alignItems="center">
					<Button
						size="small"
						className="tw-rounded-lg"
						variant="contained"
						disableElevation
						endIcon={<AddIcon />}
					>
						{t("pages.dashboard.tabs.docs.supplyContracts.uploadButton")}
					</Button>
				</Box>
			</Grid>
			<TableContainer component={Paper}>
				<Alert
					className="tw:m-4 tw:rounded-lg tw:border tw:border-solid tw:border-gray-300 tw:bg-white"
					severity="warning"
					component={Paper}
				>
					<AlertTitle>
						{t("pages.dashboard.tabs.docs.supplyContracts.title")}
					</AlertTitle>
					<Typography>
						{t("pages.dashboard.tabs.docs.supplyContracts.description")}
					</Typography>
				</Alert>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								{t("pages.dashboard.tabs.docs.supplyContracts.columns.name")}
							</TableCell>
							<TableCell>
								{t("pages.dashboard.tabs.docs.supplyContracts.columns.country")}
							</TableCell>
							<TableCell>
								{t("pages.dashboard.tabs.docs.supplyContracts.columns.status")}
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{deliveryDocumentsConfig.map((config) => {
							const i18nKey = `general.documents.${config.type.toLowerCase()}`;
							return (
								<TableRow key={config.id}>
									<TableCell>
										{t(resolveKey(i18nKey) ?? "apiErrors.unknown")}
									</TableCell>

									<TableCell>
										<Stack direction="row" alignItems="center">
											<LocationOnIcon />
											<Typography>{config.country}</Typography>
										</Stack>
									</TableCell>
									<TableCell>{getStatusChip(config.status)}</TableCell>
									<TableCell>
										<MoreVertIcon
											aria-controls={open ? "basic-menu" : undefined}
											aria-haspopup="true"
											aria-expanded={open ? "true" : undefined}
											cursor="pointer"
											onClick={(e) => handleClick(e, config)}
										/>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			<TableContainer component={Paper}>
				<Alert
					className="tw:m-4 tw:rounded-lg tw:border tw:border-solid tw:border-gray-300 tw:bg-white"
					severity="warning"
					component={Paper}
				>
					<AlertTitle>{t("pages.dashboard.tabs.docs.docs.title")}</AlertTitle>
					<Typography>
						{t("pages.dashboard.tabs.docs.docs.description")}
					</Typography>
				</Alert>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								{t("pages.dashboard.tabs.docs.docs.columns.name")}
							</TableCell>
							<TableCell>
								{t("pages.dashboard.tabs.docs.docs.columns.date")}
							</TableCell>
							<TableCell>
								{t("pages.dashboard.tabs.docs.docs.columns.status")}
							</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{documentsConfig.map((config) => {
							const i18nKey = `general.documents.${config.type.toLowerCase()}`;
							return (
								<TableRow key={config.id}>
									{t(resolveKey(i18nKey) ?? "apiErrors.unknown")}
									<TableCell>
										<Stack direction="row" alignItems="center">
											<Typography>
												{config.date ? formatDate(config.date) : "-"}
											</Typography>
										</Stack>
									</TableCell>
									<TableCell>{getStatusChip(config.status)}</TableCell>
									<TableCell>
										<MoreVertIcon
											aria-controls={open ? "basic-menu" : undefined}
											aria-haspopup="true"
											aria-expanded={open ? "true" : undefined}
											cursor="pointer"
											onClick={(e) => handleClick(e, config)}
										/>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			{isEditOpen && selectedDoc && (
				<EditCompanyDocumentsForm
					onClose={() => setIsEditOpen(false)}
					defaultType={selectedDoc.type}
				/>
			)}
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem
					onClick={() => {
						handleClose();
						setIsEditOpen(true);
					}}
				>
					{t(
						resolveKey("pages.dashboard.tabs.docs.editForm.title") ??
							"apiErrors.unknown",
					)}
				</MenuItem>
				<MenuItem onClick={handleClose}>Опция 2</MenuItem>
				<MenuItem onClick={handleClose}>Опция 3</MenuItem>
			</Menu>
		</Stack>
	);
}
