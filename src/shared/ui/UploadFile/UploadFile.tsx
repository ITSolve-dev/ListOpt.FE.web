"use client";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import {
	type DropzoneOptions,
	type FileWithPath,
	useDropzone,
} from "react-dropzone";
import type { RefCallBack } from "react-hook-form";
import { toast } from "react-toastify";
import { resolveKey } from "@/shared/lib/intl.helpers";
import { ToastAlert } from "@/shared/ui";
import { DashedBox } from "./DashedBox";
import { LinkButton } from "./LinkButton";
import { VisuallyHiddenInput } from "./VisuallyHiddenInput";

export type UploadFileProps = {
	name?: string;
	onChangeAction?: (_file: File) => void;
	value?: File | null | undefined;
	disabled?: boolean;
	error?: string | undefined | null;
	refAction?: RefCallBack;
	dropzoneOptions?: DropzoneOptions;
};

export const UploadFile = ({
	name = "file",
	onChangeAction: onChange = (_file: File) => {},
	value = null,
	disabled = false,
	error = null,
	refAction: ref,
	dropzoneOptions,
}: UploadFileProps) => {
	const t = useTranslations();
	const [file, setFile] = useState<FileWithPath | null>(value);
	const successNotify = useCallback(
		() =>
			toast.success(
				<ToastAlert text={t("shared.uploadFile.alerts.success")} />,
			),
		[t],
	);
	const errorNotify = useCallback(
		(error: string) => toast.error(<ToastAlert text={error} />),
		[],
	);

	const handleChange = useCallback(
		async (acceptedFiles: File[]) => {
			if (acceptedFiles.length > 0 && acceptedFiles[0]) {
				onChange(acceptedFiles[0]);
			}
		},
		[onChange],
	);

	const { getRootProps, getInputProps, acceptedFiles, fileRejections } =
		useDropzone({
			onDrop: handleChange,
			disabled: disabled || !!file,
			onError: () => errorNotify(t("shared.uploadFile.alerts.error")),
			...dropzoneOptions,
		});

	useEffect(() => {
		if (error) {
			errorNotify(t(resolveKey(error) ?? "apiErrors.unknown"));
		}
	}, [error, errorNotify, t]);

	useEffect(() => {
		if (acceptedFiles.length > 0 && acceptedFiles[0]) {
			setFile(acceptedFiles[0]);
			successNotify();
		}
	}, [acceptedFiles, successNotify]);

	useEffect(() => {
		if (fileRejections.length > 0) {
			errorNotify(t("shared.uploadFile.alerts.error"));
		}
	}, [fileRejections, errorNotify, t]);

	return (
		<>
			<DashedBox
				py={3}
				{...getRootProps()}
				disabled={disabled || !!file}
				className="tw:bg-gray-100"
				ref={ref}
			>
				<Container>
					<Stack
						direction="column"
						spacing={2}
						justifyContent="center"
						alignItems="center"
					>
						<UploadFileIcon color="primary" fontSize="large" />
						<Stack direction="row" alignItems="center">
							<LinkButton variant="text">
								{t("shared.uploadFile.btn")}
								<VisuallyHiddenInput {...getInputProps({ name })} />
							</LinkButton>
							<Typography variant="subtitle2">
								{t("shared.uploadFile.btnAdds")}
							</Typography>
						</Stack>
						<Typography variant="body2" color="text.secondary">
							{t("shared.uploadFile.caption")}
						</Typography>
					</Stack>
				</Container>
			</DashedBox>
			{file && (
				<Paper elevation={3} sx={{ p: 2, mt: 2 }} key={file.name}>
					<Stack direction="row" spacing={2} alignItems="center">
						<UploadFileIcon color="primary" fontSize="medium" />
						<Stack direction="column" flexGrow={1}>
							<Typography variant="subtitle2">{file.name}</Typography>
							<Stack direction="row" spacing={2}>
								<Typography variant="body2" color="text.secondary">
									{`${(file.size / 1024).toFixed(2)}kb • ${t("shared.uploadFile.complete")}`}
								</Typography>
							</Stack>
						</Stack>
						<IconButton sx={{ p: 0 }} onClick={() => setFile(null)}>
							<DeleteIcon sx={{ color: "grey" }} fontSize="medium" />
						</IconButton>
						<CheckCircleIcon color="success" fontSize="medium" />
					</Stack>
				</Paper>
			)}
		</>
	);
};
